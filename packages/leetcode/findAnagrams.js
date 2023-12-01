var findAnagrams = function(s, p) {
    let paths = []
    let path = ''
    function bracktracking(used=[]) {
        if(path.length === p.length) {
            paths.push(path)
            return
        }
        for(let i=0; i<p.length; i++) {
            if(used[i]) continue
            path+=p[i]
            used[i] = true
            bracktracking(used)
            used[i] = false
            path = path.slice(0, -1)
        }
    }
    bracktracking()
    let ret =[]
    paths.forEach((str)=>{
        let index = s.indexOf(str)
        while(index !== -1) {
            ret.push(index)
            index = s.indexOf(str, index+1)
        }
        
    })
    return ret
    
};

findAnagrams("cbaebabacd", 'abc')

