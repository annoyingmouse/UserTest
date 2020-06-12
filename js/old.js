$(function () {
  $("form").submit(function (e) {
    e.preventDefault()
  });
  let Family = JSON.parse(localStorage.getItem('FamilyMembers'))
  Family.push(JSON.parse(localStorage.getItem('Member')))
  const updateAll = () => {
    localStorage.setItem('Member', JSON.stringify(...Family.filter(m => m.type === "Member")))
    localStorage.setItem('FamilyMembers', JSON.stringify(Family.filter(m => m.type === "FamilyMember")))

    Family = JSON.parse(localStorage.getItem('FamilyMembers'))
    Family.push(JSON.parse(localStorage.getItem('Member')))

    eyeTable.clear()
    eyeTable.rows.add(Family.filter(m => m.old.eye))
    eyeTable.draw()
    hairTable.clear()
    hairTable.rows.add(Family.filter(m => m.old.hair))
    hairTable.draw()
    handTable.clear()
    handTable.rows.add(Family.filter(m => m.old.hand))
    handTable.draw()
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

  const eyeColourName = $("#eyeColourName")
  const eyeColour = $("#eyeColour")
  const eyeModal = $("#eyeModal")
  const eyeModalPrimary = $("#eyeModalPrimary")

  const resetEyeNameSelect = () => {
    eyeColourName
        .find('option')
        .remove()
        .end()
        .append(`<option value="" disabled selected>Please choose</option>`);
    $.each(Family, function (k, v) {
      const option = $(`<option value="${v.id}">${v.name}</option>`)
      if(v.old.eye){
        option.prop("disabled", true)
      }
      eyeColourName.append(option);
    })
    eyeColour.val(null)
    eyeColour.prop("disabled", true);
  }
  resetEyeNameSelect()

  eyeColourName.on("change", function () {
    eyeColour.prop("disabled", !$(this).val());
  });

  $("#eyeForm").validate({
    rules: {
      eyeColourName: {
        required: true
      },
      eyeColour: {
        required: true
      }
    },
    submitHandler: function () {
      Family.forEach(m => {
        if(m.id === eyeColourName.val()){
          m.old.eye = eyeColour.val()
        }
      })
      eyeModal.modal("hide");
      eyeModalPrimary.val("Add Eye Details");
      updateAll()
    }
  });
  eyeModal.on("hidden.bs.modal", function () {
    resetEyeNameSelect()
    eyeColour.val(null)
    eyeModal.removeData("original");
  });
  const eyeTable = $("#eyeTable").on("click", ".btn-danger", function () {
    Family.forEach(m => {
      if(m.id === eyeTable.row($(this).parents('tr')).data().id){
        m.old.eye = null
      }
    })
    updateAll()
    resetEyeNameSelect()
  }).on("click", ".btn-primary", function () {
    const familyMember = eyeTable.row($(this).parents('tr')).data();
    const clone = JSON.parse(JSON.stringify(familyMember))
    eyeColourName.find("option").each(function(_, opt){
        if($(opt).val() === familyMember.id){
          $(opt).prop("disabled", false)
        }else{
          $(opt).prop("disabled", true)
        }
      })
    eyeColourName.val(familyMember.id)
    eyeColour.val(familyMember.old.eye).prop( "disabled", false);
    eyeModalPrimary.val("Update Eye Details");
    eyeModal.modal("show").data("original", clone);
    Family.forEach(m => {
      if(m.id === familyMember.id){
        m.old.eye = null
      }
    })
    updateAll()
  }).DataTable({
    columns: [
      {
        data: "name",
        title: "Name"
      }, {
        data: "old.eye",
        title: "Eye Colour"
      }, {
        title: "Action",
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
        "width": "20%",
        "sortable": false
      }
    ],
    data: Family.filter(m => m.old.eye)
  });
  $("#eyeModalDismiss").on("click", function () {
    if (eyeModal.data("original")) {
      const familyMember = eyeModal.data("original")
      Family.forEach(m => {
        if(m.id === familyMember.id){
          m.old.eye = familyMember.old.eye
        }
      })
      updateAll()
    }
  });
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
  const hairColourName = $("#hairColourName")
  const hairColour = $("#hairColour")
  const hairModal = $("#hairModal")
  const hairModalPrimary = $("#hairModalPrimary")

  const resetHairNameSelect = () => {
    hairColourName
        .find('option')
        .remove()
        .end()
        .append(`<option value="" disabled selected>Please choose</option>`);
    $.each(Family, function (k, v) {
      const option = $(`<option value="${v.id}">${v.name}</option>`)
      if(v.old.hair){
        option.prop("disabled", true)
      }
      hairColourName.append(option);
    })
    hairColour.val(null)
    hairColour.prop("disabled", true);
  }
  resetHairNameSelect()

  hairColourName.on("change", function () {
    hairColour.prop("disabled", !$(this).val());
  });

  $("#hairForm").validate({
    rules: {
      hairColourName: {
        required: true
      },
      hairColour: {
        required: true
      }
    },
    submitHandler: function () {
      Family.forEach(m => {
        if(m.id === hairColourName.val()){
          m.old.hair = hairColour.val()
        }
      })
      hairModal.modal("hide");
      hairModalPrimary.val("Add Hair Details");
      updateAll()
    }
  });
  hairModal.on("hidden.bs.modal", function () {
    resetHairNameSelect()
    hairColour.val(null)
    hairModal.removeData("original");
  });
  const hairTable = $("#hairTable").on("click", ".btn-danger", function () {
    Family.forEach(m => {
      if(m.id === hairTable.row($(this).parents('tr')).data().id){
        m.old.hair = null
      }
    })
    updateAll()
    resetHairNameSelect()
  }).on("click", ".btn-primary", function () {
    const familyMember = hairTable.row($(this).parents('tr')).data();
    const clone = JSON.parse(JSON.stringify(familyMember))
    hairColourName.find("option").each(function(_, opt){
      if($(opt).val() === familyMember.id){
        $(opt).prop("disabled", false)
      }else{
        $(opt).prop("disabled", true)
      }
    })
    hairColourName.val(familyMember.id)
    hairColour.val(familyMember.old.hair).prop( "disabled", false);
    hairModalPrimary.val("Update Hair Details");
    hairModal.modal("show").data("original", clone);
    Family.forEach(m => {
      if(m.id === familyMember.id){
        m.old.hair = null
      }
    })
    updateAll()
  }).DataTable({
    columns: [
      {
        data: "name",
        title: "Name"
      }, {
        data: "old.hair",
        title: "Hair Colour"
      }, {
        title: "Action",
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
        "width": "20%",
        "sortable": false
      }
    ],
    data: Family.filter(m => m.old.hair)
  });
  $("#hairModalDismiss").on("click", function () {
    if (hairModal.data("original")) {
      const familyMember = hairModal.data("original")
      Family.forEach(m => {
        if(m.id === familyMember.id){
          m.old.hair = familyMember.old.hair
        }
      })
      updateAll()
    }
  });

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
  const handednessName = $("#handednessName")
  const handedness = $("#handedness")
  const handModal = $("#handModal")
  const handModalPrimary = $("#handModalPrimary")

  const resetHandNameSelect = () => {
    handednessName
        .find('option')
        .remove()
        .end()
        .append(`<option value="" disabled selected>Please choose</option>`);
    $.each(Family, function (k, v) {
      const option = $(`<option value="${v.id}">${v.name}</option>`)
      if(v.old.hand){
        option.prop("disabled", true)
      }
      handednessName.append(option);
    })
    handedness.val(null)
    handedness.prop("disabled", true);
  }
  resetHandNameSelect()

  handednessName.on("change", function () {
    handedness.prop("disabled", !$(this).val());
  });

  $("#handForm").validate({
    rules: {
      handednessName: {
        required: true
      },
      handedness: {
        required: true
      }
    },
    submitHandler: function () {
      Family.forEach(m => {
        if(m.id === handednessName.val()){
          m.old.hand = handedness.val()
        }
      })
      handModal.modal("hide");
      handModalPrimary.val("Add Hand Details");
      updateAll()
    }
  });
  handModal.on("hidden.bs.modal", function () {
    resetHandNameSelect()
    handedness.val(null)
    handModal.removeData("original");
  });
  const handTable = $("#handTable").on("click", ".btn-danger", function () {
    Family.forEach(m => {
      if(m.id === handTable.row($(this).parents('tr')).data().id){
        m.old.hand = null
      }
    })
    updateAll()
    resetHandNameSelect()
  }).on("click", ".btn-primary", function () {
    const familyMember = handTable.row($(this).parents('tr')).data();
    const clone = JSON.parse(JSON.stringify(familyMember))
    handednessName.find("option").each(function(_, opt){
      if($(opt).val() === familyMember.id){
        $(opt).prop("disabled", false)
      }else{
        $(opt).prop("disabled", true)
      }
    })
    handednessName.val(familyMember.id)
    handedness.val(familyMember.old.hand).prop( "disabled", false);
    handModalPrimary.val("Update Hand Details");
    handModal.modal("show").data("original", clone);
    Family.forEach(m => {
      if(m.id === familyMember.id){
        m.old.hand = null
      }
    })
    updateAll()
  }).DataTable({
    columns: [
      {
        data: "name",
        title: "Name"
      }, {
        data: "old.hand",
        title: "Hand Colour"
      }, {
        title: "Action",
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
        "width": "20%",
        "sortable": false
      }
    ],
    data: Family.filter(m => m.old.hand)
  });
  $("#handModalDismiss").on("click", function () {
    if (handModal.data("original")) {
      const familyMember = handModal.data("original")
      Family.forEach(m => {
        if(m.id === familyMember.id){
          m.old.hand = familyMember.old.hand
        }
      })
      updateAll()
    }
  });
});
