import { bookService } from "../services/book-service.js";
import bookFilter from "../cmps/book-filter.cmp.js";
import bookAdd from "../cmps/book-add.cmp.js";
import bookList from "../cmps/book-list.cmp.js";


export default {
  template: `
  <section class="book-app">
     <book-filter @filtered="setFilter"></book-filter>
     <!-- <book-add ></book-add> -->
     <router-view/>
     <book-list :books="booksToShow"></book-list>
  </section>
`,
  components: {
    bookList,
    bookFilter,
    bookAdd,
  },
  data() {
    return {
      books: null,
      filterBy: null,
    };
  },
  created() {
    bookService.query().then(books => this.books = books)
},
  methods: {
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
