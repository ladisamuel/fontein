import { useEffect, useRef, useState } from "react";
import { getMake, searchVehiclesAPI } from "../utils/api/products";
import { MultiSelect } from "primereact/multiselect";
import { InputText } from "primereact/inputtext";
import searchData from "../utils/searchTerms.json";
import { separateTexts } from "../utils/generals";
import { parseQueryString, toQueryString } from "../utils/toQueryString";
import { toast } from "react-toastify";

interface Make {
  id: number;
  name: string;
}

const AdvancedSearch = ({ custom_function, closeModel }: any) => {
  const [selectedFilters, setSelectedFilters] = useState<any>({});
  const [selectedFilterValue, setSelectedFilterValue] = useState<any>({});
  const [makes, setMakes] = useState<Make[]>([]);

  const [modelData, setModelData] = useState<any>([]);
  const [loadingData, setLoadingData] = useState<any>("");
  const [loading, setLoading] = useState<any>(false);

  const handleFilterChange = (keyItem: any, value: any) => {
    console.log("handlefilterchange", keyItem, value.toString(), typeof value);
    if (typeof value === "number") {
      value = value.toString();
    }
    console.log(typeof value);
    console.log(value ? "yes" : "no");

    if (value || value.length) {
      console.log("there are values", keyItem, value, value.length);
      setSelectedFilters((prevState: any) => ({
        ...prevState,
        [keyItem]: value,
      }));
    } else {
      console.log("no values at all", keyItem, value, value.length);
      const newQuery = selectedFilters;
      delete newQuery?.[keyItem];
      setSelectedFilters((prevState: any) => ({
        ...prevState,
      }));
    }
  };

  const handleSubmit = () => {
    console.log("SelectedFilters", selectedFilters);
    console.log("selectedFilterValue", selectedFilterValue);
    searchVehicles();
    closeModel(false);
  };

  const searchVehicles = useRef(
    debounce(async () => {
      // const searchVehicles = async () => {

        setLoading(true);
        setLoadingData(true);

        const query: any = { search: new Object(selectedFilters) };

        const x = query.search;
        console.log("x", x);
        console.log("selectedFilters", selectedFilters);

        if (x?.price_min) {
          console.log("there is price_min");
          query.search = { ...query.search, price_min: [x.price_min] };
        }
        if (x?.price_max) {
          console.log("there is price_maxx");
          query.search = { ...query.search, price_max: [x.price_max] };
        }

        if (x?.mileage_max) {
          query.search = { ...query.search, mileage_max: [x.mileage_max] };
          console.log("query mileage_max", query);
        }

        if (x?.mileage_min) {
          console.log("there is mileage_minNN", [x.mileage_min]);
          query.search = { ...query.search, mileage_min: [x.mileage_min] };
          console.log("query mileage_minNN", query);
        }
        if (x?.color) {
          console.log("there is color");
          query.search = { ...query.search, color: [x?.color] };
        }
        if (x.year_min) {
          console.log("there is year_min");
          query.search = { ...query.search, year_min: [x.year_min] };
        }

        if (x.year_max) {
          console.log("there is year_max");
          query.search = { ...query.search, year_max: [x.year_max] };
        }
        console.log("query", query);
        query.search = toQueryString(query.search);

        const newurl =
          window.location.protocol +
          "//" +
          window.location.host +
          window.location.pathname +
          "?" +
          query.search;
        window.history.pushState({ path: newurl }, "", newurl);

        // console.log( search.slice(1,  search.length));

        await searchVehiclesAPI(
          query.search.slice(0, query.search.length)
        ).then((res) => {
          custom_function(res?.data?.results);
        });
        // })

        setLoading(false);
        setLoadingData(false);
      
    }, 2000)
  ).current;
 

  const getFilterTemplate = (placeholder: string) => (options: any) => {
    const { filterOptions } = options;
    // console.log("placeholder", placeholder);
    return (
      <div className="px-5 p-multiselect-filter-container">
        <div className="p-input-icon-right w-full">
          <input
            value={selectedFilterValue[placeholder]}
            onChange={(e) => {
              filterOptions.filter(e);
              setSelectedFilterValue({
                ...selectedFilterValue,
                [placeholder]: e.target.value,
              });
              if (placeholder === "model" && selectedFilters?.make) {
                // console.log('targets', e.target.value)
                fetchModel(e.target.value);
              }
            }}
            className="w-full m-auto !text-gray-800 focus:outline-none bg-gray500 bg-white text-xs p-2 my-2 rounded-2xl "
            placeholder={
              placeholder == "Designation"
                ? `Please enter "Job Title" or "Keyword"`
                : `Search ${separateTexts(placeholder)}...`
            }
          />
        </div>
      </div>
    );
  };

  const selectedItemTemplate = (item: any, key: string) => {
    return selectedFilters[key]?.length ? (
      <div className="">
        <div className="m-1 bg-green-100 text-green-700 flex items-center justify-center gap-3  w-fit text-[11px] p1 px-3 py-0.5 rounded-full ">
          {separateTexts(item)}
        </div>
      </div>
    ) : (
      <div className="">
        {/* {creditInfo?.subscriptionType === "FREE" &&
        (key === "orgSize" || key === "orgIndustry") ? (
          <span className="text-gray-700">Upgrade Account</span>
        ) : ( */}
        {`Select ${
          key === "orgSize"
            ? "Organization Size"
            : key === "orgIndustry"
            ? "Organization Industry"
            : separateTexts(key)
        }`}
        {/* )} */}
      </div>
    );
  };

  // Handle input changes with TypeScript-safe event typing

  const handleReset = () => {
    setSelectedFilters({});
  };

  // no more CORS error,it has been fixed
  const fetchMakes = async () => {
    try {
      const response = await getMake();
      const data = response?.data?.results || [];

      // setMakes(data);
      setMakes(data.map((item: any) => item.name));

      const query = { search: "" };

      query.search = window.location.search;

      const currentFilters = parseQueryString(window.location.search);
      setSelectedFilters(currentFilters);
    } catch (error) {
      toast.error("Try again.");
    }
  };

  const fetchModel = async (item?: any) => {
    const payload = {
      model: [item],
      make: selectedFilters.make,
    };
    // console.log("item", item);
    // console.log("selectedFilters", selectedFilters.make);
    // await getModels(payload).then((res) => {
    //   console.log("response for model", res);
    // });

    // await searchVehiclesAPI(query.search.slice(0, query.search.length)).then(
    //   (res) => {
    //     custom_function(res?.data?.results);
    //   }
    // );

    const query = { search: "" };
    query.search = toQueryString(payload);
    console.log("query", query);
    await searchVehiclesAPI(query.search.slice(0, query.search.length)).then(
      (res) => {
        const data = res?.data?.results || [];

        const newData = data.map((item: any) => item?.model);

        const dataInfor = [...modelData, ...newData];
        const unique = Array.from(new Set(dataInfor));

        setModelData(unique);
      }
    );
  };

  useEffect(() => {
    fetchMakes();
    // setSelectedFilters({...selectedFilters, mileage_min:0, mileage_max:100})
  }, []);

  return (
    <div className="mx-2 my-3 p-2 sm:p-2">
      {/* <p className="text-gray-500 mb-3 text-sm ">
        Refine by detailed specs, condition, sellers, and more
      </p> */}

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Make filter */}
        <div className="card mb-2 flex flex-col justify-content-center">
          <h4 className=" text-gray-400 text-xs flex items-start gap-3  mb-1">
            Manufacturer
            {selectedFilters["make"]?.length ? (
              <span className="text-xs py-1 px-2 text-gray-700 font-bold bg-green-300 rounded-full">
                {selectedFilters["make"].length}
              </span>
            ) : (
              ""
            )}{" "}
          </h4>

          <MultiSelect
            value={selectedFilters["make"]}
            options={makes}
            onChange={(e) => handleFilterChange("make", e.value)}
            loading={loadingData === "make" && loading}
            filter
            required
            style={{
              minWidth: "100%",
            }}
            emptyMessage={
              loadingData === "make" ? "Data Loading..." : "Search for more..."
            }
            emptyFilterMessage={
              loadingData === "make" ? (
                <div className="text-xs text-center p-2 flex items-center gap-2 justify-center">
                  <i className="pi pi-spin pi-refresh"></i> Data Loading...
                </div>
              ) : (
                <div className="text-xs text-center p-2 flex justify-center items-center gap-2 ">
                  No result
                </div>
              )
            }
            filterPlaceholder="Search.."
            placeholder={`Select ${"Make"}`}
            display="chip"
            filterTemplate={getFilterTemplate("Make")}
            selectedItemTemplate={(e) => selectedItemTemplate(e, "make")}
            itemClassName="text-xs text-green-800 flex flex-wrap w-[100%] items-center gap-2  bg-green-50 border-b border-b-green-200 p-2 "
            // virtualScrollerOptions={{ itemSize: 43 }}
            className={` p-multiselect p-checkbox-box  w-full max-h-[50px] max-w-[100px] ${
              selectedFilters["make"]?.length > 0 ? "flex flex-wrap " : ""
            } overflow-auto  text-sm hover:shadow shadow-3xl border-2 border-gray-300 hover:border-gray-300 p-2 md:w-20rem  custom-checkbox-multiselect`}
          />
        </div>

        {/* Model filter */}
        <div className="card mb-2 flex flex-col justify-content-center">
          <h4 className=" text-gray-400 text-xs flex items-start gap-3 mb-1">
            Model{" "}
            {selectedFilters["model"]?.length ? (
              <span className="text-xs py-1 px-2 text-gray-700 font-bold bg-green-300 rounded-full">
                {selectedFilters["model"].length}
              </span>
            ) : (
              ""
            )}{" "}
          </h4>

          <MultiSelect
            value={selectedFilters["model"]}
            options={modelData}
            onChange={(e) => handleFilterChange("model", e.value)}
            loading={loadingData === "model" && loading}
            filter
            style={{
              minWidth: "100%",
            }}
            emptyMessage={
              loadingData === "model" ? "Data Loading..." : "Search for more..."
              // : <p className="p-2 text-center text-sm">Search for more...</p>
            }
            emptyFilterMessage={
              loadingData === "Model" ? (
                <div className="text-xs text-center p-2 flex items-center gap-2 justify-center">
                  <i className="pi pi-spin pi-refresh"></i> Data Loading...
                </div>
              ) : (
                <div className="text-xs text-center p-2 flex justify-center items-center gap-2 ">
                  No result
                </div>
              )
            }
            filterPlaceholder="Search.."
            placeholder={`Select ${"model"}`}
            display="chip"
            filterTemplate={getFilterTemplate("model")}
            disabled={
              selectedFilters?.make === undefined ||
              selectedFilters?.make?.length === 0
            }
            selectedItemTemplate={(e) => selectedItemTemplate(e, "model")}
            itemClassName="text-xs text-green-800 flex flex-wrap w-[100%] items-center gap-2  bg-green-50 border-b border-b-green-200 p-2 "
            // virtualScrollerOptions={{ itemSize: 43 }}
            className={` p-multiselect p-checkbox-box  w-full max-h-[50px] max-w-[100px] ${
              selectedFilters["model"]?.length > 0 ? "flex flex-wrap " : ""
            } overflow-auto  text-sm hover:shadow shadow-3xl border-2 border-gray-300 hover:border-gray-300 p-2 md:w-20rem  custom-checkbox-multiselect`}
          />
          {selectedFilters?.make === undefined ||
          selectedFilters?.make?.length === 0 ? (
            <p className="text-xs text-red-400 py-1 ">Select manufacturer</p>
          ) : (
            ""
          )}
        </div>

        {/* Price Range */}
        <div className="">
          <h4 className=" text-gray-400 text-xs flex items-start gap-3 mb-1">
            Price Range
          </h4>

          <div className="flex items-center justify-between gap-5">
            {/* Price Min */}

            <InputText
              type="text"
              name="price_min"
              value={selectedFilters["price_min"]}
              onChange={(e) => handleFilterChange("price_min", e.target.value)}
              placeholder="Min"
              className="input-style border shadow shadow-3xl border-gray-300 rounded p-2 w-full text-sm focus:outline-none"
            />
            <i>-</i>
            {/* Price Max */}
            <InputText
              type="text"
              name="price_max"
              value={selectedFilters["price_max"]}
              onChange={(e) => handleFilterChange("price_max", e.target.value)}
              placeholder="Max"
              className="input-style border shadow shadow-3xl border-gray-300 rounded p-2 w-full text-sm focus:outline-none"
            />
          </div>

          {/* <PriceRange 
          min={selectedFilters?.price_min || 0} 
          max={selectedFilters?.price_max || 100} 
          minKey={'price_min'}  
          maxKey={'price_max'} 
          updatedFilters={handleFilterChange} /> */}
        </div>

        {/* Mileage Range */}
        <div className="">
          <h4 className=" text-gray-400 text-xs flex items-start gap-3 mb-1">
            Mileage
          </h4>

          <div className="flex items-center justify-between gap-5">
            {/* Mileage Min */}
            <InputText
              type="text"
              name="mileage_min"
              value={selectedFilters["mileage_min"]}
              onChange={(e) =>
                handleFilterChange("mileage_min", e.target.value)
              }
              placeholder="Min"
              className="input-style border shadow shadow-3xl border-gray-300 rounded p-2 w-full text-sm focus:outline-none"
            />
            <i>-</i>
            {/* Mileage Max */}
            <InputText
              type="text"
              name="mileage_max"
              value={selectedFilters["mileage_max"]}
              onChange={(e) =>
                handleFilterChange("mileage_max", e.target.value)
              }
              placeholder="Max"
              className="input-style border shadow shadow-3xl border-gray-300 rounded p-2 w-full text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Year Min */}
        <div className="">
          <h4 className=" text-gray-400 text-xs flex items-start gap-3 mb-1">
            Year{" "}
          </h4>

          <div className="flex items-center justify-between gap-5">
            <InputText
              type="text"
              name="year_min"
              // value={selectedFilters["model"]}
              value={selectedFilters["year_min"]}
              onChange={(e) => handleFilterChange("year_min", e.target.value)}
              placeholder="Min"
              className="input-style border shadow shadow-3xl border-gray-300 rounded p-2 w-full text-sm focus:outline-none"
            />
            <i>-</i>
            {/* Year Max */}
            <InputText
              type="text"
              name="year_max"
              value={selectedFilters["year_max"]}
              onChange={(e) => handleFilterChange("year_max", e.target.value)}
              placeholder="Max"
              className="input-style border shadow shadow-3xl border-gray-300 rounded p-2 w-full text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Color */}
        <div className="">
          <h4 className=" text-gray-400 text-xs flex items-start gap-3 mb-1">
            Color{" "}
            {selectedFilters["color"]?.length ? (
              <span className="text-xs py-1 px-2 text-gray-700 font-bold bg-green-300 rounded-full">
                {selectedFilters["color"].length}
              </span>
            ) : (
              ""
            )}{" "}
          </h4>

          <InputText
            type="text"
            name="color"
            onChange={(e) => handleFilterChange("color", e.target.value)}
            // placeholder="Exterior / Interior"
            value={selectedFilters["color"]}
            // className="border border-gray-300 rounded p-2 w-full text-sm focus:outline-none"
            className="input-style border shadow shadow-3xl border-gray-300 rounded p-2 w-full text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Fuel Type, Engine and Color are also on same place  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2 ">
        {/* Body Type */}
        <div className="card mb-2 flex flex-col justify-content-center">
          <h4 className=" text-gray-400 text-xs flex items-start gap-3 mb-1">
            Body Type{" "}
            {selectedFilters["body_type"]?.length ? (
              <span className="text-xs py-1 px-2 text-gray-700 font-bold bg-green-300 rounded-full">
                {selectedFilters["body_type"].length}
              </span>
            ) : (
              ""
            )}{" "}
          </h4>

          <MultiSelect
            value={selectedFilters["body_type"]}
            options={searchData.body_type}
            onChange={(e) => handleFilterChange("body_type", e.value)}
            loading={loadingData === "body_type" && loading}
            filter
            style={{
              minWidth: "100%",
            }}
            emptyMessage={
              loadingData === "body_type"
                ? "Data Loading..."
                : "Search for more..."
              // : <p className="p-2 text-center text-sm">Search for more...</p>
            }
            emptyFilterMessage={
              loadingData === "body_type" ? (
                <div className="text-xs text-center p-2 flex items-center gap-2 justify-center">
                  <i className="pi pi-spin pi-refresh"></i> Data Loading...
                </div>
              ) : (
                <div className="text-xs text-center p-2 flex justify-center items-center gap-2 ">
                  No result
                </div>
              )
            }
            filterPlaceholder="Search.."
            // placeholder={`Select ${"Body Type"}`}
            display="chip"
            filterTemplate={getFilterTemplate("body_type")}
            selectedItemTemplate={(e) => selectedItemTemplate(e, "body_type")}
            itemClassName="text-xs text-green-800 flex flex-wrap w-[100%] items-center gap-2  bg-green-50 border-b border-b-green-200 p-2 "
            // virtualScrollerOptions={{ itemSize: 43 }}
            className={` p-multiselect p-checkbox-box  w-full max-h-[50px] max-w-[100px] ${
              selectedFilters["Model"]?.length > 0 ? "flex flex-wrap " : ""
            } overflow-auto  text-sm hover:shadow shadow-3xl border-2 border-gray-300 hover:border-gray-300 p-2 md:w-20rem  custom-checkbox-multiselect`}
          />
        </div>

        {/* Transmission */}
        <div className="card mb-2 flex flex-col justify-content-center">
          <h4 className=" text-gray-400 text-xs flex items-start gap-3 mb-1">
            Transmission{" "}
            {selectedFilters["transmission"]?.length ? (
              <span className="text-xs py-1 px-2 text-gray-700 font-bold bg-green-300 rounded-full">
                {selectedFilters["transmission"].length}
              </span>
            ) : (
              ""
            )}{" "}
          </h4>

          <MultiSelect
            value={selectedFilters["transmission"]}
            options={searchData.filters.transmission}
            onChange={(e) => handleFilterChange("transmission", e.value)}
            loading={loadingData === "transmission" && loading}
            filter
            style={{
              minWidth: "100%",
            }}
            emptyMessage={
              loadingData === "transmission"
                ? "Data Loading..."
                : "Search for more..."
              // : <p className="p-2 text-center text-sm">Search for more...</p>
            }
            emptyFilterMessage={
              loadingData === "transmission" ? (
                <div className="text-xs text-center p-2 flex items-center gap-2 justify-center">
                  <i className="pi pi-spin pi-refresh"></i> Data Loading...
                </div>
              ) : (
                <div className="text-xs text-center p-2 flex justify-center items-center gap-2 ">
                  No result
                </div>
              )
            }
            filterPlaceholder="Search.."
            // placeholder='Enter transmission'
            display="chip"
            filterTemplate={getFilterTemplate("transmission")}
            selectedItemTemplate={(e) =>
              selectedItemTemplate(e, "transmission")
            }
            itemClassName="text-xs text-green-800 flex flex-wrap w-[100%] items-center gap-2  bg-green-50 border-b border-b-green-200 p-2 "
            // virtualScrollerOptions={{ itemSize: 43 }}
            className={` w-full max-h-[50px] max-w-[100px] ${
              selectedFilters["transmission"]?.length > 0
                ? "flex flex-wrap "
                : ""
            } overflow-auto  text-sm shadow border border-gray-300 hover:border-gray-300 p-2 md:w-20rem  `}
          />
        </div>

        {/* Fuel Type */}
        <div className="card mb-2 flex flex-col justify-content-center">
          <h4 className=" text-gray-400 text-xs flex items-start gap-3 mb-1">
            Fuel Type{" "}
            {selectedFilters["fuel_type"]?.length ? (
              <span className="text-xs py-1 px-2 text-gray-700 font-bold bg-green-300 rounded-full">
                {selectedFilters["fuel_type"].length}
              </span>
            ) : (
              ""
            )}{" "}
          </h4>

          <MultiSelect
            value={selectedFilters["fuel_type"]}
            options={searchData.filters.fuel_type}
            onChange={(e) => handleFilterChange("fuel_type", e.value)}
            loading={loadingData === "fuel_type" && loading}
            filter
            style={{
              minWidth: "100%",
            }}
            emptyMessage={
              loadingData === "fuel_type"
                ? "Data Loading..."
                : "Search for more..."
              // : <p className="p-2 text-center text-sm">Search for more...</p>
            }
            emptyFilterMessage={
              loadingData === "fuel_type" ? (
                <div className="text-xs text-center p-2 flex items-center gap-2 justify-center">
                  <i className="pi pi-spin pi-refresh"></i> Data Loading...
                </div>
              ) : (
                <div className="text-xs text-center p-2 flex justify-center items-center gap-2 ">
                  No result
                </div>
              )
            }
            filterPlaceholder="Search.."
            // placeholder={`Select ${"Body Type"}`}
            display="chip"
            filterTemplate={getFilterTemplate("fuel_type")}
            selectedItemTemplate={(e) => selectedItemTemplate(e, "fuel_type")}
            itemClassName="text-xs text-green-800 flex flex-wrap w-[100%] items-center gap-2  bg-green-50 border-b border-b-green-200 p-2 "
            // virtualScrollerOptions={{ itemSize: 43 }}
            className={` p-multiselect p-checkbox-box  w-full max-h-[50px] max-w-[100px] ${
              selectedFilters["fuel_type"]?.length > 0 ? "flex flex-wrap " : ""
            } overflow-auto  text-sm hover:shadow shadow-3xl border-2 border-gray-300 hover:border-gray-300 p-2 md:w-20rem  custom-checkbox-multiselect`}
          />
        </div>

        {/* Transmission */}
        <div className="card mb-2 flex flex-col justify-content-center">
          <h4 className=" text-gray-400 text-xs flex items-start gap-3 mb-1">
            Condition{" "}
            {selectedFilters["condition"]?.length ? (
              <span className="text-xs py-1 px-2 text-gray-700 font-bold bg-green-300 rounded-full">
                {selectedFilters["condition"].length}
              </span>
            ) : (
              ""
            )}{" "}
          </h4>

          <MultiSelect
            value={selectedFilters["condition"]}
            options={searchData.filters.condition}
            onChange={(e) => handleFilterChange("condition", e.value)}
            loading={loadingData === "condition" && loading}
            filter
            style={{
              minWidth: "100%",
            }}
            emptyMessage={
              loadingData === "condition"
                ? "Data Loading..."
                : "Search for more..."
              // : <p className="p-2 text-center text-sm">Search for more...</p>
            }
            emptyFilterMessage={
              loadingData === "condition" ? (
                <div className="text-xs text-center p-2 flex items-center gap-2 justify-center">
                  <i className="pi pi-spin pi-refresh"></i> Data Loading...
                </div>
              ) : (
                <div className="text-xs text-center p-2 flex justify-center items-center gap-2 ">
                  No result
                </div>
              )
            }
            filterPlaceholder="Search.."
            // placeholder={`Select ${"Body Type"}`}
            display="chip"
            filterTemplate={getFilterTemplate("condition")}
            selectedItemTemplate={(e) => selectedItemTemplate(e, "condition")}
            itemClassName="text-xs text-green-800 flex flex-wrap w-[100%] items-center gap-2  bg-green-50 border-b border-b-green-200 p-2 "
            // virtualScrollerOptions={{ itemSize: 43 }}
            className={` p-multiselect p-checkbox-box  w-full max-h-[50px] max-w-[100px] ${
              selectedFilters["condition"]?.length > 0 ? "flex flex-wrap " : ""
            } overflow-auto  text-sm hover:shadow shadow-3xl border-2 border-gray-300 hover:border-gray-300 p-2 md:w-20rem  custom-checkbox-multiselect`}
          />
        </div>

        {/* Transmission */}
        <div className="card mb-2 flex flex-col justify-content-center">
          <h4 className=" text-gray-400 text-xs flex items-start gap-3 mb-1">
            Status{" "}
            {selectedFilters["status"]?.length ? (
              <span className="text-xs py-1 px-2 text-gray-700 font-bold bg-green-300 rounded-full">
                {selectedFilters["status"].length}
              </span>
            ) : (
              ""
            )}{" "}
          </h4>

          <MultiSelect
            value={selectedFilters["status"]}
            options={searchData.filters.status}
            onChange={(e) => handleFilterChange("status", e.value)}
            loading={loadingData === "status" && loading}
            filter
            style={{
              minWidth: "100%",
            }}
            emptyMessage={
              loadingData === "status"
                ? "Data Loading..."
                : "Search for more..."
              // : <p className="p-2 text-center text-sm">Search for more...</p>
            }
            emptyFilterMessage={
              loadingData === "status" ? (
                <div className="text-xs text-center p-2 flex items-center gap-2 justify-center">
                  <i className="pi pi-spin pi-refresh"></i> Data Loading...
                </div>
              ) : (
                <div className="text-xs text-center p-2 flex justify-center items-center gap-2 ">
                  No result
                </div>
              )
            }
            filterPlaceholder="Search.."
            // placeholder={`Select ${"Body Type"}`}
            display="chip"
            filterTemplate={getFilterTemplate("status")}
            selectedItemTemplate={(e) => selectedItemTemplate(e, "status")}
            itemClassName="text-xs text-green-800 flex flex-wrap w-[100%] items-center gap-2  bg-green-50 border-b border-b-green-200 p-2 "
            // virtualScrollerOptions={{ itemSize: 43 }}
            className={` p-multiselect p-checkbox-box  w-full max-h-[50px] max-w-[100px] ${
              selectedFilters["Model"]?.length > 0 ? "flex flex-wrap " : ""
            } overflow-auto  text-sm hover:shadow shadow-3xl border-2 border-gray-300 hover:border-gray-300 p-2 md:w-20rem  custom-checkbox-multiselect`}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex flex-wrap justify-between gap-3">
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-300 rounded text-sm hover:bg-gray-100"
            type="button"
          >
            Reset
          </button>
        </div>

        <div className="flex gap-3 md:gap-3">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700"
            type="button"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearch;
