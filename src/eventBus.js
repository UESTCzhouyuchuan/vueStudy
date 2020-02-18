import Vue from 'vue'

let bus = new Vue({
    data: {
        msg: 'Event Bus'
    },
    watch: {
        msg(value) {
            this.$emit('changeMsg', value);
        }
    }
});
bus.$on('changeMsg', (value) => {
    console.log('监听到改变', value);
    bus.msg = value;
});
export default bus;
/**
 * 当移除发布订阅模式之后，eventBus就退化成全局对象模式
 */