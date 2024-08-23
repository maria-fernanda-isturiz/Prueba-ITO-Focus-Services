export interface Product {
    id: string;
    name: string;
    preparation_time: number;
    thumbnail: any[];
  }

export interface CartItem extends Product {
	quantity: number
  processingTime: number
}
  