$(function () {
    if (window.PIE) {
        $('.css3').each(function () {
            PIE.attach(this);
        });
    }
});