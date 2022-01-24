exports.delay = ms => new Promise(resolve => setTimeout(resolve, ms))

exports.print = x => {console.log(x); return x}