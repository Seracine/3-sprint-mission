import axios from "axios";

const BASE_URL = "https://panda-market-api-crud.vercel.app/articles"
const instance = axios.create({
  baseURL : BASE_URL,
  timeout: 7_000
})

export const getArticleList = async (params = {}) => {
  try{
    const res = await instance.get('/', {params})
    return res.data; //응답 본문
  } catch (error) {
    console.error('ArticleList 결과:' + ' ' + '에러 발생', error.message)
  }
}

export const getArticle = async (id) => {
  try{
    const res = await instance.get(`/${id}`)
    return res.data;
  } catch (error) {
    console.error('Article 결과: ' + id + ' ' + '게시글 불러올 수 없음', error.message)
  }
}

export const deleteArticle = async (id) => {
  try{
    const res = await instance.delete(`/${id}`)
    return res.data;
  } catch (error) {
    console.error(id + ' ' + '게시글 삭제 불가', error.message)
  }
}

export const createArticle = async ({title, content, image}) => {
  try{
    const res = await instance.post('/',{
      title,
      content,
      image})
    return res.data;
  } catch (error) {
    console.error('Article Post 결과: ' + '에러 발생', error.message)
  }
}

export const patchArticle = async (id, {title, content, image}) => {
  try{
    const res = await instance.patch(`/${id}`,{
      title,
      content,
      image})
    return res.data
  } catch (error) {
    console.error(id + ' ' + '기사 수정 불가', error.message)
  }
}