import { useState } from 'react';
import axios from 'axios';
import useDebauncedPromise from './useDebouncedPromise';

const initialRequestInfo = {
  error: null,
  data: null,
  loading: false
}

export default function useApi(config) {
  const [requestInfo, setRequesteInfo] = useState(initialRequestInfo);
  const debouncedAxios = useDebauncedPromise(axios, config.debounceDelay)

  async function call(localConfig) {
    setRequesteInfo({
      ...initialRequestInfo,
      loading: true,
    });
    let response = null;

    const finalConfig = {
      baseURL: 'http://localhost:5000',
      ...config,
      ...localConfig,
    }


    const fn = finalConfig.debounced ? debouncedAxios : axios;
    try {
      response = await fn(finalConfig);
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
    return response;
  }

  return [
    call,
    requestInfo
  ]
}