import { QueryBuilder } from "../queryBuilder";
import { Expression } from "./expression";
export declare class Literal extends Expression {
    protected value: string | number | boolean;
    constructor(value: string | number | boolean);
    build(qb: QueryBuilder): Promise<import("../queryBuilder").Query>;
}
