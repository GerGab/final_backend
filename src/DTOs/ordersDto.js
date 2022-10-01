export default class OrdersDto {
    constructor({id, date, clientId, products}) {
        this.id = id
        this.date = date;
        this.clientId = clientId;
        this.products = products;
    }
  }