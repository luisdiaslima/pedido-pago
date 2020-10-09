import React, { useState, useCallback, useRef, useEffect } from 'react';
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
import api from 'services/api';
import { IndexType } from 'typescript';
import EditIcon from '@material-ui/icons/Edit';
import { useCategory } from '../../hooks/category';
import Input from '../Input';
import Select from '../Select';

import getValidationErrors from '../../utils/getValidationErrors';

export interface EditItem {
  id: string;
}

interface CategoryItem {
  callcenter: {
    status: boolean;
    from: number;
  };
  created_at: number;
  description: string;
  ecommerce: {
    status: boolean;
    from: number;
  };
  id: string;
  is_root: boolean;
  name: string;
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
  gridForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center ',
  },
}));

const EditModal: React.FC<EditItem> = (id: EditItem) => {
  const formRef = useRef<FormHandles>(null);
  const { getCategory } = useCategory();

  const { jwt } = useAuth();
  api.defaults.headers.Authorization = `Bearer ${jwt}`;

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryItem>();

  async function handleOpen(): Promise<void> {
    try {
      setOpen(true);
      const response = await getCategory(id);
      setCategories(response.data);
      console.log(response.data); // Isto retorna um objeto

      console.log(categories); // Isto retorna um objeto vazio
    } catch (err) {
      console.log(err);
    }
  }

  function handleClose(): void {
    setOpen(false);
  }

  async function handleSubmit(): Promise<void> {
    console.log('testando');
  }

  return (
    <div>
      <EditIcon className={classes.svg} type="button" onClick={handleOpen}>
        Criar uma nova categoria
      </EditIcon>
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
                <EditIcon />
              </Avatar>
              <h1>Editar Categoria</h1>
              <p>
                Edite sua categoria de acordo
{' '}
                <span>com as credencias a baixo</span>
              </p>
            </Grid>

            <Form className={classes.form} onSubmit={handleSubmit}>
              <Input
                icon={FiUser}
                name="name"
                type="text"
                value={categories ? categories.name : ''}
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

export default EditModal;
