import { QueryBuilder } from "../queryBuilder";
import { Expression } from "./expression";
export declare class PointLiteral extends Expression {
    protected lat: number;
    protected long: number;
    constructor(lat: number, long: number);
    build(qb: QueryBuilder): Promise<import("../queryBuilder").Query>;
}
