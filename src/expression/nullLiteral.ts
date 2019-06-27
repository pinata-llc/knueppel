import { ASTNode } from "zargon";
import { QueryBuilder } from "../queryBuilder";
import { Expression } from "./expression";

@ASTNode
export class NullLiteral extends Expression {
  constructor() {
    super();
  }

  public async build(qb: QueryBuilder) {
    return qb.query("null", []);
  }
}
