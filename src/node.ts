import Knex, { Raw } from "knex";
import { Expression } from "./expression/expression";

export type IdentifierResolver = (name: string, args: Array<string | number | Expression>) => Raw;

export abstract class Node<E = void> {
  public abstract compile(knex: Knex, resolve: IdentifierResolver): Raw;
}
