import React, { useState } from 'react';
import { TextField, Button, Box, Divider, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import TeacherService from '../services/Teacher';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import PasswordInput from './PasswordInput';



const CreateTeacherForm = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [teacher, setTeacher] = useState({
        name: '',
        email: '',
        qualifications: '',
        username: '',
        cpf: '',
        password: password,
        rg: '',
        code: ''
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

    const handleCPFChange = (event) => {
        const { value } = event.target;

        let cpf = value.replace(/\D/g, '');

        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d{1,2})/, '$1-$2');
        cpf = cpf.substring(0, 14);

        setTeacher({
            ...teacher,
            [event.target.name]: cpf,
        });
    };

    const handleRGChange = (event) => {
        // Atualiza o estado
        setTeacher({
            ...teacher,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await TeacherService.create({
                name: teacher.name,
                email: teacher.email,
                qualifications: teacher.qualifications,
                username: teacher.username,
                cpf: teacher.cpf,
                password: password,
                rg: teacher.rg,
                code: teacher.code
            });

            if (response.ok) {
                console.log('Resposta do servidor:', response.data);
                handleSnackbarOpen('Professor cadastrado com sucesso!', 'success');
            } else {
                console.error('Erro ao enviar os dados:', response.status);
                handleSnackbarOpen(response.error, 'error');
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
            <Typography variant="h6" gutterBottom>
                Dados de Acesso
            </Typography>
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
            <PasswordInput setPassword={setPassword} setConfirmPassword={setConfirmPassword} confirmPassword={confirmPassword} password={password} />
            <TextField
                margin="normal"
                required
                fullWidth
                id="code"
                label="Cadastro Professor"
                name="code"
                autoComplete="code"
                autoFocus
                value={teacher.code}
                onChange={handleChange}
            />
            <Divider style={{ margin: '20px 0' }} />

            <Typography variant="h6" gutterBottom>
                Dados Pessoais
            </Typography>
            <TextField
                margin="normal"
                required
                fullWidth
                id="cpf"
                label="CPF"
                name="cpf"
                autoComplete="cpf"
                autoFocus
                value={teacher.cpf} // assumindo que o CPF está sendo armazenado na propriedade `cpf` do objeto `teacher`
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
                id="rg"
                label="RG"
                name="rg"
                autoComplete="rg"
                autoFocus
                value={teacher.rg} // assumindo que o CPF está sendo armazenado na propriedade `cpf` do objeto `teacher`
                onChange={handleRGChange}
                placeholder="0.000.000"
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
                label="Disciplinas"
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
