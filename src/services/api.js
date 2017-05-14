/**
 * Created by wuke on 2017/5/9.
 */
import store from 'store'
const HOST = 'http://docker.cc:8888/v1/'

export const API = {
  get: (url) => {
    return window.fetch(`${HOST}${url}`, {
      method: 'GET',
      mode: 'cors',
      redirect: 'follow',
      headers: {
        authorization: store.get('user') && store.get('user').clientToken
      },  //从store中获取用户的token
    }).then(res => {
      return res.json()
    })
  },
  post: (url, body) => {
    return window.fetch(`${HOST}${url}`, {
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      headers: {
        authorization: store.get('user') && store.get('user').clientToken
      },
      body: JSON.stringify(body),
    })
  },
}
