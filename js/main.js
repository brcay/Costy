// Bağlantı Kontrolü
// console.log(`Hola Brc`);

import { addToCart, displayCartTotal, renderCartItems } from "./cart.js";
import { fetchProducts, renderProducts } from "./product.js";
import { getFromLocalStorage, updateCartIcon } from "./utils.js";

// ! HTML'den elemanları çekme
const menuIcon = document.querySelector("#menu-icon");
// console.log(menuIcon);

const menu = document.querySelector(".navbar");
// console.log(menu);

// Menu iconuna tıklandığında menü kısımına class ekleyip çıkartmak
menuIcon.addEventListener("click", () => {
  menu.classList.toggle("open-menu");
});
// Sayfa yüklendiğinde çalışacak fonks.
document.addEventListener("DOMContentLoaded", async () => {
  const cart = getFromLocalStorage();
  // console.log(window);

  // Tarayıcıda mı, ana sayfada mı, cart sayfasında mı?
  // Cart.html
  if (window.location.pathname.includes("cart.html")) {
    // console.log(`Cart Sayfası`);

    renderCartItems();
    displayCartTotal();
  }
  // index.html

  else {
    // console.log(`Ana Sayfa`);
    const product = await fetchProducts();
    // console.log(product);

    // Buradaki 'arrow function' addToCartCallBack' fonks. oluyor.
    renderProducts(product, (event) => addToCart(event, product));
  }
  // Sepet iconunu güncellemek
  updateCartIcon(cart);
});
