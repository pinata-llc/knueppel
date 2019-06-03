import { KnueppelError } from "./index";
export declare class UnknownNodeType extends KnueppelError {
    nodeType: string;
    constructor(nodeType: string);
}
