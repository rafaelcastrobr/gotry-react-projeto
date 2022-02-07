import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './Form.css';

const initialValue = {
  title: '',
  url: '',
  imageUrl: '',
  price: 0
}

const PromotionForm = ({ id }) => {
  const [values, setValues] = useState(id ? null : initialValue);
  const history = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/promotions/${id}`)
        .then((response) => {
          setValues(response.data);
        })
    }
  }, [])

  function onChange(ev) {
    const { name, value } = ev.target;

    setValues({ ...values, [name]: value })
  }

  function onSubmit(ev) {
    ev.preventDefault();

    const method = id ? 'put' : 'post';
    const url = id
    ? `http://localhost:5000/promotions/${id}`
    : 'http://localhost:5000/promotions'

    axios[method](url, values)
      .then((response) => {
        history('/')
      })
  }

  if (!values) {
    return (
      <div>Carregando...</div>
    )
  }

  return (
    <div>
      <h1>Promo Show</h1>
      <h2>{id? 'Editar': 'Nova Promoção'}</h2>

      <form onSubmit={onSubmit}>
        <div className="promotion-form__group">
          <label htmlFor="title">Título</label>
          <input name="title" id="title" type="text" onChange={onChange} value={values.title} />
        </div>
        <div className="promotion-form__group">
          <label htmlFor="url">Link</label>
          <input name="url" id="url" type="text" onChange={onChange} value={values.url} />
        </div>
        <div className="promotion-form__group">
          <label htmlFor="imageUrl">Imagem Url</label>
          <input name="imageUrl" id="imageUrl" type="text" onChange={onChange} value={values.imageUrl} />
        </div>
        <div className="promotion-form__group">
          <label htmlFor="price">Preço</label>
          <input name="price" id="price" type="number" onChange={onChange} value={values.price} />
        </div>
        <div>
          <button type="submit">Salvar</button>
        </div>
      </form>
    </div>
  )
}

export default PromotionForm;