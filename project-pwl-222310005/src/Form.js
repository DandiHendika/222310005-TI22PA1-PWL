import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';

const FormValidation = () => {
  const [formData, setFormData] = useState({
    npm: '',
    firstName: '',
    middleName: '',
    lastName: '',
    birthdate: null,
  });
  const [showModal, setShowModal] = useState(false);
  const [age, setAge] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, birthdate: date });
    if (date) {
      const today = new Date();
      const birthYear = date.getFullYear();
      setAge(today.getFullYear() - birthYear);
    }
  };

  const validateForm = () => {
    const { npm, firstName, lastName, birthdate } = formData;
    return npm && npm.length <= 10 && /^[0-9]+$/.test(npm) && firstName && lastName && birthdate;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowModal(true);
    } else {
      alert('Form tidak valid. Mohon isi semua field wajib.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Form Validasi</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="npm">
          <Form.Label>NPM (Max 10 digit angka, wajib diisi)</Form.Label>
          <Form.Control
            type="text"
            name="npm"
            value={formData.npm}
            onChange={handleChange}
            maxLength="10"
            required
          />
        </Form.Group>

        <Form.Group controlId="firstName" className="mt-3">
          <Form.Label>First Name (Wajib diisi)</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="middleName" className="mt-3">
          <Form.Label>Middle Name (Opsional)</Form.Label>
          <Form.Control
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="lastName" className="mt-3">
          <Form.Label>Last Name (Wajib diisi)</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="birthdate" className="mt-3">
          <Form.Label>Tanggal Lahir (Wajib diisi)</Form.Label>
          <DatePicker
            selected={formData.birthdate}
            onChange={handleDateChange}
            className="form-control"
            dateFormat="yyyy-MM-dd"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          Submit
        </Button>
      </Form>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Data Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>NPM:</strong> {formData.npm}</p>
          <p><strong>First Name:</strong> {formData.firstName}</p>
          <p><strong>Middle Name:</strong> {formData.middleName || '-'}</p>
          <p><strong>Last Name:</strong> {formData.lastName}</p>
          <p><strong>Birthdate:</strong> {formData.birthdate?.toISOString().split('T')[0]}</p>
          <p><strong>Age:</strong> {age} tahun</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FormValidation;
