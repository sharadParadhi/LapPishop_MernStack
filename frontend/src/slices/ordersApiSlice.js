import { BASE_URL, ORDERS_URL, RAZORPAY_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createOrder: builder.mutation({
      query: order => ({
        url: `${BASE_URL}${ORDERS_URL}`,
        method: 'POST',
        body: { ...order },
        credentials: 'include'
      }),
      invalidatesTags: ['Order']
    }),
    getOrderDetails: builder.query({
      query: orderId => ({
        url: `${BASE_URL}${ORDERS_URL}/${orderId}`,
        credentials: 'include'
      }),
      providesTags: ['Order']
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/my-orders`,
        credentials: 'include'
      }),
      providesTags: ['Order']
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${BASE_URL}${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        body: { ...details },
        credentials: 'include'
      }),
      invalidatesTags: ['Order']
    }),
    updateDeliver: builder.mutation({
      query: orderId => ({
        url: `${BASE_URL}${ORDERS_URL}/${orderId}/deliver`,
        method: 'PUT',
        credentials: 'include'
      }),
      invalidatesTags: ['Order']
    }),
    getRazorpayApiKey: builder.query({
      query: () => ({
        url: `${BASE_URL}${RAZORPAY_URL}/razorpay/config`,
        credentials: 'include'
      }),
      providesTags: ['Order']
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
        credentials:'include'
      }),
      providesTags: ['Order']
    })
  })
});

export const {
  useGetOrderDetailsQuery,
  useCreateOrderMutation,
  usePayOrderMutation,
  useUpdateDeliverMutation,
  useGetRazorpayApiKeyQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery
} = ordersApiSlice;
