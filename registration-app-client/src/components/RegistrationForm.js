// src/components/RegistrationForm.js
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './RegistrationForm.css'; // Import the CSS file

function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    state: '',
    city: '',
    gender: '',
    dateOfBirth: '',
  });

  const [age, setAge] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleDateOfBirthChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, dateOfBirth: value });
    const calculatedAge = calculateAge(value);
    setAge(calculatedAge);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission to your API here
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Registration</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="form-group" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="form-group" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="form-group" controlId="email">
            <Form.Label>E-Mail</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="form-group" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              as="select"
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="">Select Country</option>
              {/* Populate the options with your list of countries */}
            </Form.Control>
          </Form.Group>

          <Form.Group className="form-group" controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Control
              as="select"
              name="state"
              value={formData.state}
              onChange={handleChange}
            >
              <option value="">Select State</option>
              {/* Populate the options with states based on the selected country */}
            </Form.Control>
          </Form.Group>

          <Form.Group className="form-group" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              as="select"
              name="city"
              value={formData.city}
              onChange={handleChange}
            >
              <option value="">Select City</option>
              {/* Populate the options with cities based on the selected state */}
            </Form.Control>
          </Form.Group>

          <Form.Group className="form-group" controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Check
              type="radio"
              inline
              label="Male"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
            />
            <Form.Check
              type="radio"
              inline
              label="Female"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="form-group" controlId="dateOfBirth">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleDateOfBirthChange}
            />
          </Form.Group>

          <Form.Group className="form-group" controlId="age">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="text"
              name="age"
              value={age}
              readOnly
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="btn-primary">
            Save
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default RegistrationForm;
