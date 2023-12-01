// from https://blog.csdn.net/MOAN_/article/details/123690430
(function () {
  var eleCode = "<div>test</div>";
  if (document.body) {
    document.body.insertAdjacentHTML("afterbegin", eleCode);
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      document.body.insertAdjacentHTML("afterbegin", eleCode);
    });
  }
})();
