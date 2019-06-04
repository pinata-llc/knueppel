import Knex from "knex";
import { IdentifierResolver } from "../node";
import { Expression } from "./expression";
declare const binaryOperators: readonly ["=", "!=", "<", "<=", ">", ">=", "+", "-", "*", "/", "%", "in"];
export declare type BinaryOperator = typeof binaryOperators[number];
export declare class BinaryExpression extends Expression {
    protected left: Expression;
    protected operator: BinaryOperator;
    protected right: Expression;
    constructor(left: Expression, operator: BinaryOperator, right: Expression);
    compile(knex: Knex, resolve: IdentifierResolver): Knex.Raw<any[]>;
}
export {};
