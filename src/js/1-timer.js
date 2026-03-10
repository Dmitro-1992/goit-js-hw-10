  console.log('Hello, timer!');
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
  dataInput: document.querySelector("#datetime-picker"),
  startBtn: document.querySelector("[data-start]"),
  days: document.querySelector("[data-days]"),
  hours: document.querySelector("[data-hours]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]")
};

refs.startBtn.disabled = true;
let userSelectedDate = null;
let intervalId = null;

const options = {
  enableTime: true,      // включаем выбор времени
  time_24hr: true,       // 24-часовой формат
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {

    // получаем выбранную дату
    const selectedDate = selectedDates[0];

    // если дата в прошлом
    if (selectedDate <= new Date()) {

      // показываем сообщение
      iziToast.error({
        message: "Please choose a date in the future",
        position: "topRight"
      });

      refs.startBtn.disabled = true;

    } else {
      userSelectedDate = selectedDate;


      refs.startBtn.disabled = false;
    }
  },
};
flatpickr(refs.dataInput, options);
refs.startBtn.addEventListener("click", () => {

  refs.startBtn.disabled = true;
  refs.dataInput.disabled = true;
  intervalId = setInterval(() => {

    const currentTime = Date.now();
    const difference = userSelectedDate.getTime() - currentTime;

    if (difference <= 0) {

      clearInterval(intervalId);

      updateTimer({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      });
      refs.dataInput.disabled = false;

      return;
    }
    const time = convertMs(difference);
    updateTimer(time);

  }, 1000);

});

function updateTimer({ days, hours, minutes, seconds }) {

  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);

}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // дни
  const days = Math.floor(ms / day);

  // часы
  const hours = Math.floor((ms % day) / hour);

  // минуты
  const minutes = Math.floor(((ms % day) % hour) / minute);

  // секунды
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };

}