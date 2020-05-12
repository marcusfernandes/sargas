import React, { useState, useEffect } from 'react';

import Table from 'react-bootstrap/Table';
import Pagination from 'react-js-pagination';
import { Container, Tollbar } from './styles';
import Button from '~/components/Button';
import { useUser } from '~/connection/User';
import ModalDialog from '~/components/ModalDialog';
import FormUser from '~/pages/User/FormUser';

export default function User() {
  const [users, setUsers] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [PerPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(10);
  const [deleteShow, setDeleteShow] = useState(false);
  const [formShow, setFormShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [update, setUpdate] = useState(false);
  const { deleteUser, getUsers } = useUser();

  function reset() {
    setFormShow(false);
    setDeleteShow(false);
    setUpdate(false);
    setSelectedUser({});
  }
  function handleClose() {
    reset();
  }

  function handleShow() {
    setDeleteShow(true);
  }

  function handleClick(user) {
    if (user) {
      setSelectedUser(user);
      setUpdate(true);
    }
    setFormShow(true);
  }

  useEffect(() => {
    async function loadUsers() {
      const response = await getUsers(activePage);
      setUsers(response.data);

      setActivePage(response.page);
      setPerPage(response.perPage);
      setTotal(response.total);
    }
    loadUsers();
  }, [activePage, deleteShow, formShow]);

  async function handlePageChange(pageNumber) {
    setActivePage(pageNumber);
  }

  function handleConfirm(user) {
    handleShow();
    setSelectedUser(user);
  }
  async function handleDestroy(user) {
    if (await deleteUser(user)) {
      handleClose();
    }
  }

  return (
    <Container>
      <Tollbar>
        <h4>Lista de Usuários</h4>
        <Button type="button" bg="primary" onClick={() => handleClick(false)}>
          Novo Usuário
        </Button>
      </Tollbar>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#Id</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Button
                  type="button"
                  bg="info"
                  onClick={() => handleClick(user)}
                >
                  Editar
                </Button>
                <Button
                  type="button"
                  bg="danger"
                  onClick={() => handleConfirm(user)}
                >
                  Deletar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={PerPage}
        totalItemsCount={Number(total)}
        pageRangeDisplayed={5}
        itemClass="page-item"
        linkClass="page-link"
        onChange={handlePageChange}
      />
      <ModalDialog
        show={deleteShow}
        onHide={handleClose}
        selectedUser={selectedUser}
        content={{
          title: 'Confirmação de Deleção',
          body: 'Deseja Realmente deletar o usuário:',
          confirmation: 'Deletar',
        }}
        handleAction={handleDestroy}
      />
      {formShow ? (
        <FormUser
          show={formShow}
          handleClose={handleClose}
          selectedUser={selectedUser}
          update={update}
        />
      ) : null}
    </Container>
  );
}
