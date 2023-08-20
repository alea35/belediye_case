 function request (url,data = false,method='GET',token='')
{
    let baseURL = 'http://localhost:5189/api/'
    return new Promise( async(resolve,reject) => {
        const options = {
            method,
            headers:{"Content-Type": "application/json",'Authorization': `Bearer ${token}`}
            

        }
        
        if(data && method ==='POST'){
            options.body = JSON.stringify(data);
            
        }
        
        const response = await fetch(baseURL +url,options);
        
        const result = await response.json();
        if(response.ok)
        {
            resolve(result);
        }
        else{
            reject(result) 
        }
    })
}


export const post = (url,data,token='') => request(url,data,'POST',token)

export const get = (url) => request(url)