import Knex from "knex";
import { Expression } from "./expression/expression";
import { IdentifierResolver, Node } from "./node";
export declare class Where extends Node {
    protected argument: Expression;
    constructor(argument: Expression);
    compile(knex: Knex, resolve: IdentifierResolver): Knex.Raw<any>;
    where(knex: Knex, resolve: IdentifierResolver): Knex.QueryBuilder<any, any[]>;
}
