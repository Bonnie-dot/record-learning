const fs=require("fs");
var readFile=thunkify(fs.readFile);
var gen=function* () {
    yield readFile("./promise.js");
    yield readFile("./callback.js");
}
function run(){
    var g=gen();
    function next(err,data) {
        var result=g.next(data);
        if(result.done)return;
        result.value(next)
    }
   next();
}
run();
// function demo01(arg,cb) {
//     cb(arg);
// }
// thunkify(demo01)(1)(console.log);
function thunkify(fn){
    return function(){
        var args = new Array(arguments.length);
        var ctx = this;

        for(var i = 0; i < args.length; ++i) {
            args[i] = arguments[i];
        }
        return function(done){
            var called;
             args.push(function(){
                if (called) return;
                called = true;
                done.apply(null, arguments);
            });

            try {
                    fn.apply(ctx, args);
                } catch (err) {
                    done(err);
            }
        }
    }
};