const productList = document.getElementById("productList")
const gridStyle = document.getElementById("gridStyle")
const listStyle = document.getElementById("listStyle")
const loader = document.getElementById("loader")
const searchInput = document.getElementById("searchInput")


listStyle.onclick = () => {
  console.log("list clicked")
  productList.classList.remove("product-grid-container")
  productList.classList.add("product-list-container")
}

gridStyle.onclick = () => {
  console.log("grid clicked")
  productList.classList.remove("product-list-container")
  productList.classList.add("product-grid-container")
}



const createAndAppendProducts = (product) => {
  const { product_image, product_title, product_badge, product_variants } = product

  const productContainer = document.createElement("div")
  productContainer.classList.add("product-container")
  const containerTop = document.createElement("div")
  containerTop.classList.add("top-conbtainer")

  const productBadge = document.createElement("div")
  productBadge.classList.add("product-badge")
  productBadge.textContent = product_badge
  containerTop.appendChild(productBadge)

  const image = document.createElement("img")
  image.classList.add("product-image")
  image.src = "https://res.cloudinary.com/dky69roxl/image/upload/v1704947632/Rectangle_4_umfqt2.png" // product_image is not display due to url error
  image.alt = "product image"
  containerTop.appendChild(image)
  productContainer.appendChild(containerTop)

  const productDetailsContainer = document.createElement("div")
  productDetailsContainer.classList.add("product-details-container")
  const productName = document.createElement("h1")
  productName.classList.add("product-name")
  productName.textContent = product_title
  productDetailsContainer.appendChild(productName)

  for (let variant of product_variants) {
    displayVariantList(variant)
  }

  function displayVariantList(variant) {
    const variantContainer = document.createElement("div")
    variantContainer.classList.add("variant-container")
    const variantDetails = document.createElement("span")
    variantDetails.classList.add("span-text")
    variantDetails.textContent = variant.v1
    variantContainer.appendChild(variantDetails)

    const variantContainerTwo = document.createElement("div")
    variantContainerTwo.classList.add("variant-container")
    const variantDetailsTwo = document.createElement("span")
    variantDetailsTwo.classList.add("span-text")
    variantDetailsTwo.textContent = variant.v2
    variantContainer.appendChild(variantDetailsTwo)

    const variantContainerThree = document.createElement("div")
    variantContainerThree.classList.add("variant-container")
    const variantDetailsThree = document.createElement("span")
    variantDetailsThree.classList.add("span-text")
    variantDetailsThree.textContent = variant.v3
    variantContainer.appendChild(variantDetailsThree)
    productDetailsContainer.appendChild(variantContainer)

    searchInput.addEventListener("input", (e) => {
      console.log(e.target.value === product_title.toLowerCase())
      // variant.map((each, index) => each.v[index].toLowerCase().includes())
      if (e.target.value === product_title.toLowerCase()) {
        productName.style.backgroundColor = "#CCFF78"
        productName.style.padding = "5px"
      }
    })

  }

  productContainer.appendChild(productDetailsContainer)
  productList.appendChild(productContainer)
}

const getProducts = async () => {
  productList.style.display = "none"
  loader.classList.add("loader")
  loader.textContent = "Loading..."
  const response = await fetch("https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093")
  const fetchedData = await response.json()
  loader.textContent = ""
  productList.style.display = "block"
  const data = fetchedData.data
  for (let eachItem of data) {
    createAndAppendProducts(eachItem)
  }
}

getProducts()







