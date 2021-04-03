import shop from "@/api/shop";
import {createStore} from 'vuex';

export default createStore({
    state: { // = data
        loading: false,
        products: [],
        cart: [], // to store list of products
        checkoutStatus: null
    },
    getters: {// = computed properties
        availableProducts(state) {
            return state.products.filter(product => product.inventory > 0)
        },
        isLoading(state) {
            return state.loading
        },
        cartProducts(state) {
            return state.cart.map(cartItem => {
                const product = state.products.find(product => product.id === cartItem.id)
                return {
                    title: product.title,
                    price: product.price,
                    quantity: cartItem.quantity
                }
            });
        },
        cartTotal(state, getter) {
            let total = 0
            getter.cartProducts.forEach(product => {
                total += product.price
            })
            return total;
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
        addProductToCart(context, product) {
            if (product.inventory > 0) {
                // check if item existed in cart
                const cartItem = context.state.cart.find(item => item.id === product.id);
                if (!cartItem) {
                    context.commit('pushProductToCart', product.id);
                } else {
                    context.commit('incrementItemQuantity', cartItem);
                }

                context.commit('decrementProductInventory', product);
            }
        },
        setLoading({commit}, loading) {
            commit('setLoading', loading)
        },
        checkout(context) {
            shop.buyProducts(context.state.cart,
                () => {// in case success
                    context.commit('emptyCart')
                    context.commit('setCheckoutStatus', 'success')
                },
                () => {//in case error
                    context.commit('setCheckoutStatus', 'fail')
                }
            )
        }
    },
    mutations: {// setting or updating state
        setProducts(state, products) {
            // update products
            state.products = products
        },
        setLoading(state, loading) {
            state.loading = loading
        },
        pushProductToCart(state, productId) {
            state.cart.push({
                id: productId,
                quantity: 1
            })
        },
        incrementItemQuantity(state, cartItem) {
            cartItem.quantity += 1;
        },
        decrementProductInventory(state, product) {
            product.inventory -= 1;
        },
        setCheckoutStatus(state, status) {
            state.checkoutStatus = status
        },
        emptyCart(state) {
            state.cart = []
        }
    }
})