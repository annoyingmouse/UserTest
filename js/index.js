$(function () {

  includeHTML()

  const yourTitle = $("#yourTitle")
  const yourForename = $("#yourForename")
  const yourSurname = $("#yourSurname")
  const yourDOB = $("#yourDOB")

  const familyTitle = $("#familyTitle")
  const familyForename = $("#familyForename")
  const familySurname = $("#familySurname")
  const familyDOB = $("#familyDOB")

  const familyModal = $("#familyModal")
  const familyModalPrimary = $("#familyModalPrimary")
  
  const Member = localStorage.Member 
    ? JSON.parse(localStorage.Member) 
    : {
        type: "Member",
        id: Math.random().toString(36).substring(2) + Date.now().toString(36),
        old: {eye: null, hair: null, hand: null},
        new: {eye: null, hair: null, hand: null}
      }

  const FamilyMembers = localStorage.getItem('FamilyMembers')
    ? JSON.parse(localStorage.getItem('FamilyMembers'))
    : []

  const updateMember = () => {
    Member.name = `${Member.title} ${Member.forename} ${Member.surname}`
    localStorage.setItem('Member', JSON.stringify(Member))
  }

  const resetTable = (id) => {
    id && FamilyMembers.splice(FamilyMembers.findIndex(m => m.id === id), 1)
    localStorage.setItem('FamilyMembers', JSON.stringify(FamilyMembers))
    YourFamilyTable.clear()
    YourFamilyTable.rows.add(FamilyMembers)
    YourFamilyTable.draw()
  }

  yourTitle.val(Member.title || null).change(e => {
    Member.title = e.target.value
    updateMember()
  })

  yourForename.val(Member.forename || null).change(e => {
    Member.forename = e.target.value
    updateMember()
  })

  yourSurname.val(Member.surname || null).change(e => {
    Member.surname = e.target.value
    updateMember()
  })

  yourDOB.val(Member.dob || null).change(e => {
    Member.dob = e.target.value
    updateMember()
  })

  $("#familyForm").submit(function (e) {
    e.preventDefault()
  }).validate({
    submitHandler: function () {
      if(FamilyMembers.length >= 3){
        document.location.href = $(this.submitButton).val() === "Add Details - TABLES"
          ? "old.html"
          : "new.html"
      }else{
        alert("Please enter all members of the family")
      }
    }
  })

  const YourFamilyTable = $("#YourFamily").on("click", ".btn-danger", function() {
    const rowData = YourFamilyTable.row($(this).parents('tr')).data()
    resetTable(rowData.id)
  }).on("click", ".btn-primary", function() {
    const rowData = YourFamilyTable.row($(this).parents('tr')).data()
    familyModal.data("original", rowData)
    familyTitle.val(rowData.title)
    familyForename.val(rowData.forename)
    familySurname.val(rowData.surname)
    familyDOB.val(rowData.dob)
    familyModalPrimary.val("Update Family Member")
    familyModal.modal("show")
    resetTable(rowData.id)
  }).DataTable({
    columns: [
      {
        data: "name",
        title: "Name"
      }, {
        data: "dob",
        title: "Date of Birth",
        render: data => moment(data).format("DD/MM/YYYY"),
        sortable: false
      }, {
        title: "Action",
        width: "20%",
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
        sortable: false
      }
    ],
    data: FamilyMembers
  })

  $("#familyMemberForm").validate({
    submitHandler: function () {
      const FamilyMember = familyModal.data("original")
        ? familyModal.data("original")
        : {
          type: "FamilyMember",
          id: Math.random().toString(36).substring(2) + Date.now().toString(36),
          old: {eye: null, hair: null, hand: null},
          new: {eye: null, hair: null, hand: null}
        }
      FamilyMember.title = familyTitle.val()
      FamilyMember.forename = familyForename.val()
      FamilyMember.surname = familySurname.val()
      FamilyMember.name = `${familyTitle.val()} ${familyForename.val()} ${familySurname.val()}`
      FamilyMember.dob = familyDOB.val()
      FamilyMembers.push(FamilyMember)
      resetTable()
      familyModalPrimary.val("Add Family Member")
      familyModal.modal("hide")
    }
  })

  $("#familyModalDismiss").on("click", () => {
    if(familyModal.data("original")){
      FamilyMembers.push(familyModal.data("original"))
      resetTable()
    }

  })

  familyModal.on("hidden.bs.modal", function () {
    document.getElementById("familyMemberForm").reset()
    familyModal.removeData("original")
  })

})