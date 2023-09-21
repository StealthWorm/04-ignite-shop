<p align="center">
  <img alt="Rocketseat Education" src="https://avatars.githubusercontent.com/u/69590972?s=200&v=4" width="100px" />
</p>

<p align="center">
  <img src="https://img.shields.io/static/v1?label=Rocketseat&message=Education&color=8257e5&labelColor=202024" alt="Rocketseat Project" />
  <a href="LICENSE"><img  src="https://img.shields.io/static/v1?label=License&message=MIT&color=8257e5&labelColor=202024" alt="License"></a>
</p>

## 💻 Projeto

04-ignite-shop

### Detalhes do Next

**getServerSideProps:**

- Funciona no lado do servidor (server-side rendering - SSR).
- A função é executada  \_em cada requisição feita \_ a uma página, ou seja, os dados são buscados no servidor toda vez que alguém acessa a página.
- É útil quando você precisa de dados que mudam com frequência ou dependem de informações do usuário, como autenticação. Dados que precisam estar disponiveis assim que a tela for exibida.
- Pode ser usada para buscar dados de uma API, banco de dados ou qualquer outra fonte de dados externa.
- Os dados buscados são passados como props para o componente da página.

**getStaticProps:**

- Funciona no lado do servidor também, mas é usado para gerar páginas estáticas (static site generation - SSG) que serão iguais para todos os usuários que acessarem em um dado período de tempo (revalidate).
- A função é executada  \_durante a construção da aplicação(BUILD), não em tempo real \_.
- É ideal para páginas com conteúdo que não muda com frequência, como blogs ou páginas de produto.
- Os dados buscados são pré-renderizados no momento da construção (BUILD) e, em seguida, servidos como páginas estáticas.
- Isso melhora a performance, pois as páginas estão prontas para serem entregues sem a necessidade de requisições adicionais.
- Não possui acesso a dados da requisição como request/response, além de não poder acessar cookies, headers, dados de login ou qualquer coisa do contexto de requisição.

## 📝 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<p align="center">
  Feito com 💜 by Thierry P. Santos
</p>

<!--END_SECTION:footer-->
