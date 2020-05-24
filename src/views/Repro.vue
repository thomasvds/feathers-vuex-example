<template>
  <div>
    <!-- When only user or message is displayed, things are fine -->
    {{ user }}
    <!-- Uncommenting the below creates an infinite loop when store logger is enabled -->
    <!-- {{ message }} -->
    <!-- This also creates an infinite loop as both user and message are rendered -->
    <!-- {{ `${user}${message}` }} -->
  </div>
</template>

<script>
import { models } from 'feathers-vuex'

export default {
  computed: {
    user () {
      const { User } = models.api
      return new User()
    },
    message () {
      const { Message } = models.api
      return new Message()
    }
  }
}
</script>
