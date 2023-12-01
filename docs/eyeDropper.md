## chrome原生取色器

在使用 [vite-plugin-vue-devtools](https://github.com/webfansplz/vite-plugin-vue-devtools) 时候，发现它的取色器，可以取到chrome之外的色值，
基于好奇，就去看了一下它的源码，原来它使用的是chrome原生的取色器eyeDropper,
是一个系统级别的工具


## 于是写了个chrome自助取色标签
- 新建一个标签
- 右键点击标签，选择修改
- 修改网址以下代码
```
javascript: 
window.copyText = (text) => {  
    const input = document.createElement('input');  
    input.setAttribute('value', text);  
    document.body.appendChild(input);  
    input.select();  
    document.execCommand('copy'); 
    document.body.removeChild(input);
};
window.eyeDropper = new EyeDropper();
eyeDropper.open().then((res)=>{  
    copyText(res.sRGBHex)
});
```
- 点击标签即可调用系统级别的取色器

