import { ASTNode, ASTParam } from "../index";
import { QueryBuilder } from "../queryBuilder";
import { Expression } from "./expression";

export type LogicalOperator = "||" | "&&";

@ASTNode
export class LogicalExpression extends Expression {
  constructor(
    @ASTParam("left") protected left: Expression,
    @ASTParam("operator") protected operator: LogicalOperator,
    @ASTParam("right") protected right: Expression,
  ) {
    super();
  }

  public async build(qb: QueryBuilder) {
    return qb.query(`(? ${this.operator === "||" ? "OR" : "AND"} ?)`, [
      await this.left.build(qb),
      await this.right.build(qb),
    ]);
  }
}
