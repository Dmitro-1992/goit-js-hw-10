console.log('Hello, snackbar!');
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// получаем форму
const form = document.querySelector(".form");

// слушаем отправку формы
form.addEventListener("submit", event => {
  event.preventDefault(); // отменяем перезагрузку страницы

  // получаем данные формы
  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  // создаём промис
  const promise = new Promise((resolve, reject) => {

    // задержка выполнения
    setTimeout(() => {

      if (state === "fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }

    }, delay);

  });

  // обработка успешного выполнения
  promise
    .then(delay => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: "topRight"
      });
    })

    // обработка ошибки
    .catch(delay => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: "topRight"
      });
    });

  // очистка формы
  form.reset();
});
