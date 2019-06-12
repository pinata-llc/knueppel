import Knex, { RawBinding } from "knex";
import { Query, QueryBuilder } from "../queryBuilder";

const knex = Knex({ client: "pg" });
const mockIdentifierResolver = async (name: string) => ({ queryString: name });

export const queryBuilder = new QueryBuilder(mockIdentifierResolver);

export function toSql(query: Query) {
  const compiledQuery = query.compile();
  return knex.raw(compiledQuery.queryString, compiledQuery.bindings as RawBinding[]).toString();
}
