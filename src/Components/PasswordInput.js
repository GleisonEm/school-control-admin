import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

function PasswordInput({ setPassword, setConfirmPassword, password, confirmPassword }) {
  const [error, setError] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    // Verifica se as senhas coincidem quando a senha é alterada
    setError(event.target.value !== confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    // Verifica se as senhas coincidem quando a confirmação da senha é alterada
    setError(password !== event.target.value);
  };

  return (
    <div>
      <TextField
        margin="normal"
        required
        fullWidth
        id="password"
        label="Senha"
        name="password"
        type="password"
        autoComplete="new-password"
        autoFocus
        value={password}
        onChange={handlePasswordChange}
        error={error}
        helperText={error ? "As senhas não coincidem." : ""}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="confirm-password"
        label="Confirmar Senha"
        name="confirmPassword"
        type="password"
        autoComplete="new-password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        error={error}
        helperText={error ? "As senhas não coincidem." : ""}
      />
    </div>
  );
}

export default PasswordInput;
