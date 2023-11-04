'use client';
import { Button } from '@/components/ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import { ActionResult, createIdea } from './actions';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { CreateIdeaFormValues, createIdeaSchema } from './schemas';

const initialState: ActionResult = {
  type: 'none',
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' disabled={pending}>
      {pending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
      {pending ? 'Loading...' : 'Add'}
    </Button>
  );
}

export default function CreateIdeaForm() {
  const { toast } = useToast();

  const form = useForm<CreateIdeaFormValues>({
    resolver: zodResolver(createIdeaSchema),
    defaultValues: {
      idea: '',
    },
  });

  const [state, formAction] = useFormState<ActionResult, FormData>(
    createIdea,
    initialState
  );

  useEffect(() => {
    if (state.type !== 'none') {
      toast({ title: state.message });
    }
  }, [state, toast]);

  const action = async (data: FormData) => {
    const isValid = await form.trigger();
    if (isValid) {
      formAction(data);
    }
  };

  return (
    <Form {...form}>
      <form className='flex flex-col gap-3' action={action}>
        <FormField
          name='idea'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Idea</FormLabel>
              <FormControl>
                <Input placeholder='Your awesome idea...' {...field} />
              </FormControl>
              <FormDescription>
                Here you can enter your craziest ideas
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton />
      </form>
    </Form>
  );
}
