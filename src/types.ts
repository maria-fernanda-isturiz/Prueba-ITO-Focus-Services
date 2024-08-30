export interface Product {
    id: string;
    name: string;
    preparation_time: number;
    thumbnail: string;
    uniqueKey: string;
  }

export interface CartItem extends Product {
  id: string
	quantity: number
  processingTime: number
}
  