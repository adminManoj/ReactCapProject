import React, { useState, useEffect } from "react";
import { apiEndPoint } from "../config";
import Products from "./Products";
import Pagination from "../components/Pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.styles.scss";

function Dashboard() {
  const userDetails = JSON.parse(localStorage.getItem("loggedInUser"));
  const datetime = new Date().toLocaleString();
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);

  useEffect(function () {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await fetch(apiEndPoint + "products");
      const jsonData = await data.json();
      setProductsData(jsonData);
      setLoading(false);
    };
    fetchProducts();
    console.log(productsData);
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirtsPost = indexOfLastProduct - productsPerPage;
  const currentProducts = productsData.slice(
    indexOfFirtsPost,
    indexOfLastProduct
  );

  return (
    <div className="mainDiv">
      <div className="form-group">
        <div>
          Hello, {userDetails[0].Username.toLocaleUpperCase()} {" - "}
        </div>
        <div style={{ textAlign: "right" }}>{datetime}</div>
      </div>
      <div>
        <Products loading={loading} productsData={currentProducts} />
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={productsData.length}
        />
      </div>
      <div>Footer</div>
    </div>
  );
}

export default Dashboard;
