$(function () {
  if (localStorage.Member) {
    $("#yourTitle")
        .val(JSON.parse(localStorage.Member).title);
    $("#yourForename")
        .val(JSON.parse(localStorage.Member).forename);
    $("#yourSurname")
        .val(JSON.parse(localStorage.Member).surname);
    $("#yourDOB")
        .val(JSON.parse(localStorage.Member).dob);
  }
  var YourFamily = $("#YourFamily").DataTable({
    "columns": [
      {
        "data": "name",
        "title": "Name"
      }, {
        "data": "dob",
        "title": "Date of Birth",
        "render": function (data) {
          return moment(data).format("DD/MM/YYYY");
        },
        "sortable": false
      }, {
        "title": "Action",
        "render": function () {
          var buttons = $("<div></div>",
              {
                "class": "pull-right btn-group btn-group-sm",
                "role": "group"
            }
          );
          buttons.append($("<button></button>",
              {
                "type": "button",
                "class": "btn btn-danger",
                "text": " Remove"
              }
          ).prepend($("<i></i>",
              {
                "class": "glyphicon glyphicon-remove",
                "title": "Remove"
              }
          )));
          buttons.append($("<button></button>",
              {
                "type": "button",
                "class": "btn btn-primary",
                "text": " Edit"
              }
          ).prepend($("<i></i>",
              {
                "class": "glyphicon glyphicon-edit",
                "title": "Edit"
              }
          )));
          return buttons.prop("outerHTML");
        },
        "width": "15%",
        "sortable": false

      }
    ],
    "drawCallback": function (settings) {
      var api = this.api();
      var FamilyData = api.rows().data();
      var FamilyMembers = [];
      $.each(FamilyData, function (k, v) {
        FamilyMembers.push(v);
      });
      localStorage.FamilyMembers =
          JSON.stringify(FamilyMembers);
    },
    "data": (localStorage.FamilyMembers)
        ? JSON.parse(localStorage.FamilyMembers)
        : null
  });
  $('#YourFamily tbody')
      .on("click", ".btn-danger", function () {
    YourFamily
        .row($(this).parents('tr'))
        .remove()
        .draw();
  });
  $('#YourFamily tbody')
      .on("click", ".btn-primary", function () {
    var rowData =
        YourFamily
            .row($(this).parents('tr'))
            .data();
    $("#familyModal")
        .data("original", rowData);
    $("#familyTitle")
        .val(rowData.title);
    $("#familyForename")
        .val(rowData.forename);
    $("#familySurname")
        .val(rowData.surname);
    $("#familyDOB")
        .val(rowData.dob);
    $("#familyModalPrimary")
        .val("Update Family Member");
    YourFamily
        .row($(this).parents('tr'))
        .remove()
        .draw();
    $("#familyModal")
        .modal("show");
  });
  var familyMemberForm =
      $("#familyMemberForm").validate({
    "submitHandler": function (form) {
      if (
          $("#familyModalPrimary").val()
          ===
          "Update Family Member"
      ) {
        YourFamily
            .row
            .add($("#familyModal").data("original"))
            .draw();
        $("#familyModalPrimary")
            .val("Add Family Member");
      } else {
        var familyMember = {
          "title":
              $("#familyTitle").val(),
          "forename":
              $("#familyForename").val(),
          "surname":
              $("#familySurname").val(),
          "name":
              $("#familyTitle").val()
              + " "
              + $("#familyForename").val()
              + " "
              + $("#familySurname").val(),
          "dob":
              $("#familyDOB").val(),
          "type":
              "FamilyMember"
        }
        YourFamily
            .row
            .add(familyMember)
            .draw();
      }
      $("#familyModal")
          .modal("hide");
    }
  });
  $("#familyModal")
      .on("hidden.bs.modal", function () {
    familyMemberForm
        .resetForm();
    document
        .getElementById("familyMemberForm")
        .reset();
    $("#familyModal")
        .data("original", "");
  });
  $("#familyForm").validate({
    "submitHandler": function (form) {
      var Family =
          (localStorage.FamilyMembers)
              ? JSON.parse(localStorage.FamilyMembers)
              : [];
      var Member = {
        "title":
            $("#yourTitle").val(),
        "forename":
            $("#yourForename").val(),
        "surname":
            $("#yourSurname").val(),
        "name":
            $("#yourTitle").val()
            + " "
            + $("#yourForename").val()
            + " "
            + $("#yourSurname").val(),
        "dob":
            $("#yourDOB").val(),
        "type":
            "Member"
      }
      Family.push(Member);
      localStorage.Member =
          JSON.stringify(Member);
      var encodedData =
          window.btoa(JSON.stringify(Family));
      var href =
          window.location.href.split("/");
      href.pop();
      if (
          $("#familyForm")
              .context
              .activeElement
              .value
          ===
          "Add Details - TABLES"
      ) {
        href.push("old.html");
      } else {
        href.push("new.html");
      }
      var newURL = href.join("/");
      document
          .location
          .href
          =
          newURL
          + "?data="
          + encodedData;
    }
  });
});