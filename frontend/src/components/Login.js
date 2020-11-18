import React, { useState } from 'react';
import { postRequest } from './models';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textfield: {
    backgroundColor: "white",
    borderRadius: "5px",
  },
  typography: {
    color: "white",
    fontWeight: "Bold",
  },
}));

const Login = (setToken) => {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState(false)
    const classes = useStyles();




    const getLogin = async () => {
        try {
            const data = await postRequest("login", {"username": name, "password":password});
            sessionStorage.setItem("token", data.session_id);
            window.location.reload(false);
        }
        catch(err) {
            setErr(true)
        }

    }
        


    return(
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography className={classes.typography} component="h1" variant="h5">
          Sign In!
        </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                className={classes.textfield}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Username"
                onChange={e => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textfield}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <div style={{paddingTop: "2%"}}>
            <Button
                className={classes.button}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={e => getLogin(name,password)}
            >
                Submit
            </Button>
          </div>
      </div>
      {err ? <Typography className={classes.typography} component="h1" variant="h5" style={{paddingTop: "2%"}}>
          Oh no, your account wasn't found!
        </Typography> : <></>}
    </Container>
    )
}

export default Login;