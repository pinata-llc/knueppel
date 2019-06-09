import { QueryBuilder } from "../queryBuilder";
import { Expression } from "./expression";
declare const intervalUnits: readonly ["years", "months", "weeks", "days", "hours", "minutes", "seconds"];
declare type IntervalUnit = typeof intervalUnits[number];
export declare class IntervalLiteral extends Expression {
    protected value: number;
    protected unit: IntervalUnit;
    constructor(value: number, unit: IntervalUnit);
    build(qb: QueryBuilder): Promise<import("../queryBuilder").Query>;
}
export {};
