import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import TambahPerfume from '@/components/admin/TambahPerfume';
import  useStore  from '../../src/Store/Sidebar';
import Product from '@/components/admin/Product';
import Order from '@/components/admin/Order';

function AdminDashboard() {
  const selectedComponent = useStore((state) => state.selectedComponent);

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'product':
        return <Product />;
      case 'order':
        return <Order />;
      case 'tambahProduct':
        return <TambahPerfume />;
      default:
        return null;
    }
  };

  return (
    <Flex minH="100vh">
      <AdminSidebar />
      <Box flex="1" p={4} mt={20}>
        {renderComponent()}
      </Box>
    </Flex>
  );
}

export default AdminDashboard;
