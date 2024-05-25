# Backend 

O Projeto consiste em um Backend de Pizzaria onde utilizamos o relacionamento entre tabelas. O projeto também consiste em BscriptJs para proteção de senhas e JWT para maior segurança no login.
Este é um projeto backend construído utilizando Prisma, PostgreSQL, padrão Controllers e Services e TypeScript, Utilizando o S do principio SOLID, onde ele diz que uma classe deve ter apenas uma responsabilidade.

## Sumário

- [Introdução](#introdução)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Uso](#uso)

## Introdução

Este projeto é um backend que utiliza Prisma como ORM para interação com um banco de dados PostgreSQL. 
A estrutura do projeto segue o padrão MVC, utilizando Controllers para gerenciar as requisições HTTP e Services para encapsular a lógica de negócios. 
O código é escrito em TypeScript para garantir segurança de tipo e melhor manutenção.

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas no seu sistema:

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/)

## Instalação

1. Clone este repositório;

2. Instale as dependências:

    ```bash
    npm install
    ```

## Configuração

1. Configure as variáveis de ambiente:

    Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

    ```env
    DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
    PORT=3000
    ```

2. Inicialize o Prisma e sincronize o banco de dados:

    ```bash
    npx prisma migrate dev --name init
    ```
## Scripts Disponíveis

- `start`: Inicia a aplicação em modo de produção.
- `dev`: Inicia a aplicação em modo de desenvolvimento com hot-reloading.
- `build`: Compila o código TypeScript para JavaScript.
- `prisma`: Executa comandos do Prisma (ex: `prisma migrate dev`).

## Uso

Para iniciar a aplicação em modo de desenvolvimento, utilize:

```bash
npm run dev


