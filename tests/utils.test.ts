import { uint8FromBufferLike } from '../src/utils';

describe('utils', () => {
    it('should convert a number array to a Uint8Array', () => {
        const numbers = [1, 2, 3];
        const uint8 = uint8FromBufferLike(numbers);
        expect(uint8).toEqual(new Uint8Array([1, 2, 3]));
    });

    it('should convert a BufferLike object to a Uint8Array', () => {
        const bufferLike = new Uint8Array([1, 2, 3]);
        const uint8 = uint8FromBufferLike(bufferLike);
        expect(uint8).toEqual(new Uint8Array([1, 2, 3]));
    });
});
