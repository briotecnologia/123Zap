export const CheckConnection = async (instance,setSnackbarOpen,setMessage,setColorAlert) => {
    try {
      const response = await fetch('https://dev01.briotecnologia.com.br/webhook/checkInstanceConnection', {
        method: 'POST',
        body: JSON.stringify({
          uuid_account: 'cc54889a-6124-41b2-b22d-2e992747c901',
          full_token: 't8OOEeISKzpmc3jjcMqBWYSaJsafdefer$prod',
          instance
        }),
      });
  
        // Conexão bem-sucedida, faça o tratamento necessário
        const data = await response.json();
        return data;
  
    } catch (error) {
      console.error('Erro ao conectar à instância:', error);
    }
  };
  