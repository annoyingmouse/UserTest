export default class TableClass{

  constructor(Table, attribute, modal, form, button, select, values) {
    this.Table = Table
    this.attribute = attribute
    this.modal = modal
    this.form = form
    this.button = button
    this.select = select
    this.values = values
    this.Family = [...JSON.parse(localStorage.getItem('FamilyMembers')), JSON.parse(localStorage.getItem('Member'))]
  }

  updateAll() {
    localStorage.setItem('Member', JSON.stringify(...this.Family.filter(m => m.type === 'Member')))
    localStorage.setItem('FamilyMembers', JSON.stringify(this.Family.filter(m => m.type === 'FamilyMember')))

    this.Family = [...JSON.parse(localStorage.getItem('FamilyMembers')), JSON.parse(localStorage.getItem('Member'))]
    this.Table
        .clear()
        .rows
        .add(this.Family)
        .draw()
  }

  init(){

    this.values.forEach(val => {
      this.select.append(`<option value="${val}">${val}</option>`)
    })

    this.Table.on('click', '.edit', el => {
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
      this.Family = [...JSON.parse(localStorage.getItem('FamilyMembers')), JSON.parse(localStorage.getItem('Member'))]
      const familyMember = this.modal.data('original')
      this.Family.forEach(m => {
        if(m.id === familyMember.id){
          m.new[this.attribute] = this.select.val() ? this.select.val() : null
        }
      })
      this.modal.modal('hide')
      this.updateAll()
    })
  }

}
