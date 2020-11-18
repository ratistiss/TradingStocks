import React, {useState} from 'react';
import { getRequest } from './models';
import Transaction from './Transactions';
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


const Quote = (props) => {
    const [quote, setQuote] = useState([]);
    const [tick, setTick] = useState("");
    const [isQuote, setIsQuote] = useState(false);
    const [errorTicker, setErrorTicker] = useState(false);
    const classes = useStyles();

    
    const getListing = async () => {
        let data = await getRequest("/price/" + tick.toUpperCase());
        console.log(data.error);
        if (data.error === "ticker not found"){
            setErrorTicker(true);
        } else {
        setQuote(data);
        setIsQuote(true);
        setErrorTicker(false);
        }   
    }


    return (
        <div>
            {isQuote ? 
            <>
                <div style={{paddingTop: "2%"}}>
                    <Typography className={classes.typography} component="h1" variant="h4">
                        {quote.ticker}
                    </Typography>
                    <Typography className={classes.typography} component="h1" variant="h5">
                        {quote.price}
                    </Typography>
                </div>
                <div style={{paddingTop: "2%"}}>
                    <Transaction tick={tick.toUpperCase()}/>
                </div>
            </>
             : 
            <>
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
                            type="text" 
                            onKeyDown={e => /[\+\-\.\,\d]$/.test(e.key) && e.preventDefault()} 
                            onChange={e => setTick(e.target.value)} />
                        </Grid>
                    </Grid>
                    <div style={{paddingTop: "2%"}}>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={getListing}
                    >
                        Quote
                    </Button>
                    </div>
                  </div>
                </Container>
            </>
            }

            {errorTicker ? <Typography className={classes.typography}
                            component="h1" variant="h5"
                            style={{paddingTop: "2%"}}>
                            Ticker not found!
                            </Typography> : <></>}
        </div>

    )
}

export default Quote;