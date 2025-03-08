import axios from "axios";
const API_URL = "/api/Employee";

const getEmployees = () => axios.get(API_URL);
const getEmployeeById = (id) => axios.get(`${API_URL}/${id}`);
const addEmployee = (data) => axios.post(API_URL, data);
const updateEmployee = (id, data) => axios.put(`${API_URL}/${id}`, data);
const deleteEmployee = (id) => axios.delete(`${API_URL}/${id}`);

export {
    getEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee
};