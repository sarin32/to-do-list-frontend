import {TaskData, taskService} from '@/api/task.service';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {useToast} from '@/components/ui/use-toast';
import {useEffect, useState} from 'react';
import {formatDateToIST} from '@/lib/utils';
import {DeleteTask} from './delete-task';
import {UpdateTaskStatus} from './update-task-status';
import {EditTask} from './edit-task';
import { CreateTask } from '../create-task';

export function TaskList({type}: {type: 'all' | 'pending' | 'completed'}) {
  const {toast} = useToast();
  const [taskList, setTaskList] = useState([] as TaskData[]);

  const fetchTaskList = () => {
    taskService.getTaskList({type}).then(resp => {
      if (!resp.ok) {
        toast({
          variant: 'destructive',
          title: 'Failed to fetch task list',
          description: resp.data.message || '',
        });
        return;
      }

      setTaskList(resp.data);
    });
  };

  useEffect(() => {
    fetchTaskList();

    return () => {};
  }, [type]);

  return (
    <>
      <div className="mb-4">
        <CreateTask onCreate={fetchTaskList}></CreateTask>
      </div>
      <div className="flex flex-wrap gap-3">
        {taskList.map(task => (
          <Card key={task._id} className="w-full sm:w-1/2 lg:w-1/3 p-2">
            <CardHeader>
              <CardTitle>{task.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <div className="opacity-60 text-xs">
                  <div>
                    {task.createdAt && (
                      <p>
                        Created At: {formatDateToIST(new Date(task.createdAt))}
                      </p>
                    )}
                  </div>
                  <div>
                    {task.completedAt && (
                      <p>
                        Completed At:{' '}
                        {formatDateToIST(new Date(task.completedAt))}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 mx-auto w-max mt-3">
                  <UpdateTaskStatus task={task} taskUpdated={fetchTaskList} />
                  <DeleteTask taskId={task._id} taskDeleted={fetchTaskList} />
                  <EditTask task={task} taskUpdated={fetchTaskList} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
