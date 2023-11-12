'use client';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { DeleteWishFormValues, deleteWishSchema } from './schemas';
import { Button } from '@/components/ui/button';
import { Trash2Icon } from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';
import { deleteWish } from './actions';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Wish } from '@prisma/client';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant='destructive' type='submit' disabled={pending} size='icon'>
      <Trash2Icon />
    </Button>
  );
}

interface DeletedWishFormProps {
  className: string;
  wish: Wish;
}

export function DeleteWishForm({
  className,
  wish: { id: wishId, description: wish },
}: DeletedWishFormProps) {
  const { toast } = useToast();

  const form = useForm<DeleteWishFormValues>({
    resolver: zodResolver(deleteWishSchema),
    defaultValues: {
      id: wishId,
      wish,
    },
  });

  const [state, formAction] = useFormState(deleteWish, undefined);

  useEffect(() => {
    if (state && state.type !== 'none') {
      toast({
        title: state.message,
        variant: state.type === 'failure' ? 'destructive' : 'default',
      });
    }
  }, [state, toast]);

  return (
    <Form {...form}>
      <form className={className} action={formAction}>
        <FormField
          name='id'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='hidden' {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name='dwish'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='hidden' {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <SubmitButton />
      </form>
    </Form>
  );
}
