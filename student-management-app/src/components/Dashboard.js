import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase'; // Adjust path to firebase.js
import { Outlet, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #f0f4f8;
  animation: ${fadeIn} 1s ease-in-out;
`;

const Sidebar = styled.div`
  width: 10rem;
  height: 100%;
  background-color: white;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  animation: ${fadeIn} 1.5s ease-in-out;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  margin-top: 4rem;
  margin-bottom: 1rem;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2c5282;
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: #edf2f7;
  animation: ${fadeIn} 2s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error');
    }
  };

  return (
    <Container>
      <Sidebar>
        <Button onClick={() => navigate('/dashboard/students')}>
          Students
        </Button>
        <Button onClick={handleLogout}>
          Logout
        </Button>
      </Sidebar>
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
};

export default Dashboard;