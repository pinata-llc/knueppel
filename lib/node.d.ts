import Knex, { Raw } from "knex";
import { Expression } from "./expression/expression";
export declare type IdentifierResolver = (name: string, args: Array<string | number | Expression>) => Raw;
export declare abstract class Node<E = void> {
    abstract compile(knex: Knex, resolve: IdentifierResolver): Raw;
}
