export const STORAGE_NAME = "nuovo-ordine"
export const EXPIRE_TIME = 86400000
export async function setItem(key: string, value: any, expireIn: number) {
    let expireTime = Date.now() + expireIn
    let result = {
        data: value,
        expire: expireTime
    }
    const str = JSON.stringify(result)
    localStorage.setItem(key, str)
}

export async function getItem(key: string) {
    const result = JSON.parse(localStorage.getItem(key) as string)

    if(!result) return null

    if(result.expire <= Date.now()) {
        localStorage.removeItem(key)
        return null
    }
    return result.data
}

export async function addItem(key: string, value: any, expireIn: number) {
    let storage = await getItem(key)
    if(storage) {
        storage.push(value)
        setItem(key, storage, expireIn)
        return
    }
    setItem(key, [value], expireIn)
}

export async function addToOrder(key: string, value: any) {
    const order = await getItem(key)
    if(!order) {
        addItem(STORAGE_NAME, value, EXPIRE_TIME)
        return
    }

    let check = true
    for(let i = 0; i < order.length && check; ++i) {
        if(order[i]['IDProdotto'] == value['IDProdotto']) {
            order[i]['Quantita'] += value['Quantita']
            check = false
        }
    }
    if(!check) {
        await setItem(STORAGE_NAME, order, EXPIRE_TIME)
        return
    }
    await addItem(STORAGE_NAME, value, EXPIRE_TIME)
}
