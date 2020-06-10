$(function () {
  $("form").submit(function (e) {
    e.preventDefault()
  });
  data = JSON.parse(window.atob(GetURLParameter("data")));
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
  $.each(data, function (k, v) {
    $("#eyeColourName").append($("<option></option>", {
      "text": v.name + " (" + moment(v.dob).format("DD/MM/YYYY") + ")",
      "value": v.name,
      "data-title": v.title,
      "data-forename": v.forename,
      "data-surname": v.surname,
      "data-dob": v.dob,
      "data-type": v.type
    }));
  });
  $("#eyeColourName").on("change", function () {
    if ($(this).val().length) {
      $("#eyeColour").removeAttr("disabled");
    } else {
      $("#eyeColour").attr("disabled", "disabled");
    }
  });
  var eyeForm = $("#eyeForm").validate({
    "rules": {
      "eyeColourName": {
        "required": true
      },
      "eyeColour": {
        "required": true
      }
    },
    "submitHandler": function (form) {
      var familyMember = $("#eyeColourName").find(":selected").data();
      $("#eyeColourName").find(":selected").attr("disabled", "disabled");
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
          v.eyes = true;
          v["eye-colour"] = $("#eyeColour").val();
          eyeTable.row.add(v).draw();
        }
      });
      $("#eyeModal").modal("hide");
      $("#eyeModalPrimary").val("Add Eye Details");
    }
  });
  $("#eyeModal").on("hidden.bs.modal", function () {
    eyeForm.resetForm();
    document.getElementById("eyeForm").reset();
    $("#eyeModal").data("original", "");
    $("#eyeColourName").val("");
    $("#eyeColour").val("").attr("disabled", "disabled");
  });
  $("#eyeTable").on("click", ".btn-danger", function () {
    var familyMember = eyeTable.row($(this).parents('tr')).data();
    $("#eyeColourName option").each(function (k, v) {
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
    eyeTable.row($(this).parents('tr')).remove().draw();
  });
  $("#eyeTable").on("click", ".btn-primary", function () {
    var familyMember = eyeTable.row($(this).parents('tr')).data();
    $("#eyeColourName option").each(function (k, v) {
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
        $("#eyeModal").modal("show").data("original", familyMember);
        $("#eyeColourName").val(familyMember.name);
        $("#eyeColour").removeAttr("disabled").val(familyMember["eye-colour"]);
        $("#eyeModalPrimary").val("Update Eye Details");
      }
    });
    eyeTable.row($(this).parents('tr')).remove().draw();
  });
  var eyeTable = $("#eyeTable").DataTable({
    "columns": [
      {
        "data": "name",
        "title": "Name"
      }, {
        "data": "eye-colour",
        "title": "Eye Colour"
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
  $("#eyeModalDismiss").on("click", function () {
    if ($("#eyeModalPrimary").val() === "Update Eye Details") {
      eyeTable.row.add($("#eyeModal").data("original")).draw();
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
  $.each(data, function (k, v) {
    $("#hairColourName").append($("<option></option>", {
      "text": v.name + " (" + moment(v.dob).format("DD/MM/YYYY") + ")",
      "value": v.name,
      "data-title": v.title,
      "data-forename": v.forename,
      "data-surname": v.surname,
      "data-dob": v.dob,
      "data-type": v.type
    }));
  });
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
          var buttons = [];
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
  $.each(data, function (k, v) {
    $("#handednessName").append($("<option></option>", {
      "text": v.name + " (" + moment(v.dob).format("DD/MM/YYYY") + ")",
      "value": v.name,
      "data-title": v.title,
      "data-forename": v.forename,
      "data-surname": v.surname,
      "data-dob": v.dob,
      "data-type": v.type
    }));
  });
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
