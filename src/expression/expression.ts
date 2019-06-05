import { Query, QueryBuilder } from "../queryBuilder";

export abstract class Expression {
  public abstract async build(qb: QueryBuilder): Promise<Query>;
}
