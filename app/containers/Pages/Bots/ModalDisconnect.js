import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import { PostDisconnect } from '../../../api/n8n/Instances/PostDisconnect';

function RemoveModal({ open, onClose, selectedInstance,setSnackbarOpen,setMessage,setColorAlert}) {
  const { instanceName = '', profileName = '', number = '', sessão = '' } = selectedInstance ?? {};
  const [escolha, setRemove] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setRemove('');
  }, [open]);

  const handleChange = (event) => {
    setRemove(event.target.value);
  };

  const handleRemove = async () => {
    try {
      const jsonData = await PostDisconnect(selectedInstance, number, instanceName, profileName, escolha);

      if (jsonData && jsonData.status === 'OK') {
       
        
        selectedInstance.sessão = '――――';
        selectedInstance.status = 'Disponível'

        setMessage('WhatsApp desconectado com sucesso.');
        setColorAlert('rgb(0, 170, 255)');
        setSnackbarOpen(true);

        onClose(); // Fechar o modal
      }else if (jsonData.status='VAZIO') {
          
      } else {
        setMessage('Algo deu errado. Entre em contato com o suporte.');
        setColorAlert('rgb(255, 0, 59)');
        setSnackbarOpen(true);
      }

    } catch (error) {
      console.error('Erro ao remover a instância:', error);
    }
  };

  return (
    <>
      <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: 450, textAlign: 'left' }}>
          <Typography sx={{ marginBottom: '20px' }} id="modal-title" variant="h6" component="h2">
            Remover Instância
          </Typography>
          <div>
            <TextField
              sx={{ marginBottom: '20px', width: '100%' }}
              id="instanciaModalId"
              label="Instância"
              variant="outlined"
              type="text"
              value={instanceName}
              disabled
            />
            <TextField
              sx={{ marginBottom: '20px', width: '100%' }}
              id="whatsAppModalId"
              label="WhatsApp"
              variant="outlined"
              type="text"
              value={profileName}
              disabled
            />
            <TextField
              sx={{ marginBottom: '20px', width: '100%' }}
              id="numeroModalId"
              label="Número"
              variant="outlined"
              type="text"
              value={number}
              disabled
            />
           
            <FormControl sx={{ marginBottom: '20px', width: '100%' }} variant="outlined">
              <InputLabel id="remove-select-label">Escolha?</InputLabel>
              <Select
                labelId="remove-select-label"
                id="remove-select"
                value={escolha}
                onChange={handleChange}
                label="Escolha"
              >
                <MenuItem value={'Desconectar'}>Desconectar WhatsApp BOT</MenuItem>
                <MenuItem value={'Remover'} disabled>Remover da Plataforma</MenuItem>

              </Select>
            </FormControl>
          </div>
          <div style={{ marginTop: '30px', textAlign: 'right' }}>
            <Button sx={{ borderRadius: '2px', marginRight: '8px' }} variant="outlined" color='error' onClick={handleRemove} disabled={loading} startIcon={loading && <CircularProgress size={20} />}>
              Concluir
            </Button>

            <Button sx={{ borderRadius: '2px' }} variant="outlined" onClick={onClose} >
              Cancelar
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default RemoveModal;
