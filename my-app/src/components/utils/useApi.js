import { useState } from 'react';
import axios from 'axios';

const initialRequestInfo = {
  error: null,
  data: null,
  loading: false
}

export default function useApi(config) {
  const [requestInfo, setRequesteInfo] = useState(initialRequestInfo)

  async function call(localConfig) {
    setRequesteInfo({
      ...initialRequestInfo,
      loading: true,
    });
    let response = null;
    try {
      response = await axios({
        baseURL: 'http://localhost:5000',
        ...config,
        ...localConfig,
      });
      setRequesteInfo({
        ...initialRequestInfo,
        data: response.data,
      });
    } catch (error) {
       setRequesteInfo({
         ...initialRequestInfo,
         error,
       })
    }
    
    if (config.onCompleted) {
      config.onCompleted(response);
    }
  }

  return [
    call,
    requestInfo
  ]
}