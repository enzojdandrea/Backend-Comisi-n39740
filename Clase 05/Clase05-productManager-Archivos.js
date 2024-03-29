const fs = require('fs')

class productsManage1 {
    id = 1
    constructor() {
        this.products = []
        this.path = 'products.json'
    }

    async loadProdcuts() {
        try {
            const products = await fs.promises.readFile(this.path, 'utf-8')
            if (products.length != 0) {
                this.products = JSON.parse(products)
                const lengt = this.products.length
                this.id = this.products[lengt - 1].id
            }
        } catch (error) {
            const products = await fs.promises.writeFile(this.path, JSON.stringify(this.products))
            console.log(error)
        }

    }

    async addproduct(product) {
        try {
            if (this.products.length != 0) {
                const { code } = product
                const productFind = this.products.find((product) => product.code === code);
                this.id = this.id + 1
                if (productFind) {
                    throw Error("Ya exisiste un producto con ese codigo")
                }
            }
            this.products.push(
                {
                    ...product,
                    id: this.id
                })
            await fs.promises.writeFile(this.path, JSON.stringify(this.products))
            return 'Producto agregado'
        }
        catch (error) {
            console.log(error)
        }
    }

    async getProducts() {
        const products = await fs.promises.readFile(this.path, 'utf-8')
        return JSON.parse(products)
    }

    async getProductsById(id) {
        const products = await fs.promises.readFile(this.path, 'utf-8')
        const productsParse = JSON.parse(products)

        const product = productsParse.find((prod) => prod.id === id);

        if (!product) {
            throw Error(`No existe ningun porducto con ID: ${id}`);
        }
        return product;
    }

    async updateProduct(id, atribute, newData) {
        const products = await fs.promises.readFile(this.path, 'utf-8')
        const productsParse = JSON.parse(products)

        const foundProduct = productsParse.find((prod) => {
            return prod.id === id
        })
        if (!foundProduct) {
            throw Error(`No existe ningun porducto con ID: ${id}`);
        }
        foundProduct[atribute] = newData;

        await fs.promises.writeFile(this.path, JSON.stringify(productsParse))
    }

    async deleteProduct(id) {
        const products = await fs.promises.readFile(this.path, 'utf-8')
        const productsParse = JSON.parse(products)
        const newProducts = productsParse.filter((produ) => produ.id != id)
        await fs.promises.writeFile(this.path, JSON.stringify(newProducts))
    }
}

export default productsManage1;

const main = async () => {
    const productsManager2 = new productsManage1()
    await productsManager2.loadProdcuts()

    await productsManager2.addproduct({
        title: "Jabon Liquido",
        description: "para lavar la ropa",
        priece: 40,
        thumbnail: "Sin Imagen",
        stock: 100,
        code: "abc123"
    })

    console.log("Todos los Prodcutos")
    const products = await productsManager2.getProducts()
    console.log(products)

    console.log("Product By ID")
    const productByID = await productsManager2.getProductsById(1)
    console.log(productByID)

    await productsManager2.updateProduct(1, "description", "Cambiado")
    console.log("Product Cambiado")
    const productCambiado = await productsManager2.getProductsById(1)
    console.log(productCambiado)

    await productsManager2.deleteProduct(2)
    console.log("Todos los Prodcutos menos ID 2")
    const productsDelete = await productsManager2.getProducts()
    console.log(productsDelete)
}

// main()