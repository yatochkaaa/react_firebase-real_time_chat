import { Container, Grid, Box, Button } from "@mui/material";
import { useContext } from "react";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Context } from "..";

const Login = () => {
  const { auth } = useContext(Context);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    console.log(user);
  };

  return (
    <Container>
      <Grid
        container
        sx={{ height: window.innerHeight - 50 }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid
          container
          width={400}
          alignItems={"center"}
          direction={"column"}
          sx={{ background: "lightgray" }}
        >
          <Box p={5}>
            <Button onClick={login} variant="outlined">Войти с помощью гугл</Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
