type Hex = string;

/**
 * Validate given hex string.
 */
export const validateHex = (hex: Hex): void | never => {
    if (hex.length % 2 !== 0) {
        throw new Error('Invalid hex string');
    }
};

/**
 * Convert a Uint8Array to a hex string.
 */
export const uint8ToHex = (uint8: Uint8Array): Hex =>
    Array.from(uint8).reduce(
        (acc, curr) => `${acc}${curr.toString(16).padStart(2, '0')}`,
        ''
    );

/**
 * Convert a hex string to a Uint8Array.
 */
export const uint8FromHex = (hex: Hex): Uint8Array | never => {
    // return zero length array if empty string
    if (!hex.length) return new Uint8Array(0);

    validateHex(hex);

    return new Uint8Array(
        (hex.match(/.{1,2}/g) ?? []).map((byte) => parseInt(byte, 16))
    );
};
