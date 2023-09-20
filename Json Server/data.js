module.exports = ()=>{
    const data = {
        products: []
    }
    for(let i=0; i<100; i++){
        const product = {
            id: i,
            title: ` product ${i}`
        }
        data.products.push(product)
    }
    return data;
}