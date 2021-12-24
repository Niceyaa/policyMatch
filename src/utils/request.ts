import Axios, {Method, ResponseType, AxiosResponse} from 'axios'
import {reject} from "q";

interface AxiosData {
    url: string,
    method: Method,
    header?: any,
    contentType?: string,
    data?: any,
    params?: any,
    json?: boolean,
    timeout?: number,
    responseType?: ResponseType
}

const service = Axios.create({
    // 借用代理 没区分环境
    baseURL: "/jiekou_api",
    timeout: 15000
})

service.interceptors.request.use(configs => {
        return configs
    },
    error => {
        return error
    })

service.interceptors.response.use(response => {
        return response
    },
    reject => {
        return reject
    })

export default function request(arr: AxiosData) {
    return new Promise<any>(resolve => {
        service({
            url: arr.url,
            method: arr.method || "post",
            timeout: arr.timeout || 15000,
            /*headers: {
                'content-type': arr.contentType ? arr.contentType : arr.json ? 'application/json;charset=UTF-8' : 'application/x-www-form-urlencoded;charset=UTF-8'
            },*/
            params: arr.params || '',
            data: arr.data || "",
            responseType: arr.responseType || 'json'
        }).then((res:AxiosResponse)=>{
            return resolve(res)
        })
    })
}


