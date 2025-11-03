import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFavoriteVehicle } from "../utils/hooks/useFavoriteVehicle";



const SimilarVehicle = ({ car }: any) => {
  const navigate = useNavigate()
  const { addVehicleToFavorite, removeVehicleFromFavorite, isFavorite } =
    useFavoriteVehicle();

  const carId = () => {
    const id = typeof car?.id === "string" ? car?.id : String(car?.id);
    return id;
  };

  const handleFavorite = () => {
    if (isFavorite(carId())) {
      removeVehicleFromFavorite(carId());
      toast.info("Removed from favorite");
    } else {
      addVehicleToFavorite(carId());
      toast.success("Added to favorite");
    }
  };
  return (
    <div className="border-b border-gray-200 pb-4 last:border-0 last:pb-0 grid grid-cols-[3fr_9fr] gap-3">
      <div className="">
        <img src={car?.first_image} className="rounded" alt="" />
      </div>
      <div className="">
        <h3 className="font-semibold text-charcoal">{car?.model}</h3>
        <p className="text-gray-600 text-sm mb-1">{car?.mileage}</p>
        <p className="text-primary-blue font-bold">
          #{parseInt(car?.price).toLocaleString()}
        </p>
        <div className=" flex items-center gap-3">
          <button
            onClick={()=>navigate(`/product/${car?.id}/${car?.year}-${car?.make}-${car?.model}`)}
            className=" text-white bg-green-600 p-2 rounded hover:underline text-sm font-medium"
          >
            View Details
          </button>
          <i
                    onClick={handleFavorite}

            className={` p-2 cursor-pointer text-orange-600 pi ${
              isFavorite(carId()) ? "pi-heart-fill" : "pi-heart"
            } `}
          ></i>
        </div>
      </div>
    </div>
  );

  // <p>Similaring carrs</p>
};

export default SimilarVehicle;