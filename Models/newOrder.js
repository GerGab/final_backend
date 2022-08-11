import config from "../config.js"

export const formatNewOrder = {

    email : (purchaseOrder)=>{
        return  {
            to: config.nodemailerUser,
            subject: 'Nueva Orden de Compra',
            message: `<h2>Se ha registrado una nueva compra con id: ${purchaseOrder.id}</h2>
                    <h3>para : ${purchaseOrder.user}</h3>
                    <h3>La compra consta de :</h3>
                    <div>${purchaseOrder.products.map(product=> `<div>${product.name}</div>`)}</div>`
        }
    },

    wsp : (purchaseOrder)=>{
        return {
            number: `whatsapp:${config.smsAdmin}`,
            text: `Your Ecommerce  order  ${purchase.id} has shipped and should be delivered on July 10, 2019. Details: http://www.falseecommerce.com/`
        }
    },

    sms : (purchaseOrder)=>{
        return {
            number: config.smsAdmin,
            text: `Felicitaciones tu compra ha sido registrada con id : ${purchaseOrder.id}, en breve recibiras los productos!`
        }
    }

}