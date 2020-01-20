const fs=require("fs");
const co=require("co");
function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path,(err,res)=>{
            if (err){
                reject(err);
            }else{
                resolve(res);
            }
        })
    })
}
var gen=function* () {
   var r1=yield readFile("./promise.js");
   var r2=yield readFile("./callback.js");
   return {r1,r2}
}
co(gen).
then(result=>{
    console.log(result)
}).catch(err=>{
    console.log(err);
})