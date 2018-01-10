//
// !!!!!!!!!!!!!!!!!!!!!!!!
// IMPORTANT
// !!!!!!!!!!!!!!!!!!!!!!!!
// THIS FILE IS SHARED WITH FRONTEND
//
exports.formatProduct = product => {
  const fields = ["id", "name", "price", "image", "type"];
  const formatedProduct = { custom: [], id: 0, price: 0, name: "", image: "" };
  for (const key of Object.keys(product)) {
    const value = product[key];
    if (fields.indexOf(key) >= 0) {
      formatedProduct[key] = value;
    } else {
      formatedProduct.custom.push({ key, value });
    }
  }
  return formatedProduct;
};

exports.formatCurrency = (value = 0) =>
  parseFloat(value)
    .toFixed(2)
    .replace(".", ",") + " лв.";

exports.validateProduct = (dbProducts, product) => {
  // it is delivery
  if (product.type) {
    return true;
  }

  const selectedProduct = dbProducts.filter(({ id }) => id == product.id);
  if (selectedProduct.length !== 1) {
    console.log("product doesn't exists", product);
    return false; // product doesn't exists
  }

  const dbProduct = selectedProduct[0];

  // validate price
  if (dbProduct.price !== product.price) {
    console.log(
      "price of product is different",
      product.price,
      dbProduct.price
    );
    return false; // price of product is different
  }

  //validate custom data
  if (dbProduct.custom) {
    for (let i = 1; i <= dbProduct.custom.number; i++) {
      const customValue = product[dbProduct.custom.label + i];
      if (!customValue || customValue.length > dbProduct.custom.length) {
        console.log("invalida custom value", product, customValue);
        return false; // invalida custom value
      }
    }
  }

  //validate props
  if (dbProduct.props.length > 0) {
    dbProduct.props.forEach(({ label, values }) => {
      const productPropValue = product[label];
      if (values.indexOf(productPropValue) === -1) {
        console.log("invalida property value", product, productPropValue);
        return false; // invalid property value
      }
    });
  }

  return true;
};
