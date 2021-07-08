let books = [
    {
        ISBN : "12345book",
        title : "The legend of btech",
        pubData : "07-07-2021",
        language : "en",
        numPage : 244,
        publication: [1],
        authors: [1,2],
        category: ["tech","depression","failure","placement","assignment"]
    },
    {
        ISBN : "123book",
        title : "The legend of mba",
        pubData : "07-07-2021",
        language : "en",
        numPage : 244,
        publication: [2],
        authors: [1],
        category: ["tech","depression","failure","placement","assignment"]
    },
];

const authors = [
    {
        id: 1,
        name : "Vishal",
        books: ["12345book","123book"],
    },
    
    {
        id: 2,
        name : "Rajat",
        books: ["12345book"],
    },

];

const publications = [
    {
      id: 1,
      name: "surya",
      books: ["12345book"],   
    },
    {
      id: 2,
      name: "krishna publication",
      books: ["123book"],   
    },
];

// if we want to share or export this data base then we have to do the following commands 

module.exports = { books, authors , publications};