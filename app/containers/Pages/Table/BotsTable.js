import React, { Fragment, useEffect, useState } from 'react';     // Fragment: Agrupa varios elementos, useEffect: Permite chamadas a API, useState: Armazena estados.
import Toolbar from '@mui/material/Toolbar';                      // Material UI - Possibilita a criação de Barra de ferramentas
import Typography from '@mui/material/Typography';                // Material UI - Possibilita a criação de texto com estilos
import Table from '@mui/material/Table';                          // Material UI - Possibilita a criação de tabela
import TableBody from '@mui/material/TableBody';                  // Material UI - Representa o corpo da tabela
import TableCell from '@mui/material/TableCell';                  // Material UI - Representa a celula da tabela
import TableHead from '@mui/material/TableHead';                  // Material UI - Representa o Header da tabela
import TableRow from '@mui/material/TableRow';                    // Material UI - Representa a linha da tabela
import Button from '@mui/material/Button';                        // Material UI - Representa um Botão  
import Box from '@mui/material/Box';                              // Material UI - Representa uma caixa retangular
import Fade from '@mui/material/Fade';                            // Material UI - permite fazer transições de fade  
import Pagination from '@mui/material/Pagination';                // Material UI - fornece uma interface de paginação'
import AlertSnackbar from '../../../components/Alerts/AlertSnackbar';                      // Material UI - Importa alerta personalizado criado
import useStyles from 'dan-components/Tables/tableStyle-jss';     // Arquivo de estilo personalizado usado para aplicar estilos à tabela.
import { fetchDataFromAPI } from '../../../api/n8n/Instances/GetInstancesAll';               // Arquivo que contem o modulo para retornar todas instancias do cliente via API
import ConnectModal from '../Bots/ModalConnect';                        // Arquivo que contem o modulo para enviar a solicitação de conexão da instacia via API   
import AddInstanceModal from '../Bots/ModalAddInstance';                    // Arquivo que contem o mudolo para enviar a solicitação de nova instancia via API
import RemoveModal from '../Bots/ModalDisconnect';                          // Arquivo que contem o mudolo para enviar a solicitação de remoção/desconexão da instancia via API

