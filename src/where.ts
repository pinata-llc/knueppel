import Knex from "knex";
import { ASTNode, ASTParam } from "./ast";
import { Expression } from "./expression/expression";
import { IdentifierResolver, Node } from "./node";

@ASTNode
export class Where extends Node {
  constructor(@ASTParam("argument") protected argument: Expression) {
    super();
  }

  public compile(knex: Knex, resolve: IdentifierResolver) {
    return this.argument.compile(knex, resolve);
  }

  public where(knex: Knex, resolve: IdentifierResolver) {
    return knex.whereRaw("?", [this.argument.compile(knex, resolve)]);
  }
}
