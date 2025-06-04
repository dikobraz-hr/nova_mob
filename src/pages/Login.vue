<template>
  <q-page class="window-height row justify-center bg-image">
    <div class="row mw-100 flex justify-center">
      <div class="col q-mx-lg q-px-lg q-py-xl">


        <q-form class="q-mt-md form-style3 q-pb-md" @submit.prevent="getLogin">

          <h5 class="text-h6 text-black q-mb-md q-mt-none">
            Prijava
          </h5>
          <div class="d-flex justify-content-between">
            <q-input v-model="form.email" type="email" label="Email" stack-label lazy-rules @click="message = ''"
              class="col-md-12 form-group"
              :rules="[val => !!val || 'Ups! Ostavili ste email prazan', val => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(val) || 'Unesite važeći email']">
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>

            </q-input>
          </div>
          <div class="d-flex justify-content-between">
            <q-input v-model="form.password" :type="isPwd ? 'password' : 'text'" label="Lozinka" stack-label lazy-rules
              @click="message = ''" class="col-md-12 form-group"
              :rules="[val => !!val || 'Ups! Ostavili ste lozinku praznu']">
              <template v-slot:prepend>
                <q-icon name="password" />
              </template>
              <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                  @click="isPwd = !isPwd" />
              </template>

            </q-input>
          </div>
          <label>{{ message }}</label>
          <q-btn unelevated color="accent" size="lg" class="full-width q-mb-md" label="uđite" type="submit"
          />
          <router-link to="/forgot" class="text-body2  d-block text-center q-mt-md">Zaboravili ste lozinku? Bez brige,
            kliknite
            ovdje za
            oporavak
            lozinke.</router-link>
          <router-link to="/register" class="text-body2  d-block text-center q-mt-md">Ako nemate račun, registrirajte se
            ovdje.</router-link>
        </q-form>



      </div>
    </div>
  </q-page>
</template>
<style scoped>
.q-card {
  width: 22.5rem;
}

/* .bg-image {
  background-image: url("../assets/food.jpg");
  background-size: cover;
} */
.bg-field {
  background: rgba(0, 0, 0, 0.5) !important;
}
</style>
<script>
import axios from "axios";
import { SessionStorage } from "quasar";
import { useQuasar } from "quasar";

export default {
  name: "log-in",

  data() {
    return {
      login: [],
      isPwd: true,
      message: '',
      form: {
        email: "",
        password: "",
      },
    };
  },
  // setup() {
  //   // const store = useUserStore();
  //   async function onSubmit(values) {
  //     const authStore = useAuthStore();
  //     const { username, password } = values;
  //     await authStore.login(username, password);
  //   }
  // },
  mounted() {
    // this.getLang();
  },
  methods: {

    async getLogin() {
      this.message = ''; // Reset message before login attempt
      console.log(this.form.email);

      try {
        // Make API call to authenticate user using Axios
        const response = await axios.post("https://udruga.dikobraz.hr/api/login", {
          email: this.form.email, // Send email as 'username' in request
          password: this.form.password,
        });
        console.log(response.data);
        // Check if login was successful (based on the message or response format from API)
        if (response.data.message === 'Login successful') {

          // Store token and user data in sessionStorage
          sessionStorage.setItem("token", response.data.access_token);
          sessionStorage.setItem("username", response.data.user.name);
          sessionStorage.setItem("rating", response.data.rating);
          // console.log(response.data.rating);
          sessionStorage.setItem("lang-user", response.data.user.language);
          sessionStorage.setItem("userId", response.data.user.id); // Store userId if necessary
          sessionStorage.setItem("email", response.data.user.email); // Store userName if necessary


          // Redirect to home page
          this.$router.push({ path: "/komunikator" });
        } else {
          this.message = 'Neuspješna prijava.';
          console.error("Login failed:", response.data.message);
        }
      } catch (error) {
        this.message = 'Došlo je do pogreške!';
        console.error("Error during login:", error);
      }
    },
  },
};
</script>

<style scoped lang="scss" src="../css/login.scss"></style>
