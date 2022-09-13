const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let giveaway = document.querySelector('.giveaway');
let deadline = document.querySelector('.deadline');
let items = document.querySelectorAll('.deadline-format h4');

// new Date(year, month, day, hours, minutes, seconds, milliseconds);
const futureDate = new Date(2022, 8, 23, 17, 30, 0, 0);
// Giveaway Ends On Sunday, 24 April 2020, 8:00AM
let year = futureDate.getFullYear();
let month = months[futureDate.getMonth()];
let hours = futureDate.getHours();
let minutes = futureDate.getMinutes();
let seconds = futureDate.getSeconds();
let day = weekdays[futureDate.getDay()];
let date = futureDate.getDate();
giveaway.innerHTML = `Giveaway ends on ${day}, ${date} ${month} ${year}, ${hours}:${minutes}`;

function format(value) {
  if (value < "10") {
    return `0${value}`;
  }
  return value;
}

function updateCountdown() {
  let currentDate = new Date();
  let futureTime = futureDate.getTime();
  let currentTime = currentDate.getTime();
  if(currentTime > futureTime){
    clearInterval(countdown);
    giveaway.innerHTML = `<h3>Giveaway has expired!!</h3>`;
    items.forEach((item, index) => {
      item.innerHTML = "00";
    });
    return;
  }
  let millisecondsLeft = futureTime - currentTime;
  let oneSecond = 1000;
  let oneMinute = 1000 * 60;
  let oneHour = 1000 * 60 * 60;
  let oneDay = 1000 * 60 * 60 * 24;
  let daysLeft = millisecondsLeft / oneDay;
  millisecondsLeft = Math.floor((daysLeft - Math.floor(daysLeft)) * oneDay);
  daysLeft = Math.floor(daysLeft);
  let hoursLeft = millisecondsLeft / oneHour;
  millisecondsLeft = Math.floor((hoursLeft - Math.floor(hoursLeft)) * oneHour);
  hoursLeft = Math.floor(hoursLeft);
  let minutesLeft = millisecondsLeft / oneMinute;
  millisecondsLeft = Math.floor((minutesLeft - Math.floor(minutesLeft)) * oneMinute);
  minutesLeft = Math.floor(minutesLeft);
  let secondsLeft = Math.floor(millisecondsLeft / oneSecond);
  let time = [daysLeft, hoursLeft, minutesLeft, secondsLeft];
  items.forEach((item, index) => {
    item.innerHTML = format(time[index]);
  });
}
let countdown = setInterval(updateCountdown, 1000);
updateCountdown();