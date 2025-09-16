import  { useState } from 'react'


interface CounterData {
    quantity: number,
    customClassName: string,
}
export function Increment({quantity, customClassName}: CounterData) {

  const [counter, setCounter] = useState(quantity);
      
  const increment = () => {
    setCounter(counter + 1);
  };

  const decrement = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };


  return (
    <span className="shadow-inset flex items-center justify-between gap-3 border rounded-full">
            <button
              className={` ${counter > 1 ? 'bg-gray-100 dark:bg-[var(--main-dark)]' : ''} h-[35px] w-[35px] rounded-full flex items-center justify-center text-lg" !${customClassName}`}
              onClick={decrement}
            >
              -
            </button>
            <div className="text-sm">{counter}</div>
            <button
              className=" bg-gray-100 dark:bg-[var(--main-dark)] h-[35px] w-[35px] rounded-full flex items-center justify-center text-lg"
              onClick={increment}
            >
              +
            </button>
          </span>
  )
}
