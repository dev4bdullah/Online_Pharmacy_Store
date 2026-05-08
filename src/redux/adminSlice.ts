import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
interface RegisterResponse {
  success: boolean;
  message?: string;
  user?: {
    id: string;
    username: string;
    email: string;
  };
}
export const adminSlice = createApi({
  reducerPath: "admin",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
  }),

  endpoints: (builder) => ({
    getOrders: builder.query<any, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) =>
        `employee/orders?page=${page}&limit=${limit}`,
    }),
    getStatistics: builder.query<any, void>({
      query: () => "admin/dashboard",
    }),
    getCategories: builder.query<any, void>({
      query: () => "employee/category",
    }),
    getUsers: builder.query<any, void>({
      query: () => "admin/employes",
    }),
    getUserss: builder.query<any, void>({
      query: () => "admin/users",
    }),
    patchStatus: builder.mutation<any, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `admin/employes`,
        method: "PATCH",
        body: { id, status },
      }),
    }),
    userpatchStatus: builder.mutation<any, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `admin/users`,
        method: "PATCH",
        body: { id, status },
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetStatisticsQuery,
  useGetCategoriesQuery,
  useGetUsersQuery,
  usePatchStatusMutation,
  useGetUserssQuery,
  useUserpatchStatusMutation,
} = adminSlice;
