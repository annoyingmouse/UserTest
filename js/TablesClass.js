/*jslint browser: true*/
/*global  $*/
class TablesClass extends BaseTable{

  constructor(attribute, title, values) {
    super(attribute, title, values)
    this.name = null
    this.table = null
    this.DataTable = null
  }

  init() {
    this.initTable()
    this.populateAttributes()
    this.name.on('change', () => {
      this.select.prop('disabled', !$(this.name).val())
    })
    this.form.submit(e => {
      e.preventDefault()
      const tempFamily = this.getFamily()
      tempFamily.forEach(m => {
        if(m.id === this.name.val()){
          m.old[this.attribute] = this.select.val()
        }
      })
      this.modal.modal('hide')
      this.button.val(`Add ${this.attribute} Details`)
      this.updateAll(tempFamily)
    })

    this.modal.on('hidden.bs.modal', () => {
      this.resetAttributeSelect()
      this.select.val(null)
      this.modal.removeData('original')
    })

    $(`#${this.attribute}ModalDismiss`).on('click', () => {
      const tempFamily = this.getFamily()
      if (this.modal.data('original')) {
        const familyMember = this.modal.data('original')
        tempFamily.forEach(m => {
          if(m.id === familyMember.id){
            m.old[this.attribute] = familyMember.old[this.attribute]
          }
        })
        this.updateAll(tempFamily)
      }
    })
    this.resetAttributeSelect()
    this.modal.on('hide.bs.modal', function() {
      this.select.val('')
    }.bind(this))
  }

  initTable() {
    const tmpl = $.templates("#attributeTable")
    const html = tmpl.render({
      attribute: this.attribute,
      header: this.title.toLowerCase()
    })
    $('#tableHolder').append(html)

    this.table = $(`#${this.attribute}Table`)

    this.DataTable = this.table.DataTable({
      columns: [
        {
          data: 'name',
          title: 'Name'
        }, {
          data: `old.${this.attribute}`,
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
      data: this.getFamily().filter(m => m.old[this.attribute])
    })

    this.table.on('click', `.btn-primary`, (el) => {
      const tempFamily = this.getFamily()
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
      this.button.val(`Update ${this.attribute} details`)
      this.modal.modal('show').data('original', clone)
      tempFamily.forEach(m => {
        if(m.id === familyMember.id){
          m.old[this.short] = null
        }
      })
      this.updateAll(tempFamily)
    })

    this.table.on('click', '.btn-danger', el => {
      const tempFamily = this.getFamily()
      tempFamily.forEach(m => {
        if(m.id === this.DataTable.row($(el.target).parents('tr')).data().id){
          m.old[this.attribute] = null
        }
      })
      this.updateAll(tempFamily)
      this.resetAttributeSelect()
    })

  }

  populateAttributes() {
    const tmpl = $.templates("#attributeModal")
    const modal_data = {
      attribute: this.attribute,
      header: this.title.toLowerCase()
    }
    const html = tmpl.render(modal_data)
    $('.container').append(html)
    this.button = $(`#${this.attribute}ModalPrimary`)
    this.form = $(`#${this.attribute}Form`)
    this.modal = $(`#${this.attribute}Modal`)
    this.select = $(`#${this.attribute}`)
    this.name = $(`#${this.attribute}Name`)
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
    $.each(this.getFamily(), (k, v) => {
      const option = $(`<option value="${v.id}">${v.name}</option>`)
      if(v.old[this.attribute]){
        option.prop('disabled', true)
      }
      this.name.append(option)
    })
    this.select.val(null)
    this.select.prop('disabled', true)
  }

  getFamily = () => [
    ...JSON.parse(localStorage.getItem('FamilyMembers')),
    JSON.parse(localStorage.getItem('Member'))
  ]

  updateAll(tempFamily) {
    localStorage.setItem('Member', JSON.stringify(...tempFamily.filter(m => m.type === 'Member')))
    localStorage.setItem('FamilyMembers', JSON.stringify(tempFamily.filter(m => m.type === 'FamilyMember')))
    this.DataTable
        .clear()
        .rows
        .add(tempFamily.filter(m => m.old[this.attribute]))
        .draw()
  }

}