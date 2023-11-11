'use client';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { DeleteIdeaFormValues, deleteIdeaSchema } from './schemas';
import { Button } from '@/components/ui/button';
import { Trash2Icon } from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';
import { deleteIdea } from './actions';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Gift } from '@prisma/client';
import { ActionResult } from '@/lib/types';

const initialState: ActionResult = {
  type: 'none',
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant='destructive' type='submit' disabled={pending} size='icon'>
      <Trash2Icon />
    </Button>
  );
}

interface DeleteIdeaFormProps {
  className: string;
  ideaId: Gift['id'];
  idea: Gift['description'];
}

export function DeleteIdeaForm({
  className,
  ideaId,
  idea,
}: DeleteIdeaFormProps) {
  const { toast } = useToast();

  const form = useForm<DeleteIdeaFormValues>({
    resolver: zodResolver(deleteIdeaSchema),
    defaultValues: {
      id: ideaId,
      idea,
    },
  });

  const [state, formAction] = useFormState<ActionResult, FormData>(
    deleteIdea,
    initialState,
  );

  useEffect(() => {
    if (state.type !== 'none') {
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
          name='idea'
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
