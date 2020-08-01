class TablesClass{

  constructor(attribute, title, values, name, select, modal, form, button, table) {
    this.attribute = attribute
    this.values = values
    this.Family = [...JSON.parse(localStorage.getItem('FamilyMembers')), JSON.parse(localStorage.getItem('Member'))]
    this.name = name
    this.select = select
    this.modal = modal
    this.modalPrimary = button
    this.form = form
    this.table = table
    this.DataTable = null
  }

  updateAll() {
    localStorage.setItem('Member', JSON.stringify(...this.Family.filter(m => m.type === 'Member')))
    localStorage.setItem('FamilyMembers', JSON.stringify(this.Family.filter(m => m.type === 'FamilyMember')))
    this.Family = [...JSON.parse(localStorage.getItem('FamilyMembers')), JSON.parse(localStorage.getItem('Member'))]
    this.DataTable
        .clear()
        .rows
        .add(this.Family.filter(m => m.old[this.attribute]))
        .draw()
  }

  init() {
    this.populateAttributes()
    this.initTable()

    this.name.on('change', () => {
      this.select.prop('disabled', !$(this.name).val())
    })

    this.form.submit(e => {
      e.preventDefault()
      this.Family.forEach(m => {
        if(m.id === this.name.val()){
          m.old[this.attribute] = this.select.val()
        }
      })
      this.modal.modal('hide')
      this.modalPrimary.val(`Add ${this.attribute} Details`)
      this.updateAll()
    })

    this.modal.on('hidden.bs.modal', () => {
      this.resetAttributeSelect()
      this.select.val(null)
      this.modal.removeData('original')
    })

    $(`#${this.attribute}ModalDismiss`).on('click', () => {
      if (this.modal.data('original')) {
        const familyMember = this.modal.data('original')
        this.Family.forEach(m => {
          if(m.id === familyMember.id){
            m.old[this.attribute] = familyMember.old[this.attribute]
          }
        })
        this.updateAll()
      }
    })
    this.resetAttributeSelect()
  }

  initTable() {
    const tableData = `old.${this.attribute}`

    this.table.on('click', '.btn-danger', el => {
      this.Family.forEach(m => {
        if(m.id === this.DataTable.row($(el.target).parents('tr')).data().id){
          m.old[this.attribute] = null
        }
      })
      this.updateAll()
      this.resetAttributeSelect()
    })

    this.table.on('click', `.btn-primary`, (el) => {
      const familyMember = this.DataTable.row($(el.target).parents('tr')).data()
      const clone = JSON.parse(JSON.stringify(familyMember))
      this.name
          .find('option')
          .each(function(_, opt){
            if($(opt).val() === familyMember.id){
              $(opt).prop('disabled', false)
            }else{
              $(opt).prop('disabled', true)
            }
          })
      this.name.val(familyMember.id)
      this.select.val(familyMember.old[this.attribute]).prop( 'disabled', false)
      this.modalPrimary.val(`Update ${this.attribute} details`)
      this.modal.modal('show').data('original', clone)
      this.Family.forEach(m => {
        if(m.id === familyMember.id){
          m.old[this.short] = null
        }
      })
      this.updateAll()
    })

    this.DataTable = this.table.DataTable({
      columns: [
        {
          data: 'name',
          title: 'Name'
        }, {
          data: tableData,
          title: this.title
        }, {
          title: 'Action',
          className: 'text-center',
          render: () => `
            <div class="pull-right btn-group btn-group-sm"
                 role="group">
              <button type="button"
                      class="btn btn-danger">
                <i class="fa fa-times"
                   title="Remove"></i>
                Remove
              </button>
              <button type="button"
                      class="btn btn-primary">
                <i class="fa fa-edit"
                   title="Edit"></i>
                Edit
              </button>
            </div>
          `,
          width: '20%',
          sortable: false
        }
      ],
      data: this.Family.filter(m => m.old[this.attribute])
    })
  }

  populateAttributes() {
    this.values.forEach(val => {
      this.select.append(`<option value="${val}">${val}</option>`)
    })
  }

  resetAttributeSelect() {
    this.name
        .find('option')
        .remove()
        .end()
        .append(`<option value="" disabled selected>Please choose</option>`)
    $.each(this.Family, (k, v) => {
      const option = $(`<option value="${v.id}">${v.name}</option>`)
      if(v.old[this.attribute]){
        option.prop('disabled', true)
      }
      this.name.append(option)
    })
    this.select.val(null)
    this.select.prop('disabled', true)
  }

}