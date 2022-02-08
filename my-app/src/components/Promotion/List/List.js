import React from "react";
import PromotionCard from "components/Promotion/Card/Card";
import './List.css';

const PromotionsList = ({ loading, error, promotions }) => {
  if (error) {
    return <div>Algo De Errado Não Está Certo!</div>
  }
  if(loading || promotions === null) {
    return (
      <div>Carregando...</div>
    )
  }

  if (promotions.length === 0) {
    return (
      <div>Nenhum Resultado Encontrado</div>
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