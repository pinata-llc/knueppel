export declare type IdentifierResolver = (name: string, args?: ICompiledQuery[]) => IResolverResult;
export interface IResolverResult {
    queryString: string;
    bindings?: QueryBindings;
    tables?: string[];
}
export declare class QueryBuilder {
    resolve: IdentifierResolver;
    constructor(resolve: IdentifierResolver);
    query(queryString: string, bindings: QueryBindings, tables?: string[] | undefined): Query;
}
declare type SqlBinding = number | string | boolean | Date;
declare type SqlBindings = Array<SqlBinding | SqlBinding[]>;
declare type QueryBindings = Array<Query | SqlBinding | SqlBinding[]>;
interface ICompiledQuery {
    queryString: string;
    bindings: SqlBindings;
    tables?: string[] | undefined;
}
export declare class Query {
    private queryString;
    private bindings;
    private tables?;
    constructor(queryString: string, bindings: QueryBindings, tables?: string[] | undefined);
    compile(): ICompiledQuery;
}
export {};
