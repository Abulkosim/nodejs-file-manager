import fs from 'fs';
import zlib from 'zlib';
import { promisify } from 'util';

const brotliCompress = promisify(zlib.brotliCompress);
const brotliDecompress = promisify(zlib.brotliDecompress);

export function compress(source, destination) {
  return new Promise((resolve, reject) => {
    if (!source || !destination) {
      reject(new Error('Source and destination are required'));
      return;
    }

    const readStream = fs.createReadStream(source);
    const writeStream = fs.createWriteStream(destination);
    const brotli = zlib.createBrotliCompress();

    readStream
      .pipe(brotli)
      .pipe(writeStream)
      .on('finish', () => {
        console.log(`\x1b[32mFile '${source}' compressed successfully.\x1b[0m`);
        resolve();
      })
      .on('error', (error) => {
        reject(new Error('Operation failed'));
      });

    readStream.on('error', (error) => {
      reject(new Error('Operation failed'));
    });
  });
}

export function decompress(source, destination) {
  return new Promise((resolve, reject) => {
    if (!source || !destination) {
      reject(new Error('Source and destination are required'));
      return;
    }

    const readStream = fs.createReadStream(source);
    const writeStream = fs.createWriteStream(destination);
    const brotli = zlib.createBrotliDecompress();

    readStream
      .pipe(brotli)
      .pipe(writeStream)
      .on('finish', () => {
        console.log(`\x1b[32mFile '${source}' decompressed successfully.\x1b[0m`);
        resolve();
      })
      .on('error', (error) => {
        reject(new Error('Operation failed'));
      });

    readStream.on('error', (error) => {
      reject(new Error('Operation failed'));
    });
  });
}