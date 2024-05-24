import {API_BASE_URL} from '@/config';
import {HttpService} from '@/lib/httpService';
import {getAuthHeaders} from './data.service';

export interface TaskData {
  _id:string
  title: string;
  isCompleted: boolean;
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
}

export const taskService = new TaskService();
