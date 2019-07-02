import { QueryBuilder } from "../queryBuilder";
import { Expression } from "./expression";
export declare class ListLiteral extends Expression {
    protected values: string[] | number[] | boolean[];
    constructor(values: string[] | number[] | boolean[]);
    build(qb: QueryBuilder): Promise<import("../queryBuilder").Query>;
    buildAsList(qb: QueryBuilder): Promise<import("../queryBuilder").Query>;
}
