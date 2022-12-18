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
                        <form class="form-floating huga" autocomplete="off">
                            <input
                                type="text"
                                class="form-control"
                                id="floatingInputValue"
                                placeholder="食費 {{ aaa.food }}円を修正"
                                v-model="exInputs['exInput0']"
                            />
                            <label for="floatingInputValue"
                                >食費 {{ aaa.food }}円を修正</label
                            >
                        </form>
                        <form class="form-floating huga" autocomplete="off">
                            <input
                                type="text"
                                class="form-control"
                                id="floatingInputValue"
                                placeholder="日用品 {{ aaa.daily }}円を修正"
                                v-model="exInputs['exInput1']"
                            />
                            <label for="floatingInputValue"
                                >日用品 {{ aaa.daily }}円を修正</label
                            >
                        </form>
                        <form class="form-floating huga" autocomplete="off">
                            <input
                                type="text"
                                class="form-control"
                                id="floatingInputValue"
                                placeholder="通信費 {{ aaa.commu }}円を修正"
                                v-model="exInputs['exInput2']"
                            />
                            <label for="floatingInputValue"
                                >通信費 {{ aaa.commu }}円を修正</label
                            >
                        </form>
                        <form class="form-floating huga" autocomplete="off">
                            <input
                                type="text"
                                class="form-control"
                                id="floatingInputValue"
                                placeholder="水道光熱費 {{ aaa.utilities }}円を修正"
                                v-model="exInputs['exInput3']"
                            />
                            <label for="floatingInputValue"
                                >水道光熱費 {{ aaa.utilities }}円を修正</label
                            >
                        </form>
                        <form class="form-floating huga" autocomplete="off">
                            <input
                                type="text"
                                class="form-control"
                                id="floatingInputValue"
                                placeholder="医療費 {{ aaa.medical }}円を修正"
                                v-model="exInputs['exInput4']"
                            />
                            <label for="floatingInputValue"
                                >医療費 {{ aaa.medical }}円を修正</label
                            >
                        </form>
                        <form class="form-floating huga" autocomplete="off">
                            <input
                                type="text"
                                class="form-control"
                                id="floatingInputValue"
                                placeholder="保険料 {{ aaa.premium }}円を修正"
                                v-model="exInputs['exInput5']"
                            />
                            <label for="floatingInputValue"
                                >保険料 {{ aaa.premium }}円を修正</label
                            >
                        </form>
                        <form class="form-floating huga" autocomplete="off">
                            <input
                                type="text"
                                class="form-control"
                                id="floatingInputValue"
                                placeholder="家賃 {{ aaa.rent }}円を修正"
                                v-model="exInputs['exInput6']"
                            />
                            <label for="floatingInputValue"
                                >家賃 {{ aaa.rent }}円を修正</label
                            >
                        </form>
                        <form class="form-floating huga" autocomplete="off">
                            <input
                                type="text"
                                class="form-control"
                                id="floatingInputValue"
                                placeholder="交通費 {{ aaa.trans }}円を修正"
                                v-model="exInputs['exInput7']"
                            />
                            <label for="floatingInputValue"
                                >交通費 {{ aaa.trans }}円を修正</label
                            >
                        </form>
                        <form class="form-floating huga" autocomplete="off">
                            <input
                                type="text"
                                class="form-control"
                                id="floatingInputValue"
                                placeholder="その他出費 {{ aaa.common }}円を修正"
                                v-model="exInputs['exInput8']"
                            />
                            <label for="floatingInputValue"
                                >その他出費 {{ aaa.common }}円を修正</label
                            >
                        </form>
                        <!-- <div class="input-group">
                            <div class="form-floating">
                                <input
                                    type="text"
                                    class="form-control hoge"
                                    id="floatingInputValue1"
                                    autocomplete="off"
                                    placeholder="立替費 {{ aaa.advances }}円を修正"
                                    v-model="exInputs['exInput9']"
                                />
                                <label for="floatingInputValue1"
                                    >立替費 {{ aaa.advances }}円を修正</label
                                >
                            </div>
                            <div class="form-floating">
                                <input
                                    type="text"
                                    class="form-control hoge"
                                    id="floatingInputValue2"
                                    autocomplete="off"
                                    placeholder="👈 なんの？"
                                    v-model="exInputs['exInput10']"
                                />
                                <label for="floatingInputValue2"
                                    >👈 なんの？</label
                                >
                            </div>
                        </div> -->
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
                            data-bs-dismiss="modal"
                            @click="registerExpenceVal"
                        >
                            更新
                        </button>
                        <button
                            type="button"
                            class="btn btn-danger"
                            data-bs-dismiss="modal"
                            @click="deleteExpenceVal"
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
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { mapState, mapGetters } from "vuex";

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
                // exInput9: "",
                // exInput10: "",
            },
        };
    },
    methods: {
        clearModalVal() {
            this.exInputs["exInput0"] = ""
            this.exInputs["exInput1"] = ""
            this.exInputs["exInput2"] = ""
            this.exInputs["exInput3"] = ""
            this.exInputs["exInput4"] = ""
            this.exInputs["exInput5"] = ""
            this.exInputs["exInput6"] = ""
            this.exInputs["exInput7"] = ""
            this.exInputs["exInput8"] = ""
            this.$store.commit("modosu")
        },
        registerExpenceVal() {
            var result = confirm("更新しますか？");
            if (result) {
                let registYM = this.registYearMonth;
                let registD = this.registDay;

                // 空だった場合は入れなおす
                if (!this.exInputs["exInput0"]) {
                    this.exInputs["exInput0"] = this.aaa.food;
                }
                if (!this.exInputs["exInput1"]) {
                    this.exInputs["exInput1"] = this.aaa.daily;
                }
                if (!this.exInputs["exInput2"]) {
                    this.exInputs["exInput2"] = this.aaa.commu;
                }
                if (!this.exInputs["exInput3"]) {
                    this.exInputs["exInput3"] = this.aaa.utilities;
                }
                if (!this.exInputs["exInput4"]) {
                    this.exInputs["exInput4"] = this.aaa.medical;
                }
                if (!this.exInputs["exInput5"]) {
                    this.exInputs["exInput5"] = this.aaa.premium;
                }
                if (!this.exInputs["exInput6"]) {
                    this.exInputs["exInput6"] = this.aaa.rent;
                }
                if (!this.exInputs["exInput7"]) {
                    this.exInputs["exInput7"] = this.aaa.trans;
                }
                if (!this.exInputs["exInput8"]) {
                    this.exInputs["exInput8"] = this.aaa.common;
                }

                firebase
                    .database()
                    .ref("huga/" + registYM + "/" + registD + "/ex/")
                    .update({
                        food: this.exInputs["exInput0"],
                        daily: this.exInputs["exInput1"],
                        commu: this.exInputs["exInput2"],
                        utilities: this.exInputs["exInput3"],
                        medical: this.exInputs["exInput4"],
                        premium: this.exInputs["exInput5"],
                        rent: this.exInputs["exInput6"],
                        trans: this.exInputs["exInput7"],
                        common: this.exInputs["exInput8"],
                        // advances: this.exInputs["exInput9"],
                        // reason: this.exInputs["exInput10"],
                    });
                this.clearModalVal();
            } else {
                this.clearModalVal();
                return;
            }
        },
        deleteExpenceVal() {
            var result = confirm("削除しますか？");
            if (result) {
                let registYM = this.registYearMonth;
                let registD = this.registDay;
                firebase
                    .database()
                    .ref("huga/" + registYM + "/" + registD + "/ex")
                    .remove();
            } else {
                return;
            }
        },
        reRegisterExpenceVal() {},
        // checkValInput(input) {
        //     var regexp = new RegExp(/^[0-9]+(\.[0-9]+)?$/);
        //     if (!regexp.test(input) || input == 0) {
        //         this.flagCheckInput = true;
        //         return true;
        //     }
        // },
        // exObj(obj, ym){
        //     let val = obj.ym;
        //     return val
        // },
    },
    computed: {
        // textPrice() {
        //     return this.valInput.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        // },
        ...mapState(["textCurrentYearMonthDay", "aaa"]),
        ...mapGetters(["registYearMonth", "registDay"]),
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