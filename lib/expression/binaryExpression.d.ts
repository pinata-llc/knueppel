import { QueryBuilder } from "../queryBuilder";
import { Expression } from "./expression";
declare const binaryOperators: readonly ["=", "!=", "<", "<=", ">", ">=", "+", "-", "*", "/", "%", "&&", "in", "is", "is not"];
export declare type BinaryOperator = typeof binaryOperators[number];
export declare class BinaryExpression extends Expression {
    protected left: Expression;
    protected operator: BinaryOperator;
    protected right: Expression;
    constructor(left: Expression, operator: BinaryOperator, right: Expression);
    build(qb: QueryBuilder): Promise<import("../queryBuilder").Query>;
}
export {};
