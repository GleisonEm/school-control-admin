import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ClassService from '../services/Class';// Supondo que você tenha um serviço para lidar com classes
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ShiftService from '../services/Shift';

const CreateClassForm = () => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [shifts, setShifts] = useState([]);
    const [selectedShift, setSelectedShift] = useState('');
    const [classDetails, setClassDetails] = useState({
        class_name: '',
        academic_year: '',
        shift_id: selectedShift
    });

    useEffect(() => {
        const fetchShifts = async () => {
            try {
                const response = await ShiftService.getAll(); // Método para obter todos os turnos
                setShifts(response.data);
            } catch (error) {
                console.error('Erro ao buscar turnos:', error);
            }
        };

        fetchShifts();
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
        setClassDetails({ ...classDetails, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {

        if (selectedShift == '') {
            handleSnackbarOpen('Por favor, selecione um turno.', 'error');
            return;
        }

        event.preventDefault();
        try {
            const response = await ClassService.create({...classDetails, shift_id: selectedShift});

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

    const handleShiftChange = (event) => {
        setSelectedShift(event.target.value);
    };

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
            <FormControl fullWidth margin="normal">
                <InputLabel id="shift-label">Turno</InputLabel>
                <Select
                    labelId="shift-label"
                    id="shift"
                    name="shift"
                    value={selectedShift}
                    label="Turno"
                    onChange={handleShiftChange}
                    required
                >
                    {shifts.map((shift) => (
                        <MenuItem key={shift.id} value={shift.id}>{shift.name}</MenuItem>
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
                Cadastrar Classe
            </Button>
        </Box>
    );
};

export default CreateClassForm;
