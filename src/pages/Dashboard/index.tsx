import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  Grid,
  AppBar,
  Toolbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Paper,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import api from 'services/api';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';
import { useAuth } from 'hooks/auth';
import { Container, TableMotion } from './styles';
import ModalDeleteFood from '../../components/ModalDeleteFood';
import ModalEditCategory from '../../components/ModalEditCategory';

import logoImg from '../../assets/logo.svg';

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

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  submit: {
    width: '226px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins',
    borderRadius: '99px',
    textTransform: 'lowercase',
    background: '#22E0A1',
    '&:hover': {
      backgroundColor: '#034AFD',
    },
  },
  svg: {
    color: '#A3A3A3',
    width: '50px',
    cursor: 'pointer',
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
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [deletingCategory, setDeletingCategory] = useState<ICategory>(
    {} as ICategory,
  );
  const [editingCategory, setEditingCategory] = useState<ICategory>(
    {} as ICategory,
  );
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const classes = useStyles();
  const { jwt } = useAuth();

  useEffect(() => {
    async function loadCategories(): Promise<void> {
      const response = await api.get('/v2/store/category', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log(response.data.items);
      setCategories(response.data.items);
    }

    loadCategories();
  }, [jwt]);

  const handleDelete = useCallback(
    async (id: number) => {
      try {
        await api.delete(`v2/store/category/${id}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        setCategories(categories.filter(category => category.id !== id));
      } catch (err) {
        console.log(err);
      }
    },
    [jwt, categories],
  );

  const handleEdit = useCallback(
    async (category: IDataCategory, id: number) => {
      try {
        const response = await api.put(
          `v2/store/category/${id}`,
          {
            id,
            ...category,
          },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          },
        );

        const parsedResponse = JSON.parse(response.config.data);

        setCategories(
          categories.map(mappedCategory =>
            mappedCategory.id === id ? { ...parsedResponse } : mappedCategory,
          ),
        );
      } catch (err) {
        console.log(err);
      }
    },
    [jwt, categories],
  );

  function toggleDeleteModal(): void {
    setDeleteModalOpen(!deleteModalOpen);
  }

  function handleDeleteCategory(category: ICategory): void {
    setDeletingCategory(category);
    toggleDeleteModal();
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditCategory(category: ICategory): void {
    setEditingCategory(category);
    toggleEditModal();
  }

  return (
    <Container className={classes.container}>
      <ModalDeleteFood
        isOpen={deleteModalOpen}
        setIsOpen={toggleDeleteModal}
        deletingCategory={deletingCategory}
        handleDelete={handleDelete}
      />
      <ModalEditCategory
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingCategory={editingCategory}
        handleEdit={handleEdit}
      />
      <AppBar color="default" className={classes.appbar}>
        <Toolbar>
          <img src={logoImg} alt="Logo" />
        </Toolbar>
      </AppBar>
      <CssBaseline />

      <Grid className={classes.grid}>
        <h1>Lista de Categorias</h1>

        <Link to="create">
          <Button className={classes.submit} type="button">
            Criar uma nova categoria
          </Button>
        </Link>
      </Grid>

      <TableMotion animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nome das Categorias</TableCell>
                <TableCell align="right">Criação</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories &&
                categories.map(category => (
                  <TableRow key={category.id}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell align="right">{category.created_at}</TableCell>
                    <TableCell align="right">
                      <EditIcon onClick={() => handleEditCategory(category)} />

                      <HighlightOffIcon
                        className={classes.svg}
                        onClick={() => handleDeleteCategory(category)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TableMotion>
    </Container>
  );
};

export default Dashboard;
