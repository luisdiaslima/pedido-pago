import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Grid, AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { FiLock, FiUser, FiHeart } from 'react-icons/fi';

import api from 'services/api';
import Modal from '../../components/Modal';
import TableDashboard from '../../components/Table';

import { useAuth } from '../../hooks/auth';
import { Container, Footer, FooterCopyright, MadeInSp } from './styles';

import logoImg from '../../assets/logo.svg';

interface SignFormData {
  username: string;
  password: string;
}

interface Category {
  items: Array<string>;
  total_count: number;
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(-2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '2px solid #f0f0f0',
    borderRadius: '10px',
    padding: '45px',
    maxWidth: '450px',
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
  const formRef = useRef<FormHandles>(null);
  const [categories, setCategories] = useState([]);

  const classes = useStyles();

  const { signIn, jwt } = useAuth();
  const history = useHistory();

  useEffect(() => {
    api.get('v2/store/category').then(response => {
      setCategories(response.data);
      console.log(categories);
    });
  }, []);

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

      <TableDashboard />

      <Button className={classes.submit} onClick={handleSubmit}>
        Submiter
      </Button>
      <Footer>
        <FooterCopyright>
          <p>C 2020 Pedido Pago </p>
          <span>
            | Termos Gerais e Condições de Uso | Política de Privacidade
          </span>
        </FooterCopyright>
        <MadeInSp>
          <span>Feito com</span>
          &nbsp;
          <FiHeart />
          &nbsp;
          <span>em SP</span>
        </MadeInSp>
      </Footer>
    </Container>
  );
};

export default Dashboard;
