import { uint8FromHex, uint8ToHex } from '../src/utils';
import { base as basex, BaseConverter } from '../src';
import fixtures from './fixtures.json';

const bases = Object.entries(fixtures.alphabets).reduce(
    (all, [name, alphabet]) => ({ ...all, [name]: basex(alphabet) }),
    {} as { [name: string]: BaseConverter }
);

fixtures.valid.forEach((f) => {
    test('can encode ' + f.alphabet + ': ' + f.hex, () => {
        var base = bases[f.alphabet];
        var actual = base.encode(uint8FromHex(f.hex));

        expect(actual).toBe(f.string);
    });
});

fixtures.valid.forEach((f) => {
    test('can decode ' + f.alphabet + ': ' + f.string, () => {
        var base = bases[f.alphabet];
        var actual = uint8ToHex(base.decode(f.string));

        expect(actual).toBe(f.hex);
    });
});

fixtures.invalid.forEach((f) => {
    test('decode throws on ' + f.description, () => {
        let base = bases[f.alphabet];

        expect(() => {
            if (!base) base = basex(f.alphabet);

            base.decode(f.string);
        }).toThrow(new RegExp(f.exception));
    });
});

test('decode should return Uint8Array', () => {
    const base = bases.base2;

    expect(base.decode('') instanceof Uint8Array).toBeTruthy();
    expect(base.decode('01') instanceof Uint8Array).toBeTruthy();
});

test('encode throws on string', () => {
    const base = bases.base58;

    expect(() => base.encode('a' as any)).toThrow(/^Expected Uint8Array$/);
});

test('encode not throw on Array or Uint8Array', () => {
    const base = bases.base58;

    expect(base.encode([42, 12, 34])).toBe('F89f');
    expect(base.encode(new Uint8Array([42, 12, 34]))).toBe('F89f');
});
