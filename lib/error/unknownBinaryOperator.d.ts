import { KnueppelError } from "./index";
export declare class UnknownBinaryOperator extends KnueppelError {
    operator: string;
    constructor(operator: string);
}
