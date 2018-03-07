import mongoose, { Schema } from 'mongoose'

const masterSchema = new Schema({
  host: {
    type: String
  },
  imei: {
    type: String
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
  }
}

const model = mongoose.model('Master', masterSchema)

export const schema = model.schema
export default model
