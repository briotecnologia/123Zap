export async function fetchDataFromAPI() {
  try {
    const response = await fetch('https://dev01.briotecnologia.com.br/webhook/GetDisponivel', {
      method: 'POST',
      body: JSON.stringify({
        uuid_account: 'cc54889a-6124-41b2-b22d-2e992747c901',
        full_token: 't8OOEeISKzpmc3jjcMqBWYSaJsafdefer$prod',
      })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao obter dados da API:', error);
    return { data: [], status: 'Ocorreu um erro na requisição.' };
  }
}