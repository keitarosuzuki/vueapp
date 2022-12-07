<template>
    <div class="modal-dayo">
        <registModal/>
        <editIncomeModal/>
        <editExpenceModal/>
    </div>
</template>

<script>
import registModal from './modal/registModal.vue'
import editIncomeModal from './modal/editIncomeModal.vue'
import editExpenceModal from './modal/editExpenceModal.vue'

export default {
    name: "Modal",
    components: {
        registModal,
        editIncomeModal,
        editExpenceModal,
    }
}
</script>