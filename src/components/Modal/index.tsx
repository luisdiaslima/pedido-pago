import React, { useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Modal, Avatar, Button, Grid } from '@material-ui/core';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { FiLock, FiUser } from 'react-icons/fi';

import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import * as Yup from 'yup';
import { useAuth } from 'hooks/auth';
import { useCategory } from '../../hooks/category';
import Input from '../Input';
import Select from '../Select';
import getValidationErrors from '../../utils/getValidationErrors';

interface CategoryFormData {
  name: string;
  description: string;
  ecommerce_from: string;
  ecommerce_status: boolean;
  callcenter_from: string;
  callcenter_status: boolean;

  keywords_concat: string;
  logo: string;
  logo_content_type: string;
  position: number;
  store_id: string;
  visible: boolean;
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
}));

const FormModal: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { createCategory } = useCategory();
  const { jwt } = useAuth();

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
        console.log('indo fazer o create');

        const response = await createCategory({
          callcenter: {
            from: data.callcenter_from,
            status: data.callcenter_status,
          },
          ecommerce: {
            from: data.ecommerce_from,
            status: data.ecommerce_status,
          },
          description: data.description,
          keywords_concat: data.keywords_concat,
          logo: data.logo,
          logo_content_type: data.logo_content_type,
          name: data.name,
          position: data.position,
          store_id: data.store_id,
          visible: data.visible,
          jwt,
        });
        console.log(response);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [createCategory],
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
                name="name"
                type="text"
                placeholder="Nome da categoria"
              />
              <Input
                icon={FiUser}
                name="description"
                type="text"
                placeholder="Uma descrição curta"
              />
              <Grid className={classes.grid}>
                <Input
                  icon={FiUser}
                  name="callcenter_from"
                  type="number"
                  placeholder="Quentidade de callcenters"
                />
                <Select name="callcenter_status">
                  <option aria-label="None" value="">
                    Disponibilidade
                  </option>
                  <option value="true">Sim</option>
                  <option value="false">Não</option>
                </Select>
              </Grid>

              <Grid className={classes.grid}>
                <Input
                  icon={FiUser}
                  name="ecommerce_from"
                  type="number"
                  placeholder="Quantidade de e-commerces"
                />
                <Select name="ecommerce_status">
                  <option aria-label="None" value="">
                    Disponibilidade
                  </option>
                  <option value="true">Sim</option>
                  <option value="false">Não</option>
                </Select>
              </Grid>

              <Input
                icon={FiUser}
                name="keywords"
                type="text"
                placeholder="Separe suas keys por vírgulas"
              />

              <Grid className={classes.grid}>
                <Input
                  icon={FiUser}
                  name="store_id"
                  type="text"
                  placeholder="Loja"
                />
                <Select name="visible">
                  <option aria-label="None" value="">
                    Visível p/ clientes
                  </option>
                  <option value="true">Sim</option>
                  <option value="false">Não</option>
                </Select>
              </Grid>

              <Grid className={classes.grid}>
                <Input
                  icon={FiUser}
                  name="logo"
                  type="url"
                  placeholder="URL do logo"
                />

                <Input
                  icon={FiUser}
                  name="logo_content_type"
                  type="text"
                  placeholder="Tipo da imagem"
                />
              </Grid>

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
