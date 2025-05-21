<template>
  <div class="list-wrap">
    <p>Одобрить запросы:</p>
    <div class="list-header"></div>
    <div class="list">
      <RequestListItem
        v-for="request in requests"
        :key="request.id"
        :id="request.id"
        :name="request.name"
        :createdAt="request.createdAt"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import RequestListItem from './RequestListItem.vue'
import { useRequestsStore } from '@/stores/requestsStore'

useRequestsStore().fetchRequests()
const requests = useRequestsStore().requests
</script>

<style scoped lang="scss">
.list-wrap {
  width: 100%;
}
</style>
