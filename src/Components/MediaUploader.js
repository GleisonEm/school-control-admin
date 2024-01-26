import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Card, CardMedia, Button, Box } from '@mui/material';
import styled from '@emotion/styled';

const PreviewContainer = styled(Box)`
  margin-top: 20px;
  max-height: 400px; // Altura máxima do container
  overflow-y: auto; // Ativar scroll vertical
    scrollbar-width: none; /* para navegadores Firefox */
    -ms-overflow-style: none; /* para Internet Explorer e Edge */

    /* Para navegadores baseados em WebKit como Chrome, Safari, etc. */
    &::-webkit-scrollbar {
        display: none;
    }
  display: flex;
  flex-direction: column;
`;

const StyledCard = styled(Card)`
  max-width: 200px;
  max-height: 200px;
  margin-bottom: 10px; // Espaçamento entre os itens
`;

const Container = styled.div`
  margin: 20px;
`;

const MediaPreview = ({ file }) => {
    const [src, setSrc] = useState('');

    useEffect(() => {
        const fileReader = new FileReader();
        fileReader.onload = (e) => setSrc(e.target.result);
        fileReader.readAsDataURL(file);
    }, [file]);

    if (!file) return null;

    return (
        <StyledCard>
            {file.type.startsWith('image/') && (
                <CardMedia component="img" image={src} alt="" title='' />
            )}
            {file.type.startsWith('video/') && (
                <CardMedia component="video" controls src={src} />
            )}
        </StyledCard>
    );
};


const MediaUploader = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const validateFile = (file) => {
        // Exemplo de validação: tipos de arquivos e tamanho máximo (5MB)
        const validTypes = ['image/jpeg', 'image/png', 'video/mp4'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!validTypes.includes(file.type) || file.size > maxSize) {
            alert('Arquivo inválido. Por favor, selecione imagens (jpg, png) ou vídeos (mp4) com até 5MB.');
            return false;
        }

        return true;
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files).filter(validateFile);
        setSelectedFiles(files);
    };

    const handleSubmit = () => {
        console.log(selectedFiles);
        // Processamento dos arquivos aqui
    };

    return (
        <Container>
            <input
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleFileChange}
            />
            {selectedFiles.length > 0 && (
                <>
                    <PreviewContainer>
                        <List>
                            {selectedFiles.map((file, index) => (
                                <ListItem key={index}>
                                    <MediaPreview file={file} />
                                </ListItem>
                            ))}
                        </List>
                    </PreviewContainer>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Enviar Mídias
                    </Button>
                </>
            )}
        </Container>
    );
};

export default MediaUploader;
