import { Master } from '.'

let master

beforeEach(async () => {
  master = await Master.create({ imei: 'test', host: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = master.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(master.id)
    expect(view.imei).toBe(master.imei)
    expect(view.host).toBe(master.host)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = master.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(master.id)
    expect(view.imei).toBe(master.imei)
    expect(view.host).toBe(master.host)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
