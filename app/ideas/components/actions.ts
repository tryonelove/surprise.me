'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { deleteIdeaSchema } from './schemas';
import { ActionResult } from '@/lib/types';

export async function deleteIdea(
  _: unknown,
  formData: FormData,
): Promise<ActionResult> {
  const data = deleteIdeaSchema.parse({
    id: formData.get('id'),
    idea: formData.get('idea'),
  });

  try {
    await prisma.gift.delete({
      where: {
        id: data.id,
      },
    });

    revalidatePath('/ideas');

    return {
      type: 'success',
      message: `${data.idea} has been deleted :(`,
    };
  } catch (e) {
    console.log(e);

    return {
      type: 'failure',
      message: `Failed to delete ${data.idea}: ${e}`,
    };
  }
}
