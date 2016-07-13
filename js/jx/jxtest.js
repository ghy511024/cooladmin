/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var JX = {
    tojson: function (key, data, p) {
        var type = data["type"];//类型
        if (type == "string") {
            p != null ? p[key + ""] = "" : "";
        }
        else if (type == "boolean") {
            p[key + ""] = true;
        }
        else if (type == "number") {
            p[key + ""] = 0;
        }
        else if (type == "obj") {
            for (var k in data["value"]) {
                p[key] = {};
                JX.tojson(k, data["value"][k], p[key]);
            }
        }
        else if (type == "array") {
            p[key] = [];
            var ta = data["value"]["type"];
            if (ta == "string") {
                p[key].push("");
            }
            else if (ta == "obj") {
                var aobj = {}
                for (var m in data["value"]["objvalue"]) {
                    JX.tojson(m, data["value"]["objvalue"][m], aobj);
                }
                p[key].push(aobj)
            }
        }
    },
    jsonto: function (key, value, p) {
        var type = JX.type(value);
        if (type != null) {
            if (type == "string") {
                var obj = {type: "string"};
                p[key] = obj;
            }
            else if (type == "obj") {
                var obj = {type: "obj"}
                var vobj = {};
                for (var k in  value) {
                    JX.jsonto(k, value[k], vobj)
                }
                obj["value"] = vobj;
                p[key] = obj;
            }
            else if (type == "array") {
                var obj = {type: "array"}
                var vobj = {};
                var vdata = value[0];
                var atype = JX.type(vdata);

                if (vdata != null) {
                    if (atype == "string") {
                        vobj["type"] = "string;"
                    }
                    else if (atype == "obj") {
                        vobj["type"] = "obj;"
                        var tmpobj = {};
                        for (var k in vdata) {
                            JX.jsonto(k, vdata[k], tmpobj)
                        }
                        vobj["objvalue"] = tmpobj;
                    }
                }
                obj["value"] = vobj;
                p[key] = obj;
            }
        }
    },
    jxjson: function (jdata) {
        var ret = {};
        for (var key in jdata) {
            JX.jsonto(key, jdata[key], ret);
        }
        console.log(JSON.stringify(ret))
    },
    jxdata: function (data) {
        var obj = {};
        for (var key in data) {
            JX.tojson(key + "", data[key], obj)
        }
        console.log(JSON.stringify(obj));
    },
    type: function (value) {
        var ret = null;
//        console.log(typeof value)
        if (typeof value == "string") {
            ret = "string";
        }
        else if (typeof value == "number") {
            ret = "number";
        }
        else if (typeof value == "boolean") {
            ret = "boolean";
        }
        else if (typeof value == "object") {
            if (value instanceof Array) {
                ret = "array";
            }
            else {
                ret = "obj";
            }
        }
        return  ret;
    },
    test: function () {
        var data = {
            key1: {type: "string"},
            key4: {type: "string"},
            key2: {type: "obj", value: {key1: {type: "string"}}},
            key3: {type: "array", value: {type: "string"}},
            key5: {type: "array", value: {type: "obj", objvalue: {key6: {type: "string"},key7:{type:"string"}}}}
        }
        var data2 = {
            key1: "",
            key4: "",
            key2: {"key1": "",array:[""]},
            key3: [""],
            key5: [{"key6": "", key7: ""}]
        }
        JX.jxdata(data);
        JX.jxjson(data2);
    }
}
JX.test();