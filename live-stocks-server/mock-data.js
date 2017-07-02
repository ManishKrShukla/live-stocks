var _mock = [
    ['Stock 1', 100],
    ['Stock 2', 103],
    ['Stock 3', 120],
    ['Stock 4', 102],
    ['Stock 5', 170],
    ['Stock 6', 110],
];

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

var counter = 0;
var op = "add";

module.exports = {
    scheduleUpdate: function(cb) {
        counter ++;

        if (counter > 5) {
            counter = 0;
            op = op === "add" ? "sub" : "add";
        }

        if (op === "add") {
            _mock.forEach(function(element) {
                element[1] = Math.round(element[1] + getRandomArbitrary(1, 5), 2);
            });
        } else {
            _mock.forEach(function(element) {
                element[1] = Math.round(element[1] - getRandomArbitrary(1, 5));
            });
        }

        setTimeout(function() {
            cb(_mock);    
        }, 10000);
    }

};