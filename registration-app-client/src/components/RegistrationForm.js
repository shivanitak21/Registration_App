import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./RegistrationForm.css"; // Import the CSS file
import Axios from "axios"; // Import Axios
import { countries, states, cities } from "./sampleData"; // Import the sample data

function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    state: "",
    city: "",
    gender: "",
    dateOfBirth: "",
    age: "",
  });

  // State variables to hold the lists of countries, states, and cities
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  // Populate the country dropdown with sample data
  useEffect(() => {
    setCountryList(countries);
  }, []);

  // Update the state dropdown based on the selected country
  useEffect(() => {
    if (formData.country) {
      const filteredStates = states.filter(
        (state) => state.countryId === parseInt(formData.country)
      );
      setStateList(filteredStates);
    } else {
      setStateList([]);
    }
  }, [formData.country]);

  // Update the city dropdown based on the selected state
  useEffect(() => {
    if (formData.state) {
      const filteredCities = cities.filter(
        (city) => city.stateId === parseInt(formData.state)
      );
      setCityList(filteredCities);
    } else {
      setCityList([]);
    }
  }, [formData.state]);

  const [age, setAge] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleDateOfBirthChange = (e) => {
    const { value } = e.target;
    const calculatedAge = calculateAge(value);

    // Update the age field in the formData state
    setFormData({
      ...formData,
      dateOfBirth: value,
      age: calculatedAge,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      // Send a POST request to your API endpoint

      const response = await Axios.post(
        "http://localhost:3000/register",
        formData
      );
      console.log(response, "response");
      // Check the response status and handle it accordingly
      if (response.status === 201) {
        // Successful submission, you can redirect or show a success message
        alert("Registration successful!");
      } else {
        // Handle any other response status codes or errors
        console.error("Registration failed:", response.statusText);
      }
    } catch (error) {
      // Handle any network or other errors
      console.error("An error occurred:", error);
    }
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
              {countryList.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
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
              {stateList.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
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
              {cityList.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
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
              checked={formData.gender === "male"}
              onChange={handleChange}
            />
            <Form.Check
              type="radio"
              inline
              label="Female"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
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
              value={formData.age}
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
