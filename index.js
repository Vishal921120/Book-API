const express = require("express");

// Database 
const database = require("./database")


// Initialization
const booky = express();

// configuration
booky.use(express.json());


/*
Route           /
Description     Get all books
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/", (req, res) => {
    return res.json({books: database.books });
});


/*
Route           /is
Description     Get specific books based on ISBN
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
booky.get("/is/:isbn", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn
    );
    
    if (getSpecificBook.length === 0) {
        return res.json({error: `No book found for the ISBN of ${req.params.isbn}`,});
    }

    return res.json({book : getSpecificBook});
});


/*
Route           /c
Description     Get specific books based on category
Access          PUBLIC
Parameter       category
Methods         GET
*/
booky.get("/c/:category", (req,res) => {
    const getSpecificBook = database.books.filter((book) =>
     book.category.includes(req.params.category) );
     
     if (getSpecificBook.length === 0) {
        return res.json({error: `No book found for the category of ${req.params.category}`,});
    }

    return res.json({book : getSpecificBook});

});


/*
Route           /l
Description     Get specific books based on category
Access          PUBLIC
Parameter       language
Methods         GET
*/
booky.get("/l/:language", (req,res) => {
    const getSpecificBook = database.books.filter((book) =>
     book.language === req.params.language);
     
     if (getSpecificBook.length === 0) {
        return res.json({error: `No book found for the ${req.params.language} language` ,});
    }

    return res.json({book : getSpecificBook});

});

/*
Route           /author
Description     get all authors
Access          PUBLIC
Parameter       None
Methods         GET
*/
booky.get("/author",(req,res) =>{
    return res.json({authors: database.author});
});

/*
Route           /author/book
Description     get all authors based on books
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
booky.get("/author/book/:isbn", (req, res) => {
    const getSpecificAuthor = database.author.filter((author) =>
      author.books.includes(req.params.isbn)
    );
  
    if (getSpecificAuthor.length === 0) {
      return res.json({
        error: `No Author found for the book of ${req.params.isbn}`,
      });
    }
  
    return res.json({ authors: getSpecificAuthor });
  });

  /*
Route           /publications
Description     get all publications
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/publications", (req, res) => {
    return res.json({ publications: database.publication });
  });
  
  /*
  Route           /book/add
  Description     add new book
  Access          PUBLIC
  Parameter       NONE
  Methods         POST
  */
  booky.post("/book/add", (req, res) => {
    const { newBook } = req.body;
    database.books.push(newBook);
    return res.json({ books: database.books });
  });

  /*
Route           /author/add
Description     add new author
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
booky.post("/author/add", (req, res) => {
  const { newAuthor } = req.body;
  database.author.push(newAuthor);
  return res.json({ authors: database.author });
});

/*
Route           /book/update/title
Description     Update book title
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
booky.put("/book/update/title/:isbn", (req, res) => {
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.title = req.body.newBookTitle;
      return;
    }
  });

  return res.json({ books: database.books });
});

/*
Route           /book/update/author
Description     update/add new author for a book
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
booky.put("/book/update/author/:isbn/:authorId", (req, res) => {
  // update book database

  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      return book.author.push(parseInt(req.params.authorId));
    }
  });

  // update author database

  database.author.forEach((author) => {
    if (author.id === parseInt(req.params.authorId))
      return author.books.push(req.params.isbn);
  });

  return res.json({ books: database.books, author: database.author });
});


/*
Route           /publication/update/book
Description     update/add new book to a publication
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/

booky.put("/publication/update/book/:isbn",(req,res) =>{
  // update the publication database
  database.publication.forEach((publication) =>{ 
  if (publication.id === req.body.pubid){
    return publication.books.push(req.params.isbn);
  }
  });
  // update the book database
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn){
    book.publication = req.body.pubid;
    return;
    }
  });
  
  return res.json
  ({books: database.books , publications: database.publications ,message:"succesfully updated pulication",});
});

/*
Route           /book/delete
Description     delete a book
Access          PUBLIC
Parameter       isbn
Methods         Delete
*/
booky.delete("/book/delete/:isbn", (req, res) => {
  const updatedBookDatabase = database.books.filter(
    (book) => book.ISBN !== req.params.isbn
  );

  database.books = updatedBookDatabase;
  return res.json({books: database.books});

});

/*
Route           /book/delete/author
Description     delete a author from a book
Access          PUBLIC
Parameter       isbn, author id
Methods         Delete
*/
booky.delete("/book/delete/author/:isbn/:authorId", (req, res) =>{
  // update the book database 
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      const newAuthorList = book.authors.filter(
      (author) => author !== parseInt(req.params.authorId)
    );
    book.authors = newAuthorList;
    return;
  }
  });

  // update the author database 
  database.authors.forEach((author)  => {
  if (author.id === parseInt(req.params.authorId)){
    const newBookList = author.books.filter(
      (book) => book !== req.params.isbn
    );
    author.books = newBookList;
    return;
  } 
});
 return res.json({
   book: database.books,
   author: database.authors,
   message: "author was deleted",
 });
});


/*
Route           /publication/delete/book
Description     delete  a book from publication
Access          PUBLIC
Parameter       isbn, pulication id
Methods         Delete
*/
booky.delete("/publication/delete/book/:isbn/:pubid", (req,res) =>{
  // update publication database 
  database.publications.forEach((publication) =>  {
    if (publication.id === parseInt(req.params.pubid)){
      const newBookList = publication.books.filter(
        (book) => book !== req.params.isbn
      );

      publication.books = newBookList;
      return;
    }
});

  //  update book database 
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn){
      book.publication = 0; //no publication availabe
      return;
    }
  });
  return res.json({
    books: database.books,
    publications: database.publications,
  })
});

booky.listen(2000,() => console.log("Hey buddy your code is working"));
