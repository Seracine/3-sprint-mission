## ✨ 구현 내용

- Product, ElectronicProduct, Article 클래스 정의
- Panda Market API 기반의 Product/Article 관련 함수 구현
- Article 클래스에 생성일자(createdAt) 필드 추가
- 파일 분리 및 비동기 처리 방식 적용

---

## 🔍 상세 구현 사항

### 🧱 클래스 설계

#### ✅ Product 클래스
- 필드: `name`, `description`, `price`, `tags[]`, `images[]`, `favoriteCount`
- 메서드: `favorite()` → 호출 시 찜 수 +1

#### ✅ ElectronicProduct 클래스
- `Product` 상속
- 추가 필드: `manufacturer`

#### ✅ Article 클래스
- 필드: `title`, `content`, `writer`, `likeCount`, `createdAt`
- 메서드: `like()` → 호출 시 좋아요 수 +1
- 생성 시점에 `createdAt` 자동 저장

> ⚙️ 모든 클래스는 `constructor` 포함, 객체지향 4대 원칙(추상화/캡슐화/상속/다형성) 고려

---

## 🔗 API 기능 구현

### 📄 Article API (`fetch`, `.then`, `.catch` 사용)
- `getArticleList(page, pageSize, keyword)`
- `getArticle(id)`
- `createArticle(title, content, image)`
- `patchArticle(id, data)`
- `deleteArticle(id)`

### 🛒 Product API (`async/await`, `try/catch` 사용)
- `getProductList(page, pageSize, keyword)`
- `getProduct(id)`
- `createProduct(name, description, price, tags, images)`
- `patchProduct(id, data)`
- `deleteProduct(id)`

---

## 📁 파일 구조 및 모듈화

- `ProductService.js`: Product API 관련 함수 export
- `ArticleService.js`: Article API 관련 함수 export
- `main.js`: 전체 기능 import 및 실행

---

## 📦 상품 인스턴스 처리 로직

- `getProductList()` 호출 결과 → `products[]` 배열로 저장
- `tags`에 `"전자제품"` 포함 시 → `ElectronicProduct` 인스턴스로 생성
- 그 외 → `Product` 인스턴스로 생성

---

## ✅ 테스트 방법

- `main.js`에서 각 클래스와 API 함수 실행
- 메서드(favorite, like) 호출 확인
- 생성일자(createdAt) 자동 설정 확인
- 콘솔 출력을 통한 결과 검증

---

## ❗ 기타 참고사항

- 오류 처리 방식 통일: Article API는 `.then/.catch`, Product API는 `async/await + try/catch`
- 모든 메서드 정상 작동 및 분기 처리 완료