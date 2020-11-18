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
  form: {
    width: "100%", 
    marginTop: theme.spacing(3),
    
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textfield: {
    backgroundColor: "white",
    borderRadius: "5px",
  },
  typography : {
    color: "white",
    fontWeight: "Bold",
  }
}));

export default function Signup() {
  const [new_name, setNew_Name] = useState("");
  const [pw, setPw] = useState("");
  const [total, setTotal] = useState(0);
  const classes = useStyles();

  const create = async () => {
    const data = await postRequest("create", {"username": new_name, "password": pw, "balance": total});
    this.setToken(data.session_id)
}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography className={classes.typography} component="h1" variant="h5">
          Sign Up Today!
        </Typography>
        <form className={classes.form} noValidate>
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
                onChange={e => setNew_Name(e.target.value)}
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
                onChange={e => setPw(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textfield}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Balance"
                name="email"
                onChange={e => setTotal(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={e => create(new_name,pw,total)}
          >
            Join Us
          </Button>
        </form>
      </div>
    </Container>
  );
}