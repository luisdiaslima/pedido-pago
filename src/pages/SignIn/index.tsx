import React, { useCallback, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { FiLock, FiUser, FiHeart } from 'react-icons/fi';

import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';

import { useAuth } from '../../hooks/auth';
import { Container, Footer, FooterCopyright, MadeInSp } from './styles';

import logoImg from '../../assets/logo.svg';

interface SignFormData {
  username: string;
  password: string;
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
      backgroundColor: '#034AFD',
    },
  },
  appbar: {
    alignItems: 'center',
    background: 'white',
    boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)',
  },
  grid: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const classes = useStyles();

  const { signIn } = useAuth();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignFormData) => {
      try {
        formRef.current?.setErrors({});

        // Validando o formulário com um schema
        const schema = Yup.object().shape({
          username: Yup.string().required('E-mail obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // Após a validação, chamar o método SignIn de dentro do AuthContext
        const response = await signIn({
          username: data.username,
          password: data.password,
        });
        console.log(response);
        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [signIn, history],
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
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <h1>Fazer logon</h1>
        <p>
          Ir para a interface administrativa da
{' '}
<span>Pedido Pago</span>
        </p>
        <Form className={classes.form} onSubmit={handleSubmit}>
          <Input
            icon={FiUser}
            name="username"
            type="username"
            placeholder="Username"
          />

          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Senha"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Entrar
          </Button>
          <Grid container className={classes.grid}>
            <Grid item xs>
              <Link to="#">
                <p>
                  Esqueceu sua senha?
{' '}
                  <label>
                    Recebe o link de troca de senha no email cadastrado
                  </label>
                </p>
              </Link>
            </Grid>
          </Grid>
        </Form>
      </div>
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

export default SignIn;
