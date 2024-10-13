import fs from 'node:fs/promises';
import path from 'path';

export async function up() {
  const currentDir = process.cwd();
  const parentDir = path.dirname(currentDir);

  if (currentDir !== parentDir) {
    process.chdir(parentDir);
  }
}

export async function cd(targetPath) {
  try {
    const resolvedPath = path.resolve(process.cwd(), targetPath);
    await fs.access(resolvedPath);
    process.chdir(resolvedPath);
  } catch (error) {
    throw new Error('Invalid directory');
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
    })

    console.log('Types\tName');
    for (const file of sortedFiles) {
      console.log(`${file.isDirectory() ? 'DIR' : 'FILE'}\t${file.name}`);
    }
  } catch (error) {
    throw new Error('Failed to list directory contents');
  }
}