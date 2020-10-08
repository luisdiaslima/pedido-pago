import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Modal, Avatar, Button, Grid } from '@material-ui/core';
import { Form } from '@unform/web';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { FiLock, FiUser, FiHeart } from 'react-icons/fi';

import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Input from '../Input';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleSubmit() {
    console.log('oi');
  }

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        react-transition-group
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
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
        </Fade>
      </Modal>
    </div>
  );
}
