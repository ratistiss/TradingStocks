import React, { useState, useEffect } from 'react';
import { postRequest } from './models';
import { useStateWithSessionStorage } from './models';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


function History() {
  const [transactions, setTransactions] = useState([]);

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
    const getTransactions = async () => {
      const data = await postRequest("transactions", {token: sessionStorage.getItem("token")});
      setTransactions(data.trades)
      console.log(data)
    }
    getTransactions();
  }, [])

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h2>Balance: ${sessionStorage.getItem("balance")}</h2>
      <div align="center">
        <TableContainer className={classes.tableContainer} component={Paper}>
            <Table className={classes.table} aria-label="customized table" align='center'>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Ticker</StyledTableCell>
                  <StyledTableCell align="center">Shares</StyledTableCell>
                  <StyledTableCell align="center">Price</StyledTableCell>
                  <StyledTableCell align="center">Buy/Sell</StyledTableCell>
                  <StyledTableCell align="center">Date</StyledTableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {   transactions.map((row) => (
                <StyledTableRow key={row[0]}>
                  <StyledTableCell align="center">{row[2]}</StyledTableCell>
                  <StyledTableCell align="center">{row[3]}</StyledTableCell>
                  <StyledTableCell align="center">{row[4]}</StyledTableCell>
                  <StyledTableCell align="center">{row[5] ? 'Buy' : 'Sell'}</StyledTableCell>
                  <StyledTableCell align="center">{new Date(row[6] * 1000).toLocaleString("en-US")}</StyledTableCell>
                </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </div>
      
    </div>
  )
}

export default History;