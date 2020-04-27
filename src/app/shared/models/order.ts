export class Order {
  datePlaced: number;
  isDeliver: boolean;
  isDone: boolean;
  items: any[];

  constructor(public userId: string, public shipping: any, shoppingCart: any) {
    this.datePlaced = new Date().getTime();
    this.isDeliver = false;
    this.isDone = false;
    this.items = shoppingCart.map(item => {
      return {
        product: {
          title: item.product.title,
          imageUrl: item.product.imageUrl,
          price: item.product.price,
        },
        quantity: item.quantity,
        totalPrice: item.product.price * item.quantity
      };
    });
  }
}
