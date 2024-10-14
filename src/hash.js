import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export function hash(fileName) {
  return new Promise((resolve, reject) => {
    const fullPath = path.resolve(process.cwd(), fileName);
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