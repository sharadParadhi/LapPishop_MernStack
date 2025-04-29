import { ORDERS_URL, RAZORPAY_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createOrder: builder.mutation({
      query: order => ({
        url: `http://localhost:5000${ORDERS_URL}`,
        method: 'POST',
        body: { ...order },
        credentials: 'include'
      }),
      invalidatesTags: ['Order']
    }),
    getOrderDetails: builder.query({
      query: orderId => ({
        url: `http://localhost:5000${ORDERS_URL}/${orderId}`,
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
        url: `http://localhost:5000${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        body: { ...details },
        credentials: 'include'
      }),
      invalidatesTags: ['Order']
    }),
    updateDeliver: builder.mutation({
      query: orderId => ({
        url: `http://localhost:5000${ORDERS_URL}/${orderId}/deliver`,
        method: 'PUT',
        credentials: 'include'
      }),
      invalidatesTags: ['Order']
    }),
    getRazorpayApiKey: builder.query({
      query: () => ({
        url: `http://localhost:5000${RAZORPAY_URL}/razorpay/config`,
        credentials: 'include'
      }),
      providesTags: ['Order']
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL
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
