
export function jsonRemove(data, key, value) {
    data.map((item, key) => {
      if(item['id'] == value) {
        data.splice(key, 1)
      }
    })

    return data
  }

export function statusToText(status){
  switch (parseInt(status)) {
    case 0:
      return "审核中"
    case 1:
      return "已上线"
    case 2:
      return "已下架"
    case 3:
      return "已拒绝"
    default:
      return "异常"
  }
}

export function storeStatusType(status, data){
  status = parseInt(status);
  
  console.log(data)

  let result = data.find((r) => {
    return r.id == status
  })

  if(!result) {
    return "暂无"
  }else {
    return result.name
  }
}