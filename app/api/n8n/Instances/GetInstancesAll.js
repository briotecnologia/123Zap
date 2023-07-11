export async function fetchDataFromAPI() {
    try {
      const response = await fetch('https://dev01.briotecnologia.com.br/webhook/InstancesConnection');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao obter dados da API:', error);
  
    }
  }
  