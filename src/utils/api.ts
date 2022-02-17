import request from './request'


export function getEnumData(data:any){
  return request({
    url: '/api/policySubsidy/getProblemBOInfo',
    method: 'get',
    params:data
  })
}

export function assessData(data:any){
  return request({
    url: '/sp/registerRecord/getMatchList',
    method: 'post',
    data
  })
}

export function getDetail(data:any){
  return request({
    url: '/api/policySubsidy/getDetail',
    method: 'get',
    params:data
  })
}

export function getQuestionAnswer(data:any){
  return request({
    url: '/api/policySubsidy/getPolicyProblemList',
    method: 'get',
    params:data
  })
}

export function getChildQuestionAnswer(data:any){
  return request({
    url: '/api/policySubsidy/getLastProblemBOInfo',
    method: 'get',
    params:data
  })
}

export function getChildQuestionAnswerNew(data:any){
  return request({
    url: '/api/policySubsidy/getAnswerBOList',
    method: 'get',
    params:data
  })
}


export function policyMatch(data:any){
  return request({
    url: '/api/policySubsidy/match',
    method: 'post',
    data
  })
}


export function getMatchDetail(data:any){
  return request({
    url: '/api/policySubsidy/getMatchDetail',
    method: 'get',
    params:data
  })
}


export function getRecordList(params:any){
  return request({
    url: '/api/policySubsidy/queryList',
    method: 'get',
    params
  })
}


export function getUserCode(){
  return request({
    url: '/api/policySubsidy/getUserCode',
    method: 'get',

  })
}


export function getTelephone(){
  return request({
    url: '/api/policySubsidy/getWebsiteTelephone',
    method: 'get',
  })
}



export function deleteRecord(params){
  return request({
    url: '/api/policySubsidy/deleteMatchRecord',
    method: 'get',
    params
  })
}


