function loadJs (url = '') {
  if (!url) {
    return Promise.reject()
  }
  if (!loadJs.cache) {
    loadJs.cache = {}
  }
  if (loadJs.cache[url] && loadJs.cache[url].status) {
    return Promise.resolve()
  }

  const request = new Promise((resolve, reject) => {

    _loadjs(
      url,
      () => {
        loadJs.cache[url] = {
          cache: true,
          status: true
        }
        resolve()
      },
      () => {
        if(!loadJs.cache[url]) {
          loadJs.cache[url] = {
            cache: false,
            status: false
          }
          _loadjs(url);
        }
        console.error(`${url} 加载失败`)
        reject(new Error(`${url} 加载失败`))
      }
    )
  })

  return request;

  function _loadjs (url, fn, fail) {
console.log(111);

    const script = document.createElement('script')
    script.src = url
    script.async = true
    // script.defer = true
    script.onload = fn
    script.onerror = fail
    ;(document.body || document.head).appendChild(script)
  }
}

export default loadJs
