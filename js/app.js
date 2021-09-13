// load all products 
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.classList.add("pb-2");
    div.innerHTML = `
    <div class="card h-100 border border-light shadow-lg mx-1">        
      <div class="card-body">
        <div class="pb-3">
          <img class="product-image" src=${image}></img>
        </div>
        <div class="single-product text-start">  
          <h3 class="pb-2">${product.title}</h3>
          <p><span class="text-dark fw-bolder">Category:</span> ${product.category}</p>
          <p><span class="text-dark fw-bolder">Rating:</span><span class="text-danger fw-bolder"> ${product.rating.rate}</span>  from <span class="text-danger fw-bolder"> ${product.rating.count}</span> votes</p>                      
        </div>
      </div>
      <div class="px-4 text-start">
        <h2>Price: $ ${product.price}</h2> 
      </div>
      <div class="card-footer py-3 d-flex justify-content-between">
        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-danger">Add to cart</button>
        <button id="details-btn" class="btn btn-dark text-end px-4">Details</button>
      </div>
    </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// converted input value into float 
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  // add delivery charge and tax into cart 
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    (getInputValue("price") + getInputValue("delivery-charge") +
      getInputValue("total-tax")).toFixed(2);
  document.getElementById("total").innerText = grandTotal;
};

let count = 0;
// add value to cart 
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};
