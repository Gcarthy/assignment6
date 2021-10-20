const New = {
    data() {
        return {
            person: undefined,
            books:[]
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
        }
    },
    created() {
        this.fetchBookData();
        this.fetchUserData();
    }
}

Vue.createApp(New).mount('#App');