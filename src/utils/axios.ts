import * as AxiosPrimitive from "axios";

export const axios = AxiosPrimitive.default.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
  },
});
