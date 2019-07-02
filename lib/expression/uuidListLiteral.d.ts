import { QueryBuilder } from "../queryBuilder";
import { ListLiteral } from "./listLiteral";
export declare class UUIDListLiteral extends ListLiteral {
    protected values: string[];
    constructor(values: string[]);
    build(qb: QueryBuilder): Promise<import("../queryBuilder").Query>;
}
