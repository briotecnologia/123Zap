export async function fetchDataFromAPI(setSnackbarOpen,setMessage,setColorAlert) {
  try {
    const response = await fetch('https://dev01.briotecnologia.com.br/webhook/InstancesConnection');
    const data = await response.json();
    setMessage('Dados carregados com sucesso.');
    setColorAlert('rgb(0, 170, 255)');
    setSnackbarOpen(true);
    return data;
  } catch (error) {
    console.error('Erro ao obter dados da API:', error);
    setMessage('Algo deu errado. Entre em contato com o suporte.');
    setColorAlert('rgb(255, 0, 59)');
    setSnackbarOpen(true);
  }
}
