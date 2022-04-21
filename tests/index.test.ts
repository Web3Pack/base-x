import fixtures from './fixtures.json';
import { base2, base16, base45, base58 } from '../src';
import { uint8FromHex, uint8ToHex } from '../src/utils';

type Base = () => ReturnType<typeof base2>;
const bases = { base2, base16, base45, base58 } as { [key: string]: Base };

fixtures.valid.forEach((f) => {
    test(`can encode ${f.alphabet}: ${f.hex}`, () => {
        const base = bases[f.alphabet]();
        const actual = base.encode(uint8FromHex(f.hex));

        expect(actual).toBe(f.string);
    });
});

fixtures.valid.forEach((f) => {
    test('can decode ' + f.alphabet + ': ' + f.string, () => {
        const base = bases[f.alphabet]();
        const actual = uint8ToHex(base.decode(f.string));

        expect(actual).toBe(f.hex);
    });
});

fixtures.invalid.forEach((f) => {
    test('decode throws on ' + f.description, () => {
        expect(() => {
            const base = bases[f.alphabet]();
            base.decode(f.string);
        }).toThrow(new RegExp(f.exception));
    });
});

test('decode should return Uint8Array', () => {
    const base = base2();

    expect(base.decode('') instanceof Uint8Array).toBeTruthy();
    expect(base.decode('01') instanceof Uint8Array).toBeTruthy();
});

test('encode not throw on Array or Uint8Array', () => {
    const base = base58();

    expect(base.encode([42, 12, 34])).toBe('F89f');
    expect(base.encode(new Uint8Array([42, 12, 34]))).toBe('F89f');
});
