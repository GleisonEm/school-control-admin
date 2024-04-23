import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import StudentService from '../services/Student';

const StudentList = () => {
    // State para armazenar o id do estudante selecionado para exclusão
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [students, setStudents] = useState([]);

    const getStudents = async () => {
        try {
            const response = await StudentService.getAll(); // Supondo que esse método retorna todos os estudantes
            setStudents(response.data);
        } catch (error) {
            console.error('Erro ao buscar estudantes:', error);
        }
    };

    useEffect(() => {
        getStudents();
    }, []);

    const handleDeleteClick = async (studentId, userId) => {
        setSelectedStudentId(studentId);
        try {
            await onDelete(userId, studentId);
        } catch (error) {
            console.error('Erro ao deletar estudante:', error);
        }
    };

    const onDelete = async (userId, studentId) => {
        try {
            const response = await StudentService.delete(userId); // Supondo que esse método exclui um estudante
            if (response.ok) setStudents(students.filter((student) => student.id !== studentId));
        } catch (error) {
            console.error('Erro ao deletar estudante:', error);
            throw error; // Lança o erro novamente para que seja tratado no componente
        }
    };

    return (
        <TableContainer component={Paper} style={{ marginTop: 100 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Turma</TableCell>
                        <TableCell>Ação</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.map((student) => (
                        <TableRow key={student.id}>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.class_name + ' - ' + student.shift_name}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleDeleteClick(student.id, student.user_id)}
                                    disabled={selectedStudentId === student.id}
                                >
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default StudentList;
