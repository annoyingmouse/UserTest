$(function () {
  $("form").submit(function (e) {
    e.preventDefault()
  })

  const Family = JSON.parse(localStorage.getItem('FamilyMembers'))
  Family.push(JSON.parse(localStorage.getItem('Member')))

  const memberName = $(".memberName")

  const updateAll = () => {
    localStorage.setItem('Member', JSON.stringify(...Family.filter(m => m.type === "Member")))
    localStorage.setItem('FamilyMembers', JSON.stringify(Family.filter(m => m.type === "FamilyMember")))
    YourFamilyDetails
        .clear()
        .rows
        .add(Family)
        .draw()
  }

  const YourFamilyDetails = $("#YourFamilyDetails").DataTable({
    columns: [{
      title: "Family Member",
      render: (data, type, row) => row.name + " (" + moment(row.dob).format("DD/MM/YYYY") + ")"
    }, {
      title: "Eye Colour",
      width: "20%",
      className: "text-center",
      render: (data, type, row) => row.new.eye
          ? `
            <button class="btn btn-default eye-colour" 
                    data-toggle="modal" 
                    data-target="#eyeModal" 
                    data-backdrop="static">
              ${row.new.eye} | Edit
            </button>
          ` : `
            <button class="btn btn-primary eye-colour pl-3 pr-3" 
                    data-toggle="modal" 
                    data-target="#eyeModal" 
                    data-backdrop="static">
              Add Eye Colour
            </button>
          `
      ,
      orderable: false
    }, {
      title: "Hair Colour",
      width: "20%",
      className: "text-center",
      render: (data, type, row, meta) => row.new.hair
          ? `
            <button class="btn btn-default hair-colour" 
                    data-toggle="modal" 
                    data-target="#hairModal" 
                    data-backdrop="static">
              ${row.new.hair} | Edit
            </button>
          ` : `
            <button class="btn btn-primary hair-colour pl-3 pr-3" 
                    data-toggle="modal" 
                    data-target="#hairModal" 
                    data-backdrop="static">
              Add Hair Colour
            </button>
          `
      ,
      orderable: false
    }, {
      title: "Hand Dominance",
      width: "25%",
      className: "text-center",
      render: (data, type, row, meta) => row.new.hand
          ? `
            <button class="btn btn-default handedness" 
                    data-toggle="modal" 
                    data-target="#handModal" 
                    data-backdrop="static">
              ${row.new.hand} | Edit
            </button>
          ` : `
            <button class="btn btn-primary handedness pl-3 pr-3" 
                    data-toggle="modal" 
                    data-target="#handModal" 
                    data-backdrop="static">
              Add Handedness
            </button>
          `
      ,
      orderable: false
    }],
    data: Family
  })
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
  const eyeModal = $("#eyeModal")
  const eyeModalPrimary = $("#eyeModalPrimary")
  const eyeColour = $("#eyeColour")

  YourFamilyDetails.on("click", ".eye-colour", function () {
    const original = YourFamilyDetails.row($(this).parents('tr')).data()
    memberName.text(original.name)
    eyeModal.data("original", original)
    if (original.new.eye) {
      eyeColour
          .val(original.new.eye)
      eyeModalPrimary.val("Update Eye Details")
    } else {
      eyeModalPrimary.val("Add Eye Details")
    }
  })

  eyeModalPrimary.on("click", function (e) {
    e.preventDefault()
    const familyMember = eyeModal.data("original")
    Family.forEach(m => {
      if(m.id === familyMember.id){
        m.new.eye = eyeColour.val() ? eyeColour.val() : null
      }
    })
    eyeModal.modal("hide")
    updateAll()
  })

  eyeModal.on("hidden.bs.modal", function () {
    document.getElementById("eyeForm").reset()
    eyeModal.removeData("original")
    memberName.text("")
  })

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
  const hairModal = $("#hairModal")
  const hairModalPrimary = $("#hairModalPrimary")
  const hairColour = $("#hairColour")

  YourFamilyDetails.on("click", ".hair-colour", function () {
    const original = YourFamilyDetails.row($(this).parents('tr')).data()
    memberName.text(original.name)
    hairModal.data("original", original)
    if (original.new.hair) {
      hairColour.val(original.new.hair)
      hairModalPrimary.val("Update hair Details")
    } else {
      hairModalPrimary.val("Add hair Details")
    }
  })

  hairModalPrimary.on("click", function (e) {
    e.preventDefault()
    const familyMember = hairModal.data("original")
    Family.forEach(m => {
      if(m.id === familyMember.id){
        m.new.hair = hairColour.val() ? hairColour.val() : null
      }
    })
    hairModal.modal("hide")
    updateAll()
  })

  hairModal.on("hidden.bs.modal", function () {
    document.getElementById("hairForm").reset()
    hairModal.removeData("original")
    memberName.text("")
  })

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

  const handModalPrimary = $("#handModalPrimary")
  const handModal = $("#handModal")
  const handedness = $("#handedness")

  YourFamilyDetails.on("click", ".handedness", function () {
    const original = YourFamilyDetails.row($(this).parents('tr')).data()
    memberName.text(original.name)
    handModal.data("original", original)
    if (original.new.hand) {
      handedness.val(original.new.hand)
      handModalPrimary.val("Update Handedness")
    } else {
      handModalPrimary.val("Add Handedness")
    }
  })

  handModalPrimary.on("click", function (e) {
    e.preventDefault()
    const familyMember = handModal.data("original")
    Family.forEach(m => {
      if(m.id === familyMember.id){
        m.new.hand = handedness.val() ? handedness.val() : null
      }
    })
    handModal.modal("hide")
    updateAll()
  })

  handModal.on("hidden.bs.modal", () => {
    handModal.removeData("original")
    $("#handedness").val(null)
    memberName.text("")
  })
})
