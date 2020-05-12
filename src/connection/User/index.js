import api from '~/services/api';
import { useToast } from '~/contexts/toast';

function useUser() {
  const { addToast } = useToast();

  async function getUsers(activePage) {
    const response = await api.get('/users', {
      params: {
        page: activePage,
      },
    });

    return response.data;
  }

  async function getUser(id) {
    const response = await api.get(`/users/${id}`);

    return response.data;
  }

  async function storeUser(data) {
    try {
      const response = await api.post('/users', data);
      addToast({
        type: 'success',
        title: 'Sucesso ao cadastrar',
        description: 'Usuário cadastrado com sucesso',
      });

      return response;
    } catch (err) {
      if (err.response.status === 404) {
        addToast({
          type: 'error',
          title: 'Erro ao cadastrar',
          description: err.response.data.error.message,
        });
      } else if (err.response.status === 400) {
        addToast({
          type: 'error',
          title: 'Erro ao cadastrar',
          description: err.response.data[0].message,
        });
      } else {
        addToast({
          type: 'error',
          title: 'Erro ao cadastrar',
          description: 'Ops, algo de errado aconteceu, tente novamente',
        });
      }
    }
  }

  async function updateUser(data, id) {
    try {
      const response = await api.put(`/users/${id}`, data);
      addToast({
        type: 'success',
        title: 'Sucesso ao editar',
        description: 'Usuário editado com sucesso',
      });
      return response;
    } catch (err) {
      if (err.response.status === 404) {
        addToast({
          type: 'error',
          title: 'Erro ao cadastrar',
          description: err.response.data.error.message,
        });
      }
      if (err.response.status === 400) {
        addToast({
          type: 'error',
          title: 'Erro ao cadastrar',
          description: err.response.data[0].message,
        });
        return false;
      }
      addToast({
        type: 'error',
        title: 'Erro ao cadastrar',
        description: 'Ops, algo de errado aconteceu, tente novamente',
      });
    }
  }

  async function storeSignature(data) {
    try {
      const dataForm = new FormData();

      dataForm.append('file', data);

      const response = await api.post('files', dataForm);

      return response.data;
    } catch (err) {
      if (err.response.status === 404) {
        addToast({
          type: 'error',
          title: 'Erro ao cadastrar',
          description: err.response.data.error.message,
        });
      } else if (err.response.status === 400) {
        addToast({
          type: 'error',
          title: 'Erro ao cadastrar',
          description: err.response.data[0].message,
        });
      } else {
        addToast({
          type: 'error',
          title: 'Erro ao cadastrar',
          description: 'Ops, algo de errado aconteceu, tente novamente',
        });
      }
    }
  }

  async function updatePassword(data) {
    try {
      const response = await api.put('passwords', data);

      addToast({
        type: 'success',
        title: 'Sucesso ao editar',
        description: 'Senha alterada com sucesso',
      });
      return response.data;
    } catch (err) {
      if (err.response.status === 404) {
        addToast({
          type: 'error',
          title: 'Erro ao cadastrar',
          description: err.response.data.error.message,
        });
      } else if (err.response.status === 400) {
        addToast({
          type: 'error',
          title: 'Erro ao cadastrar',
          description: err.response.data[0].message,
        });
      } else {
        addToast({
          type: 'error',
          title: 'Erro ao cadastrar',
          description: 'Ops, algo de errado aconteceu, tente novamente',
        });
      }
    }
  }

  async function deleteUser(id) {
    try {
      const response = await api.delete(`/users/${id}`);
      addToast({
        type: 'success',
        title: 'Sucesso ao deletar',
        description: 'Usuário deletado com sucesso',
      });
      return response;
    } catch (err) {
      if (err.response.status === 404) {
        addToast({
          type: 'error',
          title: 'Erro ao deletar',
          description: err.response.data.error.message,
        });
      } else if (err.response.status === 400) {
        addToast({
          type: 'error',
          title: 'Erro ao deletar',
          description: err.response.data[0].message,
        });
      } else {
        addToast({
          type: 'error',
          title: 'Erro ao deletar',
          description: 'Ops, algo de errado aconteceu, tente novamente',
        });
      }
    }
  }

  return {
    deleteUser,
    updatePassword,
    updateUser,
    getUser,
    getUsers,
    storeUser,
    storeSignature,
  };
}

export { useUser };
