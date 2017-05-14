/**
 * Created by wuke on 2017/5/9.
 */
import store from "store";
const HOST = "http://docker.cc:8888/v1/";

export const API = {
  get: (url) => {
    return window.fetch(`${HOST}${url}`, {
      method: "GET",
      mode: "cors",
      redirect: "follow",
      headers: {
        authorization: store.get("user") && store.get("user").clientToken,
      },  //从store中获取用户的token
    })
      .then(res => {
        return res.json();
      });
  },
  getNative: (url) => {
    return window.fetch(`${HOST}${url}`, {
      method: "GET",
      mode: "cors",
      redirect: "follow",
      headers: {
        authorization: store.get("user") && store.get("user").clientToken,
      },  //从store中获取用户的token
    })
  },
  post: (url, body) => {
    return window.fetch(`${HOST}${url}`, {
      method: "POST",
      mode: "cors",
      redirect: "follow",
      headers: {
        authorization: store.get("user") && store.get("user").clientToken,
      },
      body: JSON.stringify(body),
    })
      .then(res => {
        return res.json();
      });
  },
  put: (url, body) => {
    return window.fetch(`${HOST}${url}`, {
      method: "PUT",
      mode: "cors",
      redirect: "follow",
      headers: {
        authorization: store.get("user") && store.get("user").clientToken,
      },
      body: JSON.stringify(body),
    })
      .then(res => {
        return res.json();
      });
  },
  putNative: (url, body) => {
    return window.fetch(`${HOST}${url}`, {
      method: "PUT",
      mode: "cors",
      redirect: "follow",
      headers: {
        authorization: store.get("user") && store.get("user").clientToken,
      },
      body: JSON.stringify(body),
    })
  },
  delete: (url, body) => {
    return window.fetch(`${HOST}${url}`, {
      method: "DELETE",
      mode: "cors",
      redirect: "follow",
      headers: {
        authorization: store.get("user") && store.get("user").clientToken,
      },
      body: JSON.stringify(body),
    })
      .then(res => {
        if (res.status == 200 || res.status == 204) {
          return {message: 'ok'}
        }
        return res.json();
      });
  },
};
