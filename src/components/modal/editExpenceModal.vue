<template>
    <div class="edit-expence-modal">
        <div
            class="modal fade"
            id="huga"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                            {{ textCurrentYearMonthDay }} の出費
                        </h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            @click="clearModalVal"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <form
                            class="form-floating huga"
                            autocomplete="off"
                            v-for="(title, index) in aryAccountTitle"
                            :key="index"
                        >
                            <input
                                type="text"
                                class="form-control"
                                id="floatingInputValue"
                                placeholder="{{title}}の金額を入力"
                                v-model="exInputs['exInput' + index]"
                            />
                            <label for="floatingInputValue"
                                >{{ title }}の金額を入力</label
                            >
                        </form>
                        <div class="input-group">
                            <div class="form-floating">
                                <input
                                    type="text"
                                    class="form-control hoge"
                                    id="floatingInputValue1"
                                    placeholder="立替費の金額を入力"
                                    v-model="exInputs['exInput9']"
                                />
                                <label for="floatingInputValue1"
                                    >立替費の金額を入力</label
                                >
                            </div>
                            <div class="form-floating">
                                <input
                                    type="text"
                                    class="form-control hoge"
                                    id="floatingInputValue2"
                                    placeholder="なんの"
                                    v-model="exInputs['exInput10']"
                                />
                                <label for="floatingInputValue2"
                                    >👈 なんの？</label
                                >
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                            @click="clearModalVal"
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            class="btn btn-outline-warning"
                            @click="registerIncomeVal"
                        >
                            更新
                        </button>
                        <button
                            type="button"
                            class="btn btn-danger"
                            @click="registerExpenceVal"
                        >
                            削除
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import firebase from "firebase/compat/app"
import "firebase/compat/database"
import { mapState, mapGetters } from "vuex"

export default {
    name: "editExpenceModal",
    data() {
        return {
            aryAccountTitle: [
                "食費",
                "日用品",
                "通信費",
                "水道光熱費",
                "医療費",
                "保険料",
                "家賃",
                "交通費",
                "その他出費", //👈服飾費、娯楽費みたいに分けたいね
            ],
            flagCheckInput: false,
            exInputs: {
                exInput0: "",
                exInput1: "",
                exInput2: "",
                exInput3: "",
                exInput4: "",
                exInput5: "",
                exInput6: "",
                exInput7: "",
                exInput8: "",
                exInput9: "",
                exInput10: "",
            },
        };
    },
    computed: {
        // textPrice() {
        //     return this.valInput.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        // },
        ...mapState(["textCurrentYearMonthDay", "all"]),
        ...mapGetters(["registYearMonth", "registDay"]),
        Ex(){
            let obj = this.$store.state.all;
            let ym = this.$store.getters.registYearMonth;
            let dy = this.$store.getters.registDay;
            return this.exObj(obj, ym);
        },
    },
    methods: {
        clearModalVal() {
            this.flagBalance = "";
            this.valInput = "";
            this.flagCheckInput = false;
        },
        // registerVal() {
        //     let registYM = this.registYearMonth;
        //     let registD = this.registDay;
        //     let money = this.valInput;
        //     if (this.flagBalance == this.INCOME) {
        //         // 新規登録 - 収入
        //         firebase
        //             .database()
        //             .ref(
        //                 "huga/" +
        //                     registYM +
        //                     "/" +
        //                     registD +
        //                     "/" +
        //                     this.INCOME +
        //                     "/"
        //             )
        //             .set({
        //                 income: money,
        //             });
        //     } else if (this.flagBalance == this.EXPENCE) {
        //         // 新規登録 - 費用
        //         firebase
        //             .database()
        //             .ref(
        //                 "huga/" +
        //                     registYM +
        //                     "/" +
        //                     registD +
        //                     "/" +
        //                     this.EXPENCE +
        //                     "/"
        //             )
        //             .set({
        //                 food: this.exInputs["exInput0"],
        //                 daily: this.exInputs["exInput1"],
        //                 commu: this.exInputs["exInput2"],
        //                 utilities: this.exInputs["exInput3"],
        //                 medical: this.exInputs["exInput4"],
        //                 premium: this.exInputs["exInput5"],
        //                 rent: this.exInputs["exInput6"],
        //                 trans: this.exInputs["exInput7"],
        //                 common: this.exInputs["exInput8"],
        //                 advances: this.exInputs["exInput9"],
        //                 reason: this.exInputs["exInput10"],
        //             });
        //     }
        //     this.clearModalVal();
        // },
        checkValInput(input) {
            var regexp = new RegExp(/^[0-9]+(\.[0-9]+)?$/);
            if (!regexp.test(input) || input == 0) {
                this.flagCheckInput = true;
                return true;
            }
        },
        exObj(obj, ym){
            let val = obj.ym;
            return val
        },
    },
};
</script>

<style scoped>
.hoge {
    padding-right: 24.5px;
}
.huga {
    padding-bottom: 6px;
}
</style>