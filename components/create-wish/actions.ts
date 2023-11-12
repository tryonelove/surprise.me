'use server';
import {
  IMAGES_BUCKET_NAME,
  uploadFileToBucketAsync,
} from '@/lib/google-cloud';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { CreateWishFormField } from './CreateWishFormField';
import { createWishServerSchema } from './schemas';
import { ActionResult, MessageActionResult } from '@/lib/types';

async function uploadFileAsync(preview: File | undefined) {
  if (!preview) {
    console.log('No preview to upload');

    return;
  }

  console.log(`Uploading ${preview.name} to ${IMAGES_BUCKET_NAME}`);

  try {
    const uploadedFile = await uploadFileToBucketAsync(
      preview,
      IMAGES_BUCKET_NAME,
    );

    console.log(`Uploaded ${uploadedFile.name} to ${IMAGES_BUCKET_NAME}`);

    return uploadedFile;
  } catch (e) {
    console.log(e);
  }
}

export async function createWish(
  _: unknown,
  formData: FormData,
): Promise<MessageActionResult> {
  console.log('Creating wish');

  const values = createWishServerSchema.parse({
    idea: formData.get(CreateWishFormField.Wish),
    preview: formData.get(CreateWishFormField.Preview),
  });

  const image = await uploadFileAsync(values.preview as File | undefined);

  try {
    console.log(`Adding wish to database: ${values.wish}`);

    await prisma.wish.create({
      data: {
        description: values.wish,
        imageUrl: image?.publicUrl(),
      },
    });

    console.log(`Added wish to database: ${values.wish}`);

    revalidatePath('/wishlist');

    return {
      type: 'success',
      message: `Added wish ${values.wish}`,
    };
  } catch (e) {
    console.log(e);

    return {
      type: 'failure',
      message: `Failed to create wish: ${e}`,
    };
  }
}
