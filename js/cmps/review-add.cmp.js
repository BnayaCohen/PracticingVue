import { bookService } from '../services/book-service.js';

export default {
    props: [""],
    template: `
    <section  >
    <h2>Add Review</h2>
     <form class="review-add" @submit.prevent="save">
        <label for="name">Full Name</label>
        <input id="name" v-model="newReview.name" ref="reviewerName" type="text">
        <label for="rating_bar">Rate</label>
        <div id="rating_bar">
        <span class="fa fa-star" @click="newReview.rate=5"></span>
        <span class="fa fa-star" @click="newReview.rate=4"></span>
        <span class="fa fa-star" @click="newReview.rate=3"></span>
        <span class="fa fa-star" @click="newReview.rate=2"></span>
        <span class="fa fa-star" @click="newReview.rate=1"></span>
        </div>
        <label for="read-at">Read at</label>
        <input id="read-at" v-model="newReview.date" type="date">
        <label for="free-text">Your opinin</label>
        <textarea id="free-text" v-model="newReview.txt" cols="30" rows="5"></textarea>
        <button class="btn">Add</button>
     </form>
    </section>
  `,
    data() {
        return {
            newReview: null
        };
    },
    created() {
        this.newReview = {
            id: '',
            name: 'Books Reader',
            rate: 3,
            date: new Date().toISOString().slice(0, 10),
            txt: '',
        }
    },
    mounted() {
        this.$refs.reviewerName.focus()
    },
    methods: {
        save() {
            this.$emit('reviewed', this.newReview);
        }
    },
    computed: {

    },
}