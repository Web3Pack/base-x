// base-x encoding / decoding
// Copyright (c) 2018 base-x contributors
// Copyright (c) 2014-2018 The Bitcoin Core developers (base58.cpp)
// Distributed under the MIT software license, see the accompanying
// file LICENSE or http://www.opensource.org/licenses/mit-license.php.

import { BaseConverter } from './base';

export * from './base';

export const base = (alphabet: string): BaseConverter =>
    new BaseConverter(alphabet);
