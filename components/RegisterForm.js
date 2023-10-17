import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { createUser } from '../api/userData';

function RegisterForm({ user }) {
  const [formData, setFormData] = useState({
    name: '',
    uid: user.uid,
    isEmployee: true,
  });
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(formData).then(() => router.push('/Orders/orders'));
    console.log('this is the formData:', formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="userName">

        <Form.Label>User Name</Form.Label>
        <Form.Control type="text" name="name" placeholder="Enter your name" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />

      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>HPPW Employee?</Form.Label>
        <div>
          <label>
            <input
              type="checkbox"
              name="isEmployee"
              onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.checked }))}
              checked={formData.isEmployee}
            />
            Yes
          </label>
        </div>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  // updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
