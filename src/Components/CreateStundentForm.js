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
        address: '',
        name: '',
        classId: '',
        cpf: '',
        school_grade: '',
        shift: 'Matutino'
    });
    const [classes, setClasses] = useState([]); // Lista de classes disponíveis
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await ClassService.getAll(true); // Supondo que esse método retorna todas as classes
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
        console.log(student);
        setStudent({ ...student, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await StudentService.create({
                birth_date: student.birth_date,
                parent_details: student.parent_details,
                class_id: student.classId,
                name: student.name,
                address: student.address,
                cpf: student.cpf,
                school_grade: student.school_grade,

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

    const handleCPFChange = (event) => {
        const { value } = event.target;

        let cpf = value.replace(/\D/g, '');

        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d{1,2})/, '$1-$2');
        cpf = cpf.substring(0, 14);

        setStudent({
            ...student,
            [event.target.name]: cpf,
        });
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
                id="cpf"
                label="CPF"
                name="cpf"
                autoComplete="cpf"
                autoFocus
                value={student.cpf}
                onChange={handleCPFChange}
                inputProps={{
                    maxLength: 14
                }}
                placeholder="000.000.000-00"
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
                id="address"
                label="Endereço"
                name="address"
                autoComplete="address"
                multiline
                rows={4}
                value={student.address}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="school_grade"
                label="Série"
                name="school_grade"
                autoComplete="school_grade"
                autoFocus
                value={student.school_grade}
                onChange={handleChange}
            />
            {/* <FormControl fullWidth margin="normal" required>
                <InputLabel id="shift-label">Turno</InputLabel>
                <Select
                    labelId="shift-label"
                    id="shift"
                    name="shift"
                    value={student.shift}
                    label="Turno"
                    onChange={handleChange}
                >
                    <MenuItem value="Matutino">Matutino</MenuItem>
                    <MenuItem value="Vespertino">Vespertino</MenuItem>
                    <MenuItem value="Noturno">Noturno</MenuItem>
                </Select>
            </FormControl> */}
            <FormControl fullWidth margin="normal" required>
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
                            {classItem.class_name} - {classItem.shift_name}
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
