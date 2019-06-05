import { ASTNode, ASTParam } from "../ast";
import { QueryBuilder } from "../queryBuilder";
import { Expression } from "./expression";

@ASTNode
export class Literal extends Expression {
  constructor(@ASTParam("value") protected value: string | number | boolean) {
    super();
  }

  public async build(qb: QueryBuilder) {
    return qb.query("?", [this.value]);
  }
}
