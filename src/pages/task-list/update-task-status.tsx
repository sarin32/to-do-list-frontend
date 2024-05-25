import {TaskData, taskService} from '@/api/task.service';
import {Button} from '@/components/ui/button';
import {useToast} from '@/components/ui/use-toast';
import {CircleCheckBig, CircleX} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function UpdateTaskStatus({
  task,
  taskUpdated,
}: {
  task: TaskData;
  taskUpdated?: () => void;
}) {
  const {toast} = useToast();

  const updateTaskStatus = async (taskId: string, isCompleted: boolean) => {
    const resp = await taskService.updateTask({taskId, isCompleted});
    if (!resp.ok) {
      toast({
        variant: 'destructive',
        title: 'Failed to update task',
        description: resp.data.message || '',
      });
      return;
    }

    taskUpdated && taskUpdated();
    toast({
      title: 'Successfully updated task status',
    });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={'ghost'}
            onClick={() => {
              updateTaskStatus(task._id, !task.isCompleted);
            }}
          >
            {!task.isCompleted ? <CircleCheckBig  className='text-primary'/> : <CircleX className='text-primary'/>}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {!task.isCompleted ? 'Mark as Completed' : 'Mark as Incomplete'}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
