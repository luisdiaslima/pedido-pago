import React, { useRef, useCallback } from 'react';

import {
  Grid,
  AppBar,
  Toolbar,
  Button,
  Avatar,
  CssBaseline,
  IconButton,
} from '@material-ui/core';

import { FormHandles } from '@unform/core';

import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Input from '../Input';
import { Form, ButtonContent } from './styles';
import Modal from '../Modal';

interface ICategory {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

interface IDataCategory {
  name: string;
  description: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleEdit: (category: IDataCategory, id: number) => void;
  editingCategory: ICategory;
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

const ModalEditCategory: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  editingCategory,
  handleEdit,
}) => {
  const classes = useStyles();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async data => {
      handleEdit(data, editingCategory.id);

      setIsOpen();
    },
    [handleEdit, setIsOpen, editingCategory.id],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <IconButton>
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

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="name"
          type="text"
          defaultValue={editingCategory ? editingCategory.name : ''}
          placeholder="Nome da categoria"
        />
        <Input
          name="description"
          type="text"
          defaultValue={editingCategory ? editingCategory.description : ''}
          placeholder="Uma descrição curta"
        />

        <Button type="submit" fullWidth className="edit">
          Editar
        </Button>
      </Form>
    </Modal>
  );
};

export default ModalEditCategory;
