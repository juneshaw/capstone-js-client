module.exports =
{
parseDateDay: function (dateString) {
  console.log('dateString: ', dateString);
  var monthday = dateString.split(' ')
  console.log('monthday: ',monthday);
  // return new Date(monthday[2], monthday[0]-1, monthday[1]);
  var date = new Date(monthday[3], monthday[1]-1, monthday[2]);
  console.log('date: ', date);
  return date;
},

dayDiff: function (firstDate, secondDate) {
  var firstDay = this.parseDateDay(firstDate);
  var secondDay = this.parseDateDay(secondDate);
  var daydif = Math.round((second-first)/(1000*60*60*24));
  return daydif;
},

dayDiff2: function (firstDate, secondDate) {
  // One day in milliseconds
  var one_day=1000*60*60*24

  // Calculate the difference in the dates in days
  var diff = Math.ceil((secondDate.getTime()-firstDate.getTime())/(one_day));

  console.log('diff is: ', diff);
    // var christmas=new Date(today.getFullYear(), 11, 25) //Month is 0-11 in JavaScript
    // if (today.getMonth()==11 && today.getDate()>25) //if Christmas has passed already
    //     christmas.setFullYear(christmas.getFullYear()+1) //calculate next year's Christmas
    // //Set 1 day in milliseconds
    // var one_day=1000*60*60*24
    //
    // //Calculate difference btw the two dates, and convert to days
    // document.write(Math.ceil((christmas.getTime()-today.getTime())/(one_day))+
    // " days left until Christmas!")
    return diff;
  }
}
