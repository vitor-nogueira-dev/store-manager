const express = require('express');
const StoreManagerRouter = require('./routes/store.manager.routes');
const SalesManagerRouter = require('./routes/sales.routes');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/products', StoreManagerRouter);
app.use('/sales', SalesManagerRouter);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação
module.exports = app;  
