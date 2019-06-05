import { Query, QueryBuilder } from "./queryBuilder";
export declare abstract class Node<E = void> {
    abstract build(qb: QueryBuilder): Promise<Query>;
}
