import axios from "axios";

const BASE_URL = `https://panda-market-api-crud.vercel.app/products`;
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 7_000
})

export const getProductList = async (params = {}) => {
  try {
    const res = await instance.get('/', { params })
    return res.data
  } catch (error) {
    if (error.response) {
      console.error('ProductList 결과: ' + '에러 발생', error.response.status, error.response.statusText);
    } else {
      console.error('ProductList 결과: ' + error.response.status, error.response.statusText)
    }
  }
}
export const getProduct = async (id) => {
  try {
    const res = await instance.get(`${id}`)
    return res.data
  } catch (error) {
    if (error.response) {
      console.error('getProduct 결과:' + id + ' ' + '에러 발생', error.response.status, error.response.statusText);
    } else {
      console.error('getProduct 결과: ' + error.response.status, error.response.statusText)
    }
  }
}
export const deleteProduct = async (id) => {
  try {
    const res = await instance.delete(`${id}`)
    return res.data
  } catch (error) {
    if (error.response) {
      console.error('Product Delete 결과:' + id + ' ' + '제품 삭제 불가', error.message)
    } else {
      console.error('Product Delete 결과: ' + error.response.status, error.response.statusText)
    }
  }
}
export const createProduct = async ({ name, description, price, tags, images }) => {
  try {
    const res = await instance.post('/', {
      name,
      description,
      price,
      tags,
      images
    })
    return res.data
  } catch (error) {
    if (error.response) {
      console.error('Product Post 결과:' + '에러 발생', error.message)
    } else {
      console.error('Product Post 결과: ' + error.response.status, error.response.statusText)
    }
  }
}
export const patchProduct = async (id, { name, description, price, tags, images }) => {
  try {
    const res = await instance.patch(`/${id}`, {
      name,
      description,
      price,
      tags,
      images
    })
    return res.data
  } catch (error) {
    if (error.response) {
      console.error(id + ' ' + '제품 수정 불가', error.message)
    } else {
      console.error('Patch Product 결과: ' + error.response.status, error.response.statusText)
    }
  }
}