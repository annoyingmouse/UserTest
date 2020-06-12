$(function () {
  includeHTML();
  const yourTitle = $("#yourTitle");
  const yourForename = $("#yourForename");
  const yourSurname = $("#yourSurname");
  const yourDOB = $("#yourDOB");
  const familyTitle = $("#familyTitle");
  const familyForename = $("#familyForename");
  const familySurname = $("#familySurname");
  const familyDOB = $("#familyDOB");
  const familyModal = $("#familyModal");
  
  const Member = localStorage.Member 
    ? JSON.parse(localStorage.Member) 
    : {}
  const FamilyMembers = localStorage.getItem('FamilyMembers')
    ? JSON.parse(localStorage.getItem('FamilyMembers'))
    : []

  yourTitle.val(Member.title || null).change(e => {
    Member["title"] = e.target.value;
    localStorage.setItem('Member', JSON.stringify(Member));
  })
  yourForename.val(Member.forename || null).change(e => {
    Member["forename"] = e.target.value;
    localStorage.setItem('Member', JSON.stringify(Member));
  })
  yourSurname.val(Member.surname || null).change(e => {
    Member["surname"] = e.target.value;
    localStorage.setItem('Member', JSON.stringify(Member));
  })
  yourDOB.val(Member.dob || null).change(e => {
    Member["dob"] = e.target.value;
    localStorage.setItem('Member', JSON.stringify(Member));
  })

  $("#familyForm").submit(function (e) {
    e.preventDefault();
  }).validate({
    submitHandler: function (form) {
      FamilyMembers.push({
        title: yourTitle.val(),
        forename: yourForename.val(),
        surname: yourSurname.val(),
        name: `${yourTitle.val()} ${yourForename.val()} ${yourSurname.val()}`,
        dob: yourDOB.val(),
        type: "Member"
      });
      if(FamilyMembers.length >= 3){
        if ($(this.submitButton).val() === "Add Details - TABLES") {
          document.location.href = "old.html"
        } else {
          document.location.href = "new.html"
        }
      }else{
        alert("Please enter all members of the family")
      }
    }
  })
  
  const YourFamilyTable = $("#YourFamily").on("click", ".btn-danger", function () {
    const rowData = YourFamilyTable.row($(this).parents('tr')).data();
    FamilyMembers.splice(FamilyMembers.findIndex(x => x.id === rowData.id), 1);
    localStorage.setItem('FamilyMembers', JSON.stringify(FamilyMembers));
    YourFamilyTable.clear();
    YourFamilyTable.rows.add(FamilyMembers);
    YourFamilyTable.draw();
  }).on("click", ".btn-primary", function () {
    const rowData = YourFamilyTable.row($(this).parents('tr')).data();
    familyModal.data("original", rowData);
    familyTitle.val(rowData.title);
    familyForename.val(rowData.forename);
    familySurname.val(rowData.surname);
    familyDOB.val(rowData.dob);
    $("#familyModalPrimary").val("Update Family Member");
    familyModal.modal("show");
    FamilyMembers.splice(FamilyMembers.findIndex(x => x.id === rowData.id), 1);
    localStorage.setItem('FamilyMembers', JSON.stringify(FamilyMembers));
    YourFamilyTable.clear();
    YourFamilyTable.rows.add(FamilyMembers);
    YourFamilyTable.draw();
  }).DataTable({
    "columns": [
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
    data: JSON.parse(localStorage.getItem('FamilyMembers'))
  });
  $("#familyMemberForm").validate({
    submitHandler: function (form) {
      const FamilyMembers = localStorage.getItem('FamilyMembers')
          ? JSON.parse(localStorage.getItem('FamilyMembers'))
          : [];
      FamilyMembers.push({
        id: Math.random().toString(36).substring(2) + Date.now().toString(36),
        title: familyTitle.val(),
        forename: familyForename.val(),
        surname: familySurname.val(),
        name: `${familyTitle.val()} ${familyForename.val()} ${familySurname.val()}`,
        dob: familyDOB.val(),
        type: "FamilyMember"
      });
      localStorage.setItem('FamilyMembers', JSON.stringify(FamilyMembers));
      YourFamilyTable.clear();
      YourFamilyTable.rows.add(FamilyMembers);
      YourFamilyTable.draw();
      $("#familyModalPrimary").val("Add Family Member");
      familyModal.modal("hide");
    }
  });
  familyModal.on("hidden.bs.modal", function () {
    document.getElementById("familyMemberForm").reset();
    familyModal.data("original", "");
  });
});
