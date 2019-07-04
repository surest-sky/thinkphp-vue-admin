<template>
    
</template>

<script>
export default {
    name: 'index',
    data() {
        return {
            list: []
        }
    },
    method: {
        getList() {
            this.$get('/api/superstore/feedbackbanner')
        }
    }
}
</script>

<style>

</style>
