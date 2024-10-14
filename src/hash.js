import crypto from 'crypto';
import fs from 'fs';
import { getFullPath } from './utils.js';

export function hash(fileName) {
  return new Promise((resolve, reject) => {
    const fullPath = getFullPath(fileName);
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(fullPath);

    stream.on('data', (chunk) => {
      hash.update(chunk);
    });

    stream.on('end', () => {
      const hashValue = hash.digest('hex');
      console.log(`Hash of ${fileName}: ${hashValue}`);
      resolve(hashValue);
    });

    stream.on('error', (error) => {
      reject('Operation failed');
    });
  });
}