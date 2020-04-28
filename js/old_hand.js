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
$(function () {
  $("#handednessName").on("change", function () {
    if ($(this).val().length) {
      $("#handedness").removeAttr("disabled");
    } else {
      $("#handedness").attr("disabled", "disabled");
    }
  });
  var handForm = $("#handForm").validate({
    "rules": {
      "eyeColourName": {
        "required": true
      },
      "eyeColour": {
        "required": true
      }
    },
    "submitHandler": function (form) {
      var familyMember = $("#handednessName").find(":selected").data();
      $("#handednessName").find(":selected").attr("disabled", "disabled");
      $.each(data, function (k, v) {
        if (
          v.title + "" === familyMember.title + ""
          &&
          v.forename + "" === familyMember.forename + ""
          &&
          v.surname + "" === familyMember.surname + ""
          &&
          v.dob + "" === familyMember.dob + ""
        ) {
          v["handedness"] = $("#handedness").val();
          handTable.row.add(v).draw();
        }
      });
      $("#handModal").modal("hide");
      $("#handModalPrimary").val("Add Handedness Details");
    }
  });
  $("#handModal").on("hidden.bs.modal", function () {
    handForm.resetForm();
    document.getElementById("handForm").reset();
    $("#handModal").data("original", "");
    $("#handednessName").val("");
    $("#handedness").val("").attr("disabled", "disabled");
  });
  $("#handTable").on("click", ".btn-danger", function () {
    var familyMember = handTable.row($(this).parents('tr')).data();
    $("#handednessName option").each(function (k, v) {
      var optionData = $(v).data();
      if (
        optionData.title + "" === familyMember.title + ""
        &&
        optionData.forename + "" === familyMember.forename + ""
        &&
        optionData.surname + "" === familyMember.surname + ""
        &&
        optionData.dob + "" === familyMember.dob + ""
      ) {
        $(v).removeAttr("disabled");
      }
    });
    handTable.row($(this).parents('tr')).remove().draw();
  });
  $("#handTable").on("click", ".btn-primary", function () {
    var familyMember = handTable.row($(this).parents('tr')).data();
    $("#handednessName option").each(function (k, v) {
      var optionData = $(v).data();
      if (
        optionData.title + "" === familyMember.title + ""
        &&
        optionData.forename + "" === familyMember.forename + ""
        &&
        optionData.surname + "" === familyMember.surname + ""
        &&
        optionData.dob + "" === familyMember.dob + ""
      ) {
        $(v).removeAttr("disabled");
        $("#handModal").modal("show").data("original", familyMember);
        $("#handednessName").val(familyMember.name);
        $("#handedness").removeAttr("disabled").val(familyMember["handedness"]);
        $("#handModalPrimary").val("Update Handedness Details");
      }
    });
    handTable.row($(this).parents('tr')).remove().draw();
  });
  var handTable = $("#handTable").DataTable({
    "columns": [
      {
        "data": "name",
        "title": "Name"
      }, {
        "data": "handedness",
        "title": "Handedness"
      }, {
        "title": "Action",
        "render": function () {
          var buttons = $("<div></div>", {
            "class": "pull-right btn-group btn-group-sm",
            "role": "group"
          });
          buttons.append($("<button></button>", {
            "type": "button",
            "class": "btn btn-danger",
            "text": " Remove"
          }).prepend($("<i></i>", {
            "class": "glyphicon glyphicon-remove",
            "title": "Remove"
          })));
          buttons.append($("<button></button>", {
            "type": "button",
            "class": "btn btn-primary",
            "text": " Edit"
          }).prepend($("<i></i>", {
            "class": "glyphicon glyphicon-edit",
            "title": "Edit"
          })));
          return buttons.prop("outerHTML");
        },
        "width": "15%",
        "sortable": false
      }
    ],
  });
  $("#handModalDismiss").on("click", function () {
    if ($("#handModalPrimary").val() === "Update Handedness Details") {
      handTable.row.add($("#handModal").data("original")).draw();
    }
  });
});