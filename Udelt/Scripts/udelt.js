
$(function() {

    new WOW().init();

    //$('#what-scene').parallax({
    //    limitY: 1,
    //    limitX: 25,
    //    scalarX: 5
    //});

    //$('#who-scene').parallax();


    function createSplines() {
        var width = $(window).width();
        var canvas = document.getElementById("topSpline");
        //var ctx = canvas.getContext("2d")
        //ctx.lineWidth = 2;
        //ctx.strokeStyle = "#333";
        //ctx.beginPath();
        //ctx.moveTo(0, 100);
        //ctx.quadraticCurveTo(50, 0, 400, 0);
        //ctx.stroke();

        $('#topSpline').drawEllipse({
            fillStyle: '#FEFEFA',
            x: 150, y: 150,
            width: width+100, height: 200,
            strokeStyle: '#333',
            strokeWidth: 4,
        });

        console.log("Spline created, width " + width);

    }

    function disableClickOnScroll() {
        var body = document.body, timer;

        window.addEventListener('scroll', function () {
            clearTimeout(timer);
            if (!body.classList.contains('disable-hover')) {
                body.classList.add('disable-hover')
            }

            timer = setTimeout(function () {
                body.classList.remove('disable-hover')
            }, 500);
        }, false);
    }


    function adjustRightTree(st) {
        var el = $('#tree-right-img')

        var threshold = 300;
        var maxwidth = 300;

        var fixedThreshold = 546;

        if (st < fixedThreshold) {
            el.removeClass('tree-right-absolute');
            el.addClass('tree-right-fixed')
        } else {
            el.addClass('tree-right-absolute');
            el.removeClass('tree-right-fixed')
        }

        if (st < threshold) {
            el.width(0);
        } else {
            var w = (st - threshold);
            if (w > maxwidth) w = maxwidth;
            el.width(w);
        }
    }

  
    $(window).scroll(function (event) {
        var st = $(this).scrollTop();

        adjustRightTree(st);

        if (st > 700) {
            $("#what").addClass('hidden');
            $("#where").removeClass('hidden');

        } else {
            $("#what").removeClass('hidden');
            $("#where").addClass('hidden');
        }

    });

    createSplines();
    disableClickOnScroll();


});