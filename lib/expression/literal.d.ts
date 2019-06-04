import Knex from "knex";
import { IdentifierResolver } from "../node";
import { Expression } from "./expression";
export declare class Literal extends Expression {
    protected value: string | number;
    constructor(value: string | number);
    compile(knex: Knex, resolve: IdentifierResolver): Knex.Raw<any[]>;
}
