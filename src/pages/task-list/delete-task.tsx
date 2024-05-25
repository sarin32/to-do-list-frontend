import {taskService} from '@/api/task.service';
import {Button} from '@/components/ui/button';
import {useToast} from '@/components/ui/use-toast';
import {Trash2} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export function DeleteTaskDialog({deleteTask}: {deleteTask: () => {}}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={'ghost'}>
          <Trash2 className='text-red-600'/>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your task
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteTask}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function DeleteTask({
  taskId,
  taskDeleted,
}: {
  taskId: string;
  taskDeleted?: () => void;
}) {
  const {toast} = useToast();

  const deleteTask = async () => {
    const resp = await taskService.deleteTask(taskId);
    if (!resp.ok) {
      toast({
        variant: 'destructive',
        title: 'Failed to delete task',
        description: resp.data.message || '',
      });
      return;
    }
    taskDeleted && taskDeleted();

    toast({
      title: 'Successfully deleted task',
    });
  };

  return <DeleteTaskDialog deleteTask={deleteTask} />;
}
