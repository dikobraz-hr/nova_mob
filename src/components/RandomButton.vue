<template>
  <div class="random-btn-wrapper">
    <q-btn
      
      class="random-btn q-mt-md q-mb-md"
      rounded
      unelevated
      color="primary"
      text-color="dark"
      @click="$emit('random-click')"
    ><q-img src="wand.svg"  width="35px" /> {{ $t('game') }}</q-btn>
  </div>
</template>

<style scoped>
.random-btn-wrapper {
  max-width: 900px;
  margin: auto;
  padding: 0 12px;
  display: flex;
  justify-content: center;
}

.random-btn {
  background-color: #7e57c2;
  color: white;
  font-weight: 600;
  padding: 8px 24px;
  transition: background-color 0.3s ease;
}

.random-btn:hover {
  background-color: #673ab7;
}
</style>
