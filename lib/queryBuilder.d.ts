import { Expression } from "./expression/expression";
export declare type IdentifierResolver = (name: string, args: Array<string | number | Expression>) => Promise<Query>;
export declare class QueryBuilder {
    resolve: IdentifierResolver;
    constructor(resolve: IdentifierResolver);
    query(queryString: string, bindings: QueryBindings): Query;
}
declare type SqlBinding = number | string | boolean | Date;
declare type SqlBindings = Array<SqlBinding | SqlBinding[]>;
declare type QueryBindings = Array<Query | SqlBinding | SqlBinding[]>;
export declare class Query {
    queryString: string;
    bindings: QueryBindings;
    constructor(queryString: string, bindings: QueryBindings);
    compile(): {
        queryString: string;
        bindings: SqlBindings;
    };
}
export {};
