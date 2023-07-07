import React from 'react';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'dan-components';

class Documentação extends React.Component {
  render() {
    const title = 'Dandelion Pro. Blank Page';
    const description = 'Dandelion Pro';

    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock title="Documentação" desc="Bem-vindo(a) a plataforma 123Zap! 🚀">
          <div>
            <p>
              Nosso objetivo é fornecer uma solução simples e eficiente para a automação e disparo de mensagens pelo
              WhatsApp. Com a nossa API, você poderá enviar campanhas, notificações personalizadas, templates de
              mensagens e muito mais, tudo com o controle total sobre datas e horários de envio.
            </p>
            <p>
              Oferecemos uma plataforma robusta que permite aos nossos clientes cadastrar vários números de WhatsApp e
              definir regras específicas para envio.
            </p>
            <p>
              Fornecemos funcionalidades que ajudam a proteger a reputação de nossos clientes, como o controle de
              banimento para empresas que disparam muitas mensagens no WhatsApp.
            </p>
            <p>
              Com a API do 123Zap, você terá acesso a uma interface amigável e intuitiva, permitindo que você integre
              facilmente a nossa plataforma aos seus sistemas existentes.
            </p>
            <p>
              Estamos sempre trabalhando para melhorar nossos serviços e recursos para garantir que você obtenha o
              máximo de nossas soluções de automação de WhatsApp.
            </p>
            <p>
              Além de oferecer recursos de envio de mensagens, a API do 123Zap também permite que você tenha controle
              total sobre o histórico de suas conversas, incluindo informações sobre números de telefone que possuem ou
              não o WhatsApp e validação de bloqueio. Com o banco de dados pessoal, você pode monitorar tudo o que
              acontece em suas conversas do WhatsApp com facilidade e segurança. Afinal, ter o controle de suas
              mensagens é fundamental para manter a privacidade e a confidencialidade de suas conversas.
            </p>
            <p>Vamos começar a explorar a API do 123Zap?</p>
          </div>
        </PapperBlock>
      </div>
    );
  }
}

export default Documentação;
