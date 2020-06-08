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
$(function () {
  $("#hairColourName").on("change", function () {
    if ($(this).val().length) {
      $("#hairColour").removeAttr("disabled");
    } else {
      $("#hairColour").attr("disabled", "disabled");
    }
  });
  var hairForm = $("#hairForm").validate({
    "rules": {
      "hairColourName": {
        "required": true
      },
      "hairColour": {
        "required": true
      }
    },
    "submitHandler": function (form) {
      var familyMember = $("#hairColourName").find(":selected").data();
      $("#hairColourName").find(":selected").attr("disabled", "disabled");
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
          v.hairs = true;
          v["hair-colour"] = $("#hairColour").val();
          hairTable.row.add(v).draw();
        }
      });
      $("#hairModal").modal("hide");
      $("#hairModalPrimary").val("Add Hair Details");
    }
  });
  $("#hairModal").on("hidden.bs.modal", function () {
    hairForm.resetForm();
    document.getElementById("hairForm").reset();
    $("#hairModal").data("original", "");
    $("#hairColourName").val("");
    $("#hairColour").val("").attr("disabled", "disabled");
  });
  $("#hairTable").on("click", ".btn-danger", function () {
    var familyMember = hairTable.row($(this).parents('tr')).data();
    $("#hairColourName option").each(function (k, v) {
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
    hairTable.row($(this).parents('tr')).remove().draw();
  });
  $("#hairTable").on("click", ".btn-primary", function () {
    var familyMember = hairTable.row($(this).parents('tr')).data();
    $("#hairColourName option").each(function (k, v) {
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
        console.log(familyMember);
        $("#hairModal").modal("show").data("original", familyMember);
        $("#hairColourName").val(familyMember.name);
        $("#hairColour").removeAttr("disabled").val(familyMember["hair-colour"]);
        $("#hairModalPrimary").val("Update Hair Details");
      }
    });
    hairTable.row($(this).parents('tr')).remove().draw();
  });
  var hairTable = $("#hairTable").DataTable({
    "columns": [
      {
        "data": "name",
        "title": "Name"
      }, {
        "data": "hair-colour",
        "title": "Hair Colour"
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
  $("#hairModalDismiss").on("click", function () {
    if ($("#hairModalPrimary").val() === "Update Hair Details") {
      hairTable.row.add($("#hairModal").data("original")).draw();
    }
  });
});
