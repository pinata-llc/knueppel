import { QueryBuilder } from "../queryBuilder";
import { Expression } from "./expression";
export declare type LogicalOperator = "||" | "&&";
export declare class LogicalExpression extends Expression {
    protected left: Expression;
    protected operator: LogicalOperator;
    protected right: Expression;
    constructor(left: Expression, operator: LogicalOperator, right: Expression);
    build(qb: QueryBuilder): Promise<import("../queryBuilder").Query>;
}
