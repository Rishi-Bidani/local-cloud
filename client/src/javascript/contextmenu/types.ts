type ContextOptionName = string;

abstract class ContextOption {
    name: ContextOptionName;
    constructor(name: ContextOptionName) {
        this.name = name;
    }

    abstract execute(): void;
}

export { ContextOption };
export type { ContextOptionName };
