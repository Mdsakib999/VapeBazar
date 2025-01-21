export const getShoppingCart = () => {
  let shoppingCart = [];
  const isStored = localStorage.getItem("shopping-cart");
  if (isStored) {
    shoppingCart = JSON.parse(isStored);
  }
  return shoppingCart;
};
export const deleteDB = () => {
  const isStored = localStorage.getItem("shopping-cart");
  if (isStored) {
    localStorage.removeItem("shopping-cart");
    window.dispatchEvent(new Event("shopping-cart-updated"));
  }
};

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
    shoppingCart.push({ ...data, totalPrice: isExist?.price });
  }
  // Save the updated cart back to localStorage
  localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
  window.dispatchEvent(new Event("shopping-cart-updated"));
};
export const addToDb2 = (data) => {
  let shoppingCart = getShoppingCart();
  // Check if the product already exists in the cart
  const isExist = shoppingCart.find(
    (item) => item.productId === data.productId
  );

  if (isExist) {
    // Update the quantity of the existing product
    isExist.quantity = data?.quantity;
    isExist.totalPrice = isExist.quantity * isExist.price;
  } else {
    // Add a new product to the cart
    shoppingCart.push({ ...data, totalPrice: isExist?.price });
  }
  // Save the updated cart back to localStorage
  localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
  window.dispatchEvent(new Event("shopping-cart-updated"));
};

export const removeFromDb = (data) => {
  let shoppingCart = getShoppingCart();
  shoppingCart = shoppingCart.filter(
    (item) => item.productId !== data.productId
  );
  // Save the updated cart back to localStorage
  localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));

  // Dispatch a custom event to notify listeners
  window.dispatchEvent(new Event("shopping-cart-updated"));
};

export const removeOneFromDb = (data) => {
  // Retrieve the existing shopping cart from localStorage
  let shoppingCart = getShoppingCart();

  // Check if the product exists in the cart
  const isExist = shoppingCart.find(
    (item) => item.productId === data.productId
  );

  if (isExist) {
    if (isExist.quantity > 1) {
      // Decrease quantity and update total price
      isExist.quantity -= 1;
      isExist.totalPrice = isExist.quantity * isExist.price;
    } else {
      // If the quantity is 1, remove the item from the cart
      shoppingCart = shoppingCart.filter(
        (item) => item.productId !== data.productId
      );
    }
  } else {
    console.warn(`Product with ID ${data.productId} not found in the cart.`);
  }

  // Save the updated cart back to localStorage
  localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));

  // Dispatch a custom event to notify listeners
  window.dispatchEvent(new Event("shopping-cart-updated"));
};

// export const getLocalData = async () => {
//   try {
//     // Fetch products using the API query hook
//     const { data, isLoading, error } = useGetAllProductQuery();

//     if (isLoading) {
//       console.log("Loading products...");
//       return [];
//     }

//     if (error) {
//       console.error("Error fetching products:", error);
//       return [];
//     }

//     const products = data?.data || [];
//     const storedCart = getShoppingCart();
//     const saveCart = [];
//     console.log(saveCart);

//     // Map local storage data with the fetched product details
//     for (const id in storedCart) {
//       const matchedProduct = products?.find((pd) => pd._id === id);
//       if (matchedProduct) {
//         const quantity = storedCart[id];
//         matchedProduct.pQuantity = quantity; // Attach quantity to the product
//         saveCart.push(matchedProduct); // Add product to saved cart
//       }
//     }

//     return saveCart;
//   } catch (error) {
//     console.error("Error processing local data:", error);
//     return [];
//   }
// };
