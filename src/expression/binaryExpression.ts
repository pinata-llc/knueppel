import { ASTNode, ASTParam } from "zargon";
import { UnknownBinaryOperator } from "../error/unknownBinaryOperator";
import { QueryBuilder } from "../queryBuilder";
import { Expression } from "./expression";

const binaryOperators = ["=", "!=", "<", "<=", ">", ">=", "+", "-", "*", "/", "%", "in"] as const;
export type BinaryOperator = typeof binaryOperators[number];

@ASTNode
export class BinaryExpression extends Expression {
  constructor(
    @ASTParam("left") protected left: Expression,
    @ASTParam("operator") protected operator: BinaryOperator,
    @ASTParam("right") protected right: Expression,
  ) {
    super();
  }

  public async build(qb: QueryBuilder) {
    const left = await this.left.build(qb);
    const right = await this.right.build(qb);

    if (binaryOperators.includes(this.operator)) {
      return qb.query(`(? ${this.operator} ?)`, [left, right]);
    }

    throw new UnknownBinaryOperator(this.operator);
  }
}
