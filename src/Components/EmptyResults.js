import React from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px', // Ajuste a altura conforme necessário
    width: '100%', // Define a largura para ocupar todo o espaço disponível
    border: '1px solid #ccc', // Adiciona uma borda para se parecer com uma tabela
    borderRadius: '4px', // Arredonda as bordas
    backgroundColor: '#f0f0f0', // Cor de fundo
  },
});

const EmptyTableMessage = ({ message }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h6" align="center">
        {message}
      </Typography>
    </div>
  );
};

export default EmptyTableMessage;
