
const loadAllProduct = async() => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data;
}


// const setAllMenu =  () =>{
//     console.log(loadAllProduct())
//     loadAllProduct()
//     .then(data => console.log(data))
// }

const setAllMenu = async () => {
    const data = await loadAllProduct();
    // console.log(data)

    const allMenu = document.getElementById('all-menu');

    const uniqueArray = [];
    for(const product of data){
        // console.log(product.category)
        if(uniqueArray.indexOf(product.category) === -1){
            uniqueArray.push(product.category);

            const li = document.createElement('li');
            li.innerHTML = `<a>${product.category}</a>`;
            allMenu.appendChild(li)
        }
      
    }
}
setAllMenu()
// loadAllProduct()

const searchField = document.getElementById('search-field')

searchField.addEventListener('keypress', async(event) =>{

    const spinner = document.getElementById('spinner');
    spinner.classList.remove('hidden') 
    // console.log(event.key)
    if(event.key === 'Enter'){
        // console.log(event.target.value)
        // console.log(searchField.value)

        const searchValue = searchField.value;
        const allProducts = await loadAllProduct();
        spinner.classList.add('hidden') 
        // console.log(allProducts)

        const foundProducts = allProducts.filter(product => product.category.includes(searchValue));
        // console.log(foundProduct)

        const productContainer = document.getElementById('products-container');
        const notFound = document.getElementById('not-found');
        notFound.textContent = '';
        productContainer.textContent = ''

        if(foundProducts.length === 0){
            // console.log('not found');
            notFound.innerHTML = `<h2 class="text-2xl text-orange-500 text-center">Not Found</h2>`
            return;
        }


        foundProducts.forEach(product => {
            // console.log(product)
            const {category, image, title, description} = product
            const div = document.createElement('div');
            div.innerHTML = `
                <div class="card card-compact w-full bg-base-100 shadow-xl">
                    <figure><img src="${image}" alt="Shoes" class="h-60 w-full"/></figure>
                    <div class="card-body">
                        <h2 class="card-title">category: ${category}</h2>
                        <p>${title.length > 20 ? title.slice(0, 20) + '...': title}</p>
                        <div class="card-actions justify-end">
                        <label for="my-modal-3" onclick="showModal('${description}', '${image}')" class="btn btn-primary modal-button">Show Details</label>
                        </div>
                    </div>
                </div>
            
            `;

            productContainer.appendChild(div)
        })
    }
})



const showModal = (description, image) => {
    console.log(description, image)

    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML =`
        <p class="py-4">
            ${description}
        </p>
        <img src="${image}" />
    
    `;

}