<template>
    <div class="calendar">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">日</th>
                    <th scope="col">月</th>
                    <th scope="col">火</th>
                    <th scope="col">水</th>
                    <th scope="col">木</th>
                    <th scope="col">金</th>
                    <th scope="col">土</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td v-for="(date, index) in aryDate" 
                        v-bind:key = index 
                        data-bs-toggle="modal" 
                        data-bs-target="#exampleModal">{{date}}</td>
                </tr>
                <tr>
                    <td v-for="(date, index) in aryDate2" 
                        v-bind:key = index 
                        data-bs-toggle="modal" 
                        data-bs-target="#exampleModal">{{date}}</td>
                </tr>
                <tr>
                    <td v-for="(date, index) in aryDate3" 
                        v-bind:key = index 
                        data-bs-toggle="modal" 
                        data-bs-target="#exampleModal">{{date}}</td>
                </tr>
                <tr>
                    <td v-for="(date, index) in aryDate4" 
                        v-bind:key = index 
                        data-bs-toggle="modal" 
                        data-bs-target="#exampleModal">{{date}}</td>
                </tr>
                <tr>
                    <td v-for="(date, index) in aryDate5" 
                        v-bind:key = index 
                        data-bs-toggle="modal" 
                        data-bs-target="#exampleModal">{{date}}</td>
                </tr>
                <tr>
                    <td v-for="(date, index) in aryDate6" 
                        v-bind:key = index 
                        data-bs-toggle="modal" 
                        data-bs-target="#exampleModal">{{date}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
/* eslint-disable */

export default {
  name: 'Calendar',
  data: function() {
    return {
      aryDate: [30,31,1,2,3,4,5],
      aryDate2: [6,7,8,9,10,11,12],
      aryDate3: [13,14,15,16,17,18,19],
      aryDate4: [20,21,22,23,24,25,26],
      aryDate5: [27,28,29,30,1,2,3],
      aryDate6: [4,5,6,7,8,9,10],
    }
  },
  mounted() {
      // イベントが発火するたびに
      window.addEventListener("イベント名", 関数名) 

      // DOMが呼び込まれたときに一回だけ
      this.関数名()
  },
}
</script>