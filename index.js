var operations = {
    '+': function(a, b){
        return a + b;
    },
    '-': function(a, b) {
        return a - b;
    },
    '*': function(a, b){
        return a * b;
    },
    '%': function(a, b){
        return a % b;
    },
    '^': function(a, b){
        return Math.pow(a, b);
    },
    '/': function(a, b){
        return Math.floor(a / b);
    }
};

function flattenArray(arr){
    return arr.reduce(function(prev, curr){
        if(curr && curr instanceof Array){
            while(curr.length){
                prev.push(curr.shift());
            }

            return prev;
        }

        prev.push(curr);

        return prev;
    }, []);
}

module.exports = function(){
    var args = Array.prototype.slice.apply(arguments);
    args = flattenArray(args);

    return args.reduce(function(prev, curr){
        if(prev instanceof Function){
            return prev(parseInt(curr, 10));
        }

        if(operations[curr] instanceof Function){
            return operations[curr].bind(null, prev);
        }

        if(prev !== null){
            throw "Must provide operator";
        }

        return parseInt(curr, 10);
    }, null);
};
