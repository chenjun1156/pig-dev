/**
 * 配置常量 已下所有均为示例值请以实际开发api文档为准
 * 本文件中的参数如有改动需要重新编译
 * 本文件中的参数如有改动需要重新编译
 * 本文件中的参数如有改动需要重新编译
 */

const BASE_URL_LOCAL = "http://127.0.0.1:3010";
const BASE_URL_DEVELOPMENT = "https://www.lzwchina.com"; //测试(以实际开发api文档为准)
const BASE_URL_PRODUCTION = "https://www.lzwchina.com"; //正式服(以实际开发api文档为准)
const LOGINAPI = "/api/v1/member/wxlogin"; //登录接口(以实际开发api文档为准)
const USERINFO = "/api/v1/member/info"; //用户资料接口(以实际开发api文档为准)

//腾讯云对象存储参数配置
const OSSPARAMETER = {
    bucket: 'lianzhuwang', //存储桶名称
    appid: '1257404648', //腾讯云中项目APPID
    sid: 'AKIDFJ9l9JSyTkncCYMYCcnkTxDE2cy5GZw4', //SecretId
    skey: '1nJZaLzQdeS2QYR4RZS5SZVBcnlUyCBu', //SecretKey
    region: 'sh', //对象存储所属地域
};

//阿里云对象存储参数配置
const OSSALIYUN = '/api/v2/admin/imgkeyali'; //获取阿里云对象存储参数接口(以实际开发api文档为准)

const FORMIDAPI = "/api/v1/member/formId"; //用于存放用户formId接口(以实际开发api文档为准)
const ENV = "local";
const DEBUG = false;
const BASE_URL = {
    local: BASE_URL_LOCAL,
    development: BASE_URL_DEVELOPMENT,
    production: BASE_URL_PRODUCTION,
};

module.exports = {
    BASE_URL,
    ENV,
    DEBUG,
    LOGINAPI,
    USERINFO,
    FORMIDAPI,
    OSSPARAMETER,
    OSSALIYUN
};