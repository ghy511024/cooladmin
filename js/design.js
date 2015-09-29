var singleton = function (fn) {
    var result;
    return function () {
        return result || (result = fn.apply(this, arguments));
    }
}
var createMask = singleton(function () {
    return document.body.appendChild(document.createElement('div'));
})
var createMask1 = singleton(function () {
    return document.body.appendChild(document.createElement('a'));
})
var createMask2 = singleton(function () {
    return document.body.appendChild(document.createElement('iframe'));
})
$("#haha").zen("div.test>div.list1+div.list3+div.list2>p.child1+p.child2");
var gg = Zen("div.test>div.list1+div.list3+div.list2>p.child1+p.child2");
console.log(gg);