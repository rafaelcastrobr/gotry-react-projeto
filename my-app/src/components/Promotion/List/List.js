import React, { useState } from "react";
import PromotionModal from "../Modal/Modal";
import useApi from "components/utils/useApi";
import PromotionCard from "components/Promotion/Card/Card";
import './List.css';

const PromotionsList = ({ loading, error, promotions, refetch}) => {
  const [promotionId, setPromotionId] = useState(null);
  const [deletePromotion, deletePromotionInfo] = useApi({
    method: 'DELETE',
  })

  if (error) {
    return <div>Algo De Errado Não Está Certo!</div>;
  }
  if (promotions === null || deletePromotionInfo.loading) {
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
          onClickDelete={async () => {
            await deletePromotion({
              url: `/promotions/${promotion.id}`
            })
            refetch();
          }}
        />
      ))}
      {loading && <div> Carregando mais promoções... </div>}
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