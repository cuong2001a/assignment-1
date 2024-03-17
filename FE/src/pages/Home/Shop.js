import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./Shop.css";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/product")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/category")
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      });
  }, []);

  const formatNumber = (number) => {
    return Math.round(number)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  return (
    <>
      <Header />
      <section className="shop-content">
        <div className="sidebar w-[30%] md:w-[20%]">
          <h1 className="text-xl md:text-3xl font-bold">Mind Clothing Store</h1>
          {categories &&
            categories.map((category) => (
              <div
                key={category.id}
                className={category.name === selectedCategory ? "active" : ""}
                onClick={() => handleCategoryClick(category.name)}
              >
                <li className="text-lg md:text-xl">{category.name}</li>
              </div>
            ))}
        </div>
        <div className="product justify-center md:justify-normal  w-[70%] md:w-[80%]">
          {products
            .filter(
              (data) =>
                !selectedCategory || data.category.name === selectedCategory
            )
            .map((data) => (
              <div className="containerz w-[1/3] sm:w-[25%] md:w-[20%]" key={data.id}>
                <Link to={`/detail/${data._id}`}>
                  <img src={data.thumbnail} alt="#" />
                  <p className="line-clamp-2 md:text-[18px] text-sm">{data.name}</p>
                </Link>
                <div className="price-math flex flex-wrap">
                  <h4 className="text-base md:text-lg">
                    {(data.priceDetail &&
                      formatNumber(
                        data.priceDetail.price *
                          ((100 - data.priceDetail.saleRatio) / 100)
                      )) ||
                      "0"}
                    đ
                  </h4>
                  {data.priceDetail && (
                    <del className="delete text-base md:text-lg">{data.priceDetail.price}đ</del>
                  )}
                  {/* <span className="cart-icon">
                    <AiOutlineShoppingCart />
                  </span> */}
                </div>
              </div>
            ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Shop;
