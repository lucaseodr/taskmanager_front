import React from "react";
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";

import { Container, IconButton } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
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

  function formateDate(date: Date) {
    return moment(date).format("DD/MM/YYYY");
  }

  async function loadTasks() {
    const response = await api.get("/tasks");
    console.log(response);
    setTasks(response.data);
  }

  React.useEffect(() => {
    loadTasks();
  }, []);

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h1>Tasks</h1>
        <Button variant="contained">New Task</Button>
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
                  {task.finished ? "Enabled" : "Disabled"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Tooltip title="Details">
                    <IconButton className={classes.icons}>
                      <DetailsIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Complete">
                    <IconButton className={classes.icons}>
                      <CheckCircleIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton className={classes.icons}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton className={classes.icons}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Index;
