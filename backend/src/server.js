require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const routes = require('./routes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`MyItems API running on http://localhost:${PORT}`);
});
