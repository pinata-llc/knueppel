import Knex from "knex";
import { ASTNode, ASTParam } from "../ast";
import { IdentifierResolver } from "../node";
import { Expression } from "./expression";

@ASTNode
export class Identifier extends Expression {
  constructor(@ASTParam("name") public name: string, @ASTParam("args") protected args: Expression[]) {
    super();
  }

  public compile(knex: Knex, resolve: IdentifierResolver) {
    try {
      return resolve(this.name, this.args);
    } catch (err) {
      /* tslint:disable-next-line */
      console.log(err);
      throw err;
    }
  }
}
