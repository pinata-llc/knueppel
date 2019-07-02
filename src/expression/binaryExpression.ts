import { ASTNode, ASTParam } from "zargon";
import { UnknownBinaryOperator } from "../error/unknownBinaryOperator";
import { QueryBuilder } from "../queryBuilder";
import { Expression } from "./expression";
import { ListLiteral } from "./listLiteral";

const binaryOperators = ["=", "!=", "<", "<=", ">", ">=", "+", "-", "*", "/", "%", "&&", "in", "is", "is not"] as const;
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
    if (binaryOperators.includes(this.operator)) {
      const left = await this.left.build(qb);
      const right =
        this.operator === "in" && this.right instanceof ListLiteral
          ? await this.right.buildAsList(qb)
          : await this.right.build(qb);

      return qb.query(`(? ${this.operator} ?)`, [left, right]);
    }

    throw new UnknownBinaryOperator(this.operator);
  }
}
