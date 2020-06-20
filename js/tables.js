$(function () {

  /*
   .d8888b.  888                                    888
  d88P  Y88b 888                                    888
  Y88b.      888                                    888
   "Y888b.   88888b.   8888b.  888d888 .d88b.   .d88888
      "Y88b. 888 "88b     "88b 888P"  d8P  Y8b d88" 888
        "888 888  888 .d888888 888    88888888 888  888
  Y88b  d88P 888  888 888  888 888    Y8b.     Y88b 888
   "Y8888P"  888  888 "Y888888 888     "Y8888   "Y88888
  */
  $("form").submit(e => {
    e.preventDefault()
  })
  const tables = {
    eyeTable: null,
    hairTable: null,
    handTable: null,
  }
  let Family = JSON.parse(localStorage.getItem('FamilyMembers'))
  Family.push(JSON.parse(localStorage.getItem('Member')))
  const buttonGroup = `
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
  `
  const updateAll = () => {
    localStorage.setItem('Member', JSON.stringify(...Family.filter(m => m.type === "Member")))
    localStorage.setItem('FamilyMembers', JSON.stringify(Family.filter(m => m.type === "FamilyMember")))

    Family = JSON.parse(localStorage.getItem('FamilyMembers'))
    Family.push(JSON.parse(localStorage.getItem('Member')))

    Object.keys(tables).forEach(item => {
      tables[item]
        .clear()
        .rows
        .add(Family.filter(m => m.old[$(`#${item}`).data("attribute")]))
        .draw()
    });
  }





  /*
  8888888888
  888
  888
  8888888   888  888  .d88b.  .d8888b
  888       888  888 d8P  Y8b 88K
  888       888  888 88888888 "Y8888b.
  888       Y88b 888 Y8b.          X88
  8888888888 "Y88888  "Y8888   88888P'
                 888
            Y8b d88P
             "Y88P"
   */
  const eyeStuff = new TablesClass('eyeColour', 'eye', ["Brown", "Hazel", "Blue", "Green", "Silver", "Amber"], Family)
  eyeStuff.init()
  /*
  888    888          d8b
  888    888          Y8P
  888    888
  8888888888  8888b.  888 888d888
  888    888     "88b 888 888P"
  888    888 .d888888 888 888
  888    888 888  888 888 888
  888    888 "Y888888 888 888
   */
  const hairStuff = new TablesClass('hairColour', 'hair', ["Black", "Brown", "Blond", "Auburn", "Chestnut", "Red", "Grey", "White"], Family)
  hairStuff.init()

  /*
  888    888                        888
  888    888                        888
  888    888                        888
  8888888888  8888b.  88888b.   .d88888
  888    888     "88b 888 "88b d88" 888
  888    888 .d888888 888  888 888  888
  888    888 888  888 888  888 Y88b 888
  888    888 "Y888888 888  888  "Y88888
  */
  const handStuff = new TablesClass('handedness', 'hand', ["Right-handed", "Left-handed", "Mixed-handed", "Ambidextrous", "Ambilevous"], Family)
  handStuff.init()

  // const handednessName = $("#handednessName")
  // const handedness = $("#handedness")
  // const handednesses = ["Right-handed", "Left-handed", "Mixed-handed", "Ambidextrous", "Ambilevous"]
  // handednesses.forEach(val => {
  //   handedness.append(`<option value="${val}">${val}</option>`)
  // })
  // const handModal = $("#handModal")
  // const handModalPrimary = $("#handModalPrimary")
  //
  // const resetHandNameSelect = () => {
  //   handednessName
  //     .find('option')
  //     .remove()
  //     .end()
  //     .append(`<option value="" disabled selected>Please choose</option>`)
  //   $.each(Family, function (k, v) {
  //     const option = $(`<option value="${v.id}">${v.name}</option>`)
  //     if (v.old.hand) {
  //       option.prop("disabled", true)
  //     }
  //     handednessName.append(option)
  //   })
  //   handedness.val(null)
  //   handedness.prop("disabled", true)
  // }
  // resetHandNameSelect()
  //
  // handednessName.on("change", function () {
  //   handedness.prop("disabled", !$(this).val())
  // })
  //
  // $("#handForm").validate({
  //   rules: {
  //     handednessName: {
  //       required: true
  //     },
  //     handedness: {
  //       required: true
  //     }
  //   },
  //   submitHandler: () => {
  //     Family.forEach(m => {
  //       if (m.id === handednessName.val()) {
  //         m.old.hand = handedness.val()
  //       }
  //     })
  //     handModal.modal("hide")
  //     handModalPrimary.val("Add Hand Details")
  //     updateAll()
  //   }
  // })
  //
  // handModal.on("hidden.bs.modal", () => {
  //   resetHandNameSelect()
  //   handedness.val(null)
  //   handModal.removeData("original")
  // })
  //
  // tables.handTable = $("#handTable").on("click", ".btn-danger", function () {
  //   Family.forEach(m => {
  //     if (m.id === tables.handTable.row($(this).parents('tr')).data().id) {
  //       m.old.hand = null
  //     }
  //   })
  //   updateAll()
  //   resetHandNameSelect()
  // }).on("click", ".btn-primary", function () {
  //   const familyMember = tables.handTable.row($(this).parents('tr')).data()
  //   const clone = JSON.parse(JSON.stringify(familyMember))
  //   handednessName.find("option").each(function (_, opt) {
  //     if ($(opt).val() === familyMember.id) {
  //       $(opt).prop("disabled", false)
  //     } else {
  //       $(opt).prop("disabled", true)
  //     }
  //   })
  //   handednessName.val(familyMember.id)
  //   handedness.val(familyMember.old.hand).prop("disabled", false)
  //   handModalPrimary.val("Update Hand Details")
  //   handModal.modal("show").data("original", clone)
  //   Family.forEach(m => {
  //     if (m.id === familyMember.id) {
  //       m.old.hand = null
  //     }
  //   })
  //   updateAll()
  // }).DataTable({
  //   columns: [
  //     {
  //       data: "name",
  //       title: "Name"
  //     }, {
  //       data: "old.hand",
  //       title: "Hand Colour"
  //     }, {
  //       title: "Action",
  //       render: () => buttonGroup,
  //       className: "text-center",
  //       width: "20%",
  //       sortable: false
  //     }
  //   ],
  //   data: Family.filter(m => m.old.hand)
  // })
  //
  // $("#handModalDismiss").on("click", () => {
  //   if (handModal.data("original")) {
  //     const familyMember = handModal.data("original")
  //     Family.forEach(m => {
  //       if (m.id === familyMember.id) {
  //         m.old.hand = familyMember.old.hand
  //       }
  //     })
  //     updateAll()
  //   }
  // })

})
