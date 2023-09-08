import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);
  const defaultValues = {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    is_sales:false,
    is_cs:false,
    is_customer:false,
    address: "",
    number: "",
  };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    registerUser
  );

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:{" "}
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <p style={{ fontSize: "12px" }}>
          NOTE: Make this an uncommon password with characters, numbers, and
          special characters!
        </p>
        <label>
          First Name:{" "}
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Last Name:{" "}
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Check here is your Customer Service:
          <input
            type="checkbox"
            name="is_cs"
            value={formData.is_cs}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Check here is your Sales:
          <input
            type="checkbox"
            name="is_sales"
            value={formData.is_sales}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Check here is your a Customer:
          <input
            type="checkbox"
            name="is_customer"
            value={formData.is_customer}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Address:{" "}
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Number:{" "}
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleInputChange}
          />
        </label>

        <button>Register!</button>
      </form>
    </div>
  );
};

export default RegisterPage;
