import { Route, Switch } from "react-router";
import { Home } from "../pages/Home";
import { SignUp } from "../pages/SignUp";
import { UserHome } from "../pages/UserHome";

export const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/sign">
          <SignUp />
        </Route>
        <Route path="/userhome">
          <UserHome />
        </Route>
      </Switch>
    </>
  );
};
