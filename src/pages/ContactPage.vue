<template>
  <q-page class="q-pa-md">
    <h2 class="text-h5 q-mb-md">Contact Us</h2>
    <q-form @submit.prevent="submitForm" class="q-gutter-md">
      <q-input filled v-model="name" label="Your Name" required />
      <q-input filled v-model="email" type="email" label="Email Address" required />
      <q-input filled v-model="message" type="textarea" label="Your Message" required />
      <q-btn label="Send Message" type="submit" color="primary" />
    </q-form>
    <q-banner v-if="submitted" class="bg-green-1 text-green-10 q-mt-md">
      Message sent successfully. Thank you!
    </q-banner>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')
const submitted = ref(false)

function submitForm() {
  console.log('Sending message:', { name: name.value, email: email.value, message: message.value })
  submitted.value = true

  // Reset form (optional)
  name.value = ''
  email.value = ''
  message.value = ''
}
</script>
