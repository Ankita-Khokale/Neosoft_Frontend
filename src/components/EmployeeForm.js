import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
    getEmployeeById,
    addEmployee,
    updateEmployee,
} from "../services/EmployeeService";
import { getCountries } from "../services/CountryService";
import { getStatesByCountryId } from "../services/StateService";
import { getCitiesByStateId } from "../services/CityService";
import AddUpdateFormFields from "./AddUpdateFormFields";

const EmployeeForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        firstName: "",
        lastName: "",
        emailAddress: "",
        mobileNumber: "",
        panNumber: "",
        passportNumber: "",
        gender: "",
        isActive: true,
        dateOfBirth: null,
        dateOfJoinee: null,
        countryId: null,
        stateId: null,
        cityId: null,
        countryName: "",
        stateName: "",
        cityName: "",
        isDeleted: false,
        deletedDate: null,
    });

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        getCountries().then((res) => setCountries(res.data));
        if (id) {
            getEmployeeById(id).then((res) => {
                const data = res.data;
                setEmployee({
                    ...data,
                    dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
                    dateOfJoinee: data.dateOfJoinee ? new Date(data.dateOfJoinee) : null,
                    deletedDate: data.deletedDate ? new Date(data.deletedDate) : null,
                    gender: data.gender || "",
                });

                if (data.countryId) {
                    getStatesByCountryId(data.countryId).then((res) =>
                        setStates(res.data)
                    );
                }
                if (data.stateId) {
                    getCitiesByStateId(data.stateId).then((res) => setCities(res.data));
                }
            });
        }
    }, [id]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEmployee({ ...employee, [name]: type === "checkbox" ? checked : value });
        setErrors({ ...errors, [name]: "" });
    };

    // Dropdown handlers
    const handleCountryChange = (selectedOption) => {
        setEmployee({
            ...employee,
            countryId: selectedOption ? selectedOption.value : null,
            stateId: null,
            cityId: null,
        });
        if (selectedOption) {
            getStatesByCountryId(selectedOption.value).then((res) =>
                setStates(res.data)
            );
        }
        setCities([]);
    };

    const handleStateChange = (selectedOption) => {
        setEmployee({
            ...employee,
            stateId: selectedOption ? selectedOption.value : null,
            cityId: null,
        });
        if (selectedOption) {
            getCitiesByStateId(selectedOption.value).then((res) =>
                setCities(res.data)
            );
        }
    };

    const handleCityChange = (selectedOption) => {
        setEmployee({
            ...employee,
            cityId: selectedOption ? selectedOption.value : null,
        });
    };

    // Handle date changes
    const handleDateChange = (name, date) => {
        setEmployee({ ...employee, [name]: date });
    };

    // Handle gender change
    const handleGenderChange = (e) => {
        setEmployee({ ...employee, gender: parseInt(e.target.value) });
        setErrors({ ...errors, gender: "" });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = {};

        if (!employee.firstName) {
            formErrors.firstName = "First Name is required";
        }
        if (!employee.lastName) {
            formErrors.lastName = "Last Name is required";
        }
        if (!employee.emailAddress) {
            formErrors.emailAddress = "Email Address is required";
        }
        if (!employee.mobileNumber) {
            formErrors.mobileNumber = "Mobile Number is required";
        }
        if (!employee.panNumber) {
            formErrors.panNumber = "PAN Number is required";
        }
        if (!employee.passportNumber) {
            formErrors.passportNumber = "Passport Number is required";
        }
        if (!employee.gender) {
            formErrors.gender = "Gender is required";
        }
        if (!employee.dateOfBirth) {
            formErrors.dateOfBirth = "Date of Birth is required";
        }
        if (!employee.dateOfJoinee) {
            formErrors.dateOfJoinee = "Date of Joining is required";
        }
        if (!employee.countryId) {
            formErrors.countryId = "Country is required";
        }
        if (!employee.stateId) {
            formErrors.stateId = "State is required";
        }
        if (!employee.cityId) {
            formErrors.cityId = "City is required";
        }

        // Email format validation
        if (employee.emailAddress && !/\S+@\S+\.\S+/.test(employee.emailAddress)) {
            formErrors.emailAddress = "Please enter a valid email address.";
        }

        // Mobile number validation (only 10 digits)
        if (employee.mobileNumber && !/^\d{10}$/.test(employee.mobileNumber)) {
            formErrors.mobileNumber = "Mobile Number must be 10 digits.";
        }

        // PAN number validation (must be in the format AAAAA1234A)
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (employee.panNumber && !panRegex.test(employee.panNumber)) {
            formErrors.panNumber = "Please add a valid PAN number.";
        }

        // Passport number validation (alphanumeric, 6-9 characters)
        const passportRegex = /^[A-Za-z0-9]{6,9}$/;
        if (
            employee.passportNumber &&
            !passportRegex.test(employee.passportNumber)
        ) {
            formErrors.passportNumber = "Please add a valid passport number.";
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const formData = new FormData();

        // Append fields to FormData
        formData.append("firstName", employee.firstName);
        formData.append("lastName", employee.lastName);
        formData.append("emailAddress", employee.emailAddress);
        formData.append("mobileNumber", employee.mobileNumber);
        formData.append("panNumber", employee.panNumber);
        formData.append("passportNumber", employee.passportNumber);
        formData.append("gender", employee.gender);
        formData.append("isActive", employee.isActive);
        formData.append("countryId", employee.countryId);
        formData.append("stateId", employee.stateId);
        formData.append("cityId", employee.cityId);
        formData.append("countryName", employee.countryName);
        formData.append("stateName", employee.stateName);
        formData.append("cityName", employee.cityName);
        formData.append("isDeleted", employee.isDeleted);

        formData.append(
            "dateOfBirth",
            employee.dateOfBirth
                ? employee.dateOfBirth.toISOString().split("T")[0]
                : null
        );
        formData.append(
            "dateOfJoinee",
            employee.dateOfJoinee
                ? employee.dateOfJoinee.toISOString().split("T")[0]
                : null
        );
        try {
            if (id) {
                await updateEmployee(id, formData);
                Swal.fire("Success", "Employee updated successfully", "success");
            } else {
                await addEmployee(formData);
                Swal.fire("Success", "Employee added successfully", "success");
            }
            navigate("/");
        } catch (error) {
            Swal.fire("Error", "Failed to save employee", "error");
        }
    };

    return (
        <div
            className="container-fluid d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh", fontSize: "15px" }}
        >
            <div className="card shadow" style={{ width: "450px" }}>
                <div className="card-header bg-primary text-white text-center">
                    <h4 className="mb-0">{id ? "Edit Employee" : "Add Employee"}</h4>
                </div>
                <div className="card-body" style={{ fontSize: "15px" }}>
                    <form onSubmit={handleSubmit}>
                        <AddUpdateFormFields
                            employee={employee}
                            errors={errors}
                            handleChange={handleChange}
                            handleDateChange={handleDateChange}
                            handleCountryChange={handleCountryChange}
                            handleStateChange={handleStateChange}
                            handleCityChange={handleCityChange}
                            handleGenderChange={handleGenderChange}
                            countries={countries}
                            states={states}
                            cities={cities}
                        />
                        <div className="text-center mt-3">
                            <button type="submit" className="btn btn-success px-4 py-2" style={{ fontSize: "15px" }}>
                                {id ? "Update Employee" : "Save Employee"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EmployeeForm;
