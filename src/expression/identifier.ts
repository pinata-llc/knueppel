import { ASTNode, ASTParam } from "zargon";
import { Query, QueryBuilder } from "../queryBuilder";
import { Expression } from "./expression";

@ASTNode
export class Identifier extends Expression {
  constructor(@ASTParam("name") public name: string, @ASTParam("args") protected args?: Expression[]) {
    super();
  }

  public async build(qb: QueryBuilder) {
    let compiledArgs: Query[] | undefined;
    try {
      if (!this.name) {
        throw new Error(`Knüppel: Unknown identifier ${this.name}`);
      }
      if (this.args) {
        compiledArgs = await Promise.all(this.args && this.args.map(async arg => await arg.build(qb)));
      } else {
        compiledArgs = undefined;
      }

      const identifier = qb.resolve(this.name.toLocaleLowerCase(), compiledArgs);
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
