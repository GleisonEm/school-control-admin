import React, { useState } from 'react';
import { TextField, Button, Box, Snackbar, Alert } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ShiftService from '../services/Shift';

const CreateShiftForm = () => {
    const [shiftDetails, setShiftDetails] = useState({ name: '' });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleSnackbarOpen = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleChange = (event) => {
        setShiftDetails({ ...shiftDetails, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await ShiftService.create(shiftDetails);

            if (response.ok) {
                console.log('Resposta do servidor:', response.data);
                handleSnackbarOpen('Turno cadastrado com sucesso!', 'success');
            } else {
                console.error('Erro ao enviar os dados:', response.status);
                handleSnackbarOpen('Erro ao cadastrar turno.', 'error');
            }
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
            handleSnackbarOpen('Erro na rede ou no servidor.', 'error');
        }
    };

    return (
        <>
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

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} style={{ marginTop: 100 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Nome do Turno"
                    name="name"
                    autoFocus
                    value={shiftDetails.name}
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    endIcon={<SendIcon />}
                    sx={{ mt: 3, mb: 2 }}
                >
                    Cadastrar Turno
                </Button>
            </Box>
        </>
    );
};

export default CreateShiftForm;
