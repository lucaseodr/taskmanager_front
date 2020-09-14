import React from "react";

import {
  makeStyles,
  createStyles,
  Theme as AugmentedTheme,
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: AugmentedTheme) =>
  createStyles({
    root: {
      // background: theme.palette.secondary.main,
    },
  })
);

const Index = () => {
  const classes = useStyles();

  return <h1>Home</h1>;
};

export default Index;
