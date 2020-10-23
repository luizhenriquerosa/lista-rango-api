# Lista Rango Backend

API RESTful para gerenciamento de cardápios de restaurantes.

### Características

- Gerenciamento de cadastro de restaurantes e produtos
- Listagem das promoções ativas e de um restaurante específico
- Listagem das categorias e de um restaurante específico

### Tecnologias

- Desenvolvida em Node.js
- Utilização de imagem Docker MongoDB para armazanemanto dos cadastros de restaurantes e produtos
- Express para servidor HTTP, Yup para validações, Mongoose como ODM, Multer para upload de fotos
- Nodemon e Sucrase para transpilação do código

### Melhorias

- Melhorar validações, ex: dias e horários repetidos, horários validos
- Logs, gerenciamento melhor dos erros
- Typescript
- Refatorar funções, excepcionalmente os validators
- Fugir da dependência direta de bibliotecas
- Adotar padrões reais, e não abstrações

### Requerimentos

- Node.js
- Docker e Docker Compose

### Configurações

- Copiar e editar o .env_example para .env
- Se necessário alterar configurações do banco em docker-compose.yml

### Instalação

```sh
$ npm install
$ docker-compose up -d
$ npm run build
```

### Iniciar aplicação

```sh
$ npm run start
```

Use PM2 para gerenciar o processo. https://pm2.keymetrics.io/docs/usage/quick-start/

## Lincença

MIT
