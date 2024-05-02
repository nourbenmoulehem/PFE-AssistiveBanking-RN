import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {GetClientsResponse, GetIntentResponse} from './types';
import {API_BASE_URL} from '@env';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

// import axiosInstance from "./interceptor";

import baseQuery from './Interceptor';

interface FetchArgs {
  id: any;
  rib: any;
  motif: any;
  montant: any;
}

export const clientApi = createApi({
  // creating a new API instance with the createApi function, takes object as argument
  reducerPath: 'clientApi',
  baseQuery: baseQuery, //  fetchBaseQuery({baseUrl: `${API_BASE_URL}`})
  tagTypes: [
    'Client',
    'Operation',
    'Virement',
    'beneficiaire',
    'Transferer',
    'Notification',
  ],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: builder => ({
    // A function that takes a builder object and returns an object containing all the     query and mutation endpoints for our API.
    getClients: builder.query({
      //<GetClientsResponse, number>
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

    getVirementById: builder.query({
      // <GetClientsResponse, number>
      query: id => ({
        url: `/api/v1/operation/virement/${id}`,
        method: 'GET',
      }),
      providesTags: ['Virement'],
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
    
    getNotifications: builder.query({
      query: id => ({
        url: `api/v1/client/${id}/notifications`,
        method: 'GET',
      }),
      providesTags: ['Notification'],
    }),

    sendTransfer: builder.mutation({
      query: ({id, rib, motif, montant}) => ({
        url: `/api/v1/operation/virement/initiation-virement`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {clientId: id, rib: rib, motif: motif, montant: montant},
      }),
    }),

    sendReclamation: builder.mutation({
      query: ({id, objet, description}) => ({
        url: `/api/v1/client/reclamation/add/${id}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {clientId: id, objet: objet, descriptionClient: description},
      }),
    }),
    changeCardStatus: builder.mutation({
      query: ({idProduit, status}) => ({
        url: `/api/v1/carte/status/${idProduit}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {status: status},
      }),
    }),
    getLastMonthExpenses: builder.query({
      query: id => ({
        url: `/api/v1/operation/mouvement/getLastMonthExpenses/1/${id}`,
        method: 'GET',
      }),
    }), 
    getCurrentMonthExpenses: builder.query({
      query: id => ({
        url: `/api/v1/operation/mouvement/getCurrentMonthExpenses/${id}`,
        method: 'GET',
      }),
    }),

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

    getBeneficiaires: builder.query({
      //<{nom: string, rib: string, id: number}, {clientId: number}>
      query: clientId => ({
        url: `/api/v1/client/beneficiaire/beneficiaires/${clientId}`,
        method: 'GET',
      }),
      providesTags: ['beneficiaire'],
    }),

    addBeneficiaire: builder.mutation({
      query: ({
        clientId,
        beneficiaire,
      }: {
        clientId: number;
        beneficiaire: {nom: string; rib: string};
      }) => ({
        url: `/api/v1/client/beneficiaire/insert-beneficiaire/${clientId}`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: {nom: beneficiaire.nom, rib: beneficiaire.rib},
        method: 'POST',
      }),
      invalidatesTags: ['beneficiaire'],
    }),

    updateBeneficiaire: builder.mutation({
      query: ({
        clientId,
        beneficiaire,
      }: {
        clientId: number;
        beneficiaire: {nom: string; rib: string; id: number};
      }) => ({
        url: `/api/v1/client/beneficiaire/update-beneficiaire/${clientId}`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          id: beneficiaire.id,
          nom: beneficiaire.nom,
          rib: beneficiaire.rib,
        },
        method: 'POST',
      }),
      invalidatesTags: ['beneficiaire'],
    }),

    deleteBeneficiaire: builder.mutation({
      query: ({
        clientId,
        beneficiaire,
      }: {
        clientId: number;
        beneficiaire: {nom: string; rib: string; id: number};
      }) => ({
        url: `/api/v1/client/beneficiaire/delete-beneficiaire/${clientId}`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          id: beneficiaire.id,
          nom: beneficiaire.nom,
          rib: beneficiaire.rib,
        },
        method: 'DELETE',
      }),
      invalidatesTags: ['beneficiaire'],
    }),
  }),
});

export const {
  useGetClientsQuery,
  useLazyGetIntentQuery,
  useGetOperationsQuery,
  useGetVirementByIdQuery,
  useGetTransfersQuery,
  useGetNotificationsQuery,
  useGetBeneficiairesQuery,
  useAddBeneficiaireMutation,
  useChangeCardStatusMutation,
  useUpdateBeneficiaireMutation,
  useDeleteBeneficiaireMutation,
  useSendTransferMutation,
  useSendReclamationMutation,
  useGetOperationsBetweenDatesQuery,
} = clientApi;
