import Knex from "knex";
import { IdentifierResolver } from "../node";
import { Expression } from "./expression";
export declare class ListLiteral extends Expression {
    protected values: string[] | number[];
    constructor(values: string[] | number[]);
    compile(knex: Knex, resolve: IdentifierResolver): Knex.Raw<any[]>;
}
