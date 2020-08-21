class TableClass extends BaseTable {

  constructor(attribute, title, values, Table) {
    super(attribute, title, values, Table)
  }

  init(){
    const tmpl = $.templates("#attributeModal")
    const modal_data = {
      attribute: this.attribute,
      title: this.title.toLowerCase(),
      question: this.attribute === 'eye'
          ? 'What colour are <span class="memberName"></span> eyes?'
          : this.attribute === 'hair'
              ? 'What colour is <span class="memberName"></span> hair?'
              : 'What handedness is <span class="memberName"></span>?'
    }
    const html = tmpl.render(modal_data)
    $('.container').append(html)
    this.select = $(`#${this.attribute}`)
    this.button = $(`#${this.attribute}ModalPrimary`)
    this.form = $(`#${this.attribute}Form`)
    this.modal = $(`#${this.attribute}Modal`)
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
    this.modal.on('hide.bs.modal', function() {
      this.select.val('')
    }.bind(this))
  }

}