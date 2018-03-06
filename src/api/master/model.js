import mongoose, { Schema } from 'mongoose'

const masterSchema = new Schema({
  imei: {
    type: String
  },
  host: {
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
      imei: this.imei,
      host: this.host,
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
