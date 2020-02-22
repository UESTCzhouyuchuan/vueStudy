/** @format */
//vue-router
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

//Component
import Home from "./components/Home.vue";
import ljb from "./components/ljb.vue";
import myClass from "./components/MyClass.vue";
import father from "./components/father-child/component1.vue";
import globalData from "./components/globalData/index.vue";
import eventBus from "./components/eventBus/index.vue";
import vuex1 from "./vuex/vuex1.vue";
import vuex2 from "./vuex/vuex2.vue";
import zy from "./components/zy.vue";
import unicode from "./components/unicode.vue";
const routes = [
    { path: "/", component: Home, meta: { title: "home" } },
    { path: "/home", component: Home, meta: { title: "home" } },
    { path: "/father", component: father, meta: { title: "father" } },
    { path: "/globalData", component: globalData, meta: { title: "globalData" } },
    { path: "/eventBus", component: eventBus, meta: { title: "eventBus" } },
    { path: "/vuex1", component: vuex1, meta: { title: "vuex1" } },
    { path: "/vuex2", component: vuex2, meta: { title: "vuex2" } },
    { path: "/ljb", name: "ljb", component: ljb, meta: { title: "垃圾表" } },
    {
        path: "/myClass",
        name: "myClass",
        component: myClass,
        meta: { title: "大二班" },
    },
    { path: "/unicode", name: "unicode", component: unicode, meta: { title: "unicode转码" } },
    { path: "/zy", component: zy, meta: { title: "中药" } },
    { path: "*", redirect: "/", meta: { title: "..." } },
];
const router = new VueRouter({
    mode: "history",
    routes,
});
export default router;