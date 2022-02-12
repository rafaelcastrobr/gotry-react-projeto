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

    let response = null;

    const finalConfig = {
      baseURL: 'http://localhost:5000',
      updateRequestInfo: newInfo => newInfo,
      ...config,
      ...localConfig,
    }

    if (finalConfig.isFetchMore) {
      setRequesteInfo({
        ...initialRequestInfo,
        data: requestInfo.data,
        loading: true,
      })
    } else if (!finalConfig.quietly) {
      setRequesteInfo({
        ...initialRequestInfo,
        loading: true,
      });
    }

    const fn = finalConfig.debounced ? debouncedAxios : axios;
    try {
      response = await fn(finalConfig);
      const newRequestInfo = {
        ...initialRequestInfo,
        data: response.data,
      };

      if (response.headers['x-total-count'] !== undefined) {
        newRequestInfo.total = Number.parseInt(response.headers['x-total-count'], 10)
      }


      setRequesteInfo(finalConfig.updateRequestInfo(newRequestInfo, requestInfo))
    } catch (error) {
      setRequesteInfo(finalConfig.updateRequestInfo({
        ...initialRequestInfo,
        error,
      }, requestInfo))
    }

    if (config.onCompleted) {
      config.onCompleted(response);
    }
    return response;
  }

  return [ call, requestInfo ]
}