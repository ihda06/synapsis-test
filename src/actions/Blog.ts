import { Comment, Post } from "@/types/blog";
import { axios } from "@/utils/axios";

export const getPosts = async (currentPage = 1, limit = 10) => {
  try {
    const res = await axios.get<Post[]>("/posts", {
      params: {
        page: currentPage,
        limit: limit,
      },
    });
    const data = res.data;
    return {
      status: "ok",
      data: data,
    };
  } catch (error) {
    return {
      status: "error",
      message: error,
      pagination: {},
    };
  }
};
export const getComments = async (id: number) => {
  try {
    const res = await axios.get<Comment[]>(`/posts/${id}/comments`);
    const data = res.data;
    return {
      status: "ok",
      data: data,
    };
  } catch (error) {
    return {
      status: "error",
      message: error,
    };
  }
};
export const getSinglePost = async (id: number) => {
  try {
    const res = await axios.get<Post>(`/posts/${id}`);
    const data = res.data;
    return {
      status: "ok",
      data: data,
    };
  } catch (error) {
    return {
      status: "error",
      message: error,
    };
  }
};
