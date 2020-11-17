import React, { useState, useEffect } from 'react';
import { useStateWithSessionStorage } from './models';
import { postRequest } from './models';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const Home = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [username, setUserName] = useState("");
  const [balance, setBalance] = useStateWithSessionStorage("balance", 0);


  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles({
    table: {
      minWidth: 320,
      maxWidth: 900,
    },
    tableContainer: {
      maxWidth:800,
    }
  });
  const classes = useStyles();

  useEffect(() => {
    const getPositions = async () => {
      const data = await postRequest("portfolio", {token: sessionStorage.getItem("token")});
      setPortfolio(data.positions);
      setUserName(data.username);
      setBalance(data.balance.toFixed(2));
      console.log(data)
    }
    getPositions();
  }, [setBalance])

  return (
    <div>
      <div>
        <h2>{username}</h2>
        <h2>Balance: ${balance}</h2>
        <div className="table" align="center">
          <TableContainer className={classes.tableContainer} component={Paper}>
            <Table className={classes.table} aria-label="customized table" align="center">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Ticker</StyledTableCell>
                  <StyledTableCell align="center">Shares</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {   portfolio.map((row) => (
                <StyledTableRow key={row[0]}>
                  <StyledTableCell align="center">{row[2]}</StyledTableCell>
                  <StyledTableCell align="center">{row[3]}</StyledTableCell>
                </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  )

}
export default Home;