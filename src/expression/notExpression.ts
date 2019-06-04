import Knex from "knex";
import { ASTNode, ASTParam } from "../ast";
import { IdentifierResolver } from "../node";
import { Expression } from "./expression";

@ASTNode
export class UnaryExpression extends Expression {
  constructor(@ASTParam("argument") protected argument: Expression) {
    super();
  }

  public compile(knex: Knex, resolve: IdentifierResolver) {
    return knex.raw(`not (?)`, [this.argument.compile(knex, resolve)]);
  }
}
