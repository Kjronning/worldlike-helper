const cli = require('./cli')

const dayOfWeek = new Date(Date.now()).getDay();
const isWeekend = (dayOfWeek === 6) || (dayOfWeek  === 0);

cli.init(isWeekend)