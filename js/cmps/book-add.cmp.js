import { bookService } from "../services/book-service.js";
import { eventBus } from "../services/eventBus-service.js";

export default {
    template: `
   <section class="book-add">
    <h1>Find and Add new Book</h1>
      <input type="search" v-model="searchKey" placeholder="Search for a book">
     <button class="btn" @click="searchBook">Search</button>

     <ul v-if="booksFound.length" >
        <li v-for="(book,idx) in booksFound" class="flex">
            <p>{{book.volumeInfo.title}}</p>
            <button @click="addBook(idx)">+</button>
        </li>
     </ul>
    </section>
  `,
    data() {
        return {
            searchKey: '',
            booksFound: [],
        };
    },
    methods: {
        addBook(idx) {
            const { title, subtitle, authors, publishedDate,
                description, pageCount, categories,
                imageLinks, language } = this.booksFound[idx].volumeInfo
            const newBook = {
                id: '',
                title: title,
                subtitle: subtitle || 'no subtitle',
                authors: authors ? [...authors] : ['unknown'],
                publishedDate: +publishedDate || 2000,
                description: description || 'no description',
                pageCount: pageCount || 100,
                categories: categories ? [...categories] : ['unknown'],
                thumbnail: imageLinks.thumbnail || '',
                language: language || 'none',
                listPrice: {
                    amount: 70,
                    currencyCode: "USD",
                    isOnSale: false
                }
            }
            console.log(newBook);
            this.booksFound.splice(idx, 1)
            bookService.addGoogleBook(newBook)
            eventBus.emit('show-msg', { txt: 'Book added successfully', type: 'success' });
        },
        searchBook() {
            if (!this.searchKey) return
            bookService.getGoogleBooks(this.searchKey)
                .then(res => this.booksFound = res.items)
        }

    },
    computed: {
    },
};
