import Vue from 'vue'
import Vuex from 'vuex'
import { FeathersVuex } from '../feathers-client'
import auth from './store.auth'

Vue.use(Vuex)
Vue.use(FeathersVuex)

const requireModule = require.context(
  // The path where the service modules live
  './services',
  // Whether to look in subfolders
  false,
  // Only include .js files (prevents duplicate imports`)
  /.js$/
)
const servicePlugins = requireModule
  .keys()
  .map(modulePath => requireModule(modulePath).default)

import createLogger from 'vuex/dist/logger'

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  plugins: [createLogger(), ...servicePlugins, auth]
  // plugins: [...servicePlugins, auth]
})
