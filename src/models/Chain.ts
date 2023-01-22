import { Domain } from "../utils/Types";


export class Chain {
    static readonly ALL = new Chain(-1, '', 'All Blockchains');
    static readonly UNSUPPORT = new Chain(-1000, '', '');

    static bless(data: ChainJSON): Chain {
        return new Chain(
            data.id,
            data.identifier,
            data.name,
            data.explorer,
            data.testnet
        );
    }

    constructor(
        readonly id: number,
        readonly identifier: string,
        readonly name: string,
        readonly explorer?: string,
        readonly testnet?: boolean
    ) {
    }

    get displayName(): string {
        return `${this.name.slice(0, 1).toUpperCase()}${this.name.slice(1)}`
    }
    
    valid(domain: Domain): boolean {
        if (Chain.UNSUPPORT === this || domain === 'allnets') {
            return true
        }
        if (domain === 'mainnet' && !this.testnet) {
            return true
        }
        if (domain === 'testnets' && !!this.testnet) {
            return true
        }
        return false
    }
}

export interface ChainJSON {
    readonly id: number;
    readonly identifier: string;
    readonly name: string;
    readonly explorer?: string;
    readonly testnet?: boolean;
}
