
export default function validateProduct (product){

    if(!product.name) throw new Error('nombre sin asignar')
    if(!product.description) throw new Error('descripción sin asignar')
    if(!product.price) throw new Error('precio sin asignar')
    if(!product.image) throw new Error('imagen sin asignar')

}