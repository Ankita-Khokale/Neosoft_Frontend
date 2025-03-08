import React from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";

const AddUpdateFormFields = ({
    employee,
    handleChange,
    handleFileChange,
    handleDateChange,
    handleCountryChange,
    handleStateChange,
    handleCityChange,
    handleGenderChange,
    countries,
    states,
    cities,
    errors,
    datePickerProps = {},
}) => {
    return (
        <>
            <div className="mb-3">
                <label className="form-label" style={{ fontSize: "15px" }}>First Name</label>
                <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    value={employee.firstName}
                    onChange={handleChange}
                    style={{ fontSize: "15px" }}
                />
                {errors.firstName && (
                    <small className="text-danger" style={{ fontSize: "12px" }}>{errors.firstName}</small>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label" style={{ fontSize: "15px" }}>Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    value={employee.lastName}
                    onChange={handleChange}
                    style={{ fontSize: "15px" }}
                />
                {errors.lastName && (
                    <small className="text-danger" style={{ fontSize: "12px" }}>{errors.lastName}</small>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label" style={{ fontSize: "15px" }}>Email Address</label>
                <input
                    type="email"
                    name="emailAddress"
                    className="form-control"
                    value={employee.emailAddress}
                    onChange={handleChange}
                    style={{ fontSize: "15px" }}
                />
                {errors.emailAddress && (
                    <small className="text-danger" style={{ fontSize: "12px" }}>{errors.emailAddress}</small>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label" style={{ fontSize: "15px" }}>Mobile Number</label>
                <input
                    type="text"
                    name="mobileNumber"
                    className="form-control"
                    value={employee.mobileNumber}
                    onChange={handleChange}
                    style={{ fontSize: "15px" }}
                />
                {errors.mobileNumber && (
                    <small className="text-danger" style={{ fontSize: "12px" }}>{errors.mobileNumber}</small>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label" style={{ fontSize: "15px" }}>PAN Number</label>
                <input
                    type="text"
                    name="panNumber"
                    className="form-control"
                    value={employee.panNumber}
                    onChange={handleChange}
                    style={{ fontSize: "15px" }}
                />
                {errors.panNumber && (
                    <small className="text-danger" style={{ fontSize: "12px" }}>{errors.panNumber}</small>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label" style={{ fontSize: "15px" }}>Passport Number</label>
                <input
                    type="text"
                    name="passportNumber"
                    className="form-control"
                    value={employee.passportNumber}
                    onChange={handleChange}
                    style={{ fontSize: "15px" }}
                />
                {errors.passportNumber && (
                    <small className="text-danger" style={{ fontSize: "12px" }}>{errors.passportNumber}</small>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label" style={{ fontSize: "15px" }}>Date of Birth</label>
                <DatePicker
                    selected={employee.dateOfBirth}
                    onChange={(date) => handleDateChange("dateOfBirth", date)}
                    className="form-control"
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select Date of Birth"
                    style={{ fontSize: "15px" }}
                />
                {errors.dateOfBirth && (
                    <small className="text-danger" style={{ fontSize: "12px" }}>{errors.dateOfBirth}</small>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label" style={{ fontSize: "15px" }}>Date of Joining</label>
                <DatePicker
                    selected={employee.dateOfJoinee}
                    onChange={(date) => handleDateChange("dateOfJoinee", date)}
                    className="form-control"
                    dateFormat="yyyy-MM-dd"
                    style={{ fontSize: "15px" }}
                    placeholderText="Select Date of Joining"
                    {...datePickerProps}
                />
                {errors.dateOfJoinee && (
                    <small className="text-danger" style={{ fontSize: "12px" }}>{errors.dateOfJoinee}</small>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label" style={{ fontSize: "15px" }}>Country</label>
                <Select
                    options={countries.map((c) => ({
                        value: c.row_Id,
                        label: c.countryName,
                    }))}
                    onChange={handleCountryChange}
                    value={
                        countries.find((c) => c.row_Id === employee.countryId)
                            ? {
                                value: employee.countryId,
                                label: countries.find((c) => c.row_Id === employee.countryId)
                                    .countryName,
                            }
                            : null
                    }
                    placeholder="Select Country"
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            fontSize: '15px',
                        }),
                        singleValue: (provided) => ({
                            ...provided,
                            fontSize: '15px',
                        }),
                        option: (provided) => ({
                            ...provided,
                            fontSize: '15px',
                        }),
                    }}
                />
                {errors.countryId && (
                    <small className="text-danger" style={{ fontSize: "12px" }}>{errors.countryId}</small>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label">State</label>
                <Select
                    options={states.map((s) => ({
                        value: s.row_Id,
                        label: s.stateName,
                    }))}
                    onChange={handleStateChange}
                    value={
                        states.find((s) => s.row_Id === employee.stateId)
                            ? {
                                value: employee.stateId,
                                label: states.find((s) => s.row_Id === employee.stateId)
                                    .stateName,
                            }
                            : null
                    }
                    placeholder="Select State"
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            fontSize: '15px',
                        }),
                        singleValue: (provided) => ({
                            ...provided,
                            fontSize: '15px',
                        }),
                        option: (provided) => ({
                            ...provided,
                            fontSize: '15px',
                        }),
                    }}
                />
                {errors.stateId && (
                    <small className="text-danger" style={{ fontSize: "12px" }}>{errors.stateId}</small>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label">City</label>
                <Select
                    options={cities.map((ci) => ({
                        value: ci.row_Id,
                        label: ci.cityName,
                    }))}
                    onChange={handleCityChange}
                    value={
                        cities.find((ci) => ci.row_Id === employee.cityId)
                            ? {
                                value: employee.cityId,
                                label: cities.find((ci) => ci.row_Id === employee.cityId)
                                    .cityName,
                            }
                            : null
                    }
                    placeholder="Select City"
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            fontSize: '15px',
                        }),
                        singleValue: (provided) => ({
                            ...provided,
                            fontSize: '15px',
                        }),
                        option: (provided) => ({
                            ...provided,
                            fontSize: '15px',
                        }),
                    }}
                />
                {errors.cityId && (
                    <small className="text-danger" style={{ fontSize: "12px" }}>{errors.cityId}</small>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label" style={{ fontSize: "15px" }}>Gender</label>
                <div className="form-check form-check-inline">
                    <input
                        type="radio"
                        className="form-check-input"
                        name="gender"
                        value="1"
                        checked={employee.gender === 1}
                        onChange={handleGenderChange}
                    />
                    <label className="form-check-label" style={{ fontSize: "15px" }}>Male</label>
                </div>
                <div className="form-check form-check-inline">
                    <input
                        type="radio"
                        className="form-check-input"
                        name="gender"
                        value="2"
                        checked={employee.gender === 2}
                        onChange={handleGenderChange}
                    />
                    <label className="form-check-label" style={{ fontSize: "15px" }}>Female</label>
                </div>
                {errors.gender && (
                    <small className="text-danger" style={{ fontSize: "12px" }}>{errors.gender}</small>
                )}
            </div>
            <div className="mb-3 form-check" style={{ fontSize: "15px" }}>
                <input
                    type="checkbox"
                    name="isActive"
                    className="form-check-input"
                    checked={employee.isActive}
                    onChange={handleChange}
                />
                <label className="form-check-label">Is Active</label>
                {errors.isActive && (
                    <small className="text-danger" style={{ fontSize: "12px" }}>{errors.isActive}</small>
                )}
            </div>
        </>
    );
};

export default AddUpdateFormFields;
