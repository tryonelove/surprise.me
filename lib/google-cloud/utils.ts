import { PassThrough } from 'stream';
import { storage } from './google-cloud';
import { File as GcsFile } from '@google-cloud/storage';

export async function uploadFileToBucketAsync(file: File, bucketName: string) {
  return new Promise<GcsFile>(async (resolve, reject) => {
    const imageBuffer = await file.arrayBuffer();

    const fileToUpload = storage.bucket(bucketName).file(file.name);

    const stream = new PassThrough();
    stream.write(Buffer.from(imageBuffer));
    stream.end();

    stream
      .pipe(fileToUpload.createWriteStream())
      .on('finish', () => resolve(fileToUpload))
      .on('error', (e) => reject(e));
  });
}
