// import { useState } from "react";
// import { Slider } from "primereact/slider";

// export default function PriceRange({ min, max, updatedFilters, minKey, maxKey }: any) {
//   const [range, setRange] = useState<any>([min, max]);

//   return (
//     <div className="w-full max-w-md mx-auto py-4 p-2 pr-5 bg-white rounded-xl shadow">
//       <Slider
//         value={[min, max]}
//         onChange={(e) => {
//           setRange(e.value);
//           console.log("e.value", e.value);
//         }}
//         // onChange={(e) => updatedFilters([minKey, maxKey], e.value)}

//         range={true}
//         //  max={range[1]}
//         //  unstyled

//         className="w-full "
//       />

//       <div className="flex justify-between mt-3">
//         <input
//           value={range[0]}
//           onChange={(e) => {setRange([e.target.value, range[1]]);}}
//           className="border-[2px] p-1 text-center border-green-400 w-10 rounded text-sm text-gray-500"
//         />
//         <input
//           value={range[1]}
//           onChange={(e) => {setRange([range[0], e.target.value]);}}
//           className="border-[2px] p-1 text-center border-green-400 w-10 rounded text-sm text-gray-500"
//         />

//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { Slider } from "primereact/slider";

export default function PriceRange({
  min = 0,
  max = 1000,
  updatedFilters,
  minKey,
  maxKey
}: any) {

  const [range, setRange] = useState<any>([min, max]);

  // Sync internal state when parent changes (optional)
  useEffect(() => {
    setRange([min, max]);
  }, [min, max]);

  const handleRangeChange = (newRange: any) => {
    setRange(newRange);
    // console.log('minKey', minKey, newRange[0])
    // console.log('maxKey', maxKey, newRange[1])
    // Send values back to parent
    updatedFilters(minKey, newRange[0]);
    updatedFilters(maxKey, newRange[1]);
  };

  return (
    <div className="w-full py-3 px-2 bg-white rounded-xl shadow">
      <Slider
        value={range}
        onChange={(e) => handleRangeChange(e.value)}
        range
        className="w-full"
      />

      <div className="flex justify-between mt-3 gap-2">
        {/* Min Input */}
        <input
          type="number"
          value={range[0]}
          onChange={(e) => {
            const val = Number(e.target.value);
            const updated = [val, range[1]];
            handleRangeChange(updated);
          }}
          className="border p-1 w-16 text-center rounded text-sm text-gray-500"
        />

        {/* Max Input */}
        <input
          type="number"
          value={range[1]}
          onChange={(e) => {
            const val = Number(e.target.value);
            const updated = [range[0], val];
            handleRangeChange(updated);
          }}
          className="border p-1 w-16 text-center rounded text-sm text-gray-500"
        />
      </div>
    </div>
  );
}
