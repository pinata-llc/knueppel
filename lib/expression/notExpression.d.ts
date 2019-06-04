import Knex from "knex";
import { IdentifierResolver } from "../node";
import { Expression } from "./expression";
export declare class UnaryExpression extends Expression {
    protected argument: Expression;
    constructor(argument: Expression);
    compile(knex: Knex, resolve: IdentifierResolver): Knex.Raw<any[]>;
}
