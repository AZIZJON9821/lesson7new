import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUserById } from '../services/api/users';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
  max-width: 600px;
  margin: auto;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`text-align: center; margin-bottom: 1rem; color: #333;`;
const Info = styled.p`font-size: 1rem; margin-bottom: 0.8rem; color: #555;`;
const BackLink = styled(Link)`
  display: inline-block;
  margin-top: 1rem;
  text-decoration: none;
  color: #0077cc;
  &:hover {
    text-decoration: underline;
  }
`;

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);

  const { data: user, isLoading, isError } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !user) return <p>User not found.</p>;

  return (
    <Container>
      <Title>{user.name}</Title>
      <Info>📧 Email: {user.email}</Info>
      <BackLink to="/">← Back to Users</BackLink>
    </Container>
  );
};

export default UserDetails;
