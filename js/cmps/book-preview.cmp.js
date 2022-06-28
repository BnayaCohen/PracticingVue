export default {
  props: ["book"],
  template: `
    <h3>{{book.title}}</h3>
    <p>Price: {{getPrice}}</p>
`,
  data() {
    return {};
  },
  methods: {},
  computed: {
    getPrice() {
      const listPrice =this.book.listPrice
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: listPrice.currencyCode }).format(listPrice.amount)
    }
  },
};
