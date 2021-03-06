import { BufferLike, calculateFactor, uint8FromBufferLike } from './utils';

export class BaseConverter {
    /**
     * Base map for encoding.
     */
    private readonly baseMap: Uint8Array;
    private readonly base: number;
    private readonly leader: string;
    private readonly factor: number;
    private readonly iFactor: number;

    constructor(private readonly alphabet: string) {
        // generate constants
        this.base = alphabet.length;
        this.leader = alphabet.charAt(0);
        this.baseMap = this.createBaseMap();
        this.factor = calculateFactor(this.base);
        this.iFactor = calculateFactor(256, this.base);
    }

    /**
     * Encode given buffer-like input.
     */
    encode(buffer: BufferLike): string | never {
        // skip encoding if buffer is empty
        if (buffer.length === 0) return '';

        // convert buffer-like to Uint8Array
        const source = uint8FromBufferLike(buffer);

        // Skip & count leading zeroes.
        let zeroes = 0;
        let length = 0;
        let pbegin = 0;
        const pend = source.length;

        while (pbegin !== pend && source[pbegin] === 0) {
            pbegin++;
            zeroes++;
        }

        // Allocate enough space in big-endian base58 representation.
        const size = ((pend - pbegin) * this.iFactor + 1) >>> 0;
        const b58 = new Uint8Array(size);

        // Process the bytes.
        while (pbegin !== pend) {
            let carry = source[pbegin];

            // Apply "b58 = b58 * 256 + ch".
            let i = 0;
            for (
                let it1 = size - 1;
                (carry !== 0 || i < length) && it1 !== -1;
                it1--, i++
            ) {
                carry += (256 * b58[it1]) >>> 0;
                b58[it1] = carry % this.base >>> 0;
                carry = (carry / this.base) >>> 0;
            }

            if (carry !== 0) throw new Error('Non-zero carry');
            length = i;
            pbegin++;
        }

        // Skip leading zeroes in base58 result.
        let it2 = size - length;
        while (it2 !== size && b58[it2] === 0) {
            it2++;
        }

        // Translate the result into a string.
        let str = this.leader.repeat(zeroes);
        for (; it2 < size; ++it2) str += this.alphabet.charAt(b58[it2]);

        return str;
    }

    /**
     * Decode given string.
     */
    decode(source: string): Uint8Array | never {
        // skip decoding if source is empty
        if (source.length === 0) return new Uint8Array();

        let psz = 0;

        // Skip and count leading '1's.
        let zeroes = 0;
        let length = 0;
        while (source[psz] === this.leader) {
            zeroes++;
            psz++;
        }

        // Allocate enough space in big-endian base256 representation.
        const size = ((source.length - psz) * this.factor + 1) >>> 0; // log(58) / log(256), rounded up.
        const b256 = new Uint8Array(size);

        // Process the characters.
        while (source[psz]) {
            // Decode character
            let carry = this.baseMap[source.charCodeAt(psz)];

            // Invalid character
            if (carry === 255) {
                throw new Error('Non-base' + this.base + ' character');
            }

            let i = 0;
            for (
                let it3 = size - 1;
                (carry !== 0 || i < length) && it3 !== -1;
                it3--, i++
            ) {
                carry += (this.base * b256[it3]) >>> 0;
                b256[it3] = carry % 256 >>> 0;
                carry = (carry / 256) >>> 0;
            }

            // fail if carry is not zero
            if (carry !== 0) {
                throw new Error('Non-zero carry');
            }

            length = i;
            psz++;
        }

        // Skip leading zeroes in b256.
        let it4 = size - length;
        while (it4 !== size && b256[it4] === 0) {
            it4++;
        }

        const vch = new Uint8Array(zeroes + (size - it4));

        let j = zeroes;
        while (it4 !== size) {
            vch[j++] = b256[it4++];
        }

        return vch;
    }

    /**
     * Create base map from given alphabet string.
     */
    private createBaseMap(): Uint8Array {
        // define empty base map blueprint
        const baseMap = new Uint8Array(256).fill(255);

        // iterate over alphabet and create base map
        [...this.alphabet].forEach((char, i) => {
            baseMap[char.charCodeAt(0)] = i;
        });

        return baseMap;
    }
}
