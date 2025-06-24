import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
    console.log(data);
    reset();
  };
  const schema = yup.object().shape({
    name: yup
      .string()
      .min(5, "doit comporter au moins 3 caractères")
      .max(15, "doit comporter maximum 15 caractères")
      .required("le nom est requis"),
    date: yup
      .string()
      .matches(
        /^((0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4})$/,
        "La date est invalide"
      )
      .transform((value) => {
        const { d, m, y } = value.split("/");
        return new Date(`${y}-${m}-${d}`);
      })
      .test(
        "test1",
        "la date doit être aujourd'hui ou plus tard",
        function (value) {
          const now = new Date();
          return value >= now;
        }
      ),
    priority: yup
      .string()
      .oneOf(
        ["Basse", "Moyenne", "Haute"],
        "La priorité doit être « Basse », « Moyenne » ou « Haute »"
      ),
    isCompleted: yup.boolean(),
  });

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
            <p>{errors.name?.message}</p>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="text"
              {...register("date", {
                required: "La date de la tâche est requise",
              })}
            />
            <p>{errors.date?.message}</p>
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
            <p>{errors.priority?.message}</p>
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
