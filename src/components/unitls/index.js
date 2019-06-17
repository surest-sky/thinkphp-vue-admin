
export function jsonRemove(data, key, value) {
    data.map((item, key) => {
      if(item['id'] == value) {
        data.splice(key, 1)
      }
    })

    return data
  }