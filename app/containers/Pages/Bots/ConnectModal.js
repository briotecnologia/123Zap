import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchDataFromAPI } from './GetRedisDisponivel';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { post } from './connectInstancePost';

function ConnectModal({ open, onClose,setSnackbarOpen,setMessage,setColorAlert, selectedInstance }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');
  const [statusError, setStatusError] = useState('');
  const { instanceName = '', profileName = '', number = '', sessão = '' } = selectedInstance ?? {};
  
  useEffect(() => {
    async function fetchData() {
      try {
        const jsonData = await fetchDataFromAPI();
        setStatusError(jsonData.status);
        if (jsonData.status === 'OK') {
          setData(jsonData.data);
        }
      } catch (error) {
        console.error('Erro ao obter dados da API:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [open]);

  useEffect(() => {
    setSelectedSession('');
    setStatusError('');
    setLoading(true);
  }, [open]);

  const handleChange = (event) => {
    setSelectedSession(event.target.value);
  };

  const handleConnect = async () => {
    try {
      const jsonData = await post(selectedSession, selectedInstance, number, instanceName, profileName,setSnackbarOpen,setMessage,setColorAlert);

      if (jsonData && jsonData.status === 'OK') {
        selectedInstance.sessão = 'Sessão '+selectedSession;
        selectedInstance.status = 'Conectada'

        onClose(); // Fechar o modal
      }
      

    } catch (error) {
      console.error('Erro ao conectar à instância:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: 450 }}>
        <Typography id="modal-title" variant="h6" component="h2">
          Conectar Instância
        </Typography>
        {loading ? (
          <div style={{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
            <CircularProgress />
          </div>
        ) : (
          <>
            {statusError !== 'OK' ? (
              <>
                {statusError !== '' && (
                  <Alert sx={{ marginTop: '30px' }} severity="error">
                    {statusError}
                  </Alert>
                )}
                <div style={{ marginTop: '30px', textAlign: 'right' }}>
                  <Button color="error" sx={{ borderRadius: '2px' }} variant="outlined" onClick={onClose}>
                    Cancelar
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div>

                  <TextField
                    sx={{ marginBottom: '20px', marginTop: '20px', width: '100%' }}
                    id="instanciaModalId"
                    label="Instancia"
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
                    label="Numero"
                    variant="outlined"
                    type="text"
                    value={number}
                    disabled
                  />
                  <FormControl fullWidth >
                    <InputLabel id="instance-label">Escolha a sessão</InputLabel>
                    <Select labelId="instance-label" id="instance-select" value={selectedSession} onChange={handleChange}>
                      {data.map((item) => (
                        <MenuItem key={item.session} value={item.session}>
                          Sessão {item.session} - {item.instance}
                        </MenuItem>
                      ))}
                    </Select >
                  </FormControl>

                
                </div>
                <div style={{ marginTop: '30px', textAlign: 'right' }}>
                  <Button sx={{ borderRadius: '2px', marginRight: '8px' }} variant="outlined" onClick={handleConnect}>
                    Confirmar
                  </Button>
                  <Button color="error" sx={{ borderRadius: '2px' }} variant="outlined" onClick={onClose}>
                    Cancelar
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </Box>
    </Modal>
  );
}

export default ConnectModal;
