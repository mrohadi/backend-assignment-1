const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))

const books = fs.readFileSync('./books.json', 'utf8');

/**
 * Render books by ejs view template engine
 */
app.get('/ejs/books', (_, res) => {
  const data = JSON.parse(books);
  res.render('bookList', { data });
})

/**
 * Get list of books
 */
app.get('/books', (_, res) => {
  res.send(JSON.parse(books));
})

/**
 * Get specific book by its ID
 */
app.get('/books/:id', (req, res) => {
  const id = Number.parseInt(req.params.id);
  const book = JSON.parse(books)
    .filter(b => {
      return b.id === id
    })
  res.send(book);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
