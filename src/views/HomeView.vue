<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Pagination/>
    <Month/>
    <Calendar/>
    <Modal/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Pagination from '@/components/Pagination.vue'
import Month from '@/components/Month.vue'
import Calendar from '@/components/Calendar.vue'
import Modal from '@/components/Modal.vue'

export default {
  name: 'HomeView',
  components: {
    // HelloWorld
    Pagination,
    Month,
    Calendar,
    Modal,
  }
}
</script>
