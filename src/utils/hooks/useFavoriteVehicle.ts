import { useRecoilState } from "recoil";
import { cartState } from "../atom/cartAtom";

export const useFavoriteVehicle = () => {
  const [cart, setCart] = useRecoilState(cartState);

  const addVehicleToFavorite = (vehicleId: string) => {
    if (!cart.includes(vehicleId)) {
      setCart([...cart, vehicleId]);
    }
  };

  const removeVehicleFromFavorite = (vehicleId: string) => {
    setCart(cart.filter(id => id !== vehicleId));
  };

  const isFavorite = (vehicleId: string) => {
    return cart.includes(vehicleId);
  };

  return {
    addVehicleToFavorite,
    removeVehicleFromFavorite,
    isFavorite,
    favoriteIds: cart,
  };
};
