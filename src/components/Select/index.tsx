import React, {
  SelectHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { useField } from '@unform/core';

import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import api from '../../services/api';
import { Container, Error } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
}

// Neste componente é utilizado o unform para lidar com dados do formulário

// eslint-disable-next-line react/prop-types
const Select: React.FC<SelectProps> = ({ name, ...rest }) => {
  // Referência do valor do meu campo select
  const jwt = localStorage.getItem('@PedidosPago:Authorization');
  api.defaults.headers.Authorization = `Bearer ${jwt}`;
  const selectRef = useRef<HTMLSelectElement>(null);

  const { fieldName, defaultValue, error, registerField } = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleSelectFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleSelectBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!selectRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      <select
        onFocus={handleSelectFocus}
        onBlur={handleSelectBlur}
        ref={selectRef}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Select;