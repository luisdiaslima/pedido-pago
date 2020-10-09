import React, { useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Modal, Avatar, Button, Grid } from '@material-ui/core';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import AddCircleIcon from '@material-ui/icons/AddCircle';

import { FiLock, FiUser } from 'react-icons/fi';

import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import * as Yup from 'yup';
import { useAuth } from 'hooks/auth';
import api from 'services/api';
import { useCategory } from '../../hooks/category';
import Input from '../Input';
import Select from '../Select';
import getValidationErrors from '../../utils/getValidationErrors';

interface CategoryFormData {
  name: string;
  description: string;
  logo: string;
  store_id: string;
}

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
    alignItems: 'center',
    justifyContent: 'center !important',
  },
  gridForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center ',
  },
}));

const FormModal: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { createCategory } = useCategory();
  const { jwt } = useAuth();
  api.defaults.headers.Authorization = `Bearer ${jwt}`;

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  function handleOpen(): void {
    setOpen(true);
  }

  function handleClose(): void {
    setOpen(false);
  }

  const handleSubmit = useCallback(
    async (data: CategoryFormData) => {
      try {
        const response = await createCategory({
          name: data.name,
          description: data.description,
          logo: data.logo,
          store_id: data.store_id,
        });
        console.log(response);
      } catch (err) {
        if (err) {
          console.log(err);
        }
      }
    },
    [jwt],
  );

  return (
    <div>
      <Button className={classes.submit} type="button" onClick={handleOpen}>
        Criar uma nova categoria
      </Button>
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

              <Grid className={classes.grid}>
                <Input name="store_id" type="text" placeholder="Loja" />
                <Select name="visible">
                  <option aria-label="None" value="">
                    Visível p/ clientes
                  </option>
                  <option value="true">Sim</option>
                  <option value="false">Não</option>
                </Select>
              </Grid>

              <Input
                name="logo"
                type="text"
                placeholder="URL do logo"
                formNoValidate
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                Cadastrar
              </Button>
            </Form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default FormModal;
