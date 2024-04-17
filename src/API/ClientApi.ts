import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {GetClientsResponse, GetIntentResponse} from './types';
import {API_BASE_URL} from '@env';

interface FetchArgs {
  id: any;
  rib: any;
  motif: any;
  montant: any;
}

export const clientApi = createApi({
  // creating a new API instance with the createApi function, takes object as argument
  reducerPath: 'clientApi',
  baseQuery: fetchBaseQuery({baseUrl: `${API_BASE_URL}`}), // http://192.168.1.101:5001
  tagTypes: ['Client', 'Operation', 'Virement', 'Transferer'],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: builder => ({
    // A function that takes a builder object and returns an object containing all the     query and mutation endpoints for our API.
    getClients: builder.query({ //<GetClientsResponse, number>
      // a way to define a query endpoint with RTK Query. defient the query endpoint (url) and HTTP method? builder.query() returns a hook that can be used to call the endpoint
      query: id => ({
        url: `/api/v1/client/getById/${id}`,
        method: 'POST',
      }),
      providesTags: ['Client'],
    }),

    getOperations: builder.query({
      // <GetClientsResponse, number>
      query: id => ({
        url: `/api/v1/operation/mouvement/all`,
        method: 'POST',
        body: {clientId: id},
      }),
      providesTags: ['Operation'],
    }),

    getOperationsBetweenDates: builder.query<
      GetClientsResponse,
      {startDate: string; endDate: string; clientId: number}
    >({
      // not used
      query: ({startDate, endDate, clientId}) => ({
        url: `/api/v1/operation/mouvement/?startDate=${startDate}&endDate=${endDate}&clientId=${clientId}`,
        method: 'GET',
      }),
      providesTags: ['Operation'],
    }),

    getTransfers: builder.query({
      query: id => ({
        url: `/api/v1/operation/virement/all`,
        method: 'POST',
        body: {clientId: id},
      }),
      providesTags: ['Virement'],
    }),
    sendTransfer:builder.query({
      query: ({id, rib, motif, montant}) => ({
        url: `/api/v1/operation/virement/initiation-virement`,
        method: 'POST',
        body: {clientId: id, rib: rib, motif: motif, montant: montant},
      }),
      providesTags: ['Transferer'],
    }
    ),

    getIntent: builder.query<{assistantResponse: string}, {prompt: string}>({
      // not used
      query: prompt => ({
        url: `/api/v1/client/getIntent`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prompt),
      }),
      providesTags: ['Client'],
    }),
    
  }),
});

export const {
  
  useGetClientsQuery,
  useLazyGetIntentQuery,
  useGetOperationsQuery,
  useGetTransfersQuery,
  useSendTransferQuery,
  useGetOperationsBetweenDatesQuery,
} = clientApi;
