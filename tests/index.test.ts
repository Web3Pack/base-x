import { greet } from '../src';

describe('greet', () => {
    it('should return Hello name', () => {
        const result = greet('World');
        expect(result).toBe('Hello World');
    });
});
