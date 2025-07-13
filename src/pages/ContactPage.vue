<template>
    <q-page class="q-pa-md">

        <div class=" q-pb-sm">
            <div class="text-center">
                <!-- <h6 class="q-my-sm">{{ $t('to_remove_ads') }}</h6> -->
                <!-- <q-btn icon="add_shopping_cart" class="random-btn q-mb-lg" rounded unelevated color="primary" size="lg"
                    text-color="dark">{{ $t('buy') }}</q-btn> -->

            </div>
            <LanguageSwitcher />
        </div>
        <div class="q-card q-my-md q-mb-lg">
            <div class="flex justify-center items-center q-pa-md">
                <q-btn icon="share" :label="t('share')" color="primary" rounded unelevated size="md" text-color="dark" @click="shareContent" class="q-mx-md"/>
                <q-btn icon="apps" rounded unelevated color="primary" size="md" text-color="dark" class="q-mx-md"  @click="openInSystemBrowser">{{ $t('our_other_work') }}</q-btn>
            </div>
        </div>

        <div class="q-card q-my-md q-mb-lg">
            <div class="q-pt-md text-body2">
                <router-link to="/instructions" class=" q-pa-md  text-body2">{{ $t('Instructions') }}</router-link>
            </div>

            <div class="q-pt-md text-body2">
                <router-link to="/terms" class="q-pa-md text-body2">{{ $t('Terms') }}</router-link>
            </div>
            <div class="q-py-md text-body2">
                <router-link to="/policy" class="q-pa-md text-body2">{{ $t('policyTitle') }}</router-link>
            </div>
        </div>

        <div class="q-card q-pa-md q-mt-lg q-pt-sm">
            <h2 class="text-h5 q-mb-md q-mt-sm">{{ $t('contact') }}</h2>
            <!-- <div class="q-py-md text-body2 text-center">
                {{ $t('email') }}<br>
                <a href="mailto:info@dikobraz.hr">info@dikobraz.hr</a><br>
                {{ $t('or') }}
            </div> -->
            <q-form @submit.prevent="submitForm" class="q-gutter-md q-mb-md">
                <q-input filled v-model="name" :label="$t('your_name')" required />
                <q-input filled v-model="email" type="email" :label="$t('email_address')" required />
                <q-input filled v-model="message" type="textarea" :label="$t('your_message')" required />
                <div class="text-center">
                    <q-btn rounded :label="$t('send_message')" type="submit" color="primary" class="q-mx-auto" />
                </div>
            </q-form>
            <q-banner v-if="submitted" class="bg-green-1 text-green-10 q-mt-md">
                Message sent successfully. Thank you!
            </q-banner>
        </div>





    </q-page>

</template>

<script setup>
import { ref } from 'vue'
import LanguageSwitcher from 'components/LanguageSwitcher.vue'
import { Share } from '@capacitor/share'
import { Browser } from '@capacitor/browser'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
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


const shareContent = async () => {
   try {
     await Share.share({
      title: t('shareTitle'),
       text: t('shareText'),
       url: 'https://ziblo.world',
       dialogTitle: t('shareDialogTitle')
     })
   } catch (err) {
    console.error('Share failed', err)
   }
 }
 async function openInSystemBrowser () {
   await Browser.open({
     url: 'https://dikobraz.hr'
   })
 }
</script>
<style>
.q-card {
    box-shadow: none;
    border-radius: 15px 15px 0 0;
}

a {
    color: #ff8a25;
}
</style>
