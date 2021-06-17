import { Query, QueryBuilder } from "./queryBuilder";

export abstract class Node<E = void> {
  public abstract build(qb: QueryBuilder): Promise<Query>;
}
