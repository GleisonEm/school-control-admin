import React, { useState } from 'react';
import { TextField, Button, Box, Divider, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AuthService from '../services/Auth'; // Importar o serviço para criar usuários
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import PasswordInput from './PasswordInput';

const CreateAdminForm = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [admin, setAdmin] = useState({
        name: '',
        email: '',
        username: '',
        cpf: '',
        rg: ''
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
        setAdmin({ ...admin, [event.target.name]: event.target.value });
    };

    const handleCPFChange = (event) => {
        const { value } = event.target;

        let cpf = value.replace(/\D/g, '');

        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d{1,2})/, '$1-$2');
        cpf = cpf.substring(0, 14);

        setAdmin({
            ...admin,
            [event.target.name]: cpf,
        });
    };

    const handleRGChange = (event) => {
        setAdmin({
            ...admin,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await AuthService.create({ // Alterar para a função que cria administradores
                name: admin.name,
                email: admin.email,
                username: admin.username,
                cpf: admin.cpf,
                rg: admin.rg,
                password: password, // A senha é tratada separadamente
                type: 'diretoria' // Definir o tipo como "diretoria" para administradores
            });

            if (response.ok) {
                console.log('Resposta do servidor:', response.data);
                handleSnackbarOpen('Administrador cadastrado com sucesso!', 'success');
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
                value={admin.username}
                onChange={handleChange}
            />
            <PasswordInput setPassword={setPassword} setConfirmPassword={setConfirmPassword} confirmPassword={confirmPassword} password={password} />
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
                value={admin.cpf}
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
                value={admin.rg}
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
                value={admin.name}
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
                value={admin.email}
                onChange={handleChange}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                endIcon={<SendIcon />}
                sx={{ mt: 3, mb: 2 }}
            >
                Cadastrar Administrador
            </Button>
        </Box>
    );
};

export default CreateAdminForm;
