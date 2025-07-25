import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addUser } from '../services/api/users';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`padding: 2rem;`;
const Title = styled.h2`font-size: 2rem; margin-bottom: 1rem;`;
const Form = styled.form`display: flex; flex-direction: column; gap: 1rem; max-width: 400px;`;
const Input = styled.input`padding: 0.5rem; border-radius: 6px; border: 1px solid #ccc;`;
const SubmitButton = styled.button`
  background: #2196f3;
  color: white;
  border: none;
  padding: 0.6rem;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #1976d2;
  }
`;

type FormValues = {
  name: string;
  email: string;
};

const AddUser: React.FC = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      navigate('/');
    },
  });

  return (
    <Container>
      <Title>➕ Add New User</Title>
      <Form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
        <Input {...register('name')} placeholder="Name" required />
        <Input {...register('email')} placeholder="Email" required />
        <SubmitButton type="submit">Add User</SubmitButton>
      </Form>
    </Container>
  );
};

export default AddUser;
