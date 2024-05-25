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
import {SquarePen} from 'lucide-react';
import {TaskData, taskService} from '@/api/task.service';
import {useToast} from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const formSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, {message: 'Task must be at least 1 characters.'})
    .max(300, {message: 'Password can not be more than 300 characters.'}),
});

export function EditTask({
  task,
  taskUpdated,
}: {
  task: TaskData;
  taskUpdated?: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {toast} = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task.title,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (task.title === values.title) {
      form.setError('title', {message: 'Please provide an updated value'});
      return;
    }

    setIsLoading(true);
    const response = await taskService.updateTask({
      taskId: task._id,
      title: values.title,
    });
    setIsLoading(false);

    if (!response.ok) {
      form.setError('root', {
        message: response.data.message || 'Something went wrong',
      });
      return;
    }

    taskUpdated && taskUpdated();

    toast({title: 'Task updated successfully'});
    setIsModalOpen(false);
  }

  return (
    <Dialog open={isModalOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" onClick={() => setIsModalOpen(true)}>
          <SquarePen className='text-primary' />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <div className="max-w-screen-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex items-end">
                <FormField
                  control={form.control}
                  name="title"
                  render={({field}) => (
                    <FormItem className="flex-grow">
                      <FormLabel>Task Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Task" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {form.formState.errors.root && (
                <p className="text-[0.8rem] font-medium text-destructive">
                  {form.formState.errors.root.message}
                </p>
              )}
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  type="button"
                  className="ml-2"
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                  Close
                </Button>
                <Button
                  variant={'default'}
                  type="submit"
                  loading={isLoading}
                  className="ml-2"
                >
                  Update
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
