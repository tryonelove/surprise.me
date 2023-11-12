import { z } from 'zod';
import { CreateWishFormField } from './CreateWishFormField';

const validExtensions = ['jpg', 'jpeg', 'png'];

const MAX_FILE_SIZE_MB = 5;

const toMb = (fileSizeInBytes: number): number =>
  Number((fileSizeInBytes / 1024 / 1024).toFixed(4));

export const createWishServerSchema = z.object({
  [CreateWishFormField.Wish]: z.string().min(2, {
    message: 'Wish must be at least 2 characters',
  }),
  [CreateWishFormField.Preview]: z
    .unknown()
    .optional()
    .transform((value) => {
      return value as File | null | undefined;
    })
    .refine(
      (file) => {
        if (!file) {
          return true;
        }

        const fileExtension = file.name.split('.').pop();

        return !!fileExtension && validExtensions.includes(fileExtension);
      },
      { message: `Valid types: ${validExtensions}` },
    )
    .refine(
      (file) => {
        if (!file) {
          return true;
        }

        return toMb(file.size) <= MAX_FILE_SIZE_MB;
      },
      {
        message: `File size must be less than ${MAX_FILE_SIZE_MB}MB`,
      },
    ),
});

export const createWishClientSchema = z.object({
  [CreateWishFormField.Wish]: z.string().min(2, {
    message: 'Wish must be at least 2 characters',
  }),
  [CreateWishFormField.Preview]: z
    .unknown()
    .transform((value) => {
      return value as FileList | null | undefined;
    })
    .transform((value) => value?.item(0))
    .refine(
      (file) => {
        if (!file) {
          return true;
        }

        const fileExtension = file.name.split('.').pop();

        return !!fileExtension && validExtensions.includes(fileExtension);
      },
      { message: `Valid types: ${validExtensions}` },
    )
    .refine(
      (file) => {
        if (!file) {
          return true;
        }

        return toMb(file.size) <= MAX_FILE_SIZE_MB;
      },
      {
        message: `File size must be less than ${MAX_FILE_SIZE_MB}MB`,
      },
    ),
});

export type CreateWishFormValues = z.infer<typeof createWishServerSchema>;
