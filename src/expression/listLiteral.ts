import Knex from "knex";
import { ASTNode, ASTParam } from "../ast";
import { IdentifierResolver } from "../node";
import { Expression } from "./expression";

@ASTNode
export class ListLiteral extends Expression {
  constructor(@ASTParam("values") protected values: string[] | number[]) {
    super();
  }

  public compile(knex: Knex, resolve: IdentifierResolver) {
    return knex.raw("(?)", [this.values]);
  }
}
