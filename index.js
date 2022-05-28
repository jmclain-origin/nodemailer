if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT


app.listen(PORT, () => {
  console.log(`nodemailerProject is listening at http://localhost:${PORT}`)
})