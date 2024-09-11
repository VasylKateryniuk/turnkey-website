let form = document.querySelector(".form");
const inputFields = form.getElementsByClassName("form-control");

for (const item of inputFields) {
  item.addEventListener("blur", (event) => {
    validateForm(event);
  });
}

let formResponse = document.querySelector(".form_response");
const inputField = formResponse.getElementsByClassName("form-control");

for (const item of inputField) {
  item.addEventListener("blur", (event) => {
    validateForm(event);
  });
}

let form_telegram = document.getElementById("forma_telegram");

const inputFieldTelegram = form_telegram.getElementsByClassName(
  "form-control-telegram"
);

for (const item of inputFieldTelegram) {
  item.addEventListener("blur", (event) => {
    validateForm(event);
  });
}

const setError = (element, message) => {
  const errorSection = element.parentElement.querySelector(".error");
  errorSection.innerText = message;
  element.classList.add("invalid");
  element.classList.remove("valid");
};

const setValid = (element) => {
  const errorSection = element.parentElement.querySelector(".error");
  errorSection.innerText = "";
  element.classList.remove("invalid");
  element.classList.add("valid");
};

const validateFirstName = (firstName) => {
  if (firstName.value === "") {
    setError(firstName, "Поле обов'язкове для заповнення");
  } else {
    setValid(firstName);
  }
};

const validateNameTelegram = (NameTelegram) => {
  if (NameTelegram.value === "") {
    setError(NameTelegram, "Поле обов'язкове для заповнення");
  } else {
    setValid(NameTelegram);
  }
};

const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+\.[a-zA-Z0-9_.+-]{2,3}$/;
  if (!regex.test(email.value)) {
    setError(email, "Неправильний формат вашого email");
  } else {
    setValid(email);
  }
};

const validateCoordinates = (coordinates) => {
  if (coordinates.value === "") {
    setError(coordinates, "Поле обов'язкове для заповнення");
  } else {
    setValid(coordinates);
  }
};

const validatePower = (power) => {
  if (power.value === "") {
    setError(power, "Поле обов'язкове для заповнення");
  } else {
    setValid(power);
  }
};

const validatetext = (text) => {
  if (text.value === "") {
    setError(text, "Поле обов'язкове для заповнення");
  } else {
    setValid(text);
  }
};

const validatePhone = (phone) => {
  const regex = /^\+?3?8?(0\d{9})$/;
  if (!regex.test(phone.value)) {
    setError(phone, "Неправильний формат номеру телефону");
  } else {
    setValid(phone);
  }
};

const validatePhoneTelegram = (phoneTelegram) => {
  const regex = /^\+?3?8?(0\d{9})$/;

  if (phoneTelegram.value === "") {
    setError(phoneTelegram, "Поле обов'язкове для заповнення");
    return;
  }

  if (!regex.test(phoneTelegram.value)) {
    setError(phoneTelegram, "Неправильний формат номеру телефону");
  } else {
    setValid(phoneTelegram);
  }
};

