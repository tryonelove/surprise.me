'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { deleteWishSchema } from './schemas';
import { MessageActionResult } from '@/lib/types';
import { DeleteWishFormField } from './DeleteWishFormField';

export async function deleteWish(
  _: unknown,
  formData: FormData,
): Promise<MessageActionResult> {
  const data = deleteWishSchema.parse({
    id: formData.get(DeleteWishFormField.Id),
    wish: formData.get(DeleteWishFormField.Wish),
  });

  try {
    await prisma.wish.delete({
      where: {
        id: data.id,
      },
    });

    revalidatePath('/ideas');

    return {
      type: 'success',
      message: `${data.wish} has been deleted :(`,
    };
  } catch (e) {
    console.error(e);

    return {
      type: 'failure',
      message: `Failed to delete ${data.wish}: ${e}`,
    };
  }
}
