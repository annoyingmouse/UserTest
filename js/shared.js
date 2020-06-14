const backLink = document.getElementById('back-link');
backLink.setAttribute('href', document.referrer);
backLink.onclick = function () {
  history.back();
  return false;
}
