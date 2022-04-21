/**
 * Alias for all buffer like types.
 */
export type BufferLike = Uint8Array | number[];

/**
 * Calculate factoriel of n.
 */
export const calculateFactor = (x: number, y = 256) =>
    Math.log(x) / Math.log(y);

/**
 * Convert a Uint8Array to a hex string.
 *
 * Same as below:
 *  const buffer = Buffer.from('0x010203040506', 'hex');
 */
export const uint8ToHex = (uint8: Uint8Array): string =>
    Array.from(uint8).reduce(
        (acc, curr) => acc + curr.toString(16).padStart(2, '0'),
        ''
    );

/**
 * Convert a hex string to a Uint8Array.
 *
 * Same as below:
 *  const hexString = Buffer.from(uint8array).toString('hex');
 */
export const uint8FromHex = (hex: string): Uint8Array | never => {
    // return zero length array if empty string
    if (!hex.length) return new Uint8Array(0);

    return new Uint8Array(
        (hex.match(/.{1,2}/g) ?? []).map((byte) => parseInt(byte, 16))
    );
};

/**
 * Convert a BufferLike object to a Uint8Array.
 */
export const uint8FromBufferLike = (buffer: BufferLike): Uint8Array =>
    buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
