import Knex, { Raw } from "knex";
import { IdentifierResolver } from "../node";
export declare abstract class Expression {
    abstract compile(knex: Knex, resolve: IdentifierResolver): Raw;
}
