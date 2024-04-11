import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetClientsResponse, GetIntentResponse } from './types';

interface FetchArgs {
  id: any;
}

export const clientApi = createApi({
  // creating a new API instance with the createApi function, takes object as argument
  reducerPath: 'clientApi',
  baseQuery: fetchBaseQuery({baseUrl: `${process.env.API_BASE_URL}`}), // http://192.168.1.101:5001
  tagTypes: [
    "Client",
    "Operation"
  ],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: builder => ({
    // A function that takes a builder object and returns an object containing all the     query and mutation endpoints for our API.
    getClients: builder.query<GetClientsResponse, number>({
      // a way to define a query endpoint with RTK Query. defient the query endpoint (url) and HTTP method? builder.query() returns a hook that can be used to call the endpoint
      query: (id) => ({
        url: `/api/v1/client/getById/${id}`,
        method: 'POST',
      }),
      providesTags: ['Client']
    }),

    getOperations: builder.query({ // <GetClientsResponse, number>
      query: (id) => ({
        url: `/api/v1/operation/mouvement/all`,
        method: 'POST',
        body: { clientId: id }
      }),
      providesTags: ['Operation']
    }),

    getOperationsBetweenDates: builder.query<GetClientsResponse, { startDate: string, endDate: string }>({ // not used
      query: ({ startDate, endDate }) => ({
        url: `/api/v1/operation/mouvement/?startDate=${startDate}&endDate=${endDate}`,
        method: 'GET',
      }),
      providesTags: ['Operation']
    }),

    getIntent: builder.query<{assistantResponse: string}, {prompt: string}>({ // not used
      query: (prompt) => ({
        url: `/api/v1/client/getIntent`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prompt),
      }),
      providesTags: ['Client']
    }),
  }),

  
});

export const {useGetClientsQuery, useLazyGetIntentQuery, useGetOperationsQuery, useGetOperationsBetweenDatesQuery} = clientApi

