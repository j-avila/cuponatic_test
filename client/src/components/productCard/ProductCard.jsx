import React from "react";
import "./styles.scss";

const Chip = ({ tagData }) => {
  return (
    <span className="chip">
      {tagData}: <i>99999</i>
    </span>
  );
};

export const ProductCard = ({ data }) => {
  const tags = data.tags.split(",");
  return (
    <div id="product-card">
      <div className="picture">
        <img src={data.imagen} alt={data.titulo} />
      </div>
      <div className="desc">
        <h3>{data.titulo}</h3>
        <span>
          {data.vendidos} vendidos <i className="material-icons">thumb_up</i>
        </span>
        <p>{data.descripcion}</p>
        <div className="chips">
          <strong>Búsquedas relacionadas:</strong>
          <>
            {tags.map((tag, index) => (
              <Chip key={index} tagData={tag} />
            ))}
          </>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
