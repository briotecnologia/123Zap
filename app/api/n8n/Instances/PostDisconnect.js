export const PostDisconnect = async (selectedInstance, number, instanceName, profileName,escolha) => {
    try {
      const response = await fetch('https://dev01.briotecnologia.com.br/webhook/removeInstances', {
        method: 'POST',
        body: JSON.stringify({
          uuid_account: 'cc54889a-6124-41b2-b22d-2e992747c901',
          full_token: 't8OOEeISKzpmc3jjcMqBWYSaJsafdefer$prod',
          selectedInstance,
          number,
          instanceName,
          profileName,escolha
        }),
      });
  
      if (response.ok) {

        const data = await response.json();
        return data; // Retornar os dados da API
      } else {
        // Erro ao conectar à instância
        console.error('Erro ao conectar à instância:', response.status);
      }
    } catch (error) {
      console.error('Erro ao conectar à instância:', error);
    }
  };
  