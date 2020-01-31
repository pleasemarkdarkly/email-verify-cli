var log = console.log;
console.log = function () {
    var first_parameter = arguments[0];
    var other_parameters = Array.prototype.slice.call(arguments, 1);

    function formatConsoleDate(date) {
        var year = date.getFullYear(),
            month = date.getMonth(),
            day = date.getDate(),
            hour = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds(),
            milliseconds = date.getMilliseconds();

        return '[' +
            year +
            ((month < 10) ? '0' + (month + 1) : month) +
            ((day < 10) ? '0' + day : day) +
            '-' +
            ((hour < 10) ? '0' + hour : hour) +
            ':' +
            ((minutes < 10) ? '0' + minutes : minutes) +
            ':' +
            ((seconds < 10) ? '0' + seconds : seconds) +
            '.' +
            ('00' + milliseconds).slice(-3) +
            '] ';
    };

    log.apply(console, [formatConsoleDate(new Date()) + first_parameter].concat(other_parameters));
};
