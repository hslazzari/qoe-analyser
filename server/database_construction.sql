CREATE DATABASE  IF NOT EXISTS `monitor` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `monitor`;
-- MySQL dump 10.13  Distrib 5.6.19, for osx10.7 (i386)
--
-- Host: localhost    Database: monitor
-- ------------------------------------------------------
-- Server version	5.6.14

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `audio_bytes_decoded_per_second`
--

DROP TABLE IF EXISTS `audio_bytes_decoded_per_second`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `audio_bytes_decoded_per_second` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `current_video_position` float NOT NULL,
  `timestamp_of_audio_bytes_decoded` bigint(64) NOT NULL,
  `video_information_id` int(11) NOT NULL,
  `audio_bytes` float NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `buffer_interval`
--

DROP TABLE IF EXISTS `buffer_interval`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `buffer_interval` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start_buffer_time` float NOT NULL,
  `end_buffer_time` float NOT NULL,
  `video_information_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `config`
--

DROP TABLE IF EXISTS `config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `config` (
  `idconfig` int(11) NOT NULL AUTO_INCREMENT,
  `endereco` varchar(128) DEFAULT NULL,
  `monitorar` varchar(5) DEFAULT NULL,
  `questionario` varchar(5) DEFAULT NULL,
  `relatorio` varchar(5) DEFAULT NULL,
  `intervalo_minimo_de_stall` int(11) DEFAULT NULL,
  `intervalo_de_monitoramento` int(11) DEFAULT NULL,
  `enviar_para_servidor` varchar(5) DEFAULT NULL,
  `simulador` varchar(45) DEFAULT NULL,
  `startup_time` int(11) DEFAULT NULL,
  `stall_duration` int(11) DEFAULT NULL,
  `ativar_startup_stall` varchar(5) DEFAULT NULL,
  `ativar_stall` varchar(5) DEFAULT NULL,
  `show_video_controls` varchar(5) DEFAULT NULL,
  `show_questionario_simulador` varchar(5) DEFAULT NULL,
  `url_resolucao_1` varchar(256) DEFAULT NULL,
  `url_resolucao_2` varchar(256) DEFAULT NULL,
  `url_resolucao_3` varchar(256) DEFAULT NULL,
  `url_resolucao_4` varchar(256) DEFAULT NULL,
  `url_resolucao_5` varchar(256) DEFAULT NULL,
  `ativar_troca_de_resolucao` varchar(5) DEFAULT NULL,
  `url_page_simulador` varchar(256) DEFAULT NULL,
  `timestamp` bigint(64) DEFAULT NULL,
  `perfil` varchar(10) DEFAULT '0',
  PRIMARY KEY (`idconfig`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `config_estado_stall`
--

DROP TABLE IF EXISTS `config_estado_stall`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `config_estado_stall` (
  `idconfig_estado_stall` int(11) NOT NULL AUTO_INCREMENT,
  `posicao` varchar(8) DEFAULT NULL,
  `estado` varchar(8) DEFAULT NULL,
  `perfil` varchar(10) DEFAULT '0',
  PRIMARY KEY (`idconfig_estado_stall`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `config_resolution_state`
--

DROP TABLE IF EXISTS `config_resolution_state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `config_resolution_state` (
  `idconfig_resolution_state` int(11) NOT NULL AUTO_INCREMENT,
  `posicao` varchar(8) DEFAULT NULL,
  `estado` varchar(8) DEFAULT NULL,
  `perfil` varchar(45) DEFAULT '0',
  PRIMARY KEY (`idconfig_resolution_state`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `email_info`
--

DROP TABLE IF EXISTS `email_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `email_info` (
  `email` varchar(255) NOT NULL,
  `email_id` int(11) NOT NULL AUTO_INCREMENT,
  `watched_1` int(11) DEFAULT NULL,
  `watched_2` int(11) DEFAULT NULL,
  `watched_3` int(11) DEFAULT NULL,
  `watched_4` int(11) DEFAULT NULL,
  `watched_5` int(11) DEFAULT NULL,
  `watched_6` int(11) DEFAULT NULL,
  `watched_7` int(11) DEFAULT NULL,
  `watched_8` int(11) DEFAULT NULL,
  `watched_9` int(11) DEFAULT NULL,
  `watched_10` int(11) DEFAULT NULL,
  `video_config_1` int(11) DEFAULT NULL,
  `video_config_2` int(11) DEFAULT NULL,
  `video_config_3` int(11) DEFAULT NULL,
  `video_config_4` int(11) DEFAULT NULL,
  `video_config_5` int(11) DEFAULT NULL,
  `video_config_6` int(11) DEFAULT NULL,
  `video_config_7` int(11) DEFAULT NULL,
  `video_config_8` int(11) DEFAULT NULL,
  `video_config_9` int(11) DEFAULT NULL,
  `video_config_10` int(11) DEFAULT NULL,
  `video_pos_1` int(11) DEFAULT NULL,
  `video_pos_2` int(11) DEFAULT NULL,
  `video_pos_3` int(11) DEFAULT NULL,
  `video_pos_4` int(11) DEFAULT NULL,
  `video_pos_5` int(11) DEFAULT NULL,
  `video_pos_6` int(11) DEFAULT NULL,
  `video_pos_7` int(11) DEFAULT NULL,
  `video_pos_8` int(11) DEFAULT NULL,
  `video_pos_9` int(11) DEFAULT NULL,
  `video_pos_10` int(11) DEFAULT NULL,
  PRIMARY KEY (`email_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `frame_per_second`
--

DROP TABLE IF EXISTS `frame_per_second`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `frame_per_second` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `current_video_position` float NOT NULL,
  `timestamp_of_frame` bigint(64) NOT NULL,
  `video_information_id` int(11) NOT NULL,
  `number_of_frames` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `length_of_stall`
--

DROP TABLE IF EXISTS `length_of_stall`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `length_of_stall` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `current_video_position` float NOT NULL,
  `timestamp_of_stall` bigint(64) NOT NULL,
  `video_information_id` int(11) NOT NULL,
  `duration_of_stall` float NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mute_state`
--

DROP TABLE IF EXISTS `mute_state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mute_state` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `current_video_position` float NOT NULL,
  `timestamp_of_mute_state` bigint(64) NOT NULL,
  `state` int(11) NOT NULL,
  `video_information_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `network_state`
--

DROP TABLE IF EXISTS `network_state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `network_state` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `current_video_position` float NOT NULL,
  `timestamp_of_network_state` bigint(64) NOT NULL,
  `state` int(11) NOT NULL,
  `video_information_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `playback_quality`
--

DROP TABLE IF EXISTS `playback_quality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `playback_quality` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp_of_quality` bigint(64) NOT NULL,
  `current_video_position` float NOT NULL,
  `video_width` int(11) NOT NULL,
  `video_height` int(11) NOT NULL,
  `video_information_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `played_interval`
--

DROP TABLE IF EXISTS `played_interval`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `played_interval` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start_play` float NOT NULL,
  `end_play` float NOT NULL,
  `video_information_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `questionario`
--

DROP TABLE IF EXISTS `questionario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questionario` (
  `idquestionario` int(11) NOT NULL AUTO_INCREMENT,
  `email_id` varchar(40) DEFAULT NULL,
  `timestamp` bigint(64) DEFAULT NULL,
  `experiencia` int(11) DEFAULT NULL,
  `conteudo` int(11) DEFAULT NULL,
  `int_horas_por_dia` int(11) DEFAULT NULL,
  `dias_por_semana` int(11) DEFAULT NULL,
  `idade` int(11) DEFAULT NULL,
  `sexo` int(11) DEFAULT NULL,
  `grupo` int(11) DEFAULT NULL,
  `config_inicial` int(11) DEFAULT NULL,
  `video_id` int(11) DEFAULT NULL,
  `perguntas` int(11) DEFAULT '0',
  PRIMARY KEY (`idquestionario`),
  UNIQUE KEY `idquestionario_UNIQUE` (`idquestionario`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `skip_play`
--

DROP TABLE IF EXISTS `skip_play`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `skip_play` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `current_video_position` float NOT NULL,
  `timestamp_of_skip` bigint(64) NOT NULL,
  `video_information_id` int(11) NOT NULL,
  `skip_duration` float NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `stall_position_simulador`
--

DROP TABLE IF EXISTS `stall_position_simulador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stall_position_simulador` (
  `id_simulador` int(11) NOT NULL,
  `position_percent` varchar(8) NOT NULL,
  PRIMARY KEY (`id_simulador`,`position_percent`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `time_in_buffer`
--

DROP TABLE IF EXISTS `time_in_buffer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `time_in_buffer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `current_video_position` float NOT NULL,
  `timestamp_of_time` bigint(64) NOT NULL,
  `video_information_id` int(11) NOT NULL,
  `remaining_time_in_buffer` float NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `video_bytes_decoded_per_second`
--

DROP TABLE IF EXISTS `video_bytes_decoded_per_second`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `video_bytes_decoded_per_second` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `current_video_position` float NOT NULL,
  `timestamp_of_video_bytes_decoded` bigint(64) NOT NULL,
  `video_information_id` int(11) NOT NULL,
  `video_bytes` float NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `video_information`
--

DROP TABLE IF EXISTS `video_information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `video_information` (
  `idvideo_information` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(40) NOT NULL,
  `start_timestamp` bigint(64) NOT NULL,
  `hash` varchar(64) NOT NULL,
  `netmetric` varchar(45) DEFAULT NULL,
  `total_played_time` float NOT NULL,
  `total_played_time_with_stall` float NOT NULL,
  `total_stall_length` float NOT NULL,
  `total_number_of_stall` float NOT NULL,
  `video_duration` float NOT NULL,
  `dropped_frames` int(11) NOT NULL,
  `left_time` float NOT NULL,
  `video_information_id` int(11) NOT NULL DEFAULT '0',
  `video_preload` varchar(16) NOT NULL,
  `video_start_time` float NOT NULL,
  `simulado` varchar(10) DEFAULT 'false',
  `perfil` varchar(4) DEFAULT '0',
  PRIMARY KEY (`idvideo_information`),
  UNIQUE KEY `video_information_id_UNIQUE` (`video_information_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `video_information_simulador`
--

DROP TABLE IF EXISTS `video_information_simulador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `video_information_simulador` (
  `idvideo_information_simulador` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(40) NOT NULL,
  `hash` varchar(64) NOT NULL,
  `start_timestamp` bigint(64) NOT NULL,
  `video_duration` float NOT NULL,
  `ativar_stall` varchar(8) NOT NULL,
  `ativar_startup_stall` varchar(8) NOT NULL,
  `show_video_controls` varchar(8) NOT NULL,
  `stall_duration` int(11) NOT NULL,
  `startup_time` int(11) NOT NULL,
  `url_page_simulador` varchar(512) NOT NULL,
  `url_resolucao_1` varchar(512) NOT NULL,
  `url_resolucao_2` varchar(512) NOT NULL,
  `url_resolucao_3` varchar(512) NOT NULL,
  `url_resolucao_4` varchar(512) NOT NULL,
  `url_resolucao_5` varchar(512) NOT NULL,
  `url_resolucao_6` varchar(512) NOT NULL,
  `ativar_troca_de_resolucao` varchar(8) NOT NULL,
  `simulado` varchar(10) DEFAULT 'false',
  `perfil` varchar(4) DEFAULT '0',
  PRIMARY KEY (`idvideo_information_simulador`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `video_source`
--

DROP TABLE IF EXISTS `video_source`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `video_source` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source` varchar(512) NOT NULL,
  `video_information_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `volume_state`
--

DROP TABLE IF EXISTS `volume_state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `volume_state` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `current_video_position` float NOT NULL,
  `timestamp_of_volume` bigint(64) NOT NULL,
  `video_information_id` int(11) NOT NULL,
  `volume` float NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `watched`
--

DROP TABLE IF EXISTS `watched`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `watched` (
  `idwatched` int(11) NOT NULL AUTO_INCREMENT,
  `hash` varchar(100) NOT NULL,
  `watched_1` varchar(10) DEFAULT NULL,
  `watched_2` varchar(10) DEFAULT NULL,
  `watched_3` varchar(10) DEFAULT NULL,
  `watched_4` varchar(10) DEFAULT NULL,
  `watched_5` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`idwatched`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-03-16 19:41:29
