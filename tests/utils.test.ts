import {
    uint8FromBufferLike,
    uint8FromBufferView,
    uint8FromNumbers,
} from '../src/utils';

describe('utils', () => {
    it('should convert a number array to a Uint8Array', () => {
        const numbers = [1, 2, 3];
        const u8a = uint8FromNumbers(numbers);
        expect(u8a).toEqual(new Uint8Array([1, 2, 3]));
    });

    it('should convert an ArrayBufferView to a Uint8Array', () => {
        const view = new Uint8Array([1, 2, 3]);
        const u8a = uint8FromBufferView(view);
        expect(u8a).toEqual(new Uint8Array([1, 2, 3]));
    });

    it('should convert a BufferLike object to a Uint8Array', () => {
        const buffer = new Uint8Array([1, 2, 3]);
        const u8a = uint8FromBufferLike(buffer);
        expect(u8a).toEqual(new Uint8Array([1, 2, 3]));
    });
});
