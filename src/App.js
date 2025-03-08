import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<EmployeeList />} />
      <Route path="/add" element={<EmployeeForm />} />
      <Route path="/edit/:id" element={<EmployeeForm />} />
    </Routes>
  </BrowserRouter>
);

export default App;