# Lista Rango Backend

API RESTful para gerenciamento de cardápios de restaurantes.

### Características

- Gerenciamento de cadastro de restaurantes e produtos
- Listagem das promoções ativas e de um restaurante específico
- Listagem das categorias e de um restaurante específico
- Paginação e limite nas listagens de produtos e restaurantes
- Opcionalmente o gerenciamento de fotos pode ser após os cadastros, para não limitar a requisição POST dos restaurantes e produtos apenas em multipart/form-data, obrigando a converter arrays para strings

### Tecnologias

- Desenvolvida em Node.js
- Utilização de imagem Docker MongoDB para armazanemanto dos cadastros de restaurantes e produtos
- Express para servidor HTTP, Yup para validações, Mongoose como ODM, Multer para upload de fotos
- Nodemon e Sucrase para transpilação do código

### Melhorias

- Typescript
- Refatorar funções, excpecionalmente os validators
- Fugir da dependência direta de bibliotecas
- Adotar padrões reais, e não abstrações
- Validar dias e horários repetidos, mínimos e máximos nas propriedades openingHours e sales

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

## Endpoints

##### GET /restaurants

- param page number|optional
- param limit number|optional
- return restaurants

##### GET /restaurants/:id

- return restaurant

##### GET /restaurants/:id/photo

- return restaurant photo

##### PUT /restaurants/:id/photo

- param photo file|required
- return status code 204

##### DELETE /restaurants/:id/photo

- return status code 204, delete photo

##### GET /restaurants/:id/products

- return restaurant products

##### GET /restaurants/:id/promotions

- return restaurant active promotions

##### GET /restaurants/:id/categories

- return restaurant categories

##### POST /restaurants

- param name string|required
- param adressStreet string|required
- param adressNumber string|required
- param adressDistrict string|required
- param adressCity string|required
- param adressState string|required
- param adressCountry string|required
- param adressZipCode string|required
- param openingHours array of object|required
- param openingHours.weekday string|required Example: "Saturday"
- param openingHours.schedule object|required
- param openingHours.schedule.start string|required format HH:MM Example:"23:50"
- param openingHours.schedule.end string|required format HH:MM Example:"23:50"
- param photo file/optional
- return status code 204

##### PUT /restaurants/:id

- param name string|optional
- param adressStreet string|optional
- param adressNumber string|optional
- param adressDistrict string|optional
- param adressCity string|optional
- param adressState string|optional
- param adressCountry string|optional
- param adressZipCode string|optional
- param openingHours array of object|optional
- param openingHours.weekday string|required Example: "Saturday"
- param openingHours.schedule object|required
- param openingHours.schedule.start string|required format HH:MM Example:"23:50"
- param openingHours.schedule.end string|required format HH:MM Example:"23:50"
- param photo file/optional
- return status code 204

##### DELETE /restaurants/:id

- return status 204, delete restaurant, all products and photos

##### GET /categories

- return array of strings

##### GET /products

- param page number|optional
- param limit number|optional
- return products

##### GET /products/:id

- return product

##### GET /products/:id/photo

- return product photo

##### PUT /products/:id/photo

- param photo file|required
- return status code 204

##### DELETE /products/:id/photo

- return status code 204, delete photo

##### POST /products/

- param \_idRestaurant string|required
- param name string|required
- param price number|required
- param categories array of string|required
- param sales array of object|required
- param sales.weekday string|required Example: "Saturday"
- param sales.price number|required
- param sales.description string|required
- param sales.schedule object|required
- param sales.schedule.start string|required format HH:MM Example:"23:50"
- param sales.schedule.end string|required format HH:MM Example:"23:50"
- param photo file/optional
- return status code 204

##### PUT /products/:id

- param name string|optional
- param price number|optional
- param categories array of string|optional
- param sales array of object|optional
- param sales.weekday string|requioptional Example: "Saturday"
- param sales.price number|required
- param sales.description string|required
- param sales.schedule object|required
- param sales.schedule.start string|required format HH:MM Example:"23:50"
- param sales.schedule.end string|required format HH:MM Example:"23:50"
- param photo file/optional
- return status code 204

##### DELETE /products/:id

- return status code 204, delete product and photo

## Licença

MIT
