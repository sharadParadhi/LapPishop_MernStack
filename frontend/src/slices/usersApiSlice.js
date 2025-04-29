import { USERS_URL,BASE_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: data => ({
        url: `${BASE_URL}${USERS_URL}/login`,
        method: 'POST',
        body: data,
        credentials: 'include'
      }),
      invalidatesTags: ['User']
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${BASE_URL}${USERS_URL}/logout`,
        method: 'POST',
        credentials: 'include'
      }),
      invalidatesTags: ['User']
    }),
    register: builder.mutation({
      query: data => ({
        url: `${BASE_URL}${USERS_URL}/register`,
        method: 'POST',
        body: data,
        credentials: 'include'
      }),
      invalidatesTags: ['User']
    }),
    newPasswordRequest: builder.mutation({
      query: data => ({
        url: `${BASE_URL}${USERS_URL}/reset-password/request`,
        method: 'POST',
        body: data,
        credentials: 'include'
      }),
      invalidatesTags: ['User']
    }),
    resetPassword: builder.mutation({
      query: ({ userId, token, password }) => ({
        url: `${BASE_URL}${USERS_URL}/reset-password/reset/${userId}/${token}`,
        method: 'POST',
        body: { password },
        credentials: 'include'
      }),
      invalidatesTags: ['User']
    }),
    profile: builder.mutation({
      query: data => ({
        url: `${BASE_URL}${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
        credentials: 'include'
      }),
      invalidatesTags: ['User']
    }),
    getUserProfile: builder.query({
      query: async () => ({
        url: `${BASE_URL}${USERS_URL}/profile`,
        credentials: 'include'
      }),
      providesTags: ['User'],
    }),
    getUsers: builder.query({
      query: () => ({
        url: `${BASE_URL}${USERS_URL}/`,
        credentials: 'include'
      }),
      providesTags: ['User']
    }),
    admins: builder.query({
      query: () => ({
        url: `${BASE_URL}${USERS_URL}/admins`,
        credentials: 'include'
      }),
      providesTags: ['User']
    }),
    getUserById: builder.query({
      query: userId => ({
        url: `${BASE_URL}${USERS_URL}/${userId}`,
        credentials: 'include'
      }),
      providesTags: ['User']
    }),
    deleteUser: builder.mutation({
      query: userId => ({
        url: `${BASE_URL}${USERS_URL}/${userId}`,
        method: 'DELETE',
        credentials: 'include'
      }),
      invalidatesTags: ['User']
    }),
    updateUser: builder.mutation({
      query: ({ userId, ...userData }) => ({
        url: `${BASE_URL}${USERS_URL}/${userId}`,
        method: 'PUT',
        body: { ...userData },
        credentials: 'include'
      }),
      invalidatesTags: ['User']
    }),
    
  })
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useNewPasswordRequestMutation,
  useResetPasswordMutation,
  useProfileMutation,
  useGetUserProfileQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserByIdQuery,
  useAdminsQuery
} = usersApiSlice;
