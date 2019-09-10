import { BinaryOperator } from "./expression/binaryExpression";
import { LogicalOperator } from "./expression/logicalExpression";
export declare type Expression = BinaryExpression | GeoRadiusExpression | LogicalExpression | Identifier | Literal | NullLiteral | ListLiteral | UUIDListLiteral | PointLiteral | NotExpression | AnyExpression;
export interface BinaryExpression {
    type: "BinaryExpression";
    operator: BinaryOperator;
    left: Expression;
    right: Expression;
}
export interface AnyExpression {
    type: "AnyExpression";
    values: ListLiteral | UUIDListLiteral | Identifier;
}
export interface LogicalExpression {
    type: "LogicalExpression";
    operator: LogicalOperator;
    left: Expression;
    right: Expression;
}
export interface GeoRadiusExpression {
    type: "GeoRadiusExpression";
    pointA: Expression;
    radius: Expression;
    unit: "km" | "mi";
    pointB: Expression;
}
export interface Identifier {
    type: "Identifier";
    name: string;
    args?: Expression[];
}
export interface Literal {
    type: "Literal";
    value: string | number | boolean;
}
export interface ListLiteral {
    type: "ListLiteral";
    values: string[] | number[] | boolean[];
}
export interface NullLiteral {
    type: "NullLiteral";
}
export interface UUIDListLiteral {
    type: "UUIDListLiteral";
    values: string[];
}
export interface PointLiteral {
    type: "PointLiteral";
    lat: number;
    long: number;
}
export interface NotExpression {
    type: "NotExpression";
    argument: Expression;
}
export declare function buildLogicalExpression(operator: LogicalOperator, expressions: Array<Expression | null>): Expression | null;
export declare const uuidList: (values: string[]) => UUIDListLiteral;
export declare function bin(left: Expression | string, operator: BinaryOperator, right: Expression | string | number): BinaryExpression;
export declare function idIn(ids: string[]): BinaryExpression;
