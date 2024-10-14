import path from 'path';

export function getFullPath(fileName) {
  return path.resolve(process.cwd(), fileName);
}

export function logSuccess(message) {
  console.log(`\x1b[32m${message}\x1b[0m`);
}

export function logError(message) {
  console.log(`\x1b[31m${message}\x1b[0m`);
}