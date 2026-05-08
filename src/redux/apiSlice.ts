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
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.user;

      if (token?.access) {
        console.log("TOken are setted");

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
    getCategories: builder.query<any, void>({
      query: () => "employee/category",
    }),
    registerUser: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "/user/register",
        method: "POST",
        body: credentials,
      }),
    }),
    loginUser: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: credentials,
      }),
    }),
    forgotPassword: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "/user/forget",
        method: "POST",
        body: credentials,
      }),
    }),
    addToCart: builder.mutation({
      query: (body) => ({
        url: "/cart/add",
        method: "POST",
        body: body,
      }),
    }),
    getCart: builder.query<any, void>({
      query: () => "/cart/add",
    }),
    incrementCartItem: builder.mutation({
      query: (productId) => ({
        url: "/cart/add",
        method: "POST",
        body: { productId, action: "increment" },
      }),
    }),

    decrementCartItem: builder.mutation({
      query: (productId) => ({
        url: "/cart/add",
        method: "POST",
        body: { productId, action: "decrement" },
      }),
    }),
    postOrder: builder.mutation({
      query: (orderData) => ({
        url: '/orders',
        method: 'POST',
        body: orderData
      }),
    }),
    getPost: builder.query<any, void>({
      query: () => "/orders",
    }),
    getOrders: builder.query<any, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) =>
        `/employee/orders?page=${page}&limit=${limit}`,
    }),
    getTestimonials: builder.query<any, void>({
      query: () => "/user/review",
    }),
    postTestimonial: builder.mutation<any, { name: string; stars: number; review: string }>({
      query: (body) => ({
        url: "/user/review",
        method: "POST",
        body,
      }),
    }),

  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useAddToCartMutation,
  useGetCartQuery,
  useIncrementCartItemMutation,
  useDecrementCartItemMutation,
  usePostOrderMutation,
  useGetPostQuery,
  useGetOrdersQuery,
  useGetTestimonialsQuery,
  usePostTestimonialMutation,
  useForgotPasswordMutation
} = apiSlice;
