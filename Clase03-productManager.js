class productsManager {
    idAuto = 1;
    constructor() {
        this.products = [];
    }

    addproduct(product) {
        const { code } = product;
        const productFind = this.products.find((product) => product.code === code);

        if (productFind) {
            throw Error(`Ya existe un producto con el codigo: ${code}`);;
        }
        this.products.push({
            ...product,
            id: this.idAuto,
        });
        this.idAuto = this.idAuto + 1;
    };

    getAllProducts() {
        return this.products;
    };

    getProductById(id) {
        const product = this.products.find((prod) => prod.id === id);
        if (!product) {
            throw Error(`No existe nincun porducto con ID: ${id}`);
        }
        return product;
    }
    getProductByCode(code) {
        const product = this.products.find((prod) => prod.code === code);
        if (!product) {
            throw Error(`No existe nincun porducto con CODE: ${code}`);
        }
        return product;
    }
}

const productsManager1 = new productsManager;

productsManager1.addproduct({
    title: "Jabon Liquido",
    description: "para lavar la ropa",
    priece: 40,
    thumbnail: "Sin Imagen",
    code: "abc123",
    stock: 100
});
productsManager1.addproduct({
    title: "Jabon En Polvo",
    description: "para lavar la ropa",
    priece: 40,
    thumbnail: "Sin Imagen",
    code: "abc124",
    stock: 100
});
productsManager1.addproduct({
    title: "Lavandina",
    description: "para limpiar",
    priece: 50,
    thumbnail: "Sin Imagen",
    code: "abc126",
    stock: 100
});


console.log("Todos los Productos");
console.log(productsManager1.getAllProducts());;
console.log("Porducto By ID");
console.log(productsManager1.getProductById(3));
console.log("Porducto By Code");
console.log(productsManager1.getProductByCode("abc124"));