import { base2, base16, base45, base58 } from '../src';

const text = Buffer.from('Hello World!');

// Base 2 encoding /////////////////////////////////////////////////////////////////////////////////

const base2Converter = base2();
const base2Text = base2Converter.encode(text);
// => 10010000110010101101100011011000110111100100000010101110110111101110010011011000110010000100001

const base2Decoded = base2Converter.decode(base2Text);
const base2DecodedText = Buffer.from(base2Decoded).toString();
// => Hello World!

// Base 16 encoding ////////////////////////////////////////////////////////////////////////////////

const base16Converter = base16();
const base16Text = base16Converter.encode(text);
// => 48656c6c6f20576f726c6421

const base16Decoded = base16Converter.decode(base16Text);
const base16DecodedText = Buffer.from(base16Decoded).toString();
// => Hello World!

// Base 45 encoding ////////////////////////////////////////////////////////////////////////////////

const base45Converter = base45();
const base45Text = base45Converter.encode(text);
// => 1YA*-N2.K2XD+1Y P5

const base45Decoded = base45Converter.decode(base45Text);
const base45DecodedText = Buffer.from(base45Decoded).toString();
// => Hello World!

// Base 58 encoding ////////////////////////////////////////////////////////////////////////////////

const base58Converter = base58();
const base58Text = base58Converter.encode(text);
// => 2NEpo7TZRRrLZSi2U

const base58Decoded = base58Converter.decode(base58Text);
const base58DecodedText = Buffer.from(base58Decoded).toString();
// => Hello World!