const validateForm = (event) => {
  switch (event.target.id) {
    case "firstName":
      validateFirstName(event.target);
      break;
    case "firstNameTwo":
      validateFirstName(event.target);
      break;
    case "Name_telegram":
      validateNameTelegram(event.target);
      break;
    case "email":
      validateEmail(event.target);
      break;
    case "phone":
      validatePhone(event.target);
      break;
    case "phone_telegram":
      validatePhoneTelegram(event.target);
      break;
    case "coordinates":
      validateCoordinates(event.target);
      break;
    case "power":
      validatePower(event.target);
      break;
    case "text":
      validatetext(event.target);
      break;
    default:
      alert("Validation error");
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("forma");
  form.addEventListener("submit", sendForm);

  async function sendForm(e) {
    e.preventDefault();

    const formData = new FormData(form);
    const validFields = document.querySelectorAll(".form-control.valid");
    // const botToken = "7453515567:AAEO0SAwMJp08dtCVJ-UNLs9U7HlnZOOMWk";
    // const chatId = "-1002239128382";
    const firstName = document.getElementById("firstName").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const coordinates = document.getElementById("coordinates").value;
    const power = document.getElementById("power").value;
    const text = `Ім'я: ${firstName}\nphone: ${phone}\nEmail: ${email}\nГеолокація ділянки: ${coordinates}\nПотужність: ${power}`;
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
      text
    )}`;

    if (validFields.length === 5 || validFields.length === 4) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          const response_two = await fetch("sendmail.php", {
            method: "POST",
            body: formData,
          });
          if (response_two.ok) {
            const data_two = await response_two.json();
            form.reset();
            form.classList.add("sending");
          } else {
            console.error("Error sending mail: ", await response_two.text());
            alert("Сталася помилка при надсиланні форми. Спробуйте ще раз.");
          }
        } else {
          console.error("Error sending message: ", await response.text());
          alert(
            "Сталася помилка при надсиланні повідомлення. Спробуйте ще раз."
          );
        }
      } catch (error) {
        console.error("Fetch error: ", error);
        alert("Сталася помилка при обробці запиту. Спробуйте ще раз.");
      }
    }
  }
});

const btnForm = document.getElementById("form-btn");
const firstName = document.getElementById("firstName");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const coordinates = document.getElementById("coordinates");
const power = document.getElementById("power");
btnForm.addEventListener("click", () => {
  if (firstName.value === "") {
    setError(firstName, "Поле обов'язкове для заповнення");
  }
  if (phone.value === "" && email.value === "") {
    setError(phone, "Одне з полей обов'язкове для заповнення") ||
      setError(email, "Одне з полей обов'язкове для заповнення");
  }
  if (coordinates.value === "") {
    setError(coordinates, "Поле обов'язкове для заповнення");
  }
  if (power.value === "") {
    setError(power, "Поле обов'язкове для заповнення");
  }
});

const btnFormResponse = document.getElementById("response_btn");
const btnCloseForm = document.getElementById("close");

btnFormResponse.addEventListener("click", () => {
  formResponse.style.display = "block";
});

btnCloseForm.addEventListener("click", () => {
  formResponse.style.display = "none";
});

const btnFormSend = document.getElementById("form_btn_send");
const firstNameTwo = document.getElementById("firstNameTwo");
btnFormSend.addEventListener("click", () => {
  if (firstNameTwo.value === "") {
    setError(firstNameTwo, "Поле обов'язкове для заповнення");
  }
  if (text.value === "") {
    setError(text, "Поле обов'язкове для заповнення");
  }
});

const formImage = document.getElementById("formImg");
const formPreview = document.getElementById("formPreview");
let uploadedImageUrl;

formImage.addEventListener("change", () => {
  uploadFile(formImage.files[0]);
});

function uploadFile(file) {
  if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
    alert("дозволено тільки зображення");
    formImage.value = "";
    return;
  }
  if (file.size > 2 * 1024 * 1024) {
    alert("файл повинен бути менше 2 мб");
    return;
  }

  var reader = new FileReader();
  reader.onload = function (e) {
    formPreview.innerHTML = `<img src = "${e.target.result}" alt = "photo">`;
    uploadedImageUrl = e.target.result;
  };
  reader.onerror = function (e) {
    console.log("Помилка");
  };
  reader.readAsDataURL(file);
}

const containerForCard = document.getElementsByClassName(
  "container_response_card"
);

let inputElement = document.getElementById("firstNameTwo");
let userResponse = document.getElementById("text");

function CreateResponse() {
  const cardResponse = document.createElement("div");
  const textResponse = document.createElement("p");
  const boxphoto = document.createElement("div");
  const image = document.createElement("img");
  const titleName = document.createElement("h3");

  cardResponse.classList.add("response_card");
  boxphoto.classList.add("name_photo");

  textResponse.innerText = userResponse.value;
  titleName.innerText = inputElement.value;
  image.src = uploadedImageUrl;

  boxphoto.append(image, titleName);
  cardResponse.append(textResponse, boxphoto);

  const data = {
    userResponse: userResponse.value,
    inputElement: inputElement.value,
    imageUrl: uploadedImageUrl,
  };

  fetch("response.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((result) => {
      console.log("Server response:", result);
    })
    .catch((error) => {
      console.log.error("Помилка:", error);
    });

  containerForCard[0].appendChild(cardResponse);
}

btnFormSend.addEventListener("click", () => {
  if (
    userResponse.value !== "" &&
    inputElement.value !== "" &&
    formPreview.innerHTML !== ""
  ) {
    CreateResponse();
    formResponse.reset();
    formPreview.innerHTML = "";
  } else {
    alert("заповніть всі поля та завантажте фото");
  }
});

function fetchAndDisplayResponses() {
  fetch("get_responses.php")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((responseData) => {
        const cardResponse = document.createElement("div");
        const textResponse = document.createElement("p");
        const boxphoto = document.createElement("div");
        const image = document.createElement("img");
        const titleName = document.createElement("h3");

        cardResponse.classList.add("response_card");
        boxphoto.classList.add("name_photo");

        textResponse.innerText = responseData.userResponse;
        titleName.innerText = responseData.inputElement;
        image.src = responseData.imageUrl;

        boxphoto.append(image, titleName);
        cardResponse.append(textResponse, boxphoto);

        containerForCard[0].appendChild(cardResponse);
      });
    })
    .catch((error) => {
      console.log.error("Помилка:", error);
    });
}

document.addEventListener("DOMContentLoaded", fetchAndDisplayResponses);

document.addEventListener("scroll", function () {
  let scrollPosition = window.scrollY;
  if (scrollPosition > 370) {
    document.querySelector(".element_scroll").style.opacity = 0.92;
  } else {
    document.querySelector(".element_scroll").style.opacity = 0;
  }
});

const menuBurger = document.querySelectorAll(".menu-list");
const menuToggle = document.getElementById("menu-toggle");
for (const item of menuBurger) {
  item.addEventListener("click", () => {
    menuToggle.checked = false;
  });
}

let standartCard = document.querySelector(".card_standart_join");
let nonstandartCard = document.querySelector(".card_nonstandart_join");

function handleScroll() {
  let scrollPosition1 = window.scrollY;
  let elementPosition1 =
    standartCard.getBoundingClientRect().top + standartCard.offsetHeight / 2;

  if (scrollPosition1 > elementPosition1) {
    standartCard.style.opacity = "1";
  } else {
    standartCard.style.opacity = "0";
  }

  let scrollPosition2 = window.scrollY;
  let elementPosition2 =
    nonstandartCard.getBoundingClientRect().top +
    nonstandartCard.offsetHeight / 2;

  if (scrollPosition2 > elementPosition2) {
    nonstandartCard.style.opacity = "1";
  } else {
    nonstandartCard.style.opacity = "0";
  }
}

window.addEventListener("scroll", handleScroll);

function animateCard() {
  let animationCard = document.querySelector(".advantages");
  let scrollCard = window.scrollY;
  let elementCard =
    animationCard.getBoundingClientRect().top + animationCard.offsetHeight / 2;
  if (scrollCard > elementCard) {
    animationCard.style.transform = "scale(1)";
  }
}

animateCard();
window.addEventListener("scroll", animateCard);

const videoContainer = document.getElementById("video");
const fullscreenButton = document.getElementById("btn_instruction");
const closeVideo = document.getElementById("close_video");

fullscreenButton.addEventListener("click", function () {
  var video = document.getElementById("videoPlayer");
  videoContainer.style.display = "block";
  const scroll = () => {
    var targetBlock = document.getElementById("video");
    targetBlock.scrollIntoView({ behavior: "smooth" });
  };
  scroll();
});

closeVideo.addEventListener("click", function () {
  videoContainer.style.display = "none";
});

let close_form_telegram = document.getElementsByClassName(
  "close_forma_telegram"
)[0];

let header_btn = document.getElementsByClassName("header_btn")[0];
let main_btn = document.getElementsByClassName("main_btn")[0];
let header_btn_menu = document.getElementsByClassName("header_btn_menu")[0];

header_btn.addEventListener("click", function () {
  form_telegram.style.display = "block";
});
main_btn.addEventListener("click", function () {
  form_telegram.style.display = "block";
});
header_btn_menu.addEventListener("click", function () {
  form_telegram.style.display = "block";
});

close_form_telegram.addEventListener("click", function () {
  form_telegram.style.display = "none";
  form_telegram.reset();
  form_telegram.classList.remove("sending");
});

let form_btn_telegram = document.getElementById("form_btn_telegram");
const name_telegram = document.getElementById("Name_telegram");
const phone_telegram = document.getElementById("phone_telegram");

form_btn_telegram.addEventListener("click", function () {
  if (name_telegram.value === "" && phone_telegram.value === "") {
    setError(name_telegram, "Поле обов'язкове для заповнення");
    setError(phone_telegram, "Поле обов'язкове для заповнення");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const forma_telegram = document.getElementById("forma_telegram");
  forma_telegram.addEventListener("submit", sendForm);

  let isSubmitting = false;

  async function sendForm(e) {
    e.preventDefault();

    if (isSubmitting) return;
    isSubmitting = true;

    const formData = new FormData(forma_telegram);
    const validFieldsTelegram = document.querySelectorAll(
      ".form-control-telegram.valid"
    );
    const botToken = "7453515567:AAEO0SAwMJp08dtCVJ-UNLs9U7HlnZOOMWk";
    const chatId = "-1002239128382";
    const name_telegram = document.getElementById("Name_telegram").value;
    const phone_telegram = document.getElementById("phone_telegram").value;
    const text = `Ім'я: ${name_telegram}\nномер телефону: ${phone_telegram}`;
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
      text
    )}`;

    if (validFieldsTelegram.length === 2) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          const response_two = await fetch("sendmail_two.php", {
            method: "POST",
            body: formData,
          });
          if (response_two.ok) {
            const data_two = await response_two.json();
            forma_telegram.reset();
            forma_telegram.classList.add("sending");
          } else {
            console.error("Error sending mail: ", await response_two.text());
            alert("Сталася помилка при надсиланні форми. Спробуйте ще раз.");
          }
        } else {
          console.error("Error sending message: ", await response.text());
          alert(
            "Сталася помилка при надсиланні повідомлення. Спробуйте ще раз."
          );
        }
      } catch (error) {
        console.error("Fetch error: ", error);
        alert("Сталася помилка при обробці запиту. Спробуйте ще раз.");
      }
    }

    isSubmitting = false;
  }
});
