import Knex, { RawBinding } from "knex";
import { Query, QueryBuilder } from "../queryBuilder";

export const knex = Knex({ client: "pg" });

export function getMockResolver(identifierConfig: any) {
  return async (name: string) => Promise.resolve(identifierConfig[name]);
}

const mockIdentifierResolver = getMockResolver({ test: { queryString: "t.test" } });

export const queryBuilder = new QueryBuilder(mockIdentifierResolver);

export function toSql(query: Query) {
  const compiledQuery = query.compile();
  return knex.raw(compiledQuery.queryString, compiledQuery.bindings as RawBinding[]).toString();
}
