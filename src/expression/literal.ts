import Knex from "knex";
import { ASTNode, ASTParam } from "../ast";
import { IdentifierResolver } from "../node";
import { Expression } from "./expression";

@ASTNode
export class Literal extends Expression {
  constructor(@ASTParam("value") protected value: string | number) {
    super();
  }

  public compile(knex: Knex, resolve: IdentifierResolver) {
    return knex.raw("?", [this.value]);
  }
}
