import { ASTNode, ASTParam } from "zargon";
import { UnknownBinaryOperator } from "../error/unknownBinaryOperator";
import { QueryBuilder } from "../queryBuilder";
import { Expression } from "./expression";
import { ListLiteral } from "./listLiteral";

const binaryOperators = ["=", "!=", "<", "<=", ">", ">=", "+", "-", "*", "/", "%", "&&", "in", "is", "is not"] as const;
export type BinaryOperator = typeof binaryOperators[number];

@ASTNode
export class BinaryExpression extends Expression {
  private static buildArray(qb: QueryBuilder, expression: Expression) {
    if (expression instanceof ListLiteral) {
      return expression.compileAsArray(qb);
    }

    return expression.build(qb);
  }
  constructor(
    @ASTParam("left") protected left: Expression,
    @ASTParam("operator") protected operator: BinaryOperator,
    @ASTParam("right") protected right: Expression,
  ) {
    super();
  }

  public async build(qb: QueryBuilder) {
    if (binaryOperators.includes(this.operator)) {
      if (this.operator === "&&") {
        return qb.query(`(? && ?)`, [
          await BinaryExpression.buildArray(qb, this.left),
          await BinaryExpression.buildArray(qb, this.right),
        ]);
      }

      const left = await this.left.build(qb);
      const right = await this.right.build(qb);

      return qb.query(`(? ${this.operator} ?)`, [left, right]);
    }

    throw new UnknownBinaryOperator(this.operator);
  }
}
