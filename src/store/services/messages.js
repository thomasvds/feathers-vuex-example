import feathersClient, {
  makeServicePlugin,
  BaseModel
} from '../../feathers-client'
import { format } from 'date-fns'

class Message extends BaseModel {
  constructor(data, options) {
    super(data, options)
  }
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'Message'
  // Define default properties here
  static instanceDefaults () {
    return {
      text: ''
    }
  }
  static setupInstance (data) {
    if (data.createdAt) {
      data.createdAt = new Date(data.createdAt)
    }
    return data
  }
  get formattedDate () {
    return format(this.createdAt, 'MMM do, hh:mm:ss')
  }
}
const servicePath = 'messages'
const servicePlugin = makeServicePlugin({
  Model: Message,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
