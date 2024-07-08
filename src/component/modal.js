import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../store/productSlice";

function Modal({ id, setShow }) {
  const dispatch = useDispatch();

  const selecterData = useSelector((state) => state?.users);
  const { products } = selecterData;

  const filterData = products.find((item) => item.id === id);

  const [productDetails, setProductDetails] = useState({
    title: filterData?.title || "",
    price: filterData?.price || "",
    description: filterData?.description || "",
    image: filterData?.image || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductDetails({
      ...productDetails,
      [name]: value,
    });
  };

  const callApi = (id) => {
    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: productDetails?.title,
        price: productDetails?.price,
        description: productDetails?.description,
        image: productDetails?.image,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setShow(false);
        alert("Product details updated");
        console.log("Product details updated", json);
      });
  };

  const handleFormSubmit = async (event) => {
    try {
      const { title, price, description, image } = productDetails;
      await dispatch(
        updateProduct({
          id: filterData?.id,
          formData: { title, price, description, image },
        })
      );
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  return (
    <dh-component>
      <div
        className="py-12  transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
        id="modal"
        style={{
          // overflow: "auto",
          // backgroundColor: "rgb(0,0,0)",
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
      >
        <div
          role="alert"
          className="h-[50%] container mx-auto w-11/12 md:w-2/3 max-w-lg"
        >
          <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
            <h1
              style={{ fontSize: "20px" }}
              className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4"
            >
              Edit your products
            </h1>
            <label
              for="name"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Product Title
            </label>
            <input
              value={productDetails?.title}
              name="title"
              onChange={handleChange}
              id="name"
              className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="James"
            />
            <label
              for="email2"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Product Price
            </label>
            <div className="relative mb-5 mt-2">
              <input
                name="price"
                value={productDetails?.price}
                onChange={handleChange}
                id="email2"
                className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-16 text-sm border-gray-300 rounded border"
                placeholder="XXXX - XXXX - XXXX - XXXX"
              />
            </div>
            <label
              for="expiry"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Product Description
            </label>
            <div className="relative mb-5 mt-2">
              <div className="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-calendar-event"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <rect x="4" y="5" width="16" height="16" rx="2" />
                  <line x1="16" y1="3" x2="16" y2="7" />
                  <line x1="8" y1="3" x2="8" y2="7" />
                  <line x1="4" y1="11" x2="20" y2="11" />
                  <rect x="8" y="15" width="2" height="2" />
                </svg>
              </div>
              <input
                value={productDetails?.description}
                name="description"
                onChange={handleChange}
                id="expiry"
                className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                placeholder="MM/YY"
              />
            </div>
            <label
              for="cvc"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Product Image
            </label>
            <div className="relative mb-5 mt-2">
              <div className="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-info-circle"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z"></path>
                  <circle cx="12" cy="12" r="9"></circle>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  <polyline points="11 12 12 12 12 16 13 16"></polyline>
                </svg>
              </div>
              <input
                value={productDetails?.image}
                name="image"
                onChange={handleChange}
                id="cvc"
                className="mb-8 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                placeholder="MM/YY"
              />
            </div>
            <div className="flex items-center justify-start w-full">
              <button
                onClick={() => handleFormSubmit(filterData?.id)}
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
              >
                Submit
              </button>
              <button
                onClick={() => setShow(false)}
                className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                onclick="modalHandler()"
              >
                Cancel
              </button>
            </div>
            <button
              onClick={() => setShow(false)}
              className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
              onclick="modalHandler()"
              aria-label="close modal"
              role="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-x"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </dh-component>
  );
}

export default Modal;
