import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers, deleteUser } from '../services/api/users';
import styled from 'styled-components';

const Container = styled.div`padding: 2rem;`;
const Header = styled.div`display: flex; justify-content: space-between; margin-bottom: 2rem;`;
const Title = styled.h2`font-size: 2rem;`;
const AddButton = styled(Link)`
  background-color: #4caf50;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  text-decoration: none;

  &:hover {
    background-color: #388e3c;
  }
`;

const UserCard = styled.div`
  background: #ffffff;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;

  a {
    font-weight: 500;
    color: #333;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  button {
    background: red;
    color: white;
    border: none;
    padding: 0.3rem 0.7rem;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background: darkred;
    }
  }
`;

const UserList: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <Container>
      <Header>
        <Title>👥 Users</Title>
        <AddButton to="/add">➕ Add User</AddButton>
      </Header>
      {users.map((user) => (
        <UserCard key={user.id}>
          <Link to={`/users/${user.id}`}>{user.name}</Link>
          <button onClick={() => mutation.mutate(user.id!)}>❌</button>
        </UserCard>
      ))}
    </Container>
  );
};

export default UserList;
