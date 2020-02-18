export default {
    increase(state, value) {
        value = value || 1;
        state.count += value;
    },
    decrease(state, value) {
        value = value || 1;
        state.count -= value;
    }
}