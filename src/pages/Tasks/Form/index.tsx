import React, { ChangeEvent } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Box, Button, Container, TextField } from "@material-ui/core";

import { toast } from "react-toastify";

import {
  makeStyles,
  createStyles,
  Theme as AugmentedTheme,
} from "@material-ui/core/styles";

import api from "../../../services/api";

const useStyles = makeStyles((theme: AugmentedTheme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "28rem",
      },
    },
    input: {
      marginBottom: "1rem",
    },
  })
);

interface ITask {
  title: string;
  description: string;
}

interface IParams {
  id: string;
}

const Index = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams<IParams>();
  const [model, setModel] = React.useState<ITask>({
    title: "",
    description: "",
  });

  React.useEffect(() => {
    if (id !== undefined) {
      findTask(id);
    }
  }, [id]);

  function updateModel(e: ChangeEvent<HTMLInputElement>) {
    setModel({
      ...model,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if (id !== undefined) {
      await api.put(`/tasks/${id}`, model);
      toast.dark(`Taks Updated!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      await api.post("/tasks", model);
      toast.dark(`Taks Created!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    backBtn();
  }

  async function findTask(id: string) {
    const response = await api.get(`/tasks/${id}`);
    console.log(response);
    setModel({
      title: response.data.title,
      description: response.data.description,
    });
  }

  function backBtn() {
    history.goBack();
  }

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h1>New Task</h1>
        <Button onClick={backBtn} variant="contained">
          Back
        </Button>
      </Box>

      <form onSubmit={handleSubmit} autoComplete="off">
        <Box display="flex" flexDirection="column" justifyContent="center">
          <TextField
            className={classes.input}
            id="title-field"
            label="Title"
            name="title"
            value={model.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
          />
          <TextField
            className={classes.input}
            id="filled-multiline-static"
            label="Description"
            multiline
            rows={4}
            variant="filled"
            name="description"
            value={model.description}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Index;
