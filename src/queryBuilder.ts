import { Expression } from "./expression/expression";

export type IdentifierResolver = (name: string, args?: Expression[]) => Promise<IResolverResult>;

export interface IResolverResult {
  queryString: string;
  bindings?: QueryBindings;
  tables?: string[];
}

export class QueryBuilder {
  constructor(public resolve: IdentifierResolver) {}

  public query(queryString: string, bindings: QueryBindings, tables?: string[] | undefined): Query {
    return new Query(queryString, bindings, tables);
  }
}

type SqlBinding = number | string | boolean | Date;
type SqlBindings = Array<SqlBinding | SqlBinding[]>;
type QueryBindings = Array<Query | SqlBinding | SqlBinding[]>;

const qmark = /\?/g;

export class Query {
  constructor(private queryString: string, private bindings: QueryBindings, private tables?: string[] | undefined) {}

  public compile(): { queryString: string; bindings: SqlBindings; tables?: string[] | undefined } {
    let cnt = 0;
    let compiledBindings: SqlBindings = [];
    let compiledTables: string[] | undefined;
    const compiledQueryString = this.queryString.replace(qmark, () => {
      const binding = this.bindings[cnt];
      cnt += 1;
      if (binding instanceof Query) {
        const query = binding.compile();
        compiledBindings = compiledBindings.concat(query.bindings);
        if (query.tables) {
          compiledTables = compiledTables ? compiledTables.concat(query.tables) : query.tables;
        }
        return query.queryString;
      } else {
        compiledBindings.push(binding as SqlBinding);
        return "?";
      }
    });

    if (this.tables) {
      if (compiledTables) {
        compiledTables = Array.from(new Set(compiledTables.concat(this.tables)));
      }
      compiledTables = this.tables;
    }

    return {
      bindings: compiledBindings,
      queryString: compiledQueryString,
      tables: compiledTables,
    };
  }
}
