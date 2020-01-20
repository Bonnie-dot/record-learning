
const f=()=>console.log("callback");
console.log(1);
const main=(cb)=>{
    console.log(2);
    setTimeout(()=>cb(),2000);
}
main(f);//1 2 callback