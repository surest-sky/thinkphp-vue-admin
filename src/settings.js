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

  // AdminApiUrl: 'http://store.ink', // 本地
  // AdminApiUrl: 'http://test-offline.d88.ink', // 线上
  // AdminApiUrl: 'http://192.168.2.199:96', // 周坤
  AdminApiUrl: 'http://vue-admin.test', // 周坤

  
// const Api = process.end.NODE_ENV === "development" ? "http://store.ink/admin/" : "http://test-offline.d88.ink/admin/"

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
