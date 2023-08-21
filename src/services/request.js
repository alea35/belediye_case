 function request (url,data = false,method='GET')
{
    const token = localStorage.getItem('token') ?? '';
    if(token === '')
    {
        console.log('boş token url',url)
    }
    let baseURL = 'http://localhost:5189/api/'
    return new Promise( async(resolve,reject) => {

        const options = {
            method,
            headers:
            {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`}
            
        }
        
        
        if(data && method ==='POST'){
            options.body = JSON.stringify(data);
        }
        let response = null;
        try {
            
         response = await fetch(baseURL +url,options);
        } catch (error) {
            console.log('response error',error)
        } 
        let result = null;
        try {
            
            result = await response.json();
        } catch (errt) {
            console.log('result error',errt)
        }
        
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