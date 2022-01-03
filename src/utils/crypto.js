crypto = require('crypto')

const algorithm = "aes-256-cbc"; 

// generate 16 bytes of random data
const initVector = crypto.randomBytes(16);

// protected data
const message = "This is a secret message";

// secret key generate 32 bytes of random data
const Securitykey = "kjdqqfnsawwqqwwqqertiyiasaqwwqwe";


const encrypt = async (req, res) => {
    const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
    const encrypted = Buffer.concat([cipher.update(message), cipher.final()]);

    let encryptedData = encrypted.toString('hex')
    return res.status(200).json({ data: encryptedData, status: 'success' });

}


const decrypt = hash => {
    const decipher = crypto.createDecipheriv(algorithm, Securitykey, Buffer.from(initVector, 'hex'));

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()]);

    return decrpyted.toString();

    // const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
    // let decryptedData = decipher.update(hash, "hex", "utf-8");
    // return decryptedData += decipher.final("utf8");
};

let letters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  
  const dencrypt = str => {
    let arr = str.split('');
    let result = '';
    arr.forEach(el => {
      let replace;
      if (checkStr(el)) {
        replace = letters[parseInt(el)];
      } else {
        replace = letters.indexOf(el);
      }
      result += replace;
    });
    return result;
  };
  
  const checkStr = str => {
    let num = parseFloat(str);
    if (num || num === 0) return true;
    else return false;
  };

module.exports = {
    encrypt,
    decrypt,
    dencrypt,

  };