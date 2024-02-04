import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import StudentService from '../services/Student';
import ClassService from '../services/Class'; // Supondo que existe um serviço para buscar as classes
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const CreateStudentForm = () => {
    const [student, setStudent] = useState({
        birth_date: '',
        parent_details: '',
        name: '',
        classId: ''
    });
    const [classes, setClasses] = useState([]); // Lista de classes disponíveis
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await ClassService.getAll(); // Supondo que esse método retorna todas as classes
                setClasses(response.data);
            } catch (error) {
                console.error('Erro ao buscar classes:', error);
            }
        };

        fetchClasses();
    }, []);

    const handleSnackbarOpen = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleChange = (event) => {
        setStudent({ ...student, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await StudentService.create({
                birth_date: student.birth_date,
                parent_details: student.parent_details,
                class_id: student.classId,
                name: student.name
            });

            if (response.ok) {
                console.log('Resposta do servidor:', response.data);
                handleSnackbarOpen('Aluno cadastrado com sucesso!', 'success');
            } else {
                console.error('Erro ao enviar os dados:', response.status);
                handleSnackbarOpen('Erro ao cadastrar aluno.', 'error');
            }
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
            handleSnackbarOpen('Erro na rede ou no servidor.', 'error');
        }
    };

    if (snackbarOpen) {
        return (
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        );
    }

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} style={{ marginTop: 100 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Nome"
                name="name"
                autoComplete="name"
                autoFocus
                value={student.name}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="birth_date"
                label="Data de Nascimento"
                name="birth_date"
                type="date"
                InputLabelProps={{
                    shrink: true,
                }}
                value={student.birth_date}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="parent_details"
                label="Detalhes dos Pais"
                name="parent_details"
                autoComplete="parent_details"
                multiline
                rows={4}
                value={student.parent_details}
                onChange={handleChange}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel id="class-label">Classe</InputLabel>
                <Select
                    labelId="class-label"
                    id="classId"
                    name="classId"
                    value={student.classId}
                    label="Classe"
                    onChange={handleChange}
                >
                    {classes.map((classItem) => (
                        <MenuItem key={classItem.id} value={classItem.id}>
                            {classItem.class_name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                endIcon={<SendIcon />}
                sx={{ mt: 3, mb: 2 }}
            >
                Cadastrar Aluno
            </Button>
        </Box>
    );
};

export default CreateStudentForm;
