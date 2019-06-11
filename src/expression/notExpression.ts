import { ASTNode, ASTParam } from "zargon";
import { QueryBuilder } from "../queryBuilder";
import { Expression } from "./expression";

@ASTNode
export class NotExpression extends Expression {
  constructor(@ASTParam("argument") protected argument: Expression) {
    super();
  }

  public async build(qb: QueryBuilder) {
    return qb.query(`not (?)`, [await this.argument.build(qb)]);
  }
}
