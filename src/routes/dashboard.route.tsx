
import {Navigate, Route, Routes} from 'react-router-dom';

export function DashboardRoute() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="all" replace />} />
      <Route path="/all" element={<></>}></Route>
    </Routes>
  );
}
