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
  $("#YourFamilyDetails").on("click", ".hair-colour", function () {
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
});