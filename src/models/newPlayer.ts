export default class Game {
  name = ''

  get createRequestParams () {
    return {
      name: this.name
    }
  }

  get isValid () {
    return (this.name !== '')
  }
}
