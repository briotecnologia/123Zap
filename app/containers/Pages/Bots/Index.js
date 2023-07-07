import React from 'react';                           // Necessaria para criação de componentes React
import { Helmet } from 'react-helmet';               // Possibilita a criação dinamica de Tags e Meta-Tag
import { PapperBlock } from 'dan-components';        // Componente personalizado do template - Pagina Flutuante
import WhatsAppBotsTable from './BotsTable';         // Tabela personalizada criada

class Bots extends React.Component {                 // Representa o componente Bots

  render() {                                         // Define o metodo Render
    const title = 'Bots';                            // Define o titulo da Pagina
    const description = 'Acompanhamento de Bots';    // Define a descrição da pagina
    return (                                         // Retornar a estrutura JKS que será renderizada na tela

      <div>                                                               {/* Cria o elemento para envolver a estrutura */}

        <Helmet>                                                          {/* Abrtura para definir MetaTags dinamicamente  */}

          <title>{title}</title>                                          {/* Atribui o titulo da pagina dinamicamente */}
          <meta name="description" content={description} />               {/* Atribui a descrição da pagina dinamicamente */}
          <meta property="og:title" content={title} />                    {/* Atribui o og:title ( Exibição do titulo em redes sociais ) */}
          <meta property="og:description" content={description} />        {/* Atribui a og:descrição  ( Exibição da descrição em redes sociais ) */}
          <meta property="twitter:title" content={title} />               {/* Atribui o og:title ( Exibição do titulo no Twitter ) */}
          <meta property="twitter:description" content={description} />   {/* Atribui a og:descrição  ( Exibição da descrição no Twitter ) */}

        </Helmet>                                                         {/* Fechamento do elemento */}

        <PapperBlock title="WhatsApp Bots" desc="Status e Conectividade" icon="ion-logo-whatsapp" >   {/* Define a pagina Flutuante / Titulo / Descrição e Icone */}

          <div>   {/* Cria o elemento para envolver a tabela */}

            <WhatsAppBotsTable /> {/* Adiciona o componente StrippedTable aqui */}

          </div> {/* Fechamento do elemento */}

        </PapperBlock> {/* Fechamento do elemento */}

      </div>  // Fechamnto do elemento Geral HTML
      
    );
  }
}

export default Bots; // Define o componente como modulo para exportação.