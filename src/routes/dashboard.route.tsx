
import { TaskList } from '@/pages/task-list';
import {Navigate, Route, Routes} from 'react-router-dom';

export function DashboardRoute() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="all" replace />} />
      <Route path="/all" element={<TaskList type='all'/>}></Route>
      <Route path="/pending" element={<TaskList type='pending'/>}></Route>
      <Route path="/completed" element={<TaskList type='completed'/>}></Route>
    </Routes>
  );
}
