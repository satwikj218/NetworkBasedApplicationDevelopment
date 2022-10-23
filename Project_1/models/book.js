const {v4: uuidv4} = require('uuid');
const { DateTime } = require('luxon');

const books = [
    {
        id: '1',
        title: 'Lord of the Flies',
        category: 'Literature & Fiction',
        author:'William Golding',
        details: 'The plot concerns a group of British boys who are stranded on an uninhabited island and their disastrous attempts to govern themselves.',
        status: 'Tradable',
        image: 'https://images.penguinrandomhouse.com/cover/9780399537424',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '2',
        title: 'The Hobbit',
        category: 'Literature & Fiction',
        author:'J R R Tolkien',
        details: 'The Hobbit is set within Tolkiens fictional universe and follows the quest of home-loving Bilbo Baggins, the titular hobbit, to win a share of the treasure guarded by a dragon named Smaug.',
        status: 'Tradable',
        image: 'https://m.media-amazon.com/images/I/413V3sIKSJL._AC_SY780_.jpg',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '3',
        title: 'To Kill a MockingBird',
        category: 'Literature & Fiction',
        author:'Harper Lee',
        details: 'Set in small-town Alabama, the novel is a bildungsroman, or coming-of-age story, and chronicles the childhood of Scout and Jem Finch as their father Atticus defends a Black man falsely accused of rape.',
        status: 'Non-Tradable',
        image: 'http://prodimage.images-bn.com/pimages/9780060935467_p0_v13_s1200x630.jpg',
        createdAt: DateTime.local(2021, 2, 12, 18, 0).toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '4',
        title: 'The Descent of Monsters',
        category: 'Sci-fi & Fantasy',
        author:'Neon Yang',
        details: 'Its the story of investigator Chuwan and her inquiry into something terrible that happened in a remote research facility.',
        status: 'Non-Tradable',
        image: 'https://m.media-amazon.com/images/I/511l6MbfM+L.jpg',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '5',
        title: 'Norse Mythology',
        category: 'Sci-fi & Fantasy',
        author:'Neil Gaiman',
        details: 'Norse Mythology is a 2017 book by Neil Gaiman. The book is a retelling of several stories from Norse mythology, including the theft of Thors hammer and the binding of Fenrir.',
        status: 'Non-Tradable',
        image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1516128292l/37903770._SX318_.jpg',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '6',
        title: 'Vicious (Villians)',
        category: 'Sci-fi & Fantasy',
        author:'V E Schwab',
        details: 'Vicious is a fantasy novel by American author V. E. Schwab published by Tor Books in 2013, focused around two college students who learn how to create superhuman abilities and later become archenemies.',
        status: 'Tradable',
        image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1532011194l/40874032._SY475_.jpg',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    }
];

exports.find = () => books;

exports.findById = id => books.find(book=>book.id === id);

exports.save = function(book) {
    book.id = uuidv4();
    book.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    books.push(book);
}

exports.updateById = function(id, newbook){
    let book = books.find(book=>book.id === id);
    if(book){
        book.title = newbook.title;
        book.category = newbook.category;
        book.author = newbook.author;
        book.details = newbook.details;
        return true;
    }
    else{
        return false;
    }    
}

exports.deleteById = function(id){
    let index = books.findIndex(book => book.id === id);
    if(index !== -1){
        books.splice(index, 1);
        return true;
    }
    else{
        return false;
    }
}