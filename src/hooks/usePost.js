import { useState } from "react";
import { getPostDataApi, getSideMenuDataApi, getCommentsByIdPostApi } from "../api/post";

export function usePost() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);
    const [sideMenuData, setSideMenuData] = useState(null);
    const [commentsData, setCommentsData] = useState(null);

    const getPost = async (id) => {
        try {
            setLoading(true);
            const response = await getPostDataApi(id)
            // console.log(response)
            setLoading(false)
            setPost(response.data)
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }

    const getSideMenuData = async (id) => {
        try {
            setLoading(true)
            const response = await getSideMenuDataApi(id)
            // console.log(response)
            setLoading(false)
            setSideMenuData(response.data)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    const getCommentsData = async (id) => {
        try {
            setLoading(true)
            const response = await getCommentsByIdPostApi(id)
            // console.log(response)
            setLoading(false)
            setCommentsData(response.data)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    return {
        loading,
        error,
        post,
        getPost,
        sideMenuData,
        getSideMenuData,
        commentsData,
        getCommentsData
    }
}