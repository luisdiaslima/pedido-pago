import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  Grid,
  AppBar,
  Toolbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Paper,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import api from 'services/api';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';
import { useAuth } from 'hooks/auth';
import Modal from '../../components/Modal';
import { Container } from './styles';

import logoImg from '../../assets/logo.svg';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  svg: {
    color: '#A3A3A3',
    width: '50px',
    cursor: 'pointer',
  },
  avatar: {
    margin: theme.spacing(1),
    background: '#034AFD',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(5),
  },
  submit: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins',
    margin: theme.spacing(3, 0, 2),
    background: '#22E0A1',
    marginTop: theme.spacing(5),
    '&:hover': {
      background: '#034AFD',
    },
  },
  appbar: {
    alignItems: 'center',
    background: 'linear-gradient(90.17deg, #22E0A1 0%, #034AFD 100%)',
    boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)',
  },
  grid: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  },
}));

const Dashboard: React.FC = () => {
  const [categories, setCategories] = useState([
    { id: '', name: '', created_at: '' },
  ]);

  const classes = useStyles();
  const { jwt } = useAuth();
  api.defaults.headers.Authorization = `Bearer ${jwt}`;

  useEffect(() => {
    api.get('v2/store/category').then(response => {
      setCategories(response.data.items);
      setCategories(response.data.items);
    });
  }, [categories]);

  async function handleDelete(id: string): Promise<void> {
    try {
      api.delete(`v2/store/category/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container className={classes.container}>
      <AppBar color="default" className={classes.appbar}>
        <Toolbar>
          <img src={logoImg} alt="Logo" />
        </Toolbar>
      </AppBar>
      <CssBaseline />

      <Grid className={classes.grid}>
        <h1>Lista de Categorias</h1>
        <Modal />
      </Grid>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome da Categorias</TableCell>
              <TableCell align="right">Criação</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map(category => (
              <TableRow key={category.id}>
                <TableCell component="th" scope="row">
                  {category.name}
                </TableCell>
                <TableCell align="right">{category.created_at}</TableCell>
                <TableCell
                  align="right"
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'right',
                  }}
                >
                  <Link to={`edit/${category.id}`}>
                    <EditIcon />
                  </Link>

                  <HighlightOffIcon
                    className={classes.svg}
                    onClick={() => handleDelete(category.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Dashboard;
