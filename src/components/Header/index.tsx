import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: "#e1e1e6",
    marginRight: "1rem",
    "&:hover": {
      color: theme.palette.text.secondary,
    },
  },
}));

const TasksLink = React.forwardRef<any, Omit<RouterLinkProps, "to">>(
  (props, ref) => <RouterLink ref={ref} to="/tasks" {...props} />
);

const Index = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link
              underline="none"
              className={classes.link}
              component={RouterLink}
              to="/"
            >
              Tasks Manager
            </Link>
          </Typography>
          <Typography>
            <Link
              underline="none"
              className={classes.link}
              component={RouterLink}
              to="/"
            >
              Home
            </Link>
            <Link
              underline="none"
              className={classes.link}
              component={TasksLink}
            >
              Tasks
            </Link>
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Index;
