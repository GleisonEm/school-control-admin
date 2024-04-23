import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import TeacherService from '../services/Teacher';

const TeacherList = () => {
    // State para armazenar o id do professor selecionado para exclusão
    const [selectedProfessorId, setSelectedProfessorId] = useState(null);
    const [professors, setProfessors] = useState([])

    const getTeachers = async () => {
        try {
            const response = await TeacherService.getAll(); // Supondo que esse método retorna todas as classes
            setProfessors(response.data);
        } catch (error) {
            console.error('Erro ao buscar professores:', error);
        }
    };

    useEffect(() => {
        getTeachers();
    }, []);

    const handleDeleteClick = async (professorId, userId) => {
        setSelectedProfessorId(professorId);

        try {
            await onDelete(userId);
            setProfessors(professors.filter((professor) => professor.id !== professorId));
        } catch (error) {
            console.error('Erro ao deletar estudante:', error);
        }
    };

    const onDelete = async (professorId) => {
        try {
            await TeacherService.delete(professorId); // Supondo que esse método retorna todas as classes

        } catch (error) {
            throw error
        }
    }

    return (
        <TableContainer component={Paper} style={{ marginTop: 100 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Qualificações</TableCell>
                        <TableCell>Ação</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {professors.map((professor) => (
                        <TableRow key={professor.id}>
                            <TableCell>{professor.name}</TableCell>
                            <TableCell>{professor.qualifications}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleDeleteClick(professor.id, professor.user_id)}
                                    disabled={selectedProfessorId === professor.id}
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

export default TeacherList;
