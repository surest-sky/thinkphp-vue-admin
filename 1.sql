-- ----------------------------
-- Table structure for bx_admin_menu
-- ----------------------------
DROP TABLE IF EXISTS `bx_admin_menu`;
CREATE TABLE `bx_admin_menu` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL DEFAULT '0',
  `order` int(11) NOT NULL DEFAULT '0',
  `title` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uri` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `permission` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of bx_admin_menu
-- ----------------------------
INSERT INTO `bx_admin_menu` VALUES ('1', '0', '1', '仪表盘', 'fa-bar-chart', '/', null, null, '2019-07-03 14:12:00');
INSERT INTO `bx_admin_menu` VALUES ('2', '0', '2', '安全管理', 'fa-tasks', null, null, null, '2019-07-03 14:11:11');
INSERT INTO `bx_admin_menu` VALUES ('3', '2', '3', '管理员管理', 'fa-users', 'auth/users', null, null, '2019-07-03 14:11:19');
INSERT INTO `bx_admin_menu` VALUES ('4', '2', '4', '角色管理', 'fa-user', 'auth/roles', null, null, '2019-07-03 14:11:25');
INSERT INTO `bx_admin_menu` VALUES ('5', '2', '5', '权限管理', 'fa-ban', 'auth/permissions', null, null, '2019-07-03 14:11:32');
INSERT INTO `bx_admin_menu` VALUES ('6', '0', '7', '菜单管理', 'fa-bars', 'auth/menu', null, null, '2019-06-29 11:13:10');
INSERT INTO `bx_admin_menu` VALUES ('7', '2', '6', '管理日志', 'fa-history', 'auth/logs', null, null, '2019-07-03 14:11:51');
INSERT INTO `bx_admin_menu` VALUES ('8', '0', '8', '用户管理', 'fa-user', 'users', null, '2019-06-29 10:54:22', '2019-06-29 11:13:05');
INSERT INTO `bx_admin_menu` VALUES ('9', '8', '10', '用户日志', 'fa-clone', 'user-logs', null, '2019-06-29 11:13:43', '2019-06-29 11:16:21');
INSERT INTO `bx_admin_menu` VALUES ('10', '8', '9', '用户列表', 'fa-user', 'users', null, '2019-06-29 11:15:50', '2019-06-29 11:16:21');
INSERT INTO `bx_admin_menu` VALUES ('11', '0', '0', '卡密管理', 'fa-bars', 'agent-cards', null, '2019-07-03 14:02:40', '2019-07-03 14:02:40');
INSERT INTO `bx_admin_menu` VALUES ('12', '11', '0', '卡密管理', 'fa-bars', 'agent-cards', null, '2019-07-03 14:03:03', '2019-07-03 14:03:03');
INSERT INTO `bx_admin_menu` VALUES ('13', '11', '0', '卡类管理', 'fa-bars', 'card-types', null, '2019-07-03 14:03:31', '2019-07-03 14:04:28');
INSERT INTO `bx_admin_menu` VALUES ('14', '11', '0', '单卡管理', 'fa-bars', 'cards', null, '2019-07-03 14:06:06', '2019-07-03 14:06:06');
INSERT INTO `bx_admin_menu` VALUES ('15', '11', '0', '充值记录', 'fa-bars', 'recharge-logs', null, '2019-07-03 14:09:11', '2019-07-03 14:09:11');
INSERT INTO `bx_admin_menu` VALUES ('16', '2', '0', '黑名单', 'fa-bars', 'blacks', null, '2019-07-03 14:13:47', '2019-07-03 14:13:47');
INSERT INTO `bx_admin_menu` VALUES ('17', '2', '0', '配置设置', 'fa-bars', 'configs', null, '2019-07-03 14:16:35', '2019-07-03 14:16:43');
INSERT INTO `bx_admin_menu` VALUES ('18', '0', '0', '程序管理', 'fa-bars', 'software', null, '2019-07-03 14:17:59', '2019-07-03 14:17:59');
INSERT INTO `bx_admin_menu` VALUES ('19', '0', '0', '推广日志', 'fa-bars', 'spread-logs', null, '2019-07-03 14:22:58', '2019-07-03 14:22:58');