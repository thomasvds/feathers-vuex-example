<template>
  <main class="login container">
    <div class="row">
      <div class="col-12 col-6-tablet push-3-tablet text-center">
        <h1 class="font-100">Welcome Back</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-6-tablet push-3-tablet col-4-desktop push-4-desktop">
        <div
          v-if="error"
          class="error"
        >
          {{ error.message }}
          <a
            class="close"
            href="javascript://"
            @click.prevent="dismissError"
          >dismiss</a>
        </div>

        <form
          class="form"
          method="post"
          @submit.prevent="onSubmit(email, password)"
        >
          <fieldset>
            <input
              v-model="email"
              class="block"
              type="email"
              name="email"
              placeholder="email"
            />
          </fieldset>

          <fieldset>
            <input
              v-model="password"
              class="block"
              type="password"
              name="password"
              placeholder="password"
            />
          </fieldset>

          <button
            type="submit"
            class="button button-primary block login"
          >
            Login
          </button>

          <router-link
            as="button"
            :to="{ name: 'Home' }"
            class="button button-secondary block"
          >Back</router-link>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from '@vue/composition-api'

export default {
  name: 'Login',
  setup (props, context) {
    const { $store } = context.root

    const email = ref('')
    const password = ref('')

    const error = ref(null)
    function dismissError () {
      error.value = null
    }

    function onSubmit (email, password) {
      $store
        .dispatch('auth/authenticate', { strategy: 'local', email, password })
        // Just use the returned error instead of mapping it from the store.
        .catch(err => {
          // Convert the error to a plain object and add a message.
          let type = err.className
          err = Object.assign({}, err)
          err.message =
            type === 'not-authenticated'
              ? 'Incorrect email or password.'
              : 'An error prevented login.'
          this.error = err
        })
    }

    return {
      email,
      password,
      error,
      dismissError,
      onSubmit
    }
  }
}
</script>
