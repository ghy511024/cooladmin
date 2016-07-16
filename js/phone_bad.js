setInterval(function () {
    test();
}, 61000)
test();
function test() {
    $.ajax({
        url: "/member/getVoiceCode",
        type: "post",
        data: ({targetNum: "13310895978", targetNumAreaCode: "0086"}),
        dataType: "json",
        error: function (jqXHR, textStatus, errorThrown) {

        },
        success: function (ret) {
            if (ret["ret"] == 0) {
            }
            else {
            }
        }
    })
}