/*
 Navicat MySQL Data Transfer

 Source Server         : mamp
 Source Server Version : 50509
 Source Host           : localhost
 Source Database       : cssizer

 Target Server Version : 50509
 File Encoding         : utf-8

 Date: 10/05/2011 21:23:55 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `builds`
-- ----------------------------
DROP TABLE IF EXISTS `builds`;
CREATE TABLE `builds` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `css` longtext COLLATE utf8_bin,
  `doctype` int(11) NOT NULL DEFAULT '0',
  `html` longtext COLLATE utf8_bin,
  `javascript` longtext COLLATE utf8_bin,
  `tmp` tinyint(1) DEFAULT NULL,
  `views` int(11) NOT NULL DEFAULT '0',
  `edit_key` varchar(256) COLLATE utf8_bin NOT NULL,
  `view_key` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `edits` int(11) NOT NULL,
  `default` tinyint(1) NOT NULL DEFAULT '0',
  `created` int(11) NOT NULL,
  `modified` int(11) NOT NULL,
  `last_viewed` int(11) NOT NULL,
  `twitter_user` varchar(256) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

SET FOREIGN_KEY_CHECKS = 1;
