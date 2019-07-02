import { ASTNode, ASTParam } from "zargon";
import { QueryBuilder } from "../queryBuilder";
import { Expression } from "./expression";
import { Identifier } from "./identifier";
import { ListLiteral } from "./listLiteral";

@ASTNode
export class AnyExpression extends Expression {
  constructor(@ASTParam("values") protected values: ListLiteral | Identifier) {
    super();
  }

  public async build(qb: QueryBuilder) {
    return qb.query("any(?)", [await this.values.build(qb)]);
  }
}
