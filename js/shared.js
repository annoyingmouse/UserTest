let data = null;
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
const backLink = document.getElementById('back-link');
backLink.setAttribute('href', document.referrer);
backLink.onclick = function () {
  history.back();
  return false;
}
includeHTML();
