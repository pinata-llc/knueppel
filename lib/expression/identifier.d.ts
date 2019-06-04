import Knex from "knex";
import { IdentifierResolver } from "../node";
import { Expression } from "./expression";
export declare class Identifier extends Expression {
    name: string;
    protected args: Expression[];
    constructor(name: string, args: Expression[]);
    compile(knex: Knex, resolve: IdentifierResolver): Knex.Raw<any>;
}
