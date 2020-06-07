import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';

import IStorageProvidre from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvidre {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tempFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      fs.promises.stat(filePath);
    } catch {
      return;
    }

    fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
