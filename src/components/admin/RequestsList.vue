<template>
  <div class="list-wrap">
    <transition name="fade" appear>
      <RequestModal
        class="modal"
        @close-modal="closeModal"
        @close-with-changes="(closeModal(), refreshList())"
        v-if="modalVisible"
        :request="useRequestsStore().getRequestById(idForModal)"
      />
    </transition>
    <p>Одобрить запросы:</p>
    <div class="list-header"></div>
    <div class="list">
      <div
        style="display: flex; justify-content: space-between; column-gap: 40px; margin-bottom: 40px"
      >
        <div style="font-size: 28px; flex: 2 2 0; text-align: center">Название</div>
        <div style="font-size: 28px; text-align: center; flex: 0.5 0.5 0">Тип</div>
        <div style="font-size: 28px; flex: 2 2 0; text-align: center">Время отправки</div>
        <div style="font-size: 28px; flex: 1 1 0">Действие</div>
      </div>
      <RequestListItem
        @msgForModal="showModal"
        v-for="request in requests"
        :key="request.id"
        :id="request.id"
        :name="request.name"
        :createdAt="request.createdAt"
        :type="request.requestType"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import RequestListItem from './RequestListItem.vue'
import { useRequestsStore, type RequestData } from '@/stores/requestsStore.ts'
import RequestModal from './RequestModal.vue'
import { ref } from 'vue'

useRequestsStore().fetchRequests()
const requests = ref<RequestData[]>(useRequestsStore().requests)

const modalVisible = ref(false)
const idForModal = ref(-1)

function showModal(id: number) {
  idForModal.value = id
  modalVisible.value = true
}

function closeModal() {
  modalVisible.value = false
  idForModal.value = -1
}
function refreshList() {
  useRequestsStore().refreshStore()
  requests.value = useRequestsStore().requests
}
</script>

<style scoped lang="scss">
.modal {
  z-index: 99999;
  max-height: calc(100vh);
  overflow-y: auto;
}
.list-wrap {
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
