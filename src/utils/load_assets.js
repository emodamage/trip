/**
 * 获取图片地址
 * @param {string} image 图片地址 
 * @returns {string} 完整的图片地址
 * new URL
 * 参数一：相对路径
 * 参数二：当前路径的URL
 */
export const getAssetURL = (image) => new URL(`../assets/img/${image}`, import.meta.url).href
