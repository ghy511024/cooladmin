function demopage_switchslider() {
    var a = window.location.href.substring(window.location.href.indexOf('?') + 8);
    if (a !== undefined && a !== '' && window.location.href.indexOf('?') > 0) {
        $('.aviaslider').attr('id', a)
    }
}
$(document).ready(function () {
    demopage_switchslider();
    jQuery('a[href$=jpg], a[href$=png], a[href$=gif], a[href$=jpeg]').prettyPhoto({
        theme: "light_square"
    });
    $('#frontpage-slider').aviaSlider({
        blockSize: {
            height: 80,
            width: 80
        },
        transition: 'slide',
        display: 'all',
        transitionOrder: ['diagonaltop', 'diagonalbottom', 'topleft', 'bottomright', 'random']
    });
    $('#diagonal-blocks').aviaSlider({
        blockSize: {
            height: 80,
            width: 80
        },
        transition: 'slide',
        display: 'diagonaltop',
        switchMovement: true
    });
    $('#winding-blocks').aviaSlider({
        blockSize: {
            height: 80,
            width: 80
        },
        transition: 'slide',
        display: 'topleft',
        switchMovement: true
    });
    $('#randomized-blocks').aviaSlider({
        blockSize: {
            height: 80,
            width: 80
        },
        transition: 'slide',
        display: 'random'
    });
    $('#fading_curtain').aviaSlider({
        blockSize: {
            height: 'full',
            width: 40
        },
        display: 'topleft',
        transition: 'fade',
        betweenBlockDelay: 150,
        animationSpeed: 600,
        switchMovement: true
    });
    $('#fading-top-curtain').aviaSlider({
        blockSize: {
            height: 40,
            width: 'full'
        },
        display: 'topleft',
        transition: 'fade',
        betweenBlockDelay: 150,
        animationSpeed: 600,
        switchMovement: true
    });
    $('#fullwidth-fade-slider').aviaSlider();
    $('#direction-fade-slider').aviaSlider({
        blockSize: {
            height: 3,
            width: 'full'
        },
        display: 'topleft',
        transition: 'fade',
        betweenBlockDelay: 10,
        animationSpeed: 400,
        switchMovement: true
    });
    $('#droping-curtain').aviaSlider({
        blockSize: {
            height: 'full',
            width: 40
        },
        display: 'topleft',
        transition: 'drop',
        betweenBlockDelay: 80,
        animationSpeed: 800,
        switchMovement: true,
        slideControlls: 'items',
        appendControlls: '.aviaslider'
    })
});