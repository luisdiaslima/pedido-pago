import React, {
  SelectHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
}

const Select: React.FC<SelectProps> = ({ name, ...rest }) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  const { fieldName, error, registerField } = useField(name);
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
    </Container>
  );
};

export default Select;
