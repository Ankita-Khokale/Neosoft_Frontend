import React, { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../services/EmployeeService";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "./Loader";
import { FaEdit, FaTimes, FaPlus } from "react-icons/fa";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        setLoading(true);
        try {
            const response = await getEmployees();
            setEmployees(response.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
            Swal.fire("Error", "Failed to load employees.", "error");
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteEmployee(id);
                    loadEmployees();
                    Swal.fire("Deleted!", "Employee has been deleted.", "success");
                } catch (error) {
                    Swal.fire("Error", "Failed to delete employee.", "error");
                }
            }
        });
    };

    if (loading) return <Loader />;

    return (
        <div className="container mt-4">
            <h2 className="mb-3  text-center" style={{ fontSize: '20px' }}>Employee List</h2>
            <Link to="/add" className="btn btn-warning mb-3" style={{ fontSize: '15px' }}>
                <FaPlus /> Add Employee
            </Link>
            <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover" style={{ fontSize: '15px' }}>
                    <thead className="table-dark">
                        <tr>
                            <th>Email Address</th>
                            <th>Country</th>
                            <th>State</th>
                            <th>City</th>
                            <th>PAN Number</th>
                            <th>Passport Number</th>
                            <th>Gender</th>
                            <th>Is Active</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp) => (
                            <tr key={emp.row_Id}>
                                <td>{emp.emailAddress}</td>
                                <td>{emp.countryName || emp.CountryId}</td>
                                <td>{emp.stateName || emp.StateId}</td>
                                <td>{emp.cityName || emp.CityId}</td>
                                <td>{emp.panNumber}</td>
                                <td>{emp.passportNumber}</td>
                                <td>{emp.gender === 1 ? "Male" : "Female"}</td>
                                <td>{emp.isActive ? "Yes" : "No"}</td>
                                <td>
                                    <div className="d-flex">
                                        <Link to={`/edit/${emp.row_Id}`} className="btn btn-primary btn-sm mx-1" style={{ fontSize: '15px' }}>
                                            <FaEdit /> Edit
                                        </Link>
                                        <button
                                            className="btn btn-danger btn-sm mx-1" style={{ fontSize: '14px' }}
                                            onClick={() => handleDelete(emp.row_Id)}
                                        >
                                            <FaTimes /> Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;
