import { QueryBuilder } from "../queryBuilder";
import { Expression } from "./expression";
export declare class Identifier extends Expression {
    name: string;
    protected args: Expression[];
    constructor(name: string, args: Expression[]);
    build(qb: QueryBuilder): Promise<import("../queryBuilder").Query>;
}
