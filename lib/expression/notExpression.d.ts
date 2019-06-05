import { QueryBuilder } from "../queryBuilder";
import { Expression } from "./expression";
export declare class NotExpression extends Expression {
    protected argument: Expression;
    constructor(argument: Expression);
    build(qb: QueryBuilder): Promise<import("../queryBuilder").Query>;
}
