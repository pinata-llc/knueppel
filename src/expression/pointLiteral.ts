import { ASTNode, ASTParam } from "zargon";
import { QueryBuilder } from "../queryBuilder";
import { Expression } from "./expression";

@ASTNode
export class PointLiteral extends Expression {
  constructor(@ASTParam("lat") protected lat: number, @ASTParam("long") protected long: number) {
    super();
  }

  public async build(qb: QueryBuilder) {
    return qb.query("ll_to_earth(?, ?)", [this.lat, this.long]);
  }
}
