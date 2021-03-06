module.exports = {

  title: 'vue-admin-thinkphp - 后台管理系统',

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: false,

  AdminApiUrl: (process.env.NODE_ENV == "production") ? 'http://v.surest.cn/' : 'http://vue-admin-api.test/',  // 请求地址

    /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  tagsView: true,

    /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showSettings: true,
}
