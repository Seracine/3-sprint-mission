import axios from 'axios'

const pandaInstance = axios.create({
    baseURL : "https://panda-market-api-crud.vercel.app",
})

export async function getProductList(page, pageSize, keyword){

    try{ 
        const res = await pandaInstance.get('/products', {params:{page, pageSize, keyword}});
        return res.data;
    }
    catch(e){
        if (e.response){
            console.log(e.response.status)
		    console.log(e.response.data)
        } else{        
            console.log(`Request Failed`);
        }
        console.error(e.message);
        return e;
    }
}


export async function getProduct(id){
    try{
        const res = await pandaInstance.get(`/products/${id}`);
        return res.data;
    }
    catch(e){
        if (e.response){
            console.log(e.response.status)
		    console.log(e.response.data)
        } else{        
            console.log(`Request Failed`);
        }
        console.error(e.message);
        return e;
    }
}

export async function createProduct(requestBody){ //requestBody에는 name, description, price, tags = [], images = []를 키로 갖는 객체
    try{
        const res = await pandaInstance.post('/products', requestBody);
        return res.data;
    }
    catch(e){
        if (e.response){
            console.log(e.response.status)
		    console.log(e.response.data)
        } else{        
            console.log(`Request Failed`);
        }
        console.error(e.message);
        return e;
    }
}

export async function patchProduct(id, requestBody){
    try{
        const res = await pandaInstance.patch(`/products/${id}`, requestBody); //requestBody에는 name, description, price, tags, images를 키로 갖는 객체
        return res.data;
    }
    catch(e){
        if (e.response){
            console.log(e.response.status)
		    console.log(e.response.data)
        } else{        
            console.log(`Request Failed`);
        }
        console.error(e.message);
        return e;
    } 
}

export async function deleteProduct(id){
    try{
        const res = await pandaInstance.delete(`/products/${id}`);
        return res.data;
    }
    catch(e){
        if (e.response){
            console.log(e.response.status)
		    console.log(e.response.data)
        } else{        
            console.log(`Request Failed`);
        }
        console.error(e.message);
        return e;
    }
}

