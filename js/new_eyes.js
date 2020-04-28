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
$(function () {
  $("#YourFamilyDetails").on("click", ".eye-colour", function () {
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
});