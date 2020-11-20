/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Dewco (dewco).
 *
 * Dewco (dewco) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dewco (dewco) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dewco (dewco).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

// Apply LZW-compression to a string and return base64 compressed string.
export function zip(s: string) {
  try {
    let dict: {[key: string]: any} = {};
    let data = (s + '').split('');
    let out = [];
    let currChar;
    let phrase = data[0];
    let code = 256;
    for (let i = 1; i < data.length; i++) {
      currChar = data[i];
      if (dict[phrase + currChar] != null) {
        phrase += currChar;
      } else {
        out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
        dict[phrase + currChar] = code;
        code++;
        phrase = currChar;
      }
    }
    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
    for (let j = 0; j < out.length; j++) {
      out[j] = String.fromCharCode(out[j]);
    }
    return utoa(out.join(''));
  } catch (e) {
    console.log('Failed to zip string return empty string', e);
    return '';
  }
}

// Decompress an LZW-encoded base64 string
export function unzip(base64ZippedString: any) {
  try {
    let s = atou(base64ZippedString);
    let dict: {[key: string]: any} = {};
    let data = (s + '').split('');
    let currChar = data[0];
    let oldPhrase = currChar;
    let out = [currChar];
    let code = 256;
    let phrase;
    for (let i = 1; i < data.length; i++) {
      let currCode = data[i].charCodeAt(0);
      if (currCode < 256) {
        phrase = data[i];
      } else {
        phrase = dict[currCode] ? dict[currCode] : oldPhrase + currChar;
      }
      out.push(phrase);
      currChar = phrase.charAt(0);
      dict[code] = oldPhrase + currChar;
      code++;
      oldPhrase = phrase;
    }
    return out.join('');
  } catch (e) {
    console.log('Failed to unzip string return empty string', e);
    return '';
  }
}

// ucs-2 string to base64 encoded ascii
function utoa(str: string|number|boolean) {
  return window.btoa(unescape(encodeURIComponent(str)));
}
// base64 encoded ascii to ucs-2 string
function atou(str: string) {
  return decodeURIComponent(escape(window.atob(str)));
}
