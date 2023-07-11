import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { PostAddInstance } from '../../../api/n8n/Instances/PostAddInstance';
import { PostCheckInstance }from '../../../api/n8n/Instances/PostCheckInstance';

function AddInstanceModal({ open, onClose, setSnackbarOpen, setMessage, setColorAlert }) {
  const [instance, setInstance] = useState('');
  const [exibirQrCode, setExibirQrCode] = useState(false);
  const [qrcode, setQrcode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);

  const handleAdicionar = async () => {
    try {
      setIsLoading(true);
      const jsonData = await PostAddInstance(instance);

      console.log(jsonData);
      if (jsonData && jsonData.status === 'OK') {
        setExibirQrCode(true);
        setQrcode(jsonData.base64);
      }
    } catch (error) {
      console.error('Erro ao conectar à instância:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {

    setCountdown(30);
    setInstance('');
    setExibirQrCode(false);
    setQrcode('');
    onClose();

  };

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const jsonData = await PostCheckInstance(
          instance,
          setSnackbarOpen,
          setMessage,
          setColorAlert
        );

        if (jsonData && jsonData.status === 'OK') {
          setMessage('WhatsApp adicionado com sucesso.');
          setColorAlert('rgb(0, 170, 255)');
          setSnackbarOpen(true);
        }else{
          setMessage('Erro ao conectar a instancia.');
          setColorAlert('rgb(255, 0, 59)');
          setSnackbarOpen(true);
        }

        // Faça algo com jsonData, se necessário
      } catch (error) {
        console.error('Erro ao verificar conexão:', error);
      }
    };

    if (exibirQrCode && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    } else if (countdown === 0) {
      checkConnection();
      handleModalClose();
    }
  }, [exibirQrCode, countdown]);

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          width: 450,
        }}
      >
        <Typography
          sx={{ marginBottom: '2px' }}
          id="modal-title"
          variant="h6"
          component="h2"
        >
          Adicionar Instância
        </Typography>
        <Typography sx={{ fontSize: '14px' }}
        >
          Utilize o QRCode em até <span style={{ color: 'red', ontWeight: 'bold' }}>{countdown}</span> segundos.
        </Typography>
        {exibirQrCode ? (
          <img
            src={`data:image/png;base64, ${qrcode}`}
            alt="QR Code"
            style={{
              width: '100vw',
              height: 'auto',
              filter: 'grayscale(100%)',
              border: '2px solid black',
              marginTop: '20px',
            }}
          />
        ) : (
          <>
            <TextField
              sx={{ marginBottom: '20px', width: '100%', marginTop: '15px', }}
              id="instanceModalId"
              label="Instancia"
              variant="outlined"
              type="text"
              value={instance}
              onChange={(event) => setInstance(event.target.value)}
            />
            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              {isLoading ? (
                <Button
                  sx={{ borderRadius: '2px', marginRight: '8px' }}
                  variant="outlined"
                  disabled
                >
                  Loading...
                </Button>
              ) : (
                <Button
                  sx={{ borderRadius: '2px', marginRight: '8px' }}
                  variant="outlined"
                  onClick={handleAdicionar}
                >
                  Confirmar
                </Button>
              )}
              <Button
                color="error"
                sx={{ borderRadius: '2px' }}
                variant="outlined"
                onClick={handleModalClose}
              >
                Cancelar
              </Button>
            </div>
          </>
        )}
      </Box>
    </Modal>
  );
}

export default AddInstanceModal;
