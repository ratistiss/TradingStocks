import React, {useState} from 'react';
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


const Transaction = (props) => {
    const [shares, setShares] = useState(0);
    const [ticker, setTicker] = useState(props.tick);
    const [errorFunds, setErrorFunds] = useState(false)
    const [errorShares, setErrorShares] = useState(false)
    const buy = "buy";
    const sell = "sell";
    const classes = useStyles();

    async function trade(trade_type) {
        const data = await postRequest(trade_type, {token: sessionStorage.getItem("token"), "ticker": ticker, "volume": shares});
        console.log(data)
        if (data.error === "insufficient funds"){
            setErrorFunds(true);
            setErrorShares(false);
        } else if(data.error === "insufficient shares"){
            setErrorShares(true);
            setErrorFunds(false);
        } else {
            window.location.reload(false);
            setErrorFunds(false);
            setErrorShares(false);
        }  

    } 
    

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <TextField
                            className={classes.textfield}
                            variant="outlined"
                            required
                            fullWidth 
                            type="number" 
                            min="1" 
                            onKeyDown={e => /[\+\-\.\,]$/.test(e.key) && e.preventDefault()} 
                            onChange={e => setShares(e.target.value)} placeholder="shares"/>
                    </Grid>
                    <Grid item xs={6} >
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit} 
                            onClick={e => trade(buy)}>
                            Buy
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={e => trade(sell)}>
                                Sell
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        {errorFunds ? <Typography
                                    className={classes.typography}
                                    component="h1" variant="h5">
                                    Please check you account balance!
                                    </Typography> : <></>}
                        {errorShares ? <Typography
                                    className={classes.typography}
                                    component="h1" variant="h5">
                                    Not enough Shares
                                    </Typography> : <></>}
                    </Grid>
                </Grid>
            </div>
        </Container>

    )
}
export default Transaction;