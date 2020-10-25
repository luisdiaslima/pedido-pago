import React, { useRef, useCallback } from 'react';

import { FormHandles } from '@unform/core';
import { Button } from '@material-ui/core';
import { Form, ButtonContent } from './styles';
import Modal from '../Modal';

interface ICategory {
  id: number;
  name: string;
  created_at: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleDelete: (id: number) => void;
  deletingCategory: ICategory;
}

const ModalDeleteFood: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  deletingCategory,
  handleDelete,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async () => {
    handleDelete(deletingCategory.id);

    setIsOpen();
  }, [handleDelete, setIsOpen, deletingCategory.id]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        initialData={deletingCategory}
      >
        <h1>Deletar Categoria</h1>

        <span>
          Você tem certeza que deseja deletar a categoria
{' '}
          {deletingCategory.name}?
        </span>
        <ButtonContent>
          <Button onClick={setIsOpen}>
            <span>cancelar</span>
          </Button>
          <Button className="delete" type="submit">
            <span>Deletar</span>
          </Button>
        </ButtonContent>
      </Form>
    </Modal>
  );
};

export default ModalDeleteFood;
