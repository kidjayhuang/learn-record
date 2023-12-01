if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js", { scope: "/sw.js" })
    .then(function (reg) {
      console.log("注册成功", reg.scope);
    })
    .catch(function (err) {
      console.log("注册失败", err);
    });
}
