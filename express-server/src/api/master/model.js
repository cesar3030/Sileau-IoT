import mongoose, { Schema } from 'mongoose'
var coap = require('coap')

const masterSchema = new Schema({
  host: {
    type: String
  },
  imei: {
    type: String
  },
  activated: {
    type: Boolean
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

masterSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      host: this.host,
      imei: this.imei,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  },
  coapRequest(payload) {
    const req2 = coap.request({
      hostname: this.host,
      pathname: '/encoding',
      method: 'POST',
      option: {"Content-Type": "application/json"},
      query: "accept=application/json"
    })

    req2.write(JSON.stringify(payload));

    req2.on('response', function(res) {
      res.pipe(process.stdout)
      return;
    })
    req2.end()
  }
}

const model = mongoose.model('Master', masterSchema)

export const schema = model.schema
export default model
