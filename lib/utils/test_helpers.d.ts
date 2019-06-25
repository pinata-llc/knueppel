import Knex from "knex";
import { Query, QueryBuilder } from "../queryBuilder";
export declare const knex: Knex<any, unknown[]>;
export declare function getMockResolver(identifierConfig: any): (name: string) => any;
export declare const queryBuilder: QueryBuilder;
export declare function toSql(query: Query): string;
