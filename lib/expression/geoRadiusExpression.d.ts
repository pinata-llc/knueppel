import { QueryBuilder } from "../queryBuilder";
import { Expression } from "./expression";
export declare type DistanceUnit = "km" | "mi";
export declare class GeoRadiusExpression extends Expression {
    protected pointA: Expression;
    protected radius: Expression;
    protected unit: DistanceUnit;
    protected pointB: Expression;
    constructor(pointA: Expression, radius: Expression, unit: DistanceUnit, pointB: Expression);
    build(qb: QueryBuilder): Promise<import("../queryBuilder").Query>;
}
