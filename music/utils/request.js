//封装发送ajax请求的功能函数
/* 
  封装功能函数的特点:
    1.功能点明确
    2.函数内部保留固定的代码(静态代码)
    3.将动态的数据抽取出来,由使用者提供最终的数据,以形参的形式提取
    4.一个良好的功能函数应该设置形参的默认值

    封装功能组件的特点:
    1.功能点明确
    2.组件内部应该保留静态代码
    3.将动态的数据提取成props参数,由使用者提供最终的数据
    4.一个良好的组件应该设置组件props数据的必要性和数据类型
*/
import config from "./config.js"
export default (url,data={},method="GET")=>{
  return new Promise((resolve,reject)=>{
    wx.request({
      url:config.host+url,
      data,
      method,
      header:{
        "cookie":"_ntes_nnid=88217ae6f922fd74eedfa23dd7ce3e80,1624957979992; _ntes_nuid=88217ae6f922fd74eedfa23dd7ce3e80; NMTID=00OFDCO_dBVZMtIvUqyjGnmxtpVc1gAAAF6VwsNJg; WNMCID=noumnd.1624957980454.01.0; WEVNSM=1.0.0; WM_NI=sHT3TbQjaWdxku3zGfTHApaezDgQ6iXAfev1QCLHX0VZnbBFE5OM3Yn7qxjdwFuE%2Fwm1cM8P58gxZ7SUhMNIFNk2GyYx05%2BUAUAjiFVRi0cDr3SdpquPxyPPO%2BB1cNsXeTg%3D; WM_NIKE=9ca17ae2e6ffcda170e2e6eeb0ca54fc8ea4b7aa6790e78bb2c44a839f9e84f1638597bea6e240958c9ad7f12af0fea7c3b92ab1989cd4d76a93b6afb8e774a9abfd9bc66e98988f91e46fba9ca9b2b5639c9faa86f53b939d84a9db3c9686a283c14e87eb81aeb253aee9bf99e970b59abba6ae7dafefadaebb5cf7e8a999d93d918ba8aecd438692a5d3c6739ba800d6aa5f838b8f8bec4e968ea7d1e250b2ed9d85f37bb790b89ad35c8df58ed2e246b188abb5e637e2a3; WM_TID=9KFJrEYWfMVEABEQUAMuzHdrQI5HGEvu; ntes_kaola_ad=1; JSESSIONID-WYYY=%2FKuhW404%5CmYVP%5C32G2cv6NA7nRjC1s%2F7EHjRHSrDkT52E2ydaJea%5CrFd7M4JdKkxSEZf%2Bza4W%5C6%2F7VD8KdYAIVeKgqPpxZK4XnmHU9gsz0P%2BfnNHGirt2VSYi3%2BrUvJZqrR1CfyM5d8J5e4hU0eosDw1a%2FXOGMhMBd8VA%2B%2BHueH%2FAX51%3A1624960416069; _iuqxldmzr_=33; MUSIC_U=5ef7267e6c6eb1d765dc256fe0ee7e643271b233789184dc373a58aa0b45f3a533a649814e309366; __csrf=ea535857be1f8c73e1ac56035e61315a"
      },
      success:(res)=>{
        if(data.isLogin){
          wx.setStorageSync('cookies', res.header["Set-Cookie"]);
        }
        resolve(res.data);
      },
      fail:(err)=>{
        reject(err);
      }
    })
  })
}

