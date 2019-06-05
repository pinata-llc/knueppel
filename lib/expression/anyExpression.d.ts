import { QueryBuilder } from "../queryBuilder";
import { Expression } from "./expression";
import { Identifier } from "./identifier";
import { ListLiteral } from "./listLiteral";
export declare class AnyExpression extends Expression {
    protected values: ListLiteral | Identifier;
    constructor(values: ListLiteral | Identifier);
    build(qb: QueryBuilder): Promise<import("../queryBuilder").Query>;
}
