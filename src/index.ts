import { build } from "zargon";
import { IdentifierResolver, Query, QueryBuilder } from "./queryBuilder";

export { Query, QueryBuilder };

import * as Expressions from "./expression";
export const Expression = Expressions;

export function buildQuery(jsonAst: any, resolve: IdentifierResolver) {
  const ast = build(jsonAst);
  const qb = new QueryBuilder(resolve);
  return ast.build(qb);
}

export async function compileQuery(jsonAst: any, resolve: IdentifierResolver) {
  const query = await buildQuery(jsonAst, resolve);
  return query.compile();
}
