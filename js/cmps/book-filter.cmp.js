export default {
    template: `
   <section class="book-filter">
      <input type="text" v-model="filterBy.title" placeholder="Filter by title">
     <div class="price=filter-container">
     <input id="price-range" type="range" v-model="filterBy.priceRange" min="0" max="400">
     <label for="price-range">Filter by price: {{filterBy.priceRange}}</label>
     </div>
      <button class="btn"  @click="filter">Filter</button>
    </section>
  `,
    data() {
        return {
            filterBy: {
                title: "",
                priceRange: 200,
            },
        };
    },
    methods: {
        filter() {
            this.$emit("filtered", {...this.filterBy});
        },
    },
    computed: {},
};