function WhatsAppBotsTable() {
  const { classes, cx } = useStyles();                                         // Extrai as classes e estilos personalizados de 'dan-components'
  const [data, setData] = useState([]);                                        // Define a constante que armazena o retorno da API e também a função que atualiza seu estado.
  const [showTable, setShowTable] = useState(false);                           // Define a constante que armazena a exibição da tabela e a função que atualiza seu estado.
  const [openModalAdd, setOpenModalAdd] = useState(false);                     // Define a constante que armazena a exibição do modal AddInstance e a função que atualiza seu estado.
  const [openConnectModal, setOpenConnectModal] = useState(false);             // Define a constante que armazena a exibição do modal ConnectInstance e a função que atualiza seu estado.
  const [openRemoveModal, setOpenRemoveModal] = useState(false);               // Define a constante que armazena a exibição do modal DeleteInstance e a função que atualiza seu estado.
  const [selectedInstance, setSelectedInstance] = useState(null);              // Define a constante que armazena o valor da instância selecionada e a função que atualiza seu estado.
  const [selectedSessão, setSelectedSessão] = useState(null);                  // Define a constante que armazena o valor da sessão selecionada e a função que atualiza seu estado.
  const [selectedNumber, setSelectedNumber] = useState(null);                  // Define a constante que armazena o valor do número selecionado e a função que atualiza seu estado.
  const [currentPage, setCurrentPage] = useState(1);                           // Define a constante que armazena o valor do índice da paginação.
  const itemsPerPage = 5;                                                      // Define a quantidade de itens por página.
  const [snackbarOpen, setSnackbarOpen] = useState(false);                     // Define a constante que armazena o estado 
  const [message, setMessage] = useState('');                                  // Define a constante que armazena a mensagem
  const [colorAlert, setColorAlert] = useState('');                            // Define a constante que armazena a cor RGB do alerta

  useEffect(() => {                                                                         // Possibilita a chamada a API 
    async function fetchDataWrapper() {                                                     // Inicia a chamada assicrona a API, definida em outro arquivo
      try {                                                                                 // Tentativa de requisição 
        const jsonData = await fetchDataFromAPI();  // Requisição fetchDataFromAPI() - Arquivo importado anteriormente
        const instances = jsonData.codeChatInstances || [];                                 // Inicializa a instancias para mapear os dados da API
        const formattedData = instances.map(item => {                                       // Mapeia os dados da API
          return {                                                                          // Retorna ( Dados mapeados )
            id: 'ID_'+item.owner ,                                                          // Define o ID de cada Linh como o ID_numero
            instanceName: item.instanceName,                                                // Nefine profileName da linha como o nome da instancia
            profileName: item.profileName,                                                  // Define o nome do perfil (WhatsApp)                                         
            number: item.owner,                                                             // Define o numero da instancia
            status: item.status,                                                            // Define o status atual da instancia
            sessão: item.sessão                                                             // Define as sessões da instancia
          };
        });
        
        if(jsonData.status='OK'){
          setMessage('Dados carregados com sucesso.');
          setColorAlert('rgb(0, 170, 255)');
          setSnackbarOpen(true);
        }else if (jsonData.status='VAZIO') {
          
        } else {
          setMessage('Algo deu errado. Entre em contato com o suporte.');
          setColorAlert('rgb(255, 0, 59)');
          setSnackbarOpen(true);
        }
        setData(formattedData);                                                             // Cria a tabela com os dados mapeados
                
      } finally {
        setShowTable(true);                                                                 // Mostra a tabela
      }
    }
  
    fetchDataWrapper();                                                                     // Realiza a chamada a API assicrona
  }, []);

  const handleSnackbarClose = () => {            // Função para fechar o snackbar
    setSnackbarOpen(false);                      // Seta o alerta como false
  };

  const handleOpenModalAdd = () => {             // Função para abrir o modal adicionar instancia
    setOpenModalAdd(true);                       // Seta o modal como true
  };

  const handleCloseModal = () => {               // Função para fechar o modal adicionar instancia
    setOpenModalAdd(false);                      // Seta o modal como false
  };

  const handleConnectClick = (instance) => {     // Função para abrir o modal connect
    setSelectedInstance(instance);               // Define a instancia selecionada
    setOpenConnectModal(true);                   // Seta o modal como true (Abrir)
  };

  const handleCloseConnectModal = () => {        // Função para fechar o modal connect
    setOpenConnectModal(false);                  // Seta o modal como false
  };

  const handleRemoveClick = (instance) => {      // Função para abrir o modal remove
    setSelectedInstance(instance);               // Inicializa os campos do modal aberto
    setOpenRemoveModal(true);                    // Seta o modal como true (Abrir)
  };  

  const handleCloseRemoveModal = () => {         // Função para fechar o modal remove
    setOpenRemoveModal(false);                   // Seta o modal com false
  };

  const handlePageChange = (event, newPage) => {         // Função para paginação 
    setCurrentPage(newPage);                             // Seta a pagina 
  };

  const startIndex = (currentPage - 1) * itemsPerPage;       // Retorna o primeiro indice da pagina corrente
  const endIndex = startIndex + itemsPerPage;                // Retorna o ultimo indice da pagina corente
  const itemsToShow = data.slice(startIndex, endIndex);      // Retorna um novo aray contendo o intervalo (itens) no itervalo startIndex/endIndex
  const totalPages = Math.ceil(data.length / itemsPerPage);  // Retorna o total de paginas.

  const instanceName = selectedInstance ? selectedInstance.instanceName : '';  // Atribui valor a InstanceName caso selectedInstance não seja nulo 
  const profileName = selectedInstance ? selectedInstance.profileName : '';    // Atribui valor a profileName caso selectedInstance não seja nulo

  return (         // Retorna os dados a serem renderizados
    <Fragment>     {/* Agrupa todos os elementos */}
      
      <Toolbar className={classes.toolbar}>    {/* Define a barra de ferramenta*/}
        <div className={classes.title}>        {/* Define a barra de ferramenta  */}
          <Typography className={classes.title} variant="h6">Minhas Instâncias</Typography> {/* Campo de texto personalizado */}
        </div>         {/* Fechamento do elemento*/}
        <div style={{ marginLeft: 'auto', justifyContent: 'flex-end' }}>  {/* Aplica margin a direita */}
          <Button variant="outlined" color="primary" onClick={handleOpenModalAdd} sx={{ borderRadius: '8px' }}> {/* Define o botão para adicionar instancias */}
            Adicionar  {/* Titulo do botão */}
          </Button>    {/* Fechamento do elemento */}
        </div>         {/* Fechamento do elemento */}
      </Toolbar>       {/* Fechmaento do elemento */}

      <div className={classes.rootTable}>   
        <Fade in={showTable} timeout={200}>
          <Table className={cx(classes.table, classes.stripped)}>
            <TableHead>
              <TableRow>
                <TableCell padding="normal">Instâncias</TableCell>
                <TableCell align="center">WhatsApp's</TableCell>
                <TableCell align="center">Sessões</TableCell>
                <TableCell align="center">Números</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Opções</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemsToShow.map(n => (
                <TableRow id={n.id} key={n.id}>
                  <TableCell id={n.instanceName} padding="normal">{n.instanceName}</TableCell>
                  <TableCell id={n.profileName} align="center">{n.profileName}</TableCell>
                  <TableCell id={n.sessão} align="center">{n.sessão}</TableCell>
                  <TableCell id={n.number} align="center">{n.number}</TableCell>
                  <TableCell align="center">
                    <Typography
                      sx={{
                        color:
                          n.status === 'Conectada'
                            ? 'rgb(0, 188, 212)' // verde
                            : n.status === 'Disponível'
                            ? 'rgb(114 211 118)' // verde
                            : 'rgb(3, 155, 229)', // vermelho
                      }}
                      variant="inherit"
                    >
                      {n.status}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <div>
                      <Button
                        size="small"
                        variant="outlined"
                        color="success"
                        sx={{
                          marginRight: '8px',
                          borderRadius: '8px',
                          fontWeight: 'lighter'
                        }}
                        disabled={n.status === 'Conectada'}
                        onClick={() => handleConnectClick(n)}
                      >
                        Conectar
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        sx={{
                          marginRight: '8px',
                          borderRadius: '8px',
                          fontWeight: 'lighter'
                        }}
                        disabled={n.status === 'Disponível'}
                        onClick={() => handleRemoveClick(n)}
                      >
                        Desconectar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Fade>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
      </div>
     {selectedInstance && (
        <ConnectModal
          open={openConnectModal}             // passando a função que abre o mmodal
          onClose={handleCloseConnectModal}   // passando a função que fecha o modal
          selectedInstance={selectedInstance} // Passando a propriedade selectedInstance
          instanceName={instanceName}         // Passando a propriedade instanceName
          profileName={profileName}           // Passando a propriedade profileName
          sessão={selectedSessão}             // Passando a propriedade sessão
          setSnackbarOpen={setSnackbarOpen}   // Passando a Função que abre o alerta
          setMessage={setMessage}             // Passando a Função que define a mensagem do alerta
          setColorAlert={setColorAlert}       // Passando a função que define a cor do aleta
        />
      )}
      {selectedInstance && (
        <RemoveModal
          open={openRemoveModal}              // Passando a função que abre o modalRemove
          onClose={handleCloseRemoveModal}    // Passando a função que fecha o modal
          selectedInstance={selectedInstance} // Passando a propriedade selectedInstance
          instanceName={instanceName}         // Passando a propriedade instanceName
          profileName={profileName}           // Passando a propriedade profileName
          sessão={selectedSessão}             // Passando a propriedade sessão
          setSnackbarOpen={setSnackbarOpen}   // Passando a Função que abre o alerta
          setMessage={setMessage}             // Passando a Função que define a mensagem do alerta
          setColorAlert={setColorAlert}       // Passando a função que define a cor do aleta
        />
      )}
      
      <AddInstanceModal 
          open={openModalAdd} 
          onClose={handleCloseModal} 
          setSnackbarOpen={setSnackbarOpen}   // Passando a Função que abre o alerta
          setMessage={setMessage}             // Passando a Função que define a mensagem do alerta
          setColorAlert={setColorAlert}       // Passando a função que define a cor do aleta
      />

  <AlertSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message= {message}
        colorValue = {colorAlert}
        duration={4000}
      />
      
    </Fragment>
  );
}

export default WhatsAppBotsTable;
