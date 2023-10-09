import { galleryItems } from "./gallery-items.js";
// Change code below this line

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
  if (event.target.nodeName !== "IMG") {
    return;
  } //перевірка, якщо клік не img, а на галереї, то  нічого не відбудеться
  const dataImageUrl = event.target.dataset.source; //отримуємо посилання на зобряження
  //використовуємо бібліотеку basicLightbox і створюємо новий екземпляр (модальне вікно)
  const instance = basicLightbox.create(
    `
  		<img width="800" height="auto" src="${dataImageUrl}">
  	`
  );
  instance.show(); //метод, що показує екземпляр
  //слухач події натискання клавіши Escape і функція, що закриває модальне вікно при натисканні Escape
  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      instance.close(); //метод, що закриває модальне вікно
    }
  });
}
