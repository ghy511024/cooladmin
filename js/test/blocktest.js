(function () {
    var t5 = +new Date();
    console.log("t5", t5 - t1);
    var t = +new Date()
    while ( + new Date < t + 5000)
        ;
    var t6 = +new Date();
    console.log("t6", t6 - t1);
})()