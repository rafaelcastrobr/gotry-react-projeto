import React, { useState } from "react";
import PromotionModal from "../Modal/Modal";
import PromotionCard from "components/Promotion/Card/Card";
import './List.css';

const PromotionsList = ({ loading, error, promotions }) => {
  const [promotionId, setPromotionId] = useState(null);

  if (error) {
    return <div>Algo De Errado Não Está Certo!</div>
  }
  if (loading || promotions === null) {
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
        <PromotionCard
          promotion={promotion}
          onClickComments={() => setPromotionId(promotion.id)}
        />
      ))}
      {promotionId && (
        <PromotionModal
          promotionId={promotionId}
          onClickClose={() => setPromotionId(null)}
        />
      )}

    </div>

  )
}

export default PromotionsList;