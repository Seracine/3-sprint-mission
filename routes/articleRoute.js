import express from 'express';
import validations from '../middlewares/validations.js';
import { PrismaClient } from '@prisma/client';

const articleRouter = express()
articleRouter.use(express.json())

const prisma = new PrismaClient();

articleRouter.route('/comment')
    .get(async (req, res) => { // product랑 article이랑 별도로 엔드포인트 생성
        const { cursor, limit = 10 } = req.query;
        const comments = await prisma.articleComment.findMany({
            take: parseInt(limit),
            select: {
                id: true,
                content: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: 'desc', // 정렬 조건은 상황에 맞게
            },
            skip: cursor ? 1 : 0, // 커서가 있을 때는 현재 커서 이후 데이터부터
            ...(cursor && {
                cursor: {
                    id: cursor,
                },
            }),
        })

        let nextCursor = null
        if (comments.length) {
            nextCursor = comments[comments.length - 1].id
        }

        res.status(201).json({ data: comments, nextCursor })
    })
    .post(validations.createCommentValidation, async (req, res) => { // product랑 article이랑 별도로 엔드포인트 생성
        const commentBody = {
            content: req.body.content,
            articleId: req.body.id
        }
        const comment = await prisma.articleComment.create({
            data: commentBody
        })

        res.status(201).json(comment)
    })

articleRouter.route('/comment/:id')
    .patch(validations.patchCommentValidation, async (req, res) => {
        const id = req.params.id;
        const commentBody = {
            content: req.body.content,
            articleId: req.body.id
        }
        const comment = await prisma.articleComment.update({
            data: commentBody,
            where: { id },
        })
        res.json(comment)
    })
    .delete(async (req, res) => {
        const id = req.params.id;
        await prisma.articleComment.delete({
            where: { id },
        })
        res.sendStatus(204)
    })


articleRouter.route('/')
    .get(async (req, res) => {
        const { page = 1, limit = 10, order = 'recent', keyword = "" } = req.query
        const articles = await prisma.article.findMany({
            skip: parseInt((page - 1) * limit),
            take: parseInt(limit),
            orderBy: {
                createdAt: order === 'recent' ? 'desc' : 'asc'
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
            },
            where: {
                OR: [
                    { title: { contains: keyword } },
                    { content: { contains: keyword } },
                ]
            }
        })

        // if (products === []) => 결과가 없으면 처리하는 로직 추가해도 될듯
        res.send(articles)
    })
    .post(validations.createArticleValidation, async (req, res) => {
        const article = await prisma.article.create({
            data: req.body
        })
        res.status(201).json(article)
    })

articleRouter.route('/:id')
    .get(async (req, res) => {
        const { id } = req.params
        const article = await prisma.article.findUniqueOrThrow({
            where: { id },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
            },
        })
        res.send(article)
    })
    .patch(validations.patchArticleValidation, async (req, res) => {
        const id = req.params.id;

        const article = await prisma.article.update({
            data: req.body,
            where: { id },
        })
        res.json(article)
    })
    .delete(async (req, res) => {
        const id = req.params.id;
        await prisma.article.delete({
            where: { id },
        })
        res.sendStatus(204)
    })


export default articleRouter;