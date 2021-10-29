const offer = {
    data() {
        return {
            person: undefined,
            selectedBook: null,
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
        },
    
        postEditBook(evt) {
            console.log("Updating!", this.bookForm);
    
            fetch('api/book/update.php', {
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
                this.resetBookForm();
              });
          },
    
          postDeleteBook(o) {
            if (!confirm("Are you sure you want to delete the book from "+o.title+"?")) {
              return;
            }
            console.log("Delete!", o);
    
            fetch('api/book/delete.php', {
                method:'POST',
                body: JSON.stringify(o),
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
                this.resetBookForm();
              });
          },
    
          selectBookToEdit(o) {
            this.selectedBook = o;
            this.bookForm = Object.assign({}, this.selectedBook);
        },
    
        resetBookForm() {
            this.selectedBook = null;
            this.bookForm = {};
        },

    },
    

    created() {
        this.fetchBookData();
        this.fetchUserData();
    }
}

Vue.createApp(offer).mount('#App');