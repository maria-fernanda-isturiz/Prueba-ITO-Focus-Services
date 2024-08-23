// src/api.ts
import { Product } from './types';

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('https://products-api-ten.vercel.app/api');
  
  if (!response.ok) {
    throw new Error('Error en la petición del producto');
  }

  const data: Product[] = await response.json();
  return data;
}
