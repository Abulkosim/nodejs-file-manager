import fs from 'node:fs/promises';
import path from 'path';
import { getFullPath, logError } from './utils.js';

export async function up() {
  const currentDir = process.cwd();
  const parentDir = path.dirname(currentDir);

  if (currentDir !== parentDir) {
    process.chdir(parentDir);
  }
}

export async function cd(targetPath) {
  try {
    const resolvedPath = getFullPath(targetPath);
    await fs.access(resolvedPath);
    process.chdir(resolvedPath);
  } catch (error) {
    logError('Invalid directory');
  }
}

export async function ls() {
  try {
    const files = await fs.readdir(process.cwd(), { withFileTypes: true });

    const sortedFiles = files.sort((a, b) => {
      if (a.isDirectory() === b.isDirectory()) {
        return a.name.localeCompare(b.name);
      }

      return a.isDirectory() ? -1 : 1;
    });

    const typeColumnWidth = 6;
    const nameColumnWidth = 30;

    console.log('\x1b[1m' + 'Type'.padEnd(typeColumnWidth) + 'Name'.padEnd(nameColumnWidth) + '\x1b[0m');
    console.log('-'.repeat(typeColumnWidth + nameColumnWidth));

    for (const file of sortedFiles) {
      const type = file.isDirectory() ? '\x1b[34mDIR\x1b[0m ' : '\x1b[32mFILE \x1b[0m';
      const name = file.name.length > nameColumnWidth - 3
        ? file.name.slice(0, nameColumnWidth - 3) + '...'
        : file.name;
      console.log(type.padEnd(typeColumnWidth) + name.padEnd(nameColumnWidth));
    }

    console.log('-'.repeat(typeColumnWidth + nameColumnWidth));

  } catch (error) {
    logError('Failed to list directory contents');
  }
}