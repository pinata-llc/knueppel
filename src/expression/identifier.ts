import { ASTNode, ASTParam } from "zargon";
import { QueryBuilder } from "../queryBuilder";
import { Expression } from "./expression";

@ASTNode
export class Identifier extends Expression {
  constructor(@ASTParam("name") public name: string, @ASTParam("args") protected args?: Expression[]) {
    super();
  }

  public async build(qb: QueryBuilder) {
    try {
      if (!this.name) {
        throw new Error(`Knüppel: Unknown identifier ${this.name}`);
      }
      const identifier = qb.resolve(this.name.toLocaleLowerCase(), this.args);
      if (!identifier) {
        throw new Error(`Knüppel: Unknown identifier ${this.name}`);
      }
      return qb.query(identifier.queryString, identifier.bindings || [], identifier.tables);
    } catch (err) {
      /* tslint:disable-next-line */
      console.log(err);
      throw err;
    }
  }
}
