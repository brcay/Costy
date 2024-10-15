import {
  calculateCartTotal,
  getFromLocalStorage,
  saveToLocalStorage,
  updateCartIcon,
} from "./utils.js";

let cart = getFromLocalStorage();

// * Sepete Ekleme Yapacak Fonks.
export function addToCart(event, products) {
  // Tıklanılan ürünün id'sine erişildi, product Id değişkenine atandı.
  const productId = parseInt(event.target.dataset.id);
  // Bu id'ye sahip başka bir ürün var mı?
  const product = products.find((product) => product.id === productId);
  //   console.log(product);
  // Eklenecek veri öncesinde sepette bu ürün varsa, bunu yeni bir eleman olarak ekleme.
  if (product) {
    // Eğer ürün varsa bunu bul.
    const exitingItem = cart.find((item) => item.id === productId);
    // Ürün sepette varsa bunu ekleme.
    if (exitingItem) {
      exitingItem.quantity++;
    } else {
      // Eklenecek veriyi objeye çevir.
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };

      cart.push(cartItem);
      // Ekleme yapılan cartın içeriğini güncelle.
      event.target.textContent = "Added";
      // Sepet iconunu güncelleyen fonks.
      updateCartIcon(cart);
      // Localstorage'a kayıt yapan fonks.
      saveToLocalStorage(cart);
      // Toplam miktarı Hesapla
      displayCartTotal;
      // Sepet iconunu güncelle
      updateCartIcon(cart);
    }
  }
}

// Sepetten Ürünleri Silecek Fonks.
const removeFromCart = (event) => {
  // Silinecek elemanın id'sine erişmek
  const productID = parseInt(event.target.dataset.id);
  // Tıklanılan elemanı sepetten kaldırmak
  cart = cart.filter((item) => item.id !== productID);
  // Localestorage'ı güncellemek
  saveToLocalStorage(cart);
  // Sayfayı güncellemek
  renderCartItems();
  // Toplam miktarı hesaplamak
  displayCartTotal();
  // Sepet iconunu güncellemek
  updateCartIcon(cart);
};

// Sepetteki elemanları render edecek fonks.
export const renderCartItems = () => {
  // Html'de elemanların render edileceği kapsayıcıya erişmek
  const cartItemsElement = document.querySelector("#cartItems");

  // Sepetteki hereleman için cart item render etmek
  cartItemsElement.innerHTML = cart
    .map(
      (item) =>
        `
        <div class="cart-item">
              <img
                src="${item.image}"
                alt=""
              />
              <!-- * Info Kısımı -->
              <div class="cart-item-info">
                <h2>${item.title} </h2>
                <input
                  type="number"
                  min="1"
                  value="${item.quantity}"
                  class="cart-item-quantity"
                  data-id='${item.id}'
                />
              </div>
              <h2 class="cart-item-price">$${item.price} </h2>
              <button class="remove-from-cart" data-id='${item.id}'>Remove</button>
            </div>
  `
    )
    .join("");

  // Remove butonlarına erişmek
  const removeButtons = document.querySelectorAll(".remove-from-cart");
  for (let i = 0; i < removeButtons.length; i++) {
    const removeButton = removeButtons[i];
    removeButton.addEventListener("click", removeFromCart);
  }

  // Quantity inputlarına erişmek
  const quantityInputs = document.getElementsByClassName(
    "cart-item-quantity"
  );

  // Her  inputun değişme olayını izlemek
  for (let i = 0; i < quantityInputs.length; i++) {
    const quantityInput = quantityInputs[i];
    quantityInput.addEventListener("change", onQuantityChange);
  }
};

//* İnputlar değiştiğinde çalışıcak olan fonks.
const onQuantityChange = (event) => {
  const newQuantity = +event.target.value;
  const productId = +event.target.dataset.id;

  // Yeni miktar 0'dan büyükse:
  if (newQuantity > 0) {
    // İd'si bilinen elemanın bilgilerini bulmak
    const cartItem = cart.find((item) => item.id === productId);

    // Eğer eleman sepette bulunamadıysa fonks. durdur
    if (!cartItem) return;

    // Ürünün miktarını güncellemek
    cartItem.quantity = newQuantity;

    // Localstorage'ı güncellemek
    saveToLocalStorage(cart);

    // Sepet iconundaki değeri güncellemek
    updateCartIcon(cart);

    // Toplam fiyatı güncellemek
    displayCartTotal();
  }
};

//* Toplam miktarı ekrana basmak
export const displayCartTotal = () => {
  const cartTotalElement = document.querySelector("#cartTotal");
  const total = calculateCartTotal(cart);
  cartTotalElement.textContent = `Total: $${total.toFixed(2)} `;
};
