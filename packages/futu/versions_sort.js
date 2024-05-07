// APP的发布时，会有一定的版本号规则,
// （1）目前版本号存在2种格式，如：
// - x.y.z
// - x.y 这种情况等同于 x.y.0
// （2）x y z的取值为 >=0 的整数字符串组成，如：'101','10','001','1'
// - 001 等同于 1
// （3）版本号的大小比较规则如下：
// - 比较版本号时，请按从左到右的顺序依次比较它们的x y z修订号。
// - 如 2.1.1 > 1.1.1 ; 2.1.1 > 2.0.1 ;2.1.1 === 2.01.1; 1.1.1 > 1.1;

// 给定一组由APP的版本字符串组成的数组，按照从小到大进行排序,输出排查后的数组。

// 如 ['2.1.0','2.01.2','1.1.3','2.0','3.0.2']

function fn(vers) {
  function destructVer(ver) {
    const arr = ver.split(".");
    let [major = 0, minor = 0, patch = 0] = arr;
    major = parseInt(major);
    minor = parseInt(minor);
    patch = parseInt(patch);
    return [major, minor, patch];
  }
  vers.sort((ver1, ver2) => {
    const [major1, minor1, patch1] = destructVer(ver1);
    const [major2, minor2, patch2] = destructVer(ver2);
    if (major1 !== major2) return major1 - major2;
    if (minor1 !== minor2) return minor1 - minor2;
    return patch1 - patch2;
  });
  return vers;
}

console.log(fn(["2.1.0", "2.01.2", "1.1.3", "2.0", "3.0.2"]));
