import { createStore } from 'vuex'

export default createStore({
    /* eslint-disable */
    state: {
        textCurrentYearMonthDay: "",
        all: {},
        indayo: "",
    },
    getters: {
        registYearMonth(state) {
            let [hoge, huga] = state.textCurrentYearMonthDay.split('月');
            if (hoge.length == 6) {
                let ym = hoge.replace('年', '-0');
                return ym
            } else if (hoge.length == 7) {
                let ym = hoge.replace('年', '-');
                return ym
            }
        },
        registDay(state) {
            let [hoge, huga] = state.textCurrentYearMonthDay.split('月');
            let day = huga.replace('日', '');
            return day
        },
    },
    mutations: {
        viewCurrentDayModal(state, payload) {
            state.textCurrentYearMonthDay = payload
        },
        allHoge(state, payload) {
            state.all = payload
        },
        hogedesu(state, payload){
            state.indayo = payload
        },
    },
    actions: {
        viewCurrentDayModal({ commit }, { currentYearMonth, currentDay }) {
            // let date = currentYearMonth + currentDay + "日";
            let date = currentYearMonth + currentDay + "日";
            commit('viewCurrentDayModal', date)
        },
        allHoge({ commit }, { allMoney }) {
            commit('allHoge', allMoney)
        },
        hogedesu({ commit }, income){
            let a = income.replace(' + ', '');
            commit('hogedesu', a)
        }
    },
    modules: {
    }
})
