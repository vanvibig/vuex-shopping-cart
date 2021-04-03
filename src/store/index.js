import Vuex from 'vuex';

export default new Vuex.Store({
    state: { // = data
        products: []
    },
    getters: {// = computed properties
        productCount() {
            //return len of products array
        }
    },
    actions: {// = method
        fetchProducts() {
            // make the call
        }
    },
    mutations: {// setting or updating state
        setProducts(state, products) {
            // update products
            state.products = products
        }
    }
})