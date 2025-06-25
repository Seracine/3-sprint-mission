import express from 'express';
import validations from '../middlewares/validations.js';
import { PrismaClient } from '@prisma/client';

const productRouter = express.Router();

const prisma = new PrismaClient();

productRouter.route('/comment')
    .get(async (req, res) => {
        
        const { cursor, limit = 10 } = req.query;
        const comments = await prisma.productComment.findMany({
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
            productId: req.body.id
        }

        const comment = await prisma.productComment.create({
            data: commentBody
        })

        res.status(201).json(comment)
    })

productRouter.route('/comment/:id')
    .patch(validations.patchCommentValidation, async (req, res) => {
        const id = req.params.id;

        const comment = await prisma.productComment.update({
            data: req.body,
            where: { id },
        })
        res.json(comment)
    })
    .delete(async (req, res) => {
        const id = req.params.id;
        await prisma.productComment.delete({
            where: { id },
        })
        res.sendStatus(204)
    })

productRouter.route('/')
    .get(async (req, res) => {
        const { page = 1, limit = 10, order = 'recent', keyword = "" } = req.query
        const products = await prisma.product.findMany({
            skip: parseInt((page - 1) * limit),
            take: parseInt(limit),
            orderBy: {
                createdAt: order === 'recent' ? 'desc' : 'asc'
            },
            select: {
                id: true,
                name: true,
                price: true,
                createdAt: true,
            },
            where: {
                OR: [
                    { name: { contains: keyword } },
                    { description: { contains: keyword } },
                ]
            }
        })

        // if (products === []) => 결과가 없으면 처리하는 로직 추가해도 될듯
        res.send(products)
    })
    .post(validations.createProductValidation, async (req, res) => {
        const product = await prisma.product.create({
            data: req.body
        })
        res.status(201).json(product)
    })

productRouter.route('/:id')
    .get(async (req, res) => {
        const { id } = req.params
        const product = await prisma.product.findUniqueOrThrow({
            where: { id },
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                tags: true,
                createdAt: true,
            },
        })
        res.json(product)
    })
    .patch(validations.patchProductValidation, async (req, res) => {
        const id = req.params.id;

        const product = await prisma.product.update({
            data: req.body,
            where: { id },
        })
        res.json(product)
    })
    .delete(async (req, res) => {
        const id = req.params.id;
        await prisma.product.delete({
            where: { id },
        })
        res.sendStatus(204)
    })

export default productRouter;