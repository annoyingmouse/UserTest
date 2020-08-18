class BaseTable {
  constructor(attribute, title, values) {
    this.attribute = attribute
    this.title = title
    this.values = values
    this.select = null
    this.button = null
    this.form = null
    this.modal = null
  }
  init(){ }
}