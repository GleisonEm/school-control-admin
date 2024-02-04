import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import TeacherService from '../services/Teacher';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



const CreateTeacherForm = () => {
    const [teacher, setTeacher] = useState({
        name: '',
        email: '',
        qualifications: '',
        username: '',
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

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
        setTeacher({ ...teacher, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await TeacherService.create({
                name: teacher.name,
                email: teacher.email,
                qualifications: teacher.qualifications,
            });

            if (response.ok) {
                console.log('Resposta do servidor:', response.data);
                handleSnackbarOpen('Professor cadastrado com sucesso!', 'success');
            } else {
                console.error('Erro ao enviar os dados:', response.status);
                handleSnackbarOpen('Erro ao cadastrar professor.', 'error');
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

        )

    }
    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} style={{ marginTop: 100 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Usuário"
                name="username"
                autoComplete="username"
                autoFocus
                value={teacher.username}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Nome"
                name="name"
                autoComplete="name"
                autoFocus
                value={teacher.name}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                type='email'
                autoComplete="email"
                value={teacher.email}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="qualifications"
                label="Qualificações"
                name="qualifications"
                autoComplete="qualifications"
                multiline
                rows={4}
                value={teacher.qualifications}
                onChange={handleChange}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                endIcon={<SendIcon />}
                sx={{ mt: 3, mb: 2 }}
            >
                Cadastrar Professor
            </Button>
        </Box>
    );
};

export default CreateTeacherForm;
