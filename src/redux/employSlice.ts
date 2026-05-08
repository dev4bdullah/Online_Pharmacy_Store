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
export const employSlice = createApi({
  reducerPath: "employapi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.employUser;

      if (token?.access) {
        console.log("TOken are setted");
        console.log(token?.access);

        headers.set("Authorization", `Bearer ${token?.access}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getProducts: builder.query<
      any,
      {
        page?: number;
        limit?: number;
        isTrending?: boolean;
        isRecently?: boolean;
        isTop?: boolean;
      }
    >({
      query: ({ page = 1, limit = 10, isTrending, isRecently, isTop }) => {
        const params = new URLSearchParams();

        params.set("page", page.toString());
        params.set("limit", limit.toString());

        if (isTrending) params.set("isTrending", "true");
        if (isRecently) params.set("isRecently", "true");
        if (isTop) params.set("isTop", "true");

        return `employee/product?${params.toString()}`;
      },
    }),

    getProductById: builder.query<any, string>({
      query: (id) => `employee/product/${id}`,
    }),
    deleteProductById: builder.mutation<any, string>({
      query: (id) => ({
        url: `employee/product/${id}`,
        method: "DELETE",
      }),
    }),
    loginUser: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "/employee/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getPost: builder.query<any, void>({
      query: () => "/orders",
    }),
    addProduct: builder.mutation<any, any>({
      query: (body) => ({
        url: "/employee/product/create",
        method: "POST",
        body: body,
      }),
    }),
    updateProductById: builder.mutation<
      any,
      { id: string; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `employee/product/${id}`,
        method: "PUT",
        body: formData,
      }),
    }),

    getOrders: builder.query<any, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) =>
        `employee/orders?page=${page}&limit=${limit}`,
    }),
    updateOrderStatus: builder.mutation<
      any,
      { orderId: string; status: string }
    >({
      query: ({ orderId, status }) => ({
        url: `employee/orders`,
        method: "PATCH",
        body: { orderId, status },
      }),
    }),
    getCategories: builder.query<any, void>({
      query: () => "employee/category",
    }),
    getStatistics: builder.query<any, void>({
      query: () => "employee/dashboard",
    }),
    deleteCategory: builder.mutation<any, string>({
      query: (categoryId) => ({
        url: `employee/category?id=${categoryId}`,
        method: "DELETE",
      }),
    }),
    addCategory: builder.mutation<any, { name: string }>({
      query: (category) => ({
        url: "employee/category/create",
        method: "POST",
        body: category,
      }),
    }),
    registerEmployeer: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "/employee/register",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useLoginUserMutation,
  useAddProductMutation,
  useDeleteProductByIdMutation,
  useUpdateProductByIdMutation,
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
  useGetStatisticsQuery,
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useAddCategoryMutation,
  useRegisterEmployeerMutation
} = employSlice;
