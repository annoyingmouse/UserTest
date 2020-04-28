var data = null;
$(function () {
  $("form").submit(function (e) {
    e.preventDefault()
  });
  data = JSON.parse(window.atob(GetURLParameter("data")));
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
    $("#hairColourName").append($("<option></option>", {
      "text": v.name + " (" + moment(v.dob).format("DD/MM/YYYY") + ")",
      "value": v.name,
      "data-title": v.title,
      "data-forename": v.forename,
      "data-surname": v.surname,
      "data-dob": v.dob,
      "data-type": v.type
    }));
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
});
function GetURLParameter(sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == sParam) {
      return sParameterName[1];
    }
  }
}