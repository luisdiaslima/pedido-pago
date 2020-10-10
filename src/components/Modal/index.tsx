import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { useAuth } from 'hooks/auth';
import api from 'services/api';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
}));

const FormModal: React.FC = () => {
  const { jwt } = useAuth();
  api.defaults.headers.Authorization = `Bearer ${jwt}`;

  const classes = useStyles();
  const history = useHistory();

  function handleOpen(): void {
    history.push('create');
  }

  return (
    <div>
      <Button className={classes.submit} type="button" onClick={handleOpen}>
        Criar uma nova categoria
      </Button>
    </div>
  );
};

export default FormModal;
