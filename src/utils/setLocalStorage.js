// Retrieve the shopping cart from localStorage
const getShoppingCart = () => {
  let shoppingCart = [];
  const isStored = localStorage.getItem("shopping-cart");
  if (isStored) {
    shoppingCart = JSON.parse(isStored);
  }
  return shoppingCart;
};

// Add or update an item in the shopping cart
export const addToDb = (data) => {
  let shoppingCart = getShoppingCart();

  // Check if the product already exists in the cart
  const isExist = shoppingCart.find(
    (item) => item.productId === data.productId
  );

  if (isExist) {
    // Update the quantity of the existing product
    isExist.quantity += 1;
    isExist.totalPrice = isExist.quantity * isExist.price;
  } else {
    // Add a new product to the cart
    shoppingCart.push({ ...data, quantity: 1, totalPrice: isExist?.price });
  }
  // Save the updated cart back to localStorage
  localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
};

export const removeFromDb = (id) => {
  let shoppingCart = getShoppingCart();
  if (id in shoppingCart) {
    delete shoppingCart[id];
  }
  localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
};
export const removeOneFromDb = (id) => {
  let shoppingCart = getShoppingCart();
  const quantity = shoppingCart[id];
  if (quantity) {
    if (quantity === 1) {
      delete shoppingCart[id];
    } else {
      shoppingCart[id] = quantity - 1;
    }

    // Save the updated shopping cart back to local storage
    localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
  }
};

export const getLocalData = async () => {
  const data = localStorage.getItem("shopping-cart");
  return JSON.parse(data);
};
