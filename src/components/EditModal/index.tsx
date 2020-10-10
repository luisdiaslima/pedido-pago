import React, { useState, useCallback } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Modal, Avatar, Button, Grid } from '@material-ui/core';

import { Form } from '@unform/web';

import { FiUser } from 'react-icons/fi';

import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useAuth } from 'hooks/auth';
import api from 'services/api';
import EditIcon from '@material-ui/icons/Edit';
import Input from '../Input';

export interface EditItem {
  id: number;
}

interface CategoryItem {
  created_at?: number;
  description: string;
  id?: number;
  name: string;
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
  const { jwt } = useAuth();

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryItem>({
    description: '',
    name: '',
    logo: '',
    store_id: '',
  });

  async function handleOpen(): Promise<void> {
    try {
      setOpen(true);
      const response = await api.get(`v2/store/category/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setCategories(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  function handleClose(): void {
    setOpen(false);
  }

  const handleSubmit = useCallback(
    async (data: CategoryItem) => {
      try {
        if (categories != null) {
          const response = await api.put(
            `v2/store/category/${categories?.id}`,
            {
              name: data.name,
              description: data.description,
              logo: data.logo,
              store_id: data.store_id,
            },
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            },
          );
          setCategories(response.data);
        } else {
          return;
        }
      } catch (err) {
        console.log(err);
      }
    },
    [categories],
  );

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
                <span>com as credencias a baixo</span>
              </p>
            </Grid>

            <Form className={classes.form} onSubmit={handleSubmit}>
              <Input
                icon={FiUser}
                name="name"
                type="text"
                defaultValue={categories ? categories.name : ''}
                placeholder="Nome da categoria"
              />
              <Input
                icon={FiUser}
                name="description"
                type="text"
                defaultValue={categories ? categories.description : ''}
                placeholder="Uma descrição curta"
              />

              <Grid className={classes.grid}>
                <Input
                  icon={FiUser}
                  name="store_id"
                  type="text"
                  defaultValue={categories ? categories.store_id : ''}
                  placeholder="Loja"
                />
              </Grid>

              <Input
                icon={FiUser}
                name="logo"
                defaultValue={categories ? categories.logo : ''}
                type="url"
                placeholder="URL do logo"
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
        </Fade>
      </Modal>
    </div>
  );
};

export default EditModal;
