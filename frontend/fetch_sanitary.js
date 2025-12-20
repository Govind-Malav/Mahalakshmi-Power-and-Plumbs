async function getProducts() {
    try {
        const res = await fetch('http://localhost:5000/api/products?category=sanitary');
        const data = await res.json();
        data.products.forEach(p => console.log(`${p.name} | ${p.price}`));
    } catch (err) {
        console.error(err);
    }
}

getProducts();
