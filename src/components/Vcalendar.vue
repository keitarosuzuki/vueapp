<template>
    <div class="v-calendar">
        <Vcalendar is-expanded></Vcalendar>
    </div>
</template>

<script>
import Vcalendar from '../../node_modules/v-calendar'

export default {
    name: 'Vcalendar',
    data: { 
        attrs: [
            {
                key: 'today',
                highlight: {
                    backgroundColor: '#ff8080',
                },
                dates: new Date(),
                popover: {
                    label: 'メッセージを表示できます',
                },
            }
        ],
    },
    components: {
        Vcalendar
    }
}
</script>

<style>
body {
  background: #20262E;
  padding: 20px;
  font-family: Helvetica;
}

#app {
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  transition: all 0.2s;
  text-align: center;
}

</style>