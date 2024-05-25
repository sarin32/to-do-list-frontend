'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {useState} from 'react';
import {taskService} from '@/api/task.service';
import {PlusIcon} from 'lucide-react';
import {useToast} from '@/components/ui/use-toast';

const formSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, {message: 'Task must be at least 1 characters.'})
    .max(300, {message: 'Password can not be more than 300 characters.'}),
});

export function CreateTask({onCreate}:{onCreate?:()=>void}) {
  const [isLoading, setIsLoading] = useState(false);
  const {toast} = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const response = await taskService.createTask({
      title: values.title,
    });
    setIsLoading(false);

    if (!response.ok) {
      form.setError('root', {
        message: response.data.message || 'Something went wrong',
      });
      return;
    }

    onCreate && onCreate()
    form.reset();
    toast({title: 'Task created successfully'});
  }

  return (
    <div className="max-w-screen-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex items-end flex-wrap">
            <FormField
              control={form.control}
              name="title"
              render={({field}) => (
                <FormItem className="flex-grow">
                  <FormLabel>New Task</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Task" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant={'default'}
              type="submit"
              loading={isLoading}
              className="ml-2"
            >
              <PlusIcon />
            </Button>
          </div>
          {form.formState.errors.root && (
            <p className="text-[0.8rem] font-medium text-destructive">
              {form.formState.errors.root.message}
            </p>
          )}
        </form>
      </Form>
    </div>
  );
}
