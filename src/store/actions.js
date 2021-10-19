export default {
  addCart(context, payload) {
    // payload新添加的商品
    // 方法一
    // let oldProduct = null;
    // for (let item of state.cartList) {
    //   if (item.iid === payload.iid) {
    //     oldProduct = item;
    //   }
    // }

    // 方法二
    return new Promise((resolve, reject) => {
      // 1.查找之前的数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      // 2.判断oldProduct
      if (oldProduct) { // 数量+1
        // oldProduct.count += 1
        context.commit('addCounter', oldProduct)
        resolve('当前商品数量+1')
      } else { // 添加新的商品
        payload.count = 1
          // state.cartList.push(payload)
        context.commit('addToCart', payload)
        resolve('添加了新的商品')
      }
    })
  }
}