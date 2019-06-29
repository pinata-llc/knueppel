import { ASTNode, ASTParam } from "zargon";
import { QueryBuilder } from "../queryBuilder";
import { ListLiteral } from "./listLiteral";

@ASTNode
export class UUIDListLiteral extends ListLiteral {
  constructor(@ASTParam("values", true) protected values: string[]) {
    super(values);
  }

  public async compileAsArray(qb: QueryBuilder) {
    if (Array.isArray(this.values) && this.values.length > 0) {
      return qb.query(`array[${this.values.map(() => "?").join(",")}]::uuid[]`, this.values);
    }
    return qb.query("array[]", []);
  }
}
