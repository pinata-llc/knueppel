import { QueryBuilder } from "../queryBuilder";
import { Expression } from "./expression";
export declare class Identifier extends Expression {
    name: string;
    protected args?: Expression[] | undefined;
    constructor(name: string, args?: Expression[] | undefined);
    build(qb: QueryBuilder): Promise<import("../queryBuilder").Query>;
}
