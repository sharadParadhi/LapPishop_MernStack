import { PRODUCTS_URL, UPLOAD_URL,BASE_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query({
      query: ({ limit, skip, search }) => ({
        url: `${BASE_URL}${PRODUCTS_URL}`,
        params: { limit, skip, search }
      }),
      providesTags: ['Product']
    }),
    getTopProducts: builder.query({
      query: () => ({
        url: `${BASE_URL}${PRODUCTS_URL}/top`
      }),
      providesTags: ['Product']
    }),
    getProductDetails: builder.query({
      query: productId => ({
        url: `${BASE_URL}${PRODUCTS_URL}/${productId}`
      }),
      providesTags: ['Product']
    }),
    createProduct: builder.mutation({
      query: productData => ({
        url: `${BASE_URL}${PRODUCTS_URL}/`,
        method: 'POST',
        body: productData
      }),
      invalidatesTags: ['Product']
    }),
    updateProduct: builder.mutation({
      query: ({ productId, ...productData }) => ({
        url: `${BASE_URL}${PRODUCTS_URL}/${productId}`,
        method: 'PUT',
        body: { ...productData }
      }),
      invalidatesTags: ['Product']
    }),
    deleteProduct: builder.mutation({
      query: productId => ({
        url: `${BASE_URL}${PRODUCTS_URL}/${productId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Product']
    }),
    uploadProductImage: builder.mutation({
      query: data => ({
        url: UPLOAD_URL,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Product']
    }),
    createProductReview: builder.mutation({
      query: ({ productId, ...reviewData }) => ({
        url: `${BASE_URL}${PRODUCTS_URL}/reviews/${productId}`,
        method: 'POST',
        body: { ...reviewData }
      }),
      invalidatesTags: ['Product']
    })
  })
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUploadProductImageMutation,
  useUpdateProductMutation,
  useCreateProductReviewMutation,
  useGetTopProductsQuery
} = productApiSlice;
