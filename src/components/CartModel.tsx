import { useRecoilState } from "recoil";
import { cartState } from "../utils/atom/cartAtom";
import CartSvg from "../assets/icons/cart.svg";
import { useNavigate } from "react-router-dom";
import { Increment } from "./Increment";
import { toast } from "react-toastify";

export default function CartModel() {
  const navigate = useNavigate();
  const [cart, setCart] = useRecoilState(cartState);

  const user: any = {
    // name: 'Sam',
    // role: 'Customer',
    // email: ''
    // role: 'Admin',
  };

  
  const deleteCartItem = (index: any, item: any) => {
    setCart(cart.slice(0, index));
    toast.success(`${item?.name} removed from cart`);
  };

  const cartPage = () => {
    if (user?.email) {
      navigate("/user-cart");
    } else {
      navigate("/cart");
    }
  };
  return (
    <div>
      {cart?.length > 0 ? (
        cart?.slice(0, 3).map((res: any, index: number) => (
          <div
            className="mt-1 space-y-1 rounded-lg border bg-white dark:bg-[var(--sidebar-dark)] px-2"
            key={index}
          >
            <div className="flex flex-col rounded-lg bg-white dark:bg-[var(--sidebar-dark)] sm:flex-row">
              <img
                className=" mt-4 h-14 w-14 rounded-md border object-cover object-center"
                src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
              <div className="flex w-full flex-col px-2 py-2">
                <span className="font-semibold text-xs">{res?.name}</span>
                <p className="text-sm font-bold">${res?.price}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <p className=" text-xs">x {1}</p>
                    <Increment quantity={1} customClassName={"!h-[15px]"} />
                  </div>
                  <i
                    className="pi pi-trash !text-xs p-2 cursor-pointer"
                    onClick={() => deleteCartItem(index, res)}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="w-[28px] h-[28px]">
            <img src={CartSvg} alt="" className=" object-contain w-full" />
          </div>
          <p className="text-sm">Your cart is currently empty</p>
          <button className=" cursor-pointer p-2 border-black border-[1px] rounded-full text-xs hover:bg-black hover:text-white transition-all">
            Get new ticket
          </button>
        </div>
      )}
      <div className="mt-4">
        {cart?.length > 0 ? (
          <button
            onClick={cartPage}
            className=" mx-auto cursor-pointer p-2 px-3 border-black border-[1px] rounded-full text-xs hover:bg-black hover:text-white flex items-center justify-center gap-2 w-fit transition-all"
          >
            <i className="pi pi-shopping-bag"></i> View All
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
