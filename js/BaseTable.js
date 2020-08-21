class BaseTable {
  constructor(attribute, title, values, Table = null) {
    this.attribute = attribute
    this.title = title
    this.values = values
    this.select = null
    this.button = null
    this.form = null
    this.modal = null
    this.Table = Table
  }
  init(){ }
}