import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { firestore } from '../../src/firebase';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
  background-color: #f0f4f8;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 2rem auto;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
`;

const Th = styled.th`
  padding: 1rem;
  border: 1px solid #ddd;
  background-color: #f4f4f4;
`;

const Td = styled.td`
  padding: 1rem;
  border: 1px solid #ddd;
`;

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', age: '', grade: '' });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const studentsCollection = collection(firestore, 'students');
    const snapshot = await getDocs(studentsCollection);
    const studentsList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setStudents(studentsList);
  };

  const addStudent = async (e) => {
    e.preventDefault();
    await addDoc(collection(firestore, 'students'), newStudent);
    setNewStudent({ name: '', age: '', grade: '' });
    fetchStudents();
  };

  return (
    <Container>
      <Title>Students</Title>
      <Form onSubmit={addStudent}>
        <Input
          type="text"
          placeholder="Name"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          required
        />
        <Input
          type="number"
          placeholder="Age"
          value={newStudent.age}
          onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
          required
        />
        <Input
          type="text"
          placeholder="Grade"
          value={newStudent.grade}
          onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
          required
        />
        <Button type="submit">Add Student</Button>
      </Form>
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Age</Th>
            <Th>Grade</Th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <Td>{student.name}</Td>
              <Td>{student.age}</Td>
              <Td>{student.grade}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default StudentsPage;
