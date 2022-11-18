<template>
    <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5
                        v-if="flagTitle === ''"
                        class="modal-title"
                        id="exampleModalLabel"
                    >
                        どっち
                    </h5>
                    <h5
                        v-if="flagTitle === 'in'"
                        class="modal-title"
                        id="exampleModalLabel"
                    >
                        収入 立て替えあった？
                    </h5>
                    <h5
                        v-if="flagTitle === 'ex'"
                        class="modal-title"
                        id="exampleModalLabel"
                    >
                        出費
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
                        v-if="flagTitle === ''"
                        class="form-floating"
                        autocomplete="off"
                    >
                        <input
                            type="text"
                            class="form-control"
                            :class="{
                                'border border-danger border-5 rounded-3':
                                    flagCheckInput === true,
                            }"
                            id="floatingInputValue"
                            placeholder="金額を入力"
                            v-model="valInput"
                        />
                        <label for="floatingInputValue">金額を入力</label>
                    </form>
                    <div v-else-if="flagTitle === 'in'">
                        <h2>¥ {{ textPrice }}</h2>
                        <div
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
                        </div>
                    </div>
                    <div v-else-if="flagTitle === 'ex'">
                        <h2>¥ {{ textPrice }}</h2>
                        <form
                            class="form-floating"
                            autocomplete="off"
                            v-for="(title, index) in aryAccountTitle"
                            :key="index"
                        >
                            <input
                                type="text"
                                class="form-control"
                                id="floatingInputValue"
                                placeholder="{{title}}"
                            />
                            <label for="floatingInputValue">{{ title }}</label>
                        </form>
                        <div class="input-group">
                            <div class="form-floating">
                                <input
                                    type="text"
                                    class="form-control hoge"
                                    id="floatingInputValue1"
                                    placeholder="立替費"
                                />
                                <label for="floatingInputValue1">立替費</label>
                            </div>
                            <div class="form-floating">
                                <input
                                    type="text"
                                    class="form-control hoge"
                                    id="floatingInputValue2"
                                    placeholder="なんの"
                                />
                                <label for="floatingInputValue2">なんの</label>
                            </div>
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
                        class="btn btn-success"
                        @click="registerIncomeVal"
                    >
                        収入
                    </button>
                    <button
                        type="button"
                        class="btn btn-warning"
                        @click="registerExpenceVal"
                    >
                        出費
                    </button>
                    <!-- <button type="button" class="btn btn-danger">削除</button>
                    <button type="button" class="btn btn-warning">修正</button> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: "Modal",
    data() {
        return {
            valInput: "",
            aryAccountTitle: [
                "食費",
                "日用品",
                "通信費",
                "水道光熱費",
                "医療費",
                "保険料",
                "家賃",
                "交通費",
                "その他出費",
            ],
            flagTitle: "",
            aryAdvances: [
                // 例
                "交通費",
                "スタジオ代",
            ],
            flagCheckInput: false,
        };
    },
    methods: {
        clearModalVal() {
            this.flagTitle = "";
            this.valInput = "";
            this.flagCheckInput = false;
        },
        registerIncomeVal() {
            if (this.checkValInput(this.valInput)) {
                return false;
            }
            this.flagTitle = "in";
        },
        registerExpenceVal() {
            if (this.checkValInput(this.valInput)) {
                return false;
            }
            this.flagTitle = "ex";
        },
        checkValInput(input) {
            var regexp = new RegExp(/^[0-9]+(\.[0-9]+)?$/);
            if (!regexp.test(input)) {
                this.flagCheckInput = true;
                return true;
            }
        },
    },
    computed: {
        textPrice() {
            return this.valInput.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        },
    },
    created() {},
};
</script>

<style scoped>
.hoge {
    padding-right: 24.5px;
}
</style>