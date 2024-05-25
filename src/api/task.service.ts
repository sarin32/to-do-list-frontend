import {API_BASE_URL} from '@/config';
import {HttpService} from '@/lib/httpService';
import {getAuthHeaders} from './data.service';

export interface TaskData {
  _id: string;
  title: string;
  isCompleted: boolean;
  completedAt?: string;
  createdAt: string;
}
class TaskService {
  httpService = new HttpService(API_BASE_URL);

  async createTask(body: {title: string}) {
    const {request} = this.httpService.post('/task', body, {
      ...getAuthHeaders(),
    });
    return await request;
  }

  async getTaskList({type}: {type: 'all' | 'pending' | 'completed'}) {
    const {request} = this.httpService.get<TaskData[]>(`/task?type=${type}`, {
      ...getAuthHeaders(),
    });
    return await request;
  }

  async deleteTask(taskId: string) {
    const {request} = this.httpService.delete(`/task/${taskId}`, {
      ...getAuthHeaders(),
    });
    return await request;
  }
  
  async updateTask({
    isCompleted,
    taskId,
    title,
  }: {
    taskId: string;
    isCompleted?: boolean;
    title?: string;
  }) {
    const {request} = this.httpService.patch(
      `/task/${taskId}`,
      {isCompleted, title},
      {
        ...getAuthHeaders(),
      }
    );
    return await request;
  }
}

export const taskService = new TaskService();
