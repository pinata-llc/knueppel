import { ASTNode, ASTParam } from "../index";
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
    if (this.values instanceof ListLiteral) {
      const query = await this.values.compileAsArray(qb);
      return qb.query("any(?)", [query]);
    }
    return qb.query("any(?)", [await this.values.build(qb)]);
  }
}
