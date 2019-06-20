import { KnueppelError } from "./index";
export declare class UnknownIntervalUnit extends KnueppelError {
    unit: string;
    constructor(unit: string);
}
