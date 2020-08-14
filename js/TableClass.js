class TableClass{
  constructor(Table, attribute, modal, form, button, select, values) {
    this.Table = Table
    this.attribute = attribute
    this.modal = modal
    this.form = form
    this.button = button
    this.select = select
    this.values = values
  }
  init(){
    this.values.forEach(val => {
      this.select.append(`<option value="${val}">${val}</option>`)
    })
    this.Table.on('click', `.edit.${this.attribute}`, el => {
      el.preventDefault();
      const original = this.Table.row($(el.target).parents('tr')).data()
      $('.memberName').text(original.name)
      this.modal.data('original', original)
      if (original.new[this.attribute]) {
        this.select.val(original.new[this.attribute])
        this.button.val(`Update ${this.attribute} details`)
      } else {
        this.button.val(`Add ${this.attribute} details`)
      }
    })
    this.form.submit(e => {
      e.preventDefault()
      const familyMember = this.modal.data('original')
      const value = this.select.val()
      const attribute = this.attribute
      const Table = this.Table
      this.Table.rows().every( function(i) {
        if(this.data().id === familyMember.id){
          this.data().new[attribute] = value ? value : null
          Table.row(i).invalidate().draw()
        }
      })
      this.modal.modal('hide')
    })
  }
}