import React from "react";
import { useHistory } from "react-router-dom";
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import { Container, IconButton } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DetailsIcon from "@material-ui/icons/Details";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import api from "../../services/api";
import moment from "moment";

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
      color: theme.palette.common.black,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  icons: {
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

interface Task {
  id: number;
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  finished: boolean;
}

const Index = () => {
  const classes = useStyles();
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const history = useHistory();

  function formateDate(date: Date) {
    return moment(date).format("DD/MM/YYYY");
  }

  async function loadTasks() {
    const response = await api.get("/tasks");
    setTasks(response.data);
    console.log(response);
  }

  function newTask() {
    history.push("/create_task");
  }

  function editTask(id: number) {
    history.push(`/create_task/${id}`);
  }

  async function completeTask(id: number) {
    const response = await api.patch(`/tasks/${id}`);
    toast.dark(`${response.data.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    loadTasks();
  }

  async function deleteTask(id: number) {
    await api.delete(`/tasks/${id}`);
    loadTasks();
  }

  React.useEffect(() => {
    loadTasks();
  }, []);

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h1>Tasks</h1>
        <Button onClick={newTask} variant="contained">
          New Task
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">Title</StyledTableCell>
              <StyledTableCell align="center">Update date</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <StyledTableRow key={task.id}>
                <StyledTableCell align="center">{task.id}</StyledTableCell>
                <StyledTableCell align="center">{task.title}</StyledTableCell>
                <StyledTableCell align="center">
                  {formateDate(task.updated_at)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {task.finished ? "Completed" : "Pending"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton className={classes.icons}>
                    <DetailsIcon />
                  </IconButton>
                  <IconButton
                    disabled={task.finished}
                    className={classes.icons}
                    onClick={() => completeTask(task.id)}
                  >
                    <CheckCircleIcon />
                  </IconButton>
                  <IconButton
                    disabled={task.finished}
                    className={classes.icons}
                    onClick={() => editTask(task.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton className={classes.icons}>
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer />
    </Container>
  );
};

export default Index;
