/**
 * Alias for all buffer like types.
 */
export type BufferLike = Uint8Array | number[];

/**
 * Convert a number array to a Uint8Array.
 */
export const uint8FromNumbers = (numbers: number[]): Uint8Array =>
    Uint8Array.from(numbers);

/**
 * Convert an ArrayBufferView to a Uint8Array.
 */
export const uint8FromBufferView = (view: ArrayBufferView): Uint8Array =>
    new Uint8Array(view.buffer, view.byteOffset, view.byteLength);

/**
 * Convert a BufferLike object to a Uint8Array.
 */
export const uint8FromBufferLike = (buffer: BufferLike): Uint8Array | never => {
    // return buffer as-is if it is already a Uint8Array
    if (buffer instanceof Uint8Array) return buffer;

    // convert array of numbers to Uint8Array and return
    if (Array.isArray(buffer)) return uint8FromNumbers(buffer);

    // convert ArrayBufferView to Uint8Array and return
    if (ArrayBuffer.isView(buffer)) return uint8FromBufferView(buffer);

    // throw error if buffer is not a BufferLike
    throw new TypeError('Expected Uint8Array');
};
