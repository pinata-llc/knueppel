import { Query, QueryBuilder } from "../queryBuilder";

export abstract class Expression {
  public abstract build(qb: QueryBuilder): Promise<Query>;
}
