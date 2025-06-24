import { useState } from "react";

import "./App.css";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      date: "",
      priority: "Basse",
      isCompleted: false,
    },
  });
  const onSubmit = (data) => {
    reset();
    console.log(data);
  };
  return (
    <Container>
      <Card className="bg-blue">
        <Form className="p-5" onSubmit={handleSubmit(onSubmit)}>
          <h1>Formulaire de tâche</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              {...register("name", {
                required: "Le nom de la tâche est requis",
              })}
              placeholder="Entrer le nom de la tache"
            />
            {errors.name && <p>{errors.name.message}</p>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              {...register("date", {
                required: "La date de la tâche est requise",
              })}
            />
            {errors.date && <p>{errors.date.message}</p>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Priorité</Form.Label>
            <Form.Select
              aria-label="Default select example"
              {...register("priority")}
            >
              <option value="Basse">Basse</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Haute">Haute</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              {...register("isCompleted")}
              label="Completé"
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
