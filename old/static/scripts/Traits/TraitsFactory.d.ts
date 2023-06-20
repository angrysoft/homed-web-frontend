import { Trait } from "./Trait.js";
export { TraitsFactory };
declare class TraitsFactory {
    static getTrait(traitName: string): Trait | undefined;
}
