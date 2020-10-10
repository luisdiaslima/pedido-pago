import React, { useCallback, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import {
  Grid,
  AppBar,
  Toolbar,
  Button,
  Avatar,
  CssBaseline,
  IconButton,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import { Form } from '@unform/web';

import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import api from 'services/api';
import { useAuth } from 'hooks/auth';
import Input from '../../components/Input';

import { Container } from './styles';

import logoImg from '../../assets/logo.svg';

interface CategoryItem {
  created_at: number;
  description: string;
  id: number;
  name: string;
}

type idTransactionProp = {
  id: string;
};

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #f0f0f0',
    borderRadius: '10px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  avatar: {
    margin: theme.spacing(1),
    background: '#034AFD',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(5),
  },
  svg: {
    color: '#A3A3A3',
    width: '50px',
    cursor: 'pointer',
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
      backgroundColor: '#034AFD',
    },
  },
  grid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center !important',
  },
  appbar: {
    alignItems: 'center',
    background: 'linear-gradient(90.17deg, #22E0A1 0%, #034AFD 100%)',
    boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)',
  },
  gridForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center ',
  },
}));

const Edit: React.FC = () => {
  const classes = useStyles();
  const [categories, setCategories] = useState<CategoryItem>();

  const { id } = useParams<idTransactionProp>();
  const history = useHistory();
  const { jwt } = useAuth();

  useEffect(() => {
    api
      .get(`v2/store/category/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then(response => {
        setCategories(response.data);
      });
  }, [id, jwt]);

  const handleSubmit = useCallback(
    async (data: CategoryItem) => {
      try {
        await api.put(
          `v2/store/category/${id}`,
          {
            name: data.name,
            description: data.description,
          },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          },
        );
        history.push('/dashboard');
      } catch (err) {
        console.log(err);
      }
    },
    [jwt, id, history],
  );

  return (
    <Container>
      <AppBar color="default" className={classes.appbar}>
        <Toolbar>
          <img src={logoImg} alt="Logo" />
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <div className={classes.paper}>
        <IconButton onClick={history.goBack}>
          <ArrowBackIosIcon />
        </IconButton>
        <Grid className={classes.gridForm}>
          <Avatar className={classes.avatar}>
            <EditIcon />
          </Avatar>
          <h1>Editar Categoria</h1>
          <p>
            Edite sua categoria de acordo
            <span>com as credencias a baixo</span>
          </p>
        </Grid>

        <Form className={classes.form} onSubmit={handleSubmit}>
          <Input
            name="name"
            type="text"
            defaultValue={categories ? categories.name : ''}
            placeholder="Nome da categoria"
          />
          <Input
            name="description"
            type="text"
            defaultValue={categories ? categories.description : ''}
            placeholder="Uma descrição curta"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Editar
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Edit;
