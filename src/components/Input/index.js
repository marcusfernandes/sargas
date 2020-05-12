import React, { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';
import ErrorMessagem from '~/components/ErrorMessage';

import { Label, Container } from './styles';

export default function Input({ name, label, icon, ...rest }) {
  const inputRef = useRef(null);
  const [isFocused, setFocused] = useState(false);
  const [isFilled, setFilled] = useState(false);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const handleInputBlur = useCallback(() => {
    setFocused(false);

    setFilled(!!inputRef.current?.value)

  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
        {icon}
        <input
          ref={inputRef}
          id={name}
          defaultValue={defaultValue}
          onFocus={() => setFocused(true)}
          onBlur={handleInputBlur}
          {...rest}
        />
        {error && (
          <ErrorMessagem title={error}>
            <FiAlertCircle size={15} />
          </ErrorMessagem>
        )}
      </Container>
    </>
  );
}

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
};
Input.defaultProps = {
  name: '',
  label: '',
};
