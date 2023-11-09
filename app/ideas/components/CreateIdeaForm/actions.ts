'use server';
import {
  IMAGES_BUCKET_NAME,
  uploadFileToBucketAsync,
} from '@/lib/google-cloud';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { CreateIdeaFormField } from './CreateIdeaFormField';
import { createIdeaServerSchema } from './schemas';
import { ActionResult } from '@/lib/types';

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

export async function createIdea(
  _: unknown,
  formData: FormData,
): Promise<ActionResult> {
  console.log(formData);

  const values = createIdeaServerSchema.parse({
    idea: formData.get(CreateIdeaFormField.Idea),
    preview: formData.get(CreateIdeaFormField.Preview),
  });

  const image = await uploadFileAsync(values.preview as File | undefined);

  console.log(`Creating image: ${image}`);

  try {
    console.log(`Adding gift to database: ${values.idea}`);

    await prisma.gift.create({
      data: {
        description: values.idea,
        imageUrl: image?.publicUrl(),
      },
    });

    console.log(`Added gift to database: ${values.idea}`);

    revalidatePath('/ideas');

    return {
      type: 'success',
      message: `Added gift ${values.idea}`,
    };
  } catch (e) {
    console.log(e);

    return {
      type: 'failure',
      message: `Failed to create gift: ${e}`,
    };
  }
}
