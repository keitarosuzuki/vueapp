<template>
    <div class="content">
        <h2>{{ displayDate }}</h2>
        <div class="button-area">
            <button
                @click="prevMonth"
                type="button"
                class="btn btn-outline-dark hege"
            >
                前の月
            </button>
            <button
                @click="nextMonth"
                type="button"
                class="btn btn-outline-dark"
            >
                次の月
            </button>
        </div>
        <div class="calendar">
            <div class="calendar-weekly">
                <div class="calendar-youbi" v-for="n in 7" :key="n">
                    {{ youbi(n - 1) }}
                </div>
            </div>
            <div
                class="calendar-weekly"
                v-for="(week, index) in calendars"
                :key="index"
            >
                <div
                    class="calendar-daily"
                    :class="{ outside: currentMonth !== day.month }"
                    v-for="(day, index) in week"
                    :key="index"
                >
                    <div class="calendar-day">
                        {{ day.day }}
                    </div>
                    <button
                        v-if="currentMonth === day.month && day.flag === false"
                        @click="viewCurrentDayModal($event)"
                        type="button"
                        class="btn btn-outline-secondary hogo"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                    >
                        登録
                    </button>
                    <button
                        v-if="currentMonth === day.month && day.flag === true"
                        @click="viewCurrentDayModal($event);hogedesu($event);"
                        type="button"
                        class="btn btn-success hogo btn-balance"
                        data-bs-toggle="modal"
                        data-bs-target="#hoge"
                    >
                        + {{ day.income }}
                    </button>
                    <button
                        v-if="currentMonth === day.month && day.flag === true"
                        @click="viewCurrentDayModal($event);hugadesu();"
                        type="button"
                        class="btn btn-warning btn-balance"
                        data-bs-toggle="modal"
                        data-bs-target="#huga"
                    >
                        - {{ day.expence }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
import moment from "moment";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

export default {
    data() {
        return {
            currentDate: moment(),
            hogeM: "",
            hoge: "",
            huga: "",
            hogeFlag: false,
            hogeIncome: "0",
            hogeExpence: "0",
        };
    },
    methods: {
        getStartDate() {
            let date = moment(this.currentDate);
            date.startOf("month");
            const youbiNum = date.day();
            return date.subtract(youbiNum, "days");
        },
        getEndDate() {
            let date = moment(this.currentDate);
            date.endOf("month");
            const youbiNum = date.day();
            return date.add(6 - youbiNum, "days");
        },
        getCalendar() {
            let startDate = this.getStartDate();
            const endDate = this.getEndDate();
            const weekNumber = Math.ceil(endDate.diff(startDate, "days") / 7);

            let calendars = [];
            let calendarDate = this.getStartDate();

            for (let week = 0; week < weekNumber; week++) {
                let weekRow = [];
                for (let day = 0; day < 7; day++) {
                    // 処理
                    if (
                        this.hogeM.hasOwnProperty(
                            calendarDate.format("YYYY-MM")
                        )
                    ) {
                        this.hoge = calendarDate.format("YYYY-MM");
                        if (
                            this.hogeM[this.hoge].hasOwnProperty(
                                calendarDate.get("date")
                            )
                        ) {
                            this.huga = calendarDate.get("date");
                            if (this.hogeM[this.hoge][this.huga].in) {
                                let a = Object.values(
                                    this.hogeM[this.hoge][this.huga].in
                                );
                                this.hogeIncome = a.reduce(function (
                                    previousValue,
                                    currentValue
                                ) {
                                    return (
                                        Number(previousValue) +
                                        Number(currentValue)
                                    );
                                });
                            } else {
                                this.hogeIncome = 0;
                            }
                            if (this.hogeM[this.hoge][this.huga].ex) {
                                let b = Object.values(
                                    this.hogeM[this.hoge][this.huga].ex
                                );
                                this.hogeExpence = b.reduce(function (
                                    previousValue,
                                    currentValue
                                ) {
                                    return (
                                        Number(previousValue) +
                                        Number(currentValue)
                                    );
                                });
                            } else {
                                this.hogeExpence = 0;
                            }
                            this.hogeFlag = true;
                        }
                    }

                    weekRow.push({
                        day: calendarDate.get("date"),
                        month: calendarDate.format("YYYY-MM"),
                        income: this.hogeIncome,
                        expence: this.hogeExpence,
                        flag: this.hogeFlag,
                    });

                    this.hogeFlag = false;
                    this.hoge = "";
                    this.huga = "";
                    this.hogeIncome = "";
                    this.hogeExpence = "";
                    calendarDate.add(1, "days");
                }
                calendars.push(weekRow);
            }
            return calendars;
        },
        nextMonth() {
            this.currentDate = moment(this.currentDate).add(1, "month");
        },
        prevMonth() {
            this.currentDate = moment(this.currentDate).subtract(1, "month");
        },
        youbi(dayIndex) {
            const week = ["日", "月", "火", "水", "木", "金", "土"];
            return week[dayIndex];
        },
        viewCurrentDayModal(event) {
            let clickedDate = event.target.parentNode.children[0].textContent;
            this.$store.dispatch("viewCurrentDayModal", {
                currentYearMonth: this.displayDate,
                currentDay: clickedDate,
            });
        },
        hogedesu(event) {
            let income = event.target.textContent;
            this.$store.dispatch("hogedesu", income);
        },
        hugadesu() {
            let all = this.$store.state.all;
            let ym = this.$store.getters.registYearMonth;
            let d = this.$store.state.day;
            if(!all[ym][d].ex){
                // firebase
                //     .database()
                //     .ref("huga/" + ym + "/" + d + "/ex/")
                //     .update({
                //         food: 0,
                //         daily: 0,
                //         commu: 0,
                //         utilities: 0,
                //         medical: 0,
                //         premium: 0,
                //         rent: 0,
                //         trans: 0,
                //         common: 0,
                //     });
                return
            }else{
                this.$store.dispatch("hugadesu", all[ym][d].ex);
            }
        },
    },
    computed: {
        calendars() {
            return this.getCalendar();
        },
        displayDate() {
            return this.currentDate.format("YYYY[年]M[月]");
        },
        currentMonth() {
            return this.currentDate.format("YYYY-MM");
        },
        currentMonthModal() {
            return this.currentDate.format("M[月]");
        },
        displayDateHoge() {
            return this.currentDate.format("D");
        },
    },
    mounted() {
        firebase
            .database()
            .ref("huga")
            .on("value", (snapshot) => {
                if(!snapshot.val()){
                    alert("空です");
                    return
                }
                this.hogeM = snapshot.val();
                this.$store.dispatch("allHoge", {
                    allMoney: snapshot.val(),
                });
            });
    },
};
</script>

<style>
.content {
    margin: 2em auto;
    width: 900px;
}
.button-area {
    margin: 0.5em 0;
}
.hege {
    margin-right: 50px;
}
.button {
    padding: 4px 8px;
    margin-right: 8px;
}
.calendar {
    max-width: 900px;
    border-top: 1px solid #e0e0e0;
    font-size: 0.8em;
}
.calendar-weekly {
    display: flex;
    border-left: 1px solid #e0e0e0;
    /* background-color: black; */
}
.calendar-daily {
    flex: 1;
    min-height: 125px;
    border-right: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    margin-right: -1px;
}
.calendar-day {
    text-align: center;
}
.btn {
    width: 80px;
}
.hogo {
    margin: 5px 0px 10px;
}
.btn-balance {
    width: 100px;
}
.calendar-youbi {
    flex: 1;
    border-right: 1px solid #e0e0e0;
    margin-right: -1px;
    text-align: center;
}
.outside {
    background-color: #f7f7f7;
}
</style>