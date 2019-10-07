export default class Counter{
  constructor() {
    this._count = 0
  }
  
  add() {
    this._count += 1
  }

  reset() {
    this._count = 0
  }

  get count() {
    return this._count
  }
}
