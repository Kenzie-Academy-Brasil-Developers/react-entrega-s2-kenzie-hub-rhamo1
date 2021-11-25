import { useState } from "react";
import { Route, Switch } from "react-router";
import { Home } from "../pages/Home";
import { SignUp } from "../pages/SignUp";
import { UserHome } from "../pages/UserHome";

export const Routes = () => {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || []
  );
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home userData={userData} setUserData={setUserData} />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/userhome">
          <UserHome userData={userData} />
        </Route>
      </Switch>
    </>
  );
};
