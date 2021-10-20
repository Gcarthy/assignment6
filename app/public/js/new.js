const offer = {
    data() {
        return {
            person: undefined,
            books:[],
            bookForm: {}
        }
    },
    computed: {
        prettyBirthday() {
            return dayjs(this.person.dob.date).format("DD MMM YYYY")
        }
    },
    methods: {
        fetchUserData() {
            fetch('https://randomuser.me/api/')
                .then(response => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    this.person = responseJson.results[0];
                })
                .catch((err) => {
                    console.error(err);
                })
        },
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$" + d;
        },
        fetchBookData() {
            fetch('/api/book/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.books = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },

            postNewBook(evt) {             
                console.log("Posting!", this.bookForm);
        
                fetch('/api/book/create.php', {
                    method:'POST',
                    body: JSON.stringify(this.bookForm),
                    headers: {
                      "Content-Type": "application/json; charset=utf-8"
                    }
                  })
                  .then( response => response.json() )
                  .then( json => {
                    console.log("Returned from post:", json);
                    // TODO: test a result was returned!
                    this.books = json;
                    
                    // reset the form
                    this.bookForm = {};
                  });
        }
    },

    created() {
        this.fetchBookData();
        this.fetchUserData();
    }
}

Vue.createApp(offer).mount('#App');