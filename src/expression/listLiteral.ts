import { ASTNode, ASTParam } from "zargon";
import { QueryBuilder } from "../queryBuilder";
import { Expression } from "./expression";

@ASTNode
export class ListLiteral extends Expression {
  constructor(@ASTParam("values", true) protected values: string[] | number[] | boolean[]) {
    super();
  }

  public async build(qb: QueryBuilder) {
    if (Array.isArray(this.values) && this.values.length > 0) {
      const type = typeof this.values[0];
      let arrayType = "";

      if (type === "boolean") {
        arrayType = "::boolean[]";
      } else if (type === "string") {
        arrayType = "::text[]";
      } else if (type === "number") {
        // TODO: handle decimals
        arrayType = "::int[]";
      }
      const marks: unknown[] = this.values;
      return qb.query(`array[${marks.map(() => "?").join(",")}]${arrayType}`, this.values);
    }
    return qb.query("'{}'", []);
  }

  public async buildAsList(qb: QueryBuilder) {
    const marks: unknown[] = this.values;
    if (!Array.isArray(marks) || marks.length === 0) {
      return qb.query("(null)", []);
    }
    return qb.query(`(${marks.map(() => "?").join(",")})`, this.values);
  }
}
