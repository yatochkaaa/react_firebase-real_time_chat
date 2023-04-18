import { Grid, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Grid
      container
      sx={{ height: window.innerHeight - 50 }}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Grid container alignItems={"center"} direction={"column"}>
        <CircularProgress />
      </Grid>
    </Grid>
  );
};

export default Loader;
