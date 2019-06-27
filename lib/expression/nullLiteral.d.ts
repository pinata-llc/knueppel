import { QueryBuilder } from "../queryBuilder";
import { Expression } from "./expression";
export declare class NullLiteral extends Expression {
    constructor();
    build(qb: QueryBuilder): Promise<import("../queryBuilder").Query>;
}
