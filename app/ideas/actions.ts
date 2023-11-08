"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createIdeaSchema, deleteIdeaSchema } from "./schemas";

export type ActionResult =
  | { type: "none" }
  | { type: "success"; message: string }
  | { type: "failure"; message: string };

export async function createIdea(
  prevState: unknown,
  formData: FormData,
): Promise<ActionResult> {
  const values = createIdeaSchema.parse({
    idea: formData.get("idea"),
    preview: formData.get("preview"),
  });

  try {
    await prisma.gift.create({
      data: {
        description: values.idea,
        imageUrl: values.preview,
      },
    });

    revalidatePath("/ideas");

    return {
      type: "success",
      message: `Added gift ${values.idea}`,
    };
  } catch (e) {
    console.log(e);

    return {
      type: "failure",
      message: `Failed to create gift: ${e}`,
    };
  }
}

export async function deleteIdea(
  prevState: unknown,
  formData: FormData,
): Promise<ActionResult> {
  console.log(formData);

  const data = deleteIdeaSchema.parse({
    id: formData.get("id"),
    idea: formData.get("idea"),
  });

  try {
    await prisma.gift.delete({
      where: {
        id: data.id,
      },
    });

    revalidatePath("/ideas");

    return {
      type: "success",
      message: `${data.idea} has been deleted :(`,
    };
  } catch (e) {
    console.log(e);

    return {
      type: "failure",
      message: `Failed to delete ${data.idea}: ${e}`,
    };
  }
}
