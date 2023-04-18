import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { AppBar, Toolbar, Grid, ButtonGroup, Button } from "@mui/material";
import { LOGIN_ROUTE } from "../utils/consts";
import { Context } from "..";

const Navbar = () => {
  const navigate = useNavigate();
  const { auth } = React.useContext(Context);
  const [user] = useAuthState(auth);

  const signOut = () => {
    auth.signOut();
  };

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Grid container justifyContent={"flex-end"}>
          <ButtonGroup>
            {user ? (
              <Button onClick={signOut} sx={{ color: "white" }}>
                Выйти
              </Button>
            ) : (
              <Button
                sx={{ color: "white" }}
                onClick={() => navigate(LOGIN_ROUTE)}
              >
                Логин
              </Button>
            )}
          </ButtonGroup>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
