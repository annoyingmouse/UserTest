$(function () {
  includeHTML();
  $("form").submit(function (e) {
    e.preventDefault()
  });
  data = JSON.parse(window.atob(GetURLParameter("data")));
  const YourFamilyDetails = $("#YourFamilyDetails").DataTable({
    "columns": [{
      "title": "Family Member",
      "render": function (data, type, row, meta) {
        return row.name + " (" + moment(row.dob).format("DD/MM/YYYY") + ")";
      }
    }, {
      "title": "Eye Colour",
      "width": "20%",
      "render": function (data, type, row, meta) {
        var button = null;
        if (row.hasOwnProperty("eyes") && row.eyes) {
          button = $("<button></button>", {
            "class": "btn btn-default eye-colour btn-sm",
            "text": row["eye-colour"] + " | Edit",
            "data-toggle": "modal",
            "data-target": "#eyeModal",
            "data-backdrop": "static"
          }).prop("outerHTML");
        } else {
          button = $("<button></button>", {
            "class": "btn btn-primary eye-colour btn-sm",
            "text": "Add Eye Colour",
            "data-toggle": "modal",
            "data-target": "#eyeModal",
            "data-backdrop": "static"
          }).prop("outerHTML");
        }
        return button;
      },
      "orderable": false
    }, {
      "title": "Hair Colour",
      "width": "20%",
      "render": function (data, type, row, meta) {
        var button = null;
        if (row.hasOwnProperty("hair") && row.hair) {
          button = $("<button></button>", {
            "class": "btn btn-default hair-colour btn-sm",
            "text": row["hair-colour"] + " | Edit",
            "data-toggle": "modal",
            "data-target": "#hairModal",
            "data-backdrop": "static"
          }).prop("outerHTML");
        } else {
          button = $("<button></button>", {
            "class": "btn btn-primary hair-colour btn-sm",
            "text": "Add Hair Colour",
            "data-toggle": "modal",
            "data-target": "#hairModal",
            "data-backdrop": "static"
          }).prop("outerHTML");
        }
        return button;
      },
      "orderable": false
    }, {
      "title": "Hand Dominance",
      "width": "25%",
      "render": function (data, type, row, meta) {
        var button = null;
        if (row.hasOwnProperty("hand")) {
          button = $("<button></button>", {
            "class": "btn btn-default handedness btn-sm",
            "text": row.hand + " | Edit",
            "data-toggle": "modal",
            "data-target": "#handModal",
            "data-backdrop": "static"
          }).prop("outerHTML");
        } else {
          button = $("<button></button>", {
            "class": "btn btn-primary handedness btn-sm",
            "text": "Add Handedness",
            "data-toggle": "modal",
            "data-target": "#handModal",
            "data-backdrop": "static"
          }).prop("outerHTML");
        }
        return button;
      },
      "orderable": false
    }],
    "data": data,
  });
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
  YourFamilyDetails.on("click", ".eye-colour", function () {
    var original = YourFamilyDetails.row($(this).parents('tr')).data();
    $(".memberName").text(original.name);
    $("#eyeModal").data("original", original);
    if (original.hasOwnProperty("eyes") && original.eyes) {
      $("#eyeExists").prop("checked", true);
      $("#eyeColour").val(original["eye-colour"]).removeAttr("disabled");
      $("#eyeModalPrimary").val("Update Eye Details")
    } else {
      $("#eyeModalPrimary").val("Add Eye Details")
    }
  });
  $("#eyeExists").click(function () {
    if ($(this).prop("checked")) {
      $("#eyeColour").removeAttr("disabled");
    } else {
      $("#eyeColour").attr("disabled", "disabled").val("");
    }
  });
  var eyeForm = $("#eyeForm").validate({
    "rules": {
      "eyeColour": {
        "required": "#eyeExists:checked"
      }
    },
    "submitHandler": function (form) {
      var familyMember = $("#eyeModal").data("original");
      $.each(data, function (k, v) {
        if (
            v.title === familyMember.title
            &&
            v.forename === familyMember.forename
            &&
            v.surname === familyMember.surname
            &&
            v.dob === familyMember.dob
        ) {
          if ($("#eyeExists").prop("checked")) {
            v.eyes = true;
            v["eye-colour"] = $("#eyeColour").val();
          } else {
            delete v.eyes;
            delete v["eye-colour"];
          }
        }
      });
      YourFamilyDetails.clear().rows.add(data).draw();
      $("#eyeModal").modal("hide");
    }
  });
  $("#eyeModal").on("hidden.bs.modal", function () {
    eyeForm.resetForm();
    document.getElementById("eyeForm").reset();
    $("#eyeModal").data("original", "");
    $(".memberName").text("");
    $("#eyeColour").attr("disabled", "disabled");
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
  YourFamilyDetails.on("click", ".hair-colour", function () {
    var original = YourFamilyDetails.row($(this).parents('tr')).data();
    $(".memberName").text(original.name);
    $("#hairModal").data("original", original);
    if (original.hasOwnProperty("hair") && original.hair) {
      $("#hairExists").prop("checked", true);
      $("#hairColour").val(original["hair-colour"]).removeAttr("disabled");
      $("#hairModalPrimary").val("Update Hair Details");
    } else {
      $("#hairModalPrimary").val("Add Hair Details")
    }
  });
  $("#hairExists").click(function () {
    if ($(this).prop("checked")) {
      $("#hairColour").removeAttr("disabled");
    } else {
      $("#hairColour").attr("disabled", "disabled").val("");
    }
  });
  var hairForm = $("#hairForm").validate({
    "rules": {
      "hairColour": {
        "required": "#hairExists:checked"
      }
    },
    "submitHandler": function (form) {
      var familyMember = $("#hairModal").data("original");
      $.each(data, function (k, v) {
        if (
            v.title === familyMember.title
            &&
            v.forename === familyMember.forename
            &&
            v.surname === familyMember.surname
            &&
            v.dob === familyMember.dob
        ) {
          if ($("#hairExists").prop("checked")) {
            v.hair = true;
            v["hair-colour"] = $("#hairColour").val();
          } else {
            delete v.hair;
            delete v["hair-colour"];
          }
        }
      });
      YourFamilyDetails.clear().rows.add(data).draw();
      $("#hairModal").modal("hide");
    }
  });
  $("#hairModal").on("hidden.bs.modal", function () {
    hairForm.resetForm();
    document.getElementById("hairForm").reset();
    $("#hairModal").data("original", "");
    $(".memberName").text("");
    $("#hairColour").attr("disabled", "disabled");
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
  YourFamilyDetails.on("click", ".handedness", function () {
    var original = YourFamilyDetails.row($(this).parents('tr')).data();
    $(".memberName").text(original.name);
    $("#handModal").data("original", original);
    if (original.hasOwnProperty("hand")) {
      $("#handedness").val(original.hand);
      $("#handModalPrimary").val("Update Handedness");
    } else {
      $("#handModalPrimary").val("Add Handedness")
    }
  });
  $("#handModalPrimary").on("click", function (e) {
    e.preventDefault();
    var familyMember = $("#handModal").data("original");
    $.each(data, function (k, v) {
      if (
          v.title === familyMember.title
          &&
          v.forename === familyMember.forename
          &&
          v.surname === familyMember.surname
          &&
          v.dob === familyMember.dob
      ) {
        if (~~$("#handedness").val().length) {
          v.hand = $("#handedness").val();
        } else {
          delete v.hand;
        }
      }
    });
    YourFamilyDetails.clear().rows.add(data).draw();
    $("#handModal").modal("hide");
    $("#handedness").val("");
  });
  $("#handModal").on("hidden.bs.modal", function () {
    $("#handModal").data("original", "");
    $(".memberName").text("");
  });
});
