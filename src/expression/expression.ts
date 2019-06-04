import Knex, { Raw } from "knex";
import { IdentifierResolver } from "../node";

export abstract class Expression {
  public abstract compile(knex: Knex, resolve: IdentifierResolver): Raw;
}
