export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
  image?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  balance: number;
  totalOrders: number;
  lastContact: string;
  type: 'retail' | 'wholesale';
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  products: { productId: string; productName: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  createdAt: string;
  source: 'whatsapp' | 'erp' | 'web';
}

export interface Message {
  id: string;
  conversationId: string;
  sender: 'customer' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  type: 'text' | 'order' | 'invoice' | 'notification';
}

export interface Conversation {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  status: 'active' | 'resolved';
}

export interface Analytics {
  period: string;
  whatsappOrders: number;
  totalOrders: number;
  revenue: number;
  avgResponseTime: number;
  customerSatisfaction: number;
}
