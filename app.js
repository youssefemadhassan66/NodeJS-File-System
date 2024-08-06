const fs = require('fs').promises;
const path = 'products.json';
let listOfProducts = []; 
async function readProducts() {
    try {
        let data = await fs.readFile(path, 'utf-8');
        listOfProducts = JSON.parse(data);
        return listOfProducts;
    } catch (err) {
        console.log(err);
    }
}

async function addProduct(Product) {
    try {
        if (Product) {
            await readProducts();
            listOfProducts.push(Product);
            await fs.writeFile(path, JSON.stringify(listOfProducts));
            console.log(listOfProducts);
        } else {
            console.log("Product is empty");
        }
    } catch (err) {
        console.log(err);
    }
}

async function deleteProduct(product_id) {
    try {
        if (product_id) {
            await readProducts();
            const index = listOfProducts.findIndex(product => product.id === product_id);
            if (index !== -1) {
                listOfProducts.splice(index, 1);
                await fs.writeFile(path, JSON.stringify(listOfProducts));
                console.log("Products after delete", listOfProducts);
            } else {
                console.log("Product not found");
            }
        }
    } catch (err) {
        console.log(err);
    }
}


async function editProduct(Product_id,productName,productPrice){  
    try{
        await readProducts();
        if(Product_id && productName && productPrice){        
            listOfProducts = listOfProducts.map((product => {
                if (product.id === Product_id) {
                    return { ...product, name: productName ,price :productPrice};
                }
                return product;
            }));
            await fs.writeFile(path,JSON.stringify(listOfProducts));
            console.log(listOfProducts);}
        else{
            console.log("Please enter all parameters for the function");
        } 
    }catch(err){
        console.log(err);
    } 
}

