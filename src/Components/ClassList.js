import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import ClassService from '../services/Class';

const ClassList = () => {
    // State para armazenar o id da sala de aula selecionada para exclusão
    const [selectedClassroomId, setSelectedClassroomId] = useState(null);
    const [classrooms, setClassrooms] = useState([]);

    const getClassrooms = async () => {
        try {
            const response = await ClassService.getAll(true); // Supondo que esse método retorna todas as salas de aula
            setClassrooms(response.data);
        } catch (error) {
            console.error('Erro ao buscar salas de aula:', error);
        }
    };

    useEffect(() => {
        getClassrooms();
    }, []);

    const handleDeleteClick = async (classroomId) => {
        setSelectedClassroomId(classroomId);
        try {
            await onDelete(classroomId);
        } catch (error) {
            console.error('Erro ao deletar sala de aula:', error);
        }
    };

    const onDelete = async (classroomId) => {
        try {
            const response = await ClassService.delete(classroomId); // Supondo que esse método exclui uma sala de aula
            if (response.ok) {
                setClassrooms(classrooms.filter((classroom) => classroom.id !== classroomId));
            }
        } catch (error) {
            console.error('Erro ao deletar sala de aula:', error);
            throw error; // Lança o erro novamente para que seja tratado no componente
        }
    };

    return (
        <TableContainer component={Paper} style={{ marginTop: 100 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>Turno</TableCell>
                        <TableCell>Ação</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {classrooms.map((classroom) => (
                        <TableRow key={classroom.id}>
                            <TableCell>{classroom.id}</TableCell>
                            <TableCell>{classroom.class_name}</TableCell>
                            <TableCell>{classroom.shift_name}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleDeleteClick(classroom.id)}
                                    disabled={selectedClassroomId === classroom.id}
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

export default ClassList;
