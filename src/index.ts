// base-x encoding / decoding
// Copyright (c) 2018 base-x contributors
// Copyright (c) 2014-2018 The Bitcoin Core developers (base58.cpp)
// Distributed under the MIT software license, see the accompanying
// file LICENSE or http://www.opensource.org/licenses/mit-license.php.

import * as alphabets from './alphabet';
import { BaseConverter } from './base';

export const base2 = () => new BaseConverter(alphabets.BASE2);

export const base16 = () => new BaseConverter(alphabets.BASE16);

export const base45 = () => new BaseConverter(alphabets.BASE45);

export const base58 = () => new BaseConverter(alphabets.BASE58);
