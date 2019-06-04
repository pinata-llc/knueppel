import Knex from "knex";

import { ASTNode, ASTParam } from "../ast";
import { IdentifierResolver } from "../node";
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

  public compile(knex: Knex, resolve: IdentifierResolver) {
    return knex.raw(`(? ${this.operator === "||" ? "OR" : "AND"} ?)`, [
      this.left.compile(knex, resolve),
      this.right.compile(knex, resolve),
    ]);
  }
}
