import Vuex from 'vuex';
import shop from "@/api/shop";

export default new Vuex.Store({
    state: { // = data
        products: [],
        loading: false
    },
    getters: {// = computed properties
        availableProducts(state) {
            return state.products.filter(product => product.inventory > 0)
        },
        isLoading(state) {
            return state.loading
        }
    },
    actions: {// = method
        fetchProducts({commit}) {
            commit('setLoading', true)
            // make the call
            // call setProduct mutation
            // eslint-disable-next-line no-unused-vars
            return new Promise((resolve, reject) => {
                shop.getProducts(products => {
                    commit('setProducts', products)
                    resolve()
                })
            });

        },
        addToCart({commit}, product) {
            if (product.inventory > 0) {
                commit('pushProductToCart', product)
            } else {
                //show out of stock message
            }
        },
        setLoading({commit}, loading) {
            commit('setLoading', loading)
        }
    },
    mutations: {// setting or updating state
        setProducts(state, products) {
            // update products
            state.products = products
        },
        setLoading(state, loading) {
            state.loading = loading
        }
    }
})