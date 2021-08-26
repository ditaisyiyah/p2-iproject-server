if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
const cors = require('cors');
const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes');
const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(router)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`listen at http:/localhost:${PORT}`);
})

// module.exports = app;