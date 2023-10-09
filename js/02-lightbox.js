import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

//отримуємо нашу галерею
const galleryContainer = document.querySelector(".gallery");
//ствворюємо розмітку
const markup = createMarkup(galleryItems);
//додаємо розмітку до галереї
galleryContainer.insertAdjacentHTML("beforeend", markup);

//функція для створення розмітки
function createMarkup(item) {
  return item
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item"><a class="gallery__link" href="${original}"><img
      class="gallery__image"
      src="${preview}"
      alt="${description}"
      /></a></li>`
    )
    .join("");
}

//Ініціалізація бібліотеки SimpleLightbox
new SimpleLightbox(".gallery a", {
  captionsData: "alt", //відображення підписів до зображень з атрибута alt
  captionDelay: 250, //підпис  з'являється через 250 мілісекунд після відкриття зображення
});
