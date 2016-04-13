$(function () {
    var $images = $('.emoji-list > svg');

    initAnimation($images);

    initWorker();

    window.onload = function () {
        sendRumData();
        lazyLoadImages();
    };

    function initWorker() {
        var myWorker = new Worker("js/worker.js");

        setInterval(function () {
            requestFibonacciNumber(myWorker);
        }, 10 * 1000);

        myWorker.onmessage = function (event) {
            var number = event.data[0]
            var result = event.data[1];

            console.log('Fib(' + number + ') = ' + result);
        }
    }

    function requestFibonacciNumber(worker) {
        var number = getRandomInt(35, 42);

        worker.postMessage(number);
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function fib(n) {
        if (n === 0) return 0;
        if (n === 1) return 1;
        return fib(n - 2) + fib(n - 1);
    }

    function initAnimation($images) {
        var animate = false;
        var rotationAngle = 0;

        $images.on('mouseenter', function () {
            animate = true;
        });

        $images.on('mouseleave', function () {
            animate = false;
        });

        setInterval(function step() {
            var transformRule = 'rotate(' + rotationAngle + 'deg)';

            if (animate) {
                $images.css({ transform: transformRule });
                rotationAngle += 1;
            }
        }, 0);
    }

    function sendRumData() {
        var times = timing.getTimes();

        if (times.loadEventTime <= 0) {
            setTimeout(sendRumData, 500);
            return;
        }

        window.fetch && fetch('/rum', {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(timing.getTimes())
        });
    }

    function lazyLoadImages() {
        $('img').each(function () {
            var $img = $(this);

            $img.attr('src', $img.data('src'));
        });
    }
});
