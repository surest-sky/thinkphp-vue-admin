<script>
export default {
    functional: true,
    props: {
        row: Object,
        render: Function
    },
    render: (createElement, ctx) => {
        const params = {
            row: ctx.props.row,
            index: ctx.props.index
        }
        return ctx.props.render(createElement, params)
    }
}
</script>
