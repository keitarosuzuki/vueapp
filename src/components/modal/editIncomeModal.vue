<template>
    <div class="edit-income-modal">
        <div
            class="modal fade"
            id="hoge"
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
                            {{ textCurrentYearMonthDay }} の収入
                        </h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <form class="form-floating" autocomplete="off">
                            <input
                                type="text"
                                class="form-control"
                                :class="{
                                    'border border-danger border-5 rounded-3':
                                        flagCheckInput === true,
                                }"
                                id="floatingInputValue"
                                placeholder="{{ this.indayo }}円を修正できます"
                                v-model="valInput"
                            />
                            <label for="floatingInputValue"
                                >{{ this.indayo }}円を修正できます</label
                            >
                        </form>

                        <!-- 立替金 -->
                        <!-- <div
                            v-for="(title, index) in aryAdvances"
                            :key="index"
                            class="form-check"
                        >
                            <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                            />
                            <label
                                class="form-check-label"
                                for="flexCheckDefault"
                            >
                                {{ title }}
                            </label>
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
                            @click="editIncomeVal"
                        >
                            更新
                        </button>
                        <button
                            type="button"
                            class="btn btn-danger"
                            data-bs-dismiss="modal"
                            @click="deleteIncomeVal"
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
    name: "editIncomeModal",
    data() {
        return {
            valInput: "",
            // aryAdvances: [
            //     "交通費 ¥800",
            //     "スタジオ代 ¥6,000",
            // ],
            flagCheckInput: false,
        };
    },
    methods: {
        clearModalVal() {
            this.flagBalance = "";
            this.valInput = "";
            this.flagCheckInput = false;
        },
        editIncomeVal() {
            var result = confirm("更新しますか？");
            if (result) {
                let registYM = this.registYearMonth;
                let registD = this.registDay;

                if(!this.valInput){
                    this.valInput = this.indayo
                }

                firebase
                    .database()
                    .ref("huga/" + registYM + "/" + registD + "/in/")
                    .update({
                        income: this.valInput,
                    });
                this.clearModalVal();
            } else {
                this.clearModalVal();
                return;
            }
        },
        deleteIncomeVal() {
            var result = confirm("削除しますか？");
            if (result) {
                let registYM = this.registYearMonth;
                let registD = this.registDay;
                firebase
                    .database()
                    .ref("huga/" + registYM + "/" + registD + "/in/income")
                    .remove();
            } else {
                return;
            }
        },
    },
    computed: {
        // textPrice() {
        //     return this.valInput.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        // },
        ...mapState(["textCurrentYearMonthDay", "indayo"]),
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