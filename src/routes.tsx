import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home/";
import Tasks from "./pages/Tasks/";
import TaskForm from "./pages/Tasks/Form";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/tasks" exact component={Tasks} />
      <Route path="/create_task" exact component={TaskForm} />
      <Route path="/create_task/:id" exact component={TaskForm} />
    </Switch>
  );
};

export default Routes;
