import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ClassService from '../services/Class';// Supondo que você tenha um serviço para lidar com classes
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const CreateClassForm = () => {
    const [classDetails, setClassDetails] = useState({
        class_name: '',
        academic_year: ''
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
        setClassDetails({ ...classDetails, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await ClassService.create(classDetails);

            if (response.ok) {
                console.log('Resposta do servidor:', response.data);
                handleSnackbarOpen('Classe cadastrada com sucesso!', 'success');
            } else {
                console.error('Erro ao enviar os dados:', response.status);
                handleSnackbarOpen('Erro ao cadastrar classe.', 'error');
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
                id="class_name"
                label="Nome da Classe"
                name="class_name"
                autoFocus
                value={classDetails.class_name}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="academic_year"
                label="Ano Acadêmico"
                name="academic_year"
                type="number"
                value={classDetails.academic_year}
                onChange={handleChange}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                endIcon={<SendIcon />}
                sx={{ mt: 3, mb: 2 }}
            >
                Cadastrar Classe
            </Button>
        </Box>
    );
};

export default CreateClassForm;
