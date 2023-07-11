export const post = async (selectedSession, selectedInstance, number, instanceName, profileName) => {
    try {
      const response = await fetch('https://dev01.briotecnologia.com.br/webhook/ConnectInstance', {
        method: 'POST',
        body: JSON.stringify({
          uuid_account: 'cc54889a-6124-41b2-b22d-2e992747c901',
          full_token: 't8OOEeISKzpmc3jjcMqBWYSaJsafdefer$prod',
          selectedSession,
          selectedInstance,
          number,
          instanceName,
          profileName,
        }),
      });
  
      if (response.ok) {

        // Conexão bem-sucedida, faça o tratamento necessário
        const data = await response.json();
        return data;
      } else {
        // Erro ao conectar à instância
        console.error('Erro ao conectar à instância:', response.status);
      }
    } catch (error) {
      console.error('Erro ao conectar à instância:', error);
    }
  };
  