import { Injectable } from '@angular/core';
import * as cryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  key = 'gindowa';

  constructor() { }

  encrypt(text) {

    var cipher;
    try {
      cipher = cryptoJS.AES.encrypt(text, this.key);
      return cipher + '';
    } catch (error) {
      alert('encrypt:' + error);
    }
  }

  decrypt(text) {
    var decipher;
    try {
      decipher = cryptoJS.AES.decrypt(text, this.key);
      decipher = decipher.toString(cryptoJS.enc.Utf8);
      return decipher + '';
    } catch (error) {
      alert('decrypt:' + error);
    }
  }


  MD5(text) {
    let key;
    try {
      key = cryptoJS.MD5(text);
      return key + '';
    } catch (error) {
      throw new Error('md5:' + error);
    }
  }
}
