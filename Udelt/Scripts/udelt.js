
$(function () {

    new WOW().init();

    function createSplines() {
        var width = $(window).width();

        $('#topSpline')
            .clearCanvas()
            .drawEllipse({
                fillStyle: '#FEFEFA',
                x: 150, y: 150,
                width: width, height: 200,
                strokeStyle: '#333',
                strokeWidth: 4,
                rotate: 10
            });

        $('#bottomSpline')
            .clearCanvas()
            .drawEllipse({
                fillStyle: '#FEFEFA',
                x: 0, y: 0,
                width: width * 1.5, height: 200,
                strokeStyle: '#333',
                strokeWidth: 4,
                rotate: 190
            });



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


    function setHeights() {
        var whoContentHeight = $("#who-content").height();
        var splineHeight = 50;

        $("#who-overlay").height(whoContentHeight - splineHeight);
        //console.log("who-overlay height:  " + (whoContentHeight - splineHeight));

        var whoHeight = $("#who").height();
        $("#footer").height(whoContentHeight * 10);
        console.log("who height:  " + whoContentHeight * 1.2);


    }

    function velHide(el) {
        el.velocity(
              {
                  opacity: 0
              },
              {
                  duration: 0,
                  display: "none"
              });;
    }

    function velShow(el) {
        el.velocity(
              {
                  opacity: 1
              },
              {
                  duration: 0,
                  display: "block"
              });;
    }


    $(window).resize(function (event) {
        setHeights();
        createSplines();
    });

    var prevSt = 0;
    $(window).scroll(function (event) {
        var st = $(this).scrollTop();


        adjustRightTree(st);

        var whatHeight = $("#what").height();

        if (st > whatHeight + 80 & prevSt <= whatHeight + 80) {
            velHide($("#what"));
            velShow($("#where"));
        } else if ((st <= whatHeight + 80 & prevSt > whatHeight + 80)) {
            velShow($("#what"));
            velHide($("#where"));
        }

        prevSt = st;

    });

    createSplines();
    setHeights();
    animateDiv();




    function makeNewPosition($container) {

        // Get viewport dimensions (remove the dimension of the div)
        $container = ($container || $(window))
        var h = $container.height() - 50;
        var w = $container.width() - 50;

        var nh = Math.floor(Math.random() * h);
        var nw = Math.floor(Math.random() * w);

        return [nh, nw];

    }

    function animateDiv() {
        var $target = $('.move-me');
        console.log($target);
        var newq = makeNewPosition($target.parent());
        var oldq = $target.offset();
        var speed = calcSpeed([oldq.top, oldq.left], newq);

        $('.move-me').velocity({
            top: newq[0],
            left: newq[1]
        }, speed, function () {
            animateDiv();
        });

    };

    function calcSpeed(prev, next) {

        var x = Math.abs(prev[1] - next[1]);
        var y = Math.abs(prev[0] - next[0]);

        var greatest = x > y ? x : y;

        var speedModifier = 0.1;

        var speed = Math.ceil(greatest / speedModifier);

        return speed;
    }


});