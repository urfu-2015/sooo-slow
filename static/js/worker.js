onmessage = function (event) {
    var number = event.data;
    var result = fib(number);

    postMessage([number, result]);
}

function fib(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;

    return fib(n - 2) + fib(n - 1);
}
