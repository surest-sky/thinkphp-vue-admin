<template>
    <el-tag :size="size" :type="type" :effect="effect">{{text}}</el-tag>
</template>


<script>
export default {
    name: 'Tag',
    props: {
        size: {
            type: String,
            default: "dark"
        },
        text: String,
        type: {
            type: String,
            default: "success"
        },
        effect: {
            type: String,
            default: "dark"
        }
    }
}
</script>

<style>

</style>
