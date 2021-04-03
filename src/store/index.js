import Vuex from 'vuex';

export default new Vuex.Store({
    state: { // = data
        products: []
    },
    getters: {// = computed properties
        availableProducts(state) {
            return state.products.filter(product => product.inventory > 0)
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