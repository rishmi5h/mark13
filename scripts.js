var date = document.querySelector("input");
var btn = document.querySelector("button");
var resultOnScreen = document.querySelector(".output");
var nextPalindromeOnScreen = document.querySelector(".next");
var previousPalindromeOnScreen = document.querySelector(".previous");

const reverseStr = (str) => {
  let Chars = str.split("");
  let reversedChars = Chars.reverse();
  let reversedStr = reversedChars.join("");
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
  let dateInStr = {
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
  let listOfPalindromes = getAlldateFormats(date);
  let output = [];
  let index = 0;
  for (let Date of listOfPalindromes) {
    if (checkPalindrome(Date)) {
      output = true;
      index++;
    } else {
      output = false;
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
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

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
  let counter = 0;
  let nextDate = getNextDate(date);

  while (1) {
    counter++;
    let isPalindrome = checkPalindromeForAllDateFormats(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [counter, nextDate];
};

const getPreviousDate = (date) => {
  let day = date.day - 1;
  let month = date.month;
  let year = date.year;

  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

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
  let counter = 0;
  let previousDate = getPreviousDate(date);
  while (1) {
    counter++;
    let isPalindrome = checkPalindromeForAllDateFormats(previousDate);
    if (isPalindrome) {
      break;
    }
    previousDate = getPreviousDate(previousDate);
  }
  return [counter, previousDate];
};

const checkAndShowOutput = (date) => {
  let birthdayStr = date.value;

  if (birthdayStr !== "") {
    let listOfDate = birthdayStr.split("-");

    var date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0]),
    };
  }
  let isPalindrome = checkPalindromeForAllDateFormats(date);
  let nextPalindromeDays = getNextPalindromeDate(date)[0];
  let nextPalindromeDate = getNextPalindromeDate(date)[1];
  let previousPalindromeDays = getPreviousPalindromeDate(date)[0];
  let previousPalindromeDate = getPreviousPalindromeDate(date)[1];
  console.log({
    nextPalindromeDate,
    nextPalindromeDays,
    previousPalindromeDate,
    previousPalindromeDays,
  });

  if (isPalindrome) {
    resultOnScreen.innerHTML = "Yay! your birthday is a Palindrome!!!!!!";
  } else {
    resultOnScreen.innerHTML = `Not a Palindrome Birthday`;
    nextPalindromeOnScreen.innerHTML = `The next palindrome date is ${nextPalindromeDate.day}-${nextPalindromeDate.month}-${nextPalindromeDate.year} and you missed by ${nextPalindromeDays} days.`;
    previousPalindromeOnScreen.innerHTML = `The previous palindrome date is ${previousPalindromeDate.day}-${previousPalindromeDate.month}-${previousPalindromeDate.year} and you missed by ${previousPalindromeDays} days.`;
  }
};

// btn.addEventListener("click", checkAndShowOutput);
btn.addEventListener("click", () => checkAndShowOutput(date));
