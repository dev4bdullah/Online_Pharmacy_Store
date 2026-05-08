import { User } from "@/models/Employee"; 
import { NextRequest } from "next/server";

declare global {
  namespace NodeJS {
    interface Global {
      user?: User;
    }
  }

  interface NextRequest {
    nextUrl: any;
    headers: any;
    json(): { productId: any; } | PromiseLike<{ productId: any; }>;
    user?: User;
  }
}
