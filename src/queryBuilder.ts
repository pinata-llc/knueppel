import { Expression } from "./expression/expression";

export type IdentifierResolver = (name: string, args: Array<string | number | Expression>) => Promise<Query>;

export class QueryBuilder {
  constructor(public resolve: IdentifierResolver) {}

  public query(queryString: string, bindings: QueryBindings): Query {
    return new Query(queryString, bindings);
  }
}

type SqlBinding = number | string | boolean | Date;
type SqlBindings = Array<SqlBinding | SqlBinding[]>;
type QueryBindings = Array<Query | SqlBinding | SqlBinding[]>;

const qmark = /\?/g;

export class Query {
  constructor(public queryString: string, public bindings: QueryBindings) {}

  public compile(): { queryString: string; bindings: SqlBindings } {
    let cnt = 0;
    let compiledBindings: SqlBindings = [];
    const compiledQueryString = this.queryString.replace(qmark, () => {
      const binding = this.bindings[cnt];
      cnt += 1;
      if (binding instanceof Query) {
        const query = binding.compile();
        compiledBindings = compiledBindings.concat(query.bindings);
        return query.queryString;
      } else {
        compiledBindings.push(binding as SqlBinding);
        return "?";
      }
    });

    return {
      bindings: compiledBindings,
      queryString: compiledQueryString,
    };
  }
}
