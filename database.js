const books = [
    {
        ISBN : "12345book",
        title : "The legend of btech",
        pubData : "07-07-2021",
        language : "en",
        numPage : 244,
        publication: [1],
        author: [1,2],
        category: ["tech","depression","failure","placement","assignment"]
    },
];

const author = [
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

const publication = [
    {
      id: 1,
      name: "surya",
      books: ["12345book"],   
    },
];

// if we want to share or export this data base then we have to do the following commands 

module.exports = { books, author , publication};