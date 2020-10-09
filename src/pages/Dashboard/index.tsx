import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import api from 'services/api';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditModal from 'components/EditModal';
import Modal from '../../components/Modal';
import { useCategory } from '../../hooks/category';
import { Container, Footer, FooterCopyright, MadeInSp } from './styles';

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

interface CategoryItem {
  id: number;
  name: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [categories, setCategories] = useState<CategoryItem[]>([]);

  const classes = useStyles();
  const { removeCategory } = useCategory();

  const jwt = localStorage.getItem('@PedidosPago:Authorization');
  api.defaults.headers.Authorization = `Bearer ${jwt}`;

  useEffect(() => {
    api.get('v2/store/category').then(response => {
      setCategories(response.data.items);
    });
  }, [categories]);

  async function handleDelete(id: number): Promise<void> {
    try {
      const response = await removeCategory(id);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSubmit(): Promise<void> {
    try {
      formRef.current?.setErrors({});
      await api.post('/v2/store/category', {
        name: 'Roupas',
        callcenter: {
          from: 2,
          status: true,
        },
        description: 'roupas...',
        ecommerce: {
          from: 4,
          status: true,
        },
        keywords: ['teste', 'teste1'],
        keywords_concat: 'teste0',
        logo: 'www.teste.com',
        logo_content_type: 'url',
        position: 2,
        parent_id: 9,
        store_id: '388747374j',
        products: ['blusa'],

        visible: true,
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
            {categories.map((category, index) => (
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
                  <EditModal id={category.id} />
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

      <Button className={classes.submit} onClick={handleSubmit}>
        Submiter
      </Button>
    </Container>
  );
};

export default Dashboard;
