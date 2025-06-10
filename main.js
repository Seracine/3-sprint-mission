import { getArticleList, getArticle, deleteArticle, createArticle, patchArticle } from "./ArticleService.js";
import { patchProduct, createProduct, deleteProduct, getProduct, getProductList } from "./ProductService.js";
import Product, { ElectronicProduct } from "./Product.js";
import Article from "./Article.js"

const searchpage = {
    page: 1,
    pageSize: 5,
    keyword: ''
}
const articleInfo = {
    title: '2025년 삼성의 새로운 플래그십 스마트폰 출시',
    content: '게시글 내용',
    image: 'https://example.com/...://',
    writer: '익명'
}
const articleChangedInfo = {
    title: '2025년 삼성의 새로운 플래그십 스마트폰50 출시',
    content: '게시글 내용',
    image: 'https://example.com/...://'
}
const user = {
    firstName: 'Fred',
    lastName: 'Flintstone'
}
const productInfo = {
    name: '오만원권',
    description: "한국은행",
    price: '50000',
    tags: '일반제품',
    images: 'https://example.com/...://'
}
const productInfo2 = {
    name: 'Samsung galaxy z flip3',
    description: "삼성",
    price: '50000',
    tags: '전자제품',
    images: 'https://example.com/...://'
}

const productList = await getProductList(searchpage)
const articleList = await getArticleList(searchpage)
const productPost = await createProduct(productInfo)
const articlePost = await createArticle(articleInfo)
const articlePatch = await patchArticle(1512, articleChangedInfo)
const productPatch = await patchProduct(1063, productInfo2)
const article = new Article(
    articleInfo.title,
    articleInfo.content,
    `${user.firstName} ${user.lastName}`
);
const product = new Product(
    productInfo.name,
    productInfo.description,
    productInfo.price,
    productInfo.tags,
    productInfo.images,
    0
);

const tagFilter = await getProductList(searchpage)
    .then((data) => {
        try {
            let products = []
            for (let product of data.list) {
                if (product.tags.includes('전자제품')) {
                    let electronicProductInstance = new ElectronicProduct(product.name, product.description, product.price, product.tags, product.images, product.favoriteCount || 0, product.manufacturer || '')
                    products.push(electronicProductInstance)
                } else {
                    let productInstance = new Product(product.name, product.description, product.price, product.tags, product.images, product.favoriteCount || 0)
                    products.push(productInstance)
                }
            }
            return products;
        } catch (error) {
            console.log('상품 불러오기 중 에러', error.message)
            return []
        }
    })

console.log('ProductList 결과:', productList)
console.log('getProduct 결과:', await getProduct(1016))
console.log('Product Post 결과:', productPost)
console.log('Product Patch 결과:', productPatch)
// console.log('Product Delete 결과:', await deleteProduct(580))

console.log(product._name, product._description, product._price, product._favoriteCount);
product.favorite();
console.log(product.favoriteCount);

tagFilter.forEach(item => {
    if (item instanceof ElectronicProduct) {
        console.log(item, '✅ 전자제품');
    } else if (item instanceof Product) {
        console.log(item, '✅ 일반상품');
    } else {
        console.log('❌ 알 수 없는 타입입니다.');
    }
});

console.log('')

console.log('ArticleList 결과:', articleList)
console.log('Article 결과:', await getArticle(1509))
console.log('Article Post 결과:', articlePost)
console.log('Article Patch 결과:', articlePatch)
// console.log('Article Delete 결과:', await deleteArticle(1430))

console.log(article.articleTitle, article.articleWriter, article.likeCount);
article.like();
console.log(article.likeCount);

console.log('프로그램 종료')

//Article List나 Product List 불러올 때 불러와지는 값은 랜덤인지 앞에서부터 페이지 숫자대로인지
//ID 봤을 땐 아이디 순서대로일 거라는데 순서가 자꾸 뒤로 밀림. 앞에 게 삭제돼서?