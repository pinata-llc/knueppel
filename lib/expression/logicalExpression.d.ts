import Knex from "knex";
import { IdentifierResolver } from "../node";
import { Expression } from "./expression";
export declare type LogicalOperator = "||" | "&&";
export declare class LogicalExpression extends Expression {
    protected left: Expression;
    protected operator: LogicalOperator;
    protected right: Expression;
    constructor(left: Expression, operator: LogicalOperator, right: Expression);
    compile(knex: Knex, resolve: IdentifierResolver): Knex.Raw<any[]>;
}
