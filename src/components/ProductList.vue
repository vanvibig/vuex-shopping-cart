<template>
    <div>
        <h1>Product List</h1>
        <div v-if="loading" class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        <ul v-else class="row d-flex justify-content-center">
            <li v-for="product in products" v-bind:key="product.id">
                <div class="card bd-highlight border-dark m-2 p-2">
                    <div class="card-title">{{ product.title }}</div>
                    <div class="card-title">${{ product.price }}</div>
                    <div class="card-title">quantity: {{ product.inventory }}</div>
                </div>
                <button class="btn btn-primary" @click="addProductToCart(product)">Add to cart</button>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    computed: {//run when properties called
        loading() {
            return this.$store.getters.isLoading
        },
        products() {
            return this.$store.getters.availableProducts
        }
    },
    methods: {
        addProductToCart(product) {
            this.$store.dispatch('addProductToCart', product)
        }
    },
    created() {// run when new instance
        this.$store.dispatch('fetchProducts').then(() => {
            this.$store.dispatch('setLoading', false)
        });
    }
}
</script>

<style>

</style>