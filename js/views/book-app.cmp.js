import { bookService } from "../services/book-service.js";
import bookFilter from "../cmps/book-filter.cmp.js";
import bookList from "../cmps/book-list.cmp.js";
// import bookDetails from "../views/book-details.cmp.js";



export default {
  template: `
  <section class="book-app">
     <book-filter @filtered="setFilter"></book-filter>
     <book-list :books="booksToShow" @selected="selectBook"></book-list>
     <!-- <book-details v-if="selectedBook" :book="selectedBook" @close="selectedBook=null"></book-details> -->
  </section>
`,
  components: {
    bookList,
    // bookDetails,
    bookFilter,
  },
  data() {
    return {
      books: null,
      // selectedBook: null,
      filterBy: null,
    };
  },
  created() {
    bookService.query().then(books => this.books = books)
},
  methods: {
    // selectBook(bookId) {
    //   this.selectedBook = bookService.get(bookId)
    // },
    setFilter(filter) {
      this.filterBy = filter
    }
  },
  computed: {
    booksToShow() {
      if (!this.filterBy) return this.books
      const regex = new RegExp(this.filterBy.title, "i")
      return this.books.filter(book => regex.test(book.title)
      &&book.listPrice.amount<this.filterBy.priceRange)
    }
  },
};
