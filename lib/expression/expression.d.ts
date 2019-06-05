import { Query, QueryBuilder } from "../queryBuilder";
export declare abstract class Expression {
    abstract build(qb: QueryBuilder): Promise<Query>;
}
