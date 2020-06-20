class TablesClass{

  constructor(attribute, short, values, Family) {
    this.tiny = short
    this.long = attribute
    this.longString = `${attribute}Name`

    this.values = values
    this.Family = Family

    this.name = $(`#${this.longString}`)
    this.attribute = $(`#${attribute}`)
    this.modal = $(`#${this.tiny}Modal`)
    this.modalPrimary = $(`#${this.tiny}ModalPrimary`)
    this.form = $(`#${this.tiny}Form`)
    this.table = $(`#${this.tiny}Table`)
    this.DataTable = null
  }

  updateAll() {
    localStorage.setItem('Member', JSON.stringify(...this.Family.filter(m => m.type === "Member")))
    localStorage.setItem('FamilyMembers', JSON.stringify(this.Family.filter(m => m.type === "FamilyMember")))

    this.Family = JSON.parse(localStorage.getItem('FamilyMembers'))
    this.Family.push(JSON.parse(localStorage.getItem('Member')))
    this.DataTable
        .clear()
        .rows
        .add(this.Family.filter(m => m.old[this.tiny]))
        .draw()
  }

  init() {
    this.populateAttributes()
    this.initTable()

    this.name.on("change", () => {
      this.attribute.prop("disabled", !$(this.name).val())
    })

    this.form.submit(e => {
      e.preventDefault()
      this.Family.forEach(m => {
        if(m.id === this.name.val()){
          m.old[this.tiny] = this.attribute.val()
        }
      })
      this.modal.modal("hide")
      this.modalPrimary.val(`Add ${this.tiny} Details`)
      this.updateAll()
    })

    this.modal.on("hidden.bs.modal", () => {
      this.resetAttributeSelect()
      this.attribute.val(null)
      this.modal.removeData("original")
    })

    $(`#${this.tiny}ModalDismiss`).on("click", () => {
      if (this.modal.data("original")) {
        const familyMember = this.modal.data("original")
        this.Family.forEach(m => {
          if(m.id === familyMember.id){
            m.old[this.tiny] = familyMember.old[this.tiny]
          }
        })
        this.updateAll()
      }
    })
    this.resetAttributeSelect()
  }

  initTable() {
    const tableData = `old.${this.tiny}`

    this.table.on("click", ".btn-danger", el => {
      this.Family.forEach(m => {
        if(m.id === this.DataTable.row($(el.target).parents('tr')).data().id){
          m.old[this.tiny] = null
        }
      })
      this.updateAll()
      this.resetAttributeSelect()
    })

    this.table.on("click", ".btn-primary", (el) => {
      const familyMember = this.DataTable.row($(el.target).parents('tr')).data()
      const clone = JSON.parse(JSON.stringify(familyMember))
      this.name
          .find("option")
          .each(function(_, opt){
            if($(opt).val() === familyMember.id){
              $(opt).prop("disabled", false)
            }else{
              $(opt).prop("disabled", true)
            }
          })
      this.name.val(familyMember.id)
      this.attribute.val(familyMember.old[this.tiny]).prop( "disabled", false)
      this.modalPrimary.val(`Update ${this.tiny} details`)
      this.modal.modal("show").data("original", clone)
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
          data: "name",
          title: "Name"
        }, {
          data: tableData,
          title: this.long.split(/(?=[A-Z])/g).join(" ").toLowerCase()
        }, {
          title: "Action",
          className: "text-center",
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
          width: "20%",
          sortable: false
        }
      ],
      data: this.Family.filter(m => m.old[this.tiny])
    })
  }

  populateAttributes() {
    this.values.forEach(val => {
      this.attribute.append(`<option value="${val}">${val}</option>`)
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
      if(v.old[this.tiny]){
        option.prop("disabled", true)
      }
      this.name.append(option)
    })
    this.attribute.val(null)
    this.attribute.prop("disabled", true)
  }

}