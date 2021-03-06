import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';

import {
  Grid,
  AppBar,
  Toolbar,
  Button,
  Avatar,
  CssBaseline,
  IconButton,
  CircularProgress,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import api from 'services/api';

import { useAuth } from 'hooks/auth';

import Input from '../../components/Input';
import Select from '../../components/Select';

import { Container, Paper, Loader } from './styles';
import logoImg from '../../assets/logo.svg';

interface CategoryFormData {
  name: string;
  description: string;
  visible: string;
}

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
  back: {
    marginRight: '150px',
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
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const { jwt } = useAuth();
  api.defaults.headers.Authorization = `Bearer ${jwt}`;

  const handleSubmit = useCallback(
    async (data: CategoryFormData) => {
      setLoading(true);
      try {
        const visible = data.visible === 'true';
        await api.post(
          'v2/store/category',
          {
            name: data.name,
            description: data.description,
            visible,
          },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          },
        );

        history.push('/dashboard');
      } catch (err) {
        if (err) {
          console.log(err);
        }
      } finally {
        setLoading(false);
      }
    },
    [history, jwt],
  );

  return (
    <Container>
      {loading && (
        <Loader>
          <CircularProgress />
        </Loader>
      )}

      <AppBar color="default" className={classes.appbar}>
        <Toolbar>
          <img src={logoImg} alt="Logo" />
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <Paper
        className={classes.paper}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
      >
        <IconButton onClick={history.goBack}>
          <ArrowBackIosIcon />
        </IconButton>
        <Grid className={classes.gridForm}>
          <Avatar className={classes.avatar}>
            <AddCircleIcon />
          </Avatar>
          <h1>Criar Categoria</h1>
          <p>Criar nova categoria em seu perfil</p>
        </Grid>

        <Form className={classes.form} onSubmit={handleSubmit}>
          <Input name="name" type="text" placeholder="Nome da categoria" />
          <Input
            name="description"
            type="text"
            placeholder="Uma descrição curta"
          />
          <Select name="visible">
            <option value="true">Visível</option>
            <option value="false">Não Visível</option>
          </Select>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Cadastrar
          </Button>
        </Form>
      </Paper>
    </Container>
  );
};

export default Edit;
