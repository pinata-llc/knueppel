import { ASTNode, ASTParam } from "zargon";
import { QueryBuilder } from "../queryBuilder";
import { Expression } from "./expression";

@ASTNode
export class Identifier extends Expression {
  constructor(@ASTParam("name") public name: string, @ASTParam("args") protected args: Expression[]) {
    super();
  }

  public async build(qb: QueryBuilder) {
    try {
      return await qb.resolve(this.name, this.args);
    } catch (err) {
      /* tslint:disable-next-line */
      console.log(err);
      throw err;
    }
  }
}
