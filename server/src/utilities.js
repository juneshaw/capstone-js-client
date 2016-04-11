
function parseDateDay(dateString) {
    var monthday = dateString.split('/')
    console.log('monthday: ',monthday);
    // return new Date(monthday[2], monthday[0]-1, monthday[1]);
    var date = new Date(monthday[3], monthday[1]-1, monthday[2]);
    console.log('date: ', date);
    return date;
}

function dayDiff(firstDate, secondDate) {
    var firstDay = parseDateDay(firstDate);
    var secondDay = parseDateDay(secondDate);
    var daydif = Math.round((second-first)/(1000*60*60*24));
    return daydif;
}
