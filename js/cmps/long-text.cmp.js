export default {
    props: ["txt"],
    template: `
    <article>
    <p>{{description}}</p>
    <button v-if="txt.length > 100" class="btn" 
    @click="isReadMore= !isReadMore" >{{readMoreOrLess}}</button>
    </article>
  `,
    data() {
        return {
            isReadMore: false,
        };
    },
    methods: {},
    computed: {
        description() {
            if (this.isReadMore || this.txt.length < 100) return this.txt
            return this.txt.substring(0, 100) + '...'
        },
        readMoreOrLess() {
            return this.isReadMore ? 'Less' : 'More'
        }
    },
}