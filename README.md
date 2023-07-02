
# Projeto Store Manage

###  Proposta: 


<details>
  <summary>📝 Proposta</summary>
  Desenvolver uma API utilizando a arquitetura MSC (model-service-controller)!

  A API a ser construída é um sistema de gerenciamento de vendas no formato dropshipping em que será possível criar, visualizar, deletar e atualizar produtos e vendas. Você deverá utilizar o banco de dados MySQL para a gestão de dados. Além disso, a API deve ser RESTful.

  ⚠️ Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. Veja aqui ou na documentação como instalá-lo. No primeiro artigo, você pode substituir onde está com 1.26.0 por 1.29.2.
</details>

## Instalação:

<details>
  <summary>🐳 Com Docker</summary>
  
      Clone este repositório:
    ```bash
      git clone git@github.com:vitor-nogueira-dev/store-manager.git
    ```

    Entre no diretório e instale as dependências:

    ```bash
      cd store-manager
      npm install
    ```

    Rode os serviços `node` e `db` com o comando `docker-compose up -d`

    * Lembre-se de parar o mysql se estiver usando localmente na porta padrão (3306), ou adapte, caso queria fazer uso da aplicação em containers;

    * Esses serviços irão inicializar um container chamado store_manager e outro chamado store_manager_db;
    * A partir daqui você pode rodar o container store_manager via CLI ou abri-lo no VS Code.

    Opção 1: Use o comando `docker-compose run --rm node npm test`, ou para acessar o container e executar lá:

    Opção 2: Use o comando `docker exec -it store_manager bash` e sigas passos abaixo.

    * Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

    * Instale as dependências [Caso existam] com `npm install` dentro do container store_manager

    ⚠️ Atenção: Caso opte por utilizar o Docker, TODOS os comandos disponíveis no `package.json` (`npm start, npm test, npm run dev`, ...) devem ser executados DENTRO do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima.

    ⚠️ Atenção: Não rode o comando `npm audit fix`! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.

    ⚠️ Atenção: Se você se deparar com o erro `EADDRINUSE`, quer dizer que sua aplicação já esta utilizando a `porta 3001`, seja com outro processo do Node.js (que você pode parar com o comando `killall node`) ou algum container! Neste caso você pode parar o container com o comando `docker stop <nome-do-container>`.

    ✨ Dica: Antes de iniciar qualquer coisa, observe os containers que estão em execução em sua máquina. Para ver os containers em execução basta usar o comando `docker container ls`, caso queira parar o container basta usar o comando `docker stop <nome-do-container>` e se quiser parar e excluir os containers, basta executar o comando `docker-compose down`
</details>

<details>
  <summary>🐳 Sem Docker</summary>
  ### Sem Docker

  Instale as dependências [Caso existam] com `npm install`

  ⚠️ Atenção Não rode o comando `npm audit fix`! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.

  ⚠️ Atenção A versão do `Node.js` e `NPM` a ser utilizada é `"node": ">=16.0.0"` e `"npm": ">=7.0.0"`, como descrito na chave `engines` no arquivo `package.json`. Idealmente deve-se utilizar o Node.js na versão `16.14`, a versão na qual este projeto foi testado.

  Crie um arquivo `.env` na raiz do projeto seguindo o padrão do arquivo `env.example` e o modifique de acordo com a necessidade.
  Coloque `env $(cat .env)` antes de qualquer comando que for executar, por exemplo:

  ```bash
    env $(cat .env) npm run dev
  ```
</details>

<details>
  <summary>📄 Documentação API</summary>
  
| Descrição                  | Endpoint                            |
| -------------------------- | ----------------------------------- |
| Listar produtos            | `GET /products`                     |
| Listar produtos por id     | `GET /products/:id`                 |
| Testes unitários           | `tests/unit`                        |
| Cadastrar produtos         | `POST /products`                    |
| Validações para produtos   | `POST /products`                    |
| Testes unitários           | `tests/unit`                        |
| Validar e cadastrar vendas | `POST /sales`                       |
| Testes unitários           | `tests/unit`                        |
| Listar vendas              | `GET /sales`                        |
| Listar venda por id        | `GET /sales/:id`                    |
| Atualizar um produto       | `PUT /products/:id`                 |
| Testes unitários           | `tests/unit`                        |
| Deletar um produto         | `DELETE /products/:id`              |
| Deletar uma venda          | `DELETE /sales/:id`                 |
| Atualizar uma venda        | `PUT /sales/:id`                    |
| Pesquisar produtos         | `GET /products/search?q=searchTerm` |

</details>


<details>
  <summary>💡 Stacks utilizadas</summary>

  Linguagem de programação: ![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)&nbsp; 

  Framework de desenvolvimento: ![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)&nbsp; </br>
  Banco de dados: ![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)&nbsp; </br>
  ORM (Object-Relational Mapping): ![Sequelize](https://img.shields.io/badge/Sequelize-323330?style=for-the-badge&logo=sequelize&logoColor=white)&nbsp; </br>
  Ferramenta de teste: ![Mocha](https://img.shields.io/badge/Mocha-8D6748?style=for-the-badge&logo=mocha&logoColor=white)&nbsp; </br>
  Biblioteca de assertividade: ![Chai](https://img.shields.io/badge/Chai-A11404?style=for-the-badge&logo=chai&logoColor=white)&nbsp; </br>
  Ferramenta de mock: ![Sinon](https://img.shields.io/badge/Sinon-00000F?style=for-the-badge&logo=sinon&logoColor=white)&nbsp; </br>
  Ferramenta de cobertura de código: ![Istanbul](https://img.shields.io/badge/Istanbul-00000F?style=for-the-badge&logo=istanbul&logoColor=white)&nbsp; </br>
  Ferramenta de análise de código estática: ![ESLint](https://img.shields.io/badge/ESLint-00000F?style=for-the-badge&logo=eslint&logoColor=white)&nbsp; </br>
  Ferramenta de formatação de código: ![Prettier](https://img.shields.io/badge/Prettier-00000F?style=for-the-badge&logo=prettier&logoColor=white)&nbsp; </br>
</details>