import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ProductCard from "../productCard/ProductCard";
import "./styles.scss";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../store/actions";

export const Featured = () => {
  const productsList = useSelector((state) => state.products.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <>
      <h2>top 20 productos</h2>
      <div id="feats">
        {productsList && productsList.products.length >= 1 ? (
          productsList.products.map((item) => (
            <ProductCard key={item.id} data={item} />
          ))
        ) : (
          <h4 className="toast"> no hay productos para mostrar</h4>
        )}
      </div>
    </>
  );
};

Featured.propTypes = {
  productsList: PropTypes.array,
};
