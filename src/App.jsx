import { useState } from "react";

import "./App.css";
import { Button, Card, Container, Form } from "react-bootstrap";

function App() {
  const [formData, setFormadata] = useState({
    name: "",
    date: "",
    priority: "Basse",
    isCompleted: false,
  });

  function handlechange(e) {
    const { name, value, type, checked } = e.target;
    setFormadata((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <Container>
      <Card className="bg-blue">
        <Form className="p-5" onSubmit={handleSubmit}>
          <h1>Formulaire de tâche</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handlechange}
              placeholder="Entrer le nom de la tache"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handlechange}
              placeholder="date"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Priorité</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={formData.priority}
              onChange={handlechange}
              name="priority"
            >
              <option value="Basse">Basse</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Haute">Haute</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              checked={formData.isCompleted}
              onChange={handlechange}
              label="Completé"
              name="isCompleted"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default App;
