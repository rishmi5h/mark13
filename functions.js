const reverseStr = (str) => {
  var Chars = str.split("");
  var reversedChars = Chars.reverse();
  var reversedStr = reversedChars.join("");
  return reversedStr;
};

const checkPalindrome = (str) => {
  if (str === reverseStr(str)) {
    return true;
  } else {
    return false;
  }
};

const convertDateToStr = (date) => {
  var dateInStr = {
    day: "",
    month: "",
    year: "",
  };
  if (date.day < 10) {
    dateInStr.day = "0" + date.day;
  } else {
    dateInStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateInStr.month = "0" + date.month;
  } else {
    dateInStr.month = date.month.toString();
  }
  dateInStr.year = date.year.toString();
  return dateInStr;
};

const getAlldateFormats = (date) => {
  dateInStr = convertDateToStr(date);
  DD = dateInStr.day;
  MM = dateInStr.month;
  YYYY = dateInStr.year;
  YY = dateInStr.year.slice(-2);
  output = [];
  output.push(DD + MM + YYYY);
  output.push(MM + DD + YYYY);
  output.push(YYYY + MM + DD);
  output.push(DD + MM + YY);
  output.push(MM + DD + YY);
  output.push(YY + MM + DD);
  return output;
};

const checkPalindromeForAllDateFormats = (date) => {
  var listOfPalindromes = getAlldateFormats(date);
  var output = [];
  var index = 0;
  for (var Date of listOfPalindromes) {
    if (checkPalindrome(Date)) {
      output[index] = true;
      index++;
    } else {
      output[index] = false;
      index++;
    }
  }
  return output;
};

const isLeapYear = (year) => {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return true;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
};

const getNextDate = (date) => {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    // for february
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      // to increment from last date of month
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day,
    month,
    year,
  };
};

const getNextPalindromeDate = (date) => {
  var counter = 0;
  var nextDate = getNextDate(date);

  while (1) {
    counter++;
    var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
    if (isPalindrome.includes(true)) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [counter, nextDate];
};

const getPreviousDate = (date) => {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 3) {
    if (isLeapYear(year)) {
      if (day < 1) {
        day = 29;
        month--;
      }
    } else {
      if (day < 1) {
        day = 28;
        month--;
      }
    }
  } else {
    if (day < 1) {
      day = daysInMonth[month - 1];
      month--;
    }
  }
  if (month < 1) {
    month = 12;
    year--;
  }
  return {
    day,
    month,
    year,
  };
};

const getPreviousPalindromeDate = (date) => {
  var counter = 0;
  var previousDate = getPreviousDate(date);
  while (1) {
    counter++;
    var isPalindrome = checkPalindromeForAllDateFormats(previousDate);
    if (isPalindrome.includes(true)) {
      break;
    }
    previousDate = getPreviousDate(previousDate);
  }
  return [counter, previousDate];
};

// console.log(getNextPalindromeDate({ day: 31, month: 12, year: 2020 }));
// console.log(getPreviousPalindromeDate({ day: 31, month: 12, year: 2020 }));
// console.log(getPreviousDate({ day: 1, month: 03, year: 2020 }));
// console.log(
//   checkPalindromeForAllDateFormats({ day: 2, month: 11, year: 2020 })
// );
