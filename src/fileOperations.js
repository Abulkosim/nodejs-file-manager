import { createReadStream, createWriteStream } from 'fs';
import { promises as fs } from 'fs'
import { access } from 'fs/promises';
import { getFullPath, logError, logSuccess } from './utils.js';

export async function cat(filePath) {
  try {
    if (!filePath) {
      throw new Error('File path is not provided');
    }

    const fullPath = getFullPath(filePath);

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

    const fullPath = getFullPath(fileName);
    await fs.writeFile(fullPath, '');
    logSuccess(`File '${fileName}' created successfully.`);
  } catch (error) {
    throw new Error('Operation failed');
  }
}

export async function rn(oldName, newName) {
  try {
    if (!oldName || !newName) {
      throw new Error('Invalid input');
    }

    const oldPath = getFullPath(oldName);
    const newPath = getFullPath(newName);

    await fs.rename(oldPath, newPath);
    logSuccess(`File '${oldName}' renamed to '${newName}' successfully.`);
  } catch (error) {
    throw new Error('Operation failed');
  }
}

export async function cp(source, destination) {
  try {
    if (!source || !destination) {
      throw new Error('Invalid input');
    }

    const sourcePath = getFullPath(source);
    const destinationPath = getFullPath(destination);

    await fs.access(sourcePath);

    const readStream = createReadStream(sourcePath, { encoding: 'utf8' });
    const writeStream = createWriteStream(destinationPath, { encoding: 'utf8' });

    readStream.pipe(writeStream);

    return new Promise((resolve, reject) => {
      writeStream.on('finish', () => {
        logSuccess(`File '${source}' copied to '${destination}' successfully.`);
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

    const sourcePath = getFullPath(source);
    const destinationPath = getFullPath(destination);

    await fs.access(sourcePath);

    const readStream = createReadStream(sourcePath, { encoding: 'utf8' });
    const writeStream = createWriteStream(destinationPath, { encoding: 'utf8' });

    readStream.pipe(writeStream);

    return new Promise((resolve, reject) => {
      writeStream.on('finish', async () => {
        try {
          await fs.unlink(sourcePath);
          logSuccess(`File '${source}' moved to '${destination}' successfully.`);
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

    const fullPath = getFullPath(fileName);
    await fs.access(fullPath);
    await fs.unlink(fullPath);
    logSuccess(`File '${fileName}' removed successfully.`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('File not found');
    }
    throw new Error('Operation failed');
  }
}