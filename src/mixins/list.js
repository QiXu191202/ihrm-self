export default {
    data() {
        return {
            list: [],
            queryData: {
                page: 1
            },
            total: 0
        }
    },
    created() {
        this.initData();
    },
    methods: {
        initData() {
            console.log("全局mixin");
        },
        // 当前页面
        handleCurrentChange(val) {
            this.queryData.page = val;
            this.initData();
        },
    }
}