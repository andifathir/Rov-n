import React, { useEffect } from 'react';
import { useWishlistStore } from '../Store/Wishlists'; // Update the path to your zustand store
import WishlistsCard from '../components/Wishlists/WishlistsCard';

const Wishlists = () => {
  const { wishlists, fetchWishlists, isLoading, error } = useWishlistStore();

  useEffect(() => {
    fetchWishlists(); // Fetch wishlists when the component mounts
  }, [fetchWishlists]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      style={{
        marginTop: '100px', // Jarak dari navbar
        display: 'flex',
        flexWrap: 'wrap', // Membuat elemen berbaris secara horizontal dan berpindah ke baris baru jika diperlukan
        gap: '16px', // Memberikan jarak antar kartu
        padding: '16px',
        justifyContent: 'center', // Mengatur kartu agar berada di tengah secara horizontal
      }}
    >
      {wishlists.map((wishlist) => (
        <WishlistsCard key={wishlist.wishlist_id} product={wishlist.product} />
      ))}
    </div>
  );
};

export default Wishlists;
