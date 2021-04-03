<template>
    <div>
        <h1>Product List</h1>
        <div v-if="loading" class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        <ul v-else>
            <li v-for="product in products" v-bind:key="product.id">
                {{ product.title }} - {{ product.price }} - {{product.inventory}}
                <button @click="addProductToCart(product)">Add to cart</button>
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