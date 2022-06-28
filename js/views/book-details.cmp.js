import longText from "../cmps/long-text.cmp.js";
import reviewAdd from "../cmps/review-add.cmp.js";
import { bookService } from "../services/book-service.js";
import { utilService } from '../services/util-service.js';
import { eventBus } from "../services/eventBus-service.js";

export default {
  template: `
    <section  v-if="book" class="book-details app-main">
        <h2>{{book.title}}</h2>
        <img :src="bookImgUrl" alt=""> 
        <h4 :class="priceStyle">Price: {{getPrice}}</h4>
        <P>Authors: {{book.authors.join(', ')}}</P>
        <P>Categories: {{book.categories.join(', ')}}</P>
        <P>Language: {{book.language}}</P>
        <P>Subtitle: {{book.subtitle}}</P>
        <P>- {{ReadigLength}} -</P>
        <P>- {{bookAge}} -</P>
        <long-text :txt="book.description"></long-text>
      </section>
    
      <section v-if="book?.reviews" class="review-list">
        <ul class="clean-list">
            <li v-for="review in book.reviews" :key="review.id">
                <pre>{{review}}</pre>
                <div class="actions">
                    <button @click="removeReview(review.id)">X</button>
                </div>
            </li>
        </ul>
    </section>

      <review-add @reviewed="saveReview"></review-add>
`,
  data() {
    return {
      book: null
    };
  },
  created() {
    const id = this.$route.params.bookId
    bookService.get(id).then(book => this.book = book)
  },
  components: {
    longText,
    reviewAdd
  },
  methods: {
    saveReview(review) {
      if (!review.txt) return;
      review.id = utilService.makeId()
      if (!this.book['reviews'])
        this.book['reviews'] = []

      this.book.reviews.push(review)
      bookService.save(this.book).then(book => {
        // this.$router.push("/book")
        eventBus.emit('show-msg', { txt: 'Saved successfully', type: 'success' });
      })
    },
    removeReview(reviewId) {
      const idx = this.book.reviews.findIndex(review => review.id === reviewId);
      this.book.reviews.splice(idx, 1)
      bookService.save(this.book).then(book => {
        eventBus.emit('show-msg', { txt: 'Removed successfully', type: 'success' });
      })
    },
  },
  computed: {
    bookImgUrl() {
      return this.book.thumbnail
    },
    getPrice() {
      const listPrice = this.book.listPrice
      let price = new Intl.NumberFormat('en-US', { style: 'currency', currency: listPrice.currencyCode }).format(listPrice.amount)
      if (listPrice.isOnSale)
        return price + ' 🎁 On Sale!'
      return price
    },
    ReadigLength() {
      const pageCount = this.book.pageCount
      if (pageCount > 500) return 'Long reading'
      if (pageCount > 200) return 'Decent reading'
      return 'Light reading'
    },
    bookAge() {
      const publishedDate = this.book.publishedDate
      const currYear = new Date().getFullYear()
      if (currYear - publishedDate > 10) return 'Veteran Book'
      return 'New!'
    },
    priceStyle() {
      const priceAmount = this.book.listPrice.amount
      return { red: priceAmount > 150, green: priceAmount < 20 }
    },
  },
};
