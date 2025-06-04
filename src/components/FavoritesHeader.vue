<template>
  <div class="favorites-header row items-center justify-between q-mb-md">
    <div class="text-h6 text-weight-bold">Favoriti</div>
    <div
      class="view-all cursor-pointer text-dark"
      @click="$emit('view-all')"
    >
      <span>Pogledaj sve</span>
      <q-icon name="keyboard_arrow_right" size="24px" />
    </div>
  </div>
</template>

<style scoped>
.favorites-header {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 12px;
  margin-bottom: 20px;
}

.view-all {
  user-select: none;
  color: #555;
  font-weight: 600;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.view-all span {
  margin-right: 4px;
}
</style>
