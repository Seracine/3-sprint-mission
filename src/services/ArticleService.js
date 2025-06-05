import axios from 'axios';

import handleAxiosError from '../utils/handleAxiosError.js';
import validateArticle from '../utils/validateArticle.js';
import config from '../../config.json' assert { type: "json" };
import { Article } from '../models/Article.js';

axios.defaults.timeout = 5000;
const { articlesURL } = config;

const getArticleList = (page, pageSize, keyword) => {
  return axios.get(articlesURL, {
    params: { page, pageSize, keyword }
  })
    .then(res => {
      const articleList = res.data?.list || [];
      return articleList
      .filter(validateArticle)
      .map(i => new Article(i));
    })
    .catch(e => handleAxiosError(e, getArticleList.name));
}

const getArticle = (i) => {
  return axios.get(`${articlesURL}/${i}`)
    .then(res => {
      const data = res.data;
      if (!validateArticle(data)) return null;
      return data; // return new Article(data)
      })
    .catch(e => handleAxiosError(e, getArticle.name));
}

const createArticle = ({ title, content, image }) => {
  return axios.post(`${articlesURL}`, {
    title,
    content,
    image
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.data)
    .catch(e => handleAxiosError(e, createArticle.name));
}

const patchArticle = (i, body) => {
  return axios.patch(`${articlesURL}/${i}`, body, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.data)
    .catch(e => handleAxiosError(e, patchArticle.name));
}

const deleteArticle = (i) => {
  return axios.delete(`${articlesURL}/${i}`)
    .then(res => res.data)
    .catch(e => handleAxiosError(e, deleteArticle.name));
}

export { getArticleList, getArticle, createArticle, patchArticle, deleteArticle };