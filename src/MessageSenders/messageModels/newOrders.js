import config from "../../../config.js"

const formatNewOrder = {

    adminEmail : (user,purchaseOrder)=>{
        return  {
            to: config.nodemailerUser,
            subject: 'Nueva Orden de Compra',
            message: `<h2>Se ha registrado una nueva compra con id: ${purchaseOrder.id}</h2>
                    <h3>para : ${user.email}</h3>
                    <h3>La compra consta de :</h3>
                    <div>${purchaseOrder.products.map(product=> `<div>${`${product.name} - id: ${product.id}- cantidad: ${product.qty}`}</div>`)}</div>`
        }
    },
    clientEmail : (user,purchaseOrder)=>{
        return  {
            to: user.email,
            subject: 'Gracias por tu Compra!',
            message: `<h2>Hemos recibido tu pedido con id: ${purchaseOrder.id}</h2>
                    <h3>Usuario : ${user.email}</h3>
                    <h3>La compra consta de :</h3>
                    <div>${purchaseOrder.products.map(product=>
                        `<div>${`${product.name}- id: ${product.id}- cantidad: ${product.qty}`}</div>`)}
                    </div>`
        }
    }
}
export default formatNewOrder