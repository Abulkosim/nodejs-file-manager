import { createReadStream, createWriteStream } from 'fs';
import { promises as fs } from 'fs'
import { access } from 'fs/promises';
import path from 'path';

export async function cat(filePath) {
  try {
    if (!filePath) {
      throw new Error('File path is not provided');
    }

    const fullPath = path.resolve(process.cwd(), filePath);

    await access(fullPath);

    return new Promise((resolve, reject) => {
      const readStream = createReadStream(fullPath, { encoding: 'utf8' });

      readStream.on('data', (chunk) => {
        process.stdout.write(chunk);
      });

      readStream.on('end', () => {
        process.stdout.write('\n');
        resolve();
      });

      readStream.on('error', (error) => {
        reject(new Error('Operation failed'));
      });
    });
  } catch (error) {
    throw new Error('Operation failed');
  }
}

export async function add(fileName) {
  try {
    if (!fileName) {
      throw new Error('File name is not provided');
    }

    const fullPath = path.resolve(process.cwd(), fileName);
    await fs.writeFile(fullPath, '');
    console.log(`\x1b[32mFile '${fileName}' created successfully.\x1b[0m`);
  } catch (error) {
    throw new Error('Operation failed');
  }
}

export async function rn(oldName, newName) {
  try {
    if (!oldName || !newName) {
      throw new Error('Invalid input');
    }

    const oldPath = path.resolve(process.cwd(), oldName);
    const newPath = path.resolve(process.cwd(), newName);

    await fs.rename(oldPath, newPath);
    console.log(`\x1b[32mFile '${oldName}' renamed to '${newName}' successfully.\x1b[0m`);
  } catch (error) {
    throw new Error('Operation failed');
  }
}

export async function cp(source, destination) {
  try {
    if (!source || !destination) {
      throw new Error('Invalid input');
    }

    const sourcePath = path.resolve(process.cwd(), source);
    const destinationPath = path.resolve(process.cwd(), destination);

    await fs.access(sourcePath);

    const readStream = createReadStream(sourcePath, { encoding: 'utf8' });
    const writeStream = createWriteStream(destinationPath, { encoding: 'utf8' });

    readStream.pipe(writeStream);

    return new Promise((resolve, reject) => {
      writeStream.on('finish', () => {
        console.log(`\x1b[32mFile '${source}' copied to '${destination}' successfully.\x1b[0m`);
        resolve();
      });

      writeStream.on('error', (error) => {
        reject(new Error('Operation failed'));
      });

      readStream.on('error', (error) => {
        reject(new Error('Operation failed'));
      });
    });
  } catch (error) {
    throw new Error('Operation failed');
  }
}

export async function mv(source, destination) {
  try {
    if (!source || !destination) {
      throw new Error('Invalid input');
    }

    const sourcePath = path.resolve(process.cwd(), source);
    const destinationPath = path.resolve(process.cwd(), destination);

    await fs.access(sourcePath);

    const readStream = createReadStream(sourcePath, { encoding: 'utf8' });
    const writeStream = createWriteStream(destinationPath, { encoding: 'utf8' });

    readStream.pipe(writeStream);

    return new Promise((resolve, reject) => {
      writeStream.on('finish', async () => {
        try {
          await fs.unlink(sourcePath);
          console.log(`\x1b[32mFile '${source}' moved to '${destination}' successfully.\x1b[0m`);
          resolve()
        } catch (error) {
          reject(new Error('Operation failed'));
        }
      })

      writeStream.on('error', (error) => {
        reject(new Error('Operation failed'));
      });

      readStream.on('error', (error) => {
        reject(new Error('Operation failed'));
      });
    });
  } catch (error) {
    throw new Error('Operation failed');
  }
}

export async function rm(fileName) {
  try {
    if (!fileName) {
      throw new Error('Invalid input');
    }

    const fullPath = path.resolve(process.cwd(), fileName);
    await fs.access(fullPath);
    await fs.unlink(fullPath);
    console.log(`\x1b[32mFile '${fileName}' removed successfully.\x1b[0m`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('File not found');
    }
    throw new Error('Operation failed');
  }
}