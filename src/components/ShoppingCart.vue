<template>
    <div>
        <h1>Shopping Cart</h1>
        <ul class="row d-flex justify-content-center">
            <li v-for="product in products" v-bind:key="product.id">
                <div class="card bd-highlight border-dark m-2 p-2 card-body">
                    <div class="card-title">{{ product.title }}</div>
                    <div class="card-title">${{ product.price }}</div>
                    <div class="card-title">quantity: {{ product.quantity }}</div>
                </div>
            </li>
        </ul>
        <p>Total: ${{ total }}</p>
        <button class="btn btn-primary m-1"
                @click="this.$store.dispatch('checkout')">Checkout
        </button>
        <br>
        <div class="w-25 row d-flex justify-content-center">
            <h2 v-bind:class="[this.$store.state.checkoutStatus === 'success' ? 'bg-info' : 'bg-danger']"
                v-if="this.$store.state.checkoutStatus">{{ this.$store.state.checkoutStatus }}</h2>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        products() {
            return this.$store.getters.cartProducts
        },
        total() {
            return this.$store.getters.cartTotal
        }
    }
}
</script>

<style>

</style>