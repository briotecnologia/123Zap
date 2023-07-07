export async function fetchDataFromAPI() {
    try {
      const response = await fetch('https://dev01.briotecnologia.com.br/webhook/ConnectInstance');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao obter dados da API:', error);
      return { data: [] }; // Retorna um objeto vazio em caso de erro, contendo a propriedade "data" como um array vazio
    }
  }