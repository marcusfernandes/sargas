import { useToast } from '~/contexts/toast';
import api from '~/services/api';

function useAccess() {
  const { addToast } = useToast();

  async function getRecoveryToken(data, formRef) {
    try {
      formRef.current.setErrors({});

      const response = await api.post('/forgotpasswords', {
        email: data.email,
        redirect_url: `${process.env.REACT_APP_URL}/recuperar-senha`,
      });

      if (response) {
        addToast({
          type: 'success',
          title: 'Sucesso ao enviar',
          description: 'Enviamos um e-mail para recuperação',
        });

        return response.data;
      }
    } catch (err) {
      if (err.response.status === 404) {
        addToast({
          type: 'error',
          title: 'Erro ao enviar',
          description: err.response.data.error.message,
        });
      } else if (err.response.status === 400) {
        addToast({
          type: 'error',
          title: 'Erro ao enviar',
          description: err.response.data[0].message,
        });
      } else {
        addToast({
          type: 'error',
          title: 'Erro ao enviar',
          description: 'Ops, algo de errado aconteceu, tente novamente',
        });
      }
    }
  }

  async function resetPassword(data, formRef, token) {
    try {
      formRef.current.setErrors({});

      const response = await api.put('/forgotpasswords', {
        ...data,
        token,
      });
      if (response) {
        addToast({
          type: 'success',
          title: 'Sucesso ao alterar',
          description: 'Senha Alterada com sucesso!',
        });
        return response.data;
      }
    } catch (err) {
      if (err.response.status === 404) {
        addToast({
          type: 'error',
          title: 'Erro ao alterar',
          description: err.response.data.error.message,
        });
      } else if (err.response.status === 400) {
        addToast({
          type: 'error',
          title: 'Erro ao alterar',
          description: err.response.data[0].message,
        });
      } else {
        addToast({
          type: 'error',
          title: 'Erro ao alterar',
          description: 'Ops, algo de errado aconteceu, tente novamente',
        });
      }
    }
  }

  return { resetPassword, getRecoveryToken };
}

export { useAccess };
