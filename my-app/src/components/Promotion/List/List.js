import React from "react";
import PromotionCard from "components/Promotion/Card/Card";
import './List.css';

const PromotionsList = ({ loading, promotions }) => {
  if(loading) {
    return (
      <div>
        Carregando...
      </div>
    )
  }

  return (
    <div className="promotion-lista">
      {promotions.map((promotion) => (
      <PromotionCard promotion={promotion} />
    ))}
    </div>
    
  )
}

export default PromotionsList;