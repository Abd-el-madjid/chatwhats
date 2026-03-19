import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Conversations } from './pages/Conversations';
import { Orders } from './pages/Orders';
import { Products } from './pages/Products';
import { Customers } from './pages/Customers';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/SettingsNew';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: 'conversations', Component: Conversations },
      { path: 'orders', Component: Orders },
      { path: 'products', Component: Products },
      { path: 'customers', Component: Customers },
      { path: 'analytics', Component: Analytics },
      { path: 'settings', Component: Settings },
    ],
  },
]);