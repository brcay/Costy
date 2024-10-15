// Localstorage'a eleman kaydeden fonks.
export function saveToLocalStorage(cart) {
  // * Localstorage a cart verisini kaydet
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Localstorage'dan verileri alan fonks.
export const getFromLocalStorage = () => {
  // Localstorage dan verileri al ve Json a çevir.Eğer veri yoksa boş dizi dönder
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
};

// Sepetteki ürün miktarını hesaplamak
export const updateCartIcon = (cart) => {
  // Sepet İkonu kapsayıcısı ve Quantity değerine eriş
  const cartIcon = document.querySelector(".cart-icon");

  const i = document.querySelector(".bxs-shopping-bag");

  // Sepette bulunan toplam ürün sayısını hesaplamak
  let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Quantity Attribute'ünün değerini güncellemek
  i.setAttribute("data-quantity", totalQuantity);
};

export function calculateCartTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
