import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';
import { Container, Label, ReactSelectComponent } from './styles';
import ErrorMessagem from '~/components/ErrorMessage';

function Select({ name, label, options, ...rest }) {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'state.value',
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <Container isErrored={!!error}>
        <ReactSelectComponent
          defaultValue={
            defaultValue &&
            options.find((option) => option.value === defaultValue)
          }
          options={options}
          ref={selectRef}
          classNamePrefix="react-select"
          {...rest}
        />
        {error && (
          <span>
            <ErrorMessagem title={error}>
              <FiAlertCircle size={15} />
            </ErrorMessagem>
          </span>
        )}
      </Container>
    </>
  );
}

Select.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
};
Select.defaultProps = {
  name: '',
  label: '',
};

export default Select;
