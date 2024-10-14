import fs from 'fs';
import zlib from 'zlib';
import { logSuccess, logError } from './utils.js';

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
        logSuccess(`File '${source}' compressed successfully.`);
        resolve();
      })
      .on('error', (error) => {
        reject(new Error('Operation failed'));
      });

    readStream.on('error', (error) => {
      logError('Operation failed');
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
        logSuccess(`File '${source}' decompressed successfully.`);
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