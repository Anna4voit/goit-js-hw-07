import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

//отримуємо нашу галерею
const galleryContainer = document.querySelector(".gallery");
//ствворюємо розмітку
const markup = createMarkup(galleryItems);
//додаємо розмітку до галереї
galleryContainer.insertAdjacentHTML("beforeend", markup);
//навішуємо подію клік на галерею
galleryContainer.addEventListener("click", onImageClick);
//функція для створення розмітки
function createMarkup(item) {
  return item
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item"><a class="gallery__link" href="${original}"><img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    /></a></li>`
    )
    .join("");
}

//або таким чином
// const markup = galleryItems
//   .map(
//     ({ preview, original, description }) =>
//       `<li class="gallery__item"><a class="gallery__link" href="${original}"><img
//       class="gallery__image"
//       src="${preview}"
//       data-source="${original}"
//       alt="${description}"
//     /></a></li>`
//   )
//   .join("");

//колбек-функція на клік
function onImageClick(event) {
  event.preventDefault(); //заборона поведінки за замовчуванням
  if (!event.target.dataset.source) {
    //або так (event.target.nodeName !== "IMG")
    return;
  } //перевірка, якщо клік не img, а на галереї, то  нічого не відбудеться
  const dataImageUrl = event.target.dataset.source; //отримуємо посилання на зобряження
  //використовуємо бібліотеку basicLightbox і створюємо новий екземпляр (модальне вікно)
  const instance = basicLightbox.create(
    `
  		<img width="800" height="auto" src="${dataImageUrl}">`,
    //додаємо об'єкт оцій, в яких навішуємо слухача keydown і знімаємо, коли зображення закрите
    {
      onShow: (instance) => {
        document.addEventListener("keydown", onImageClose);
      },

      onClose: (instance) => {
        document.removeEventListener("keydown", onImageClose);
      },
    }
  );
  instance.show(); //метод, що показує екземпляр

  // функція, що закриває модальне вікно при натисканні Escape
  function onImageClose(event) {
    if (event.code === "Escape") {
      instance.close(); //метод, що закриває модальне вікно
    }
  }
}

//через reduce() ??
// const markup = galleryItems.reduce(
//   (acc, { preview, original, description }) => {
//     acc += `<li class="gallery__item"><a class="gallery__link" href="${original}"><img
//       class="gallery__image"
//       src="${preview}"
//       data-source="${original}"
//       alt="${description}"/></a></li>`;
//     return acc;
//   },
//   ""
// );
