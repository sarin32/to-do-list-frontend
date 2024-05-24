import {TaskData, taskService} from '@/api/task.service';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {useToast} from '@/components/ui/use-toast';
import {useEffect, useState} from 'react';
import {CircleCheckBig, CircleX} from 'lucide-react';

export function TaskList({type}: {type: 'all' | 'pending' | 'completed'}) {
  const {toast} = useToast();
  const [taskList, setTaskList] = useState([] as TaskData[]);

  useEffect(() => {
    taskService.getTaskList({type}).then(resp => {
      if (!resp.ok) {
        toast({
          title: 'Faled to fetch task list',
          description: resp.data.message || '',
        });
        return;
      }

      setTaskList(resp.data);
    });

    return () => {};
  }, [type]);

  return (
    <div className="flex flex-wrap gap-3">
      {taskList.map(task => (
        <Card key={task._id} className="w-full sm:w-1/2 lg:w-1/3 p-2">
          <CardHeader>
            <CardTitle>
              {task.title}
              {
                <Button variant={'ghost'}>
                  {!task.isCompleted ? <CircleCheckBig /> : <CircleX />}
                </Button>
              }
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* <p className="opacity-60">{elem.description}</p> */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
