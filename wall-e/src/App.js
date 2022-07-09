import React from "react";
import { Switch, Route, Redirect, BrowserRouter} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import MainPage from "./pages/Main";
import CreateAccount from "./pages/CreateAccount";
import ForgetPassword from "./pages/ForgetPassword";
import UpdateProfile from "./pages/UpdateProfile";
import Profile from "./pages/Profile";
import Listings from "./pages/Listings";
import Search from "./pages/Search";


function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <>
      <div>
      <BrowserRouter>
        {authIsReady && (
          <Switch>
            <Route exact path="/">
              {!user && <MainPage />}
              {user && <Redirect to="/" />}
            </Route>

            <Route exact path="/Login">
              {!user && <Login />}
              {user && <Redirect to="/Home" />}
            </Route>

            <Route exact path="/Home">
              {user && <Homepage />}
              {!user && <Redirect to="/" />}
            </Route>

            <Route exact path="/CreateAccount">
              {!user && <CreateAccount />}
              {user && <Redirect to="/UpdateProfile" />}
            </Route>

            <Route exact path="/ForgetPassword">
              <ForgetPassword/>
            </Route>

            <Route exact path="/UpdateProfile">
              {user && <UpdateProfile />}
              {!user && <Redirect to="/" />}
            </Route>

            <Route exact path="/Profile">
              {user && <Profile />}
              {!user && <Redirect to="/" />}
            </Route>

            <Route exact path="/Listings">
              {user && <Listings />}
              {!user && <Redirect to="/" />}
            </Route>

            <Route exact path="/Search">
              {user && <Search />}
              {!user && <Redirect to="/" />}
            </Route>
          </Switch>
        )}
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
