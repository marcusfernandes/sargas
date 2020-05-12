import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import api from '~/services/api';
import { useToast } from '~/contexts/toast';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const { addToast } = useToast();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('@SGAuth:user')) || null
  );

  useEffect(() => {
    const sotarageUser = localStorage.getItem('@SGAuth:user');
    const sotarageToken = localStorage.getItem('@SGAuth:token');

    if (sotarageUser && sotarageToken) {
      api.defaults.headers.Authorization = `bearer ${sotarageToken}`;
      setUser(JSON.parse(sotarageUser));
    }
  }, []);

  async function signIn(data, formRef) {
    try {
      formRef.current.setErrors({});

      const response = await api.post('/sessions', data);

      localStorage.setItem('@SGAuth:user', JSON.stringify(response.data.user));
      localStorage.setItem('@SGAuth:token', response.data.token.token);

      setUser(response.data.user);
      api.defaults.headers.Authorization = `Bearer ${response.data.token.token}`;
      return response.data;
    } catch (err) {
      if (err.response.status === 401) {
        addToast({
          type: 'error',
          title: 'Erro ao logar',
          description: err.response.data.error.message,
        });
      } else if (err.response.status === 404) {
        addToast({
          type: 'error',
          title: 'Erro ao logar',
          description: err.response.data.error.message,
        });
      } else if (err.response.status === 400) {
        addToast({
          type: 'error',
          title: 'Erro ao logar',
          description: err.response.data[0].message,
        });
      } else {
        addToast({
          type: 'error',
          title: 'Erro ao logar',
          description: 'Ops, algo de errado aconteceu, tente novamente',
        });
      }
      return false;
    }
  }

  function signOut() {
    localStorage.clear();
    setUser(null);
    return true;
  }

  function profile(changedUser) {
    localStorage.setItem('@SGAuth:user', JSON.stringify(changedUser));
    setUser(changedUser);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signIn, signOut, profile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

AuthProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
};

AuthProvider.defaultProps = {
  children: '',
};
