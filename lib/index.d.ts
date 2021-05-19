import { IdentifierResolver, Query, QueryBuilder } from "./queryBuilder";
export { Query, QueryBuilder };
import * as Expressions from "./expression";
export declare const Expression: typeof Expressions;
export declare function buildQuery(jsonAst: any, resolve: IdentifierResolver): any;
export declare function compileQuery(jsonAst: any, resolve: IdentifierResolver): Promise<any>;
