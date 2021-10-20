const New = {
    data() {
        return {
            person: undefined,
            books:[],
            offerForm: {}
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

            postNewOffer(evt) {             
                console.log("Posting!", this.offerForm);
        
                fetch('api/book/create.php', {
                    method:'POST',
                    body: JSON.stringify(this.offerForm),
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
                    this.offerForm = {};
                  });
        }
    },

    created() {
        this.fetchBookData();
        this.fetchUserData();
    }
}

Vue.createApp(New).mount('#App');