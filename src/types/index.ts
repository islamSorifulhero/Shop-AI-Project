export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  images?: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  brand: string;
  tags?: string[];
  featured?: boolean;
  createdAt?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'user' | 'admin';
  phone?: string;
  address?: string;
  createdAt?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: string;
  createdAt: string;
  updatedAt?: string;
  paymentMethod: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  date: string;
  readTime: string;
}
