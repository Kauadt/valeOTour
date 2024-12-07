-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.28-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for valeotour
DROP DATABASE IF EXISTS `valeotour`;
CREATE DATABASE IF NOT EXISTS `valeotour` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `valeotour`;

-- Dumping structure for table valeotour.agendamentos_guia
DROP TABLE IF EXISTS `agendamentos_guia`;
CREATE TABLE IF NOT EXISTS `agendamentos_guia` (
  `id_agendamento` int(11) NOT NULL AUTO_INCREMENT,
  `data_agendamento` date DEFAULT NULL,
  `numero_pessoas_agendamento` int(11) DEFAULT NULL,
  `id_guia` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `latitude_agendamento` varchar(250) DEFAULT NULL,
  `longitude_agendamento` varchar(250) DEFAULT NULL,
  `numero_horas_agendamento` varchar(50) DEFAULT NULL,
  `horario_inicio_agendamento` time DEFAULT NULL,
  `status_agendamento` varchar(50) DEFAULT 'Aguardando confirmação do guia',
  PRIMARY KEY (`id_agendamento`),
  KEY `id_guia` (`id_guia`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `agendamentos_guia_ibfk_1` FOREIGN KEY (`id_guia`) REFERENCES `guias` (`id_guia`) ON DELETE CASCADE,
  CONSTRAINT `agendamentos_guia_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=130 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table valeotour.agendamentos_guia: ~60 rows (approximately)
DELETE FROM `agendamentos_guia`;
INSERT INTO `agendamentos_guia` (`id_agendamento`, `data_agendamento`, `numero_pessoas_agendamento`, `id_guia`, `id_usuario`, `latitude_agendamento`, `longitude_agendamento`, `numero_horas_agendamento`, `horario_inicio_agendamento`, `status_agendamento`) VALUES
	(70, '2025-01-16', 3, 29, 49, '-24.724844821273', '-47.530337311327', '5', '08:00:00', 'Aceito'),
	(71, '2024-10-20', 4, 29, 57, '-24.724844821273', '-47.530337311327', '3', '07:30:00', 'Aceito'),
	(72, '2024-10-26', 5, 27, 56, '-24.496367410076', '-47.844117209315', '2', '01:15:00', 'Aceito'),
	(73, '2024-10-24', 1, 30, 56, '37.4208295208', '-122.08249613643', '2', '06:40:00', 'Aceito'),
	(74, '2024-10-26', 5, 30, 56, '37.423027582126', '-122.08333399147', '4', '03:15:00', 'Recusado'),
	(75, '2024-10-30', 5, 30, 56, '37.423949923226', '-122.08736736327', '3', '01:10:00', 'Recusado'),
	(76, '2024-10-31', 1, 30, 56, '-24.495221460128', '-47.843646816909', '2', '05:11:00', 'Aceito'),
	(77, '2024-10-26', 4, 29, 57, '-24.502920420022', '-47.840815410018', '2', '09:00:00', 'Aceito'),
	(78, '2024-10-26', 4, 29, 57, '-24.497802578667', '-47.84800440073', '2', '10:23:00', 'Recusado'),
	(79, '2024-10-26', 1, 29, 57, '-24.498748060248', '-47.845204845071', '2', '09:00:00', 'Aceito'),
	(80, '2024-10-26', 2, 29, 57, '-24.497761696115', '-47.849656641483', '1', '15:30:00', 'Aceito'),
	(81, '2024-10-26', 2, 29, 57, '-24.49594576517', '-47.846915759146', '1', '04:09:00', 'Aceito'),
	(82, '2024-10-31', 2, 29, 57, '-24.496764645879', '-47.848378904164', '2', '10:00:00', 'Aceito'),
	(83, '2024-10-26', 2, 29, 57, '-24.49662826783', '-47.847605086863', '1', '06:00:00', 'Aceito'),
	(84, '2026-02-04', 2, 29, 57, '-24.49899853998', '-47.852459214628', '2', '12:00:00', 'Recusado'),
	(85, '2024-10-26', 2, 29, 57, '-24.496946483047', '-47.84825887531', '2', '04:00:00', 'Recusado'),
	(86, '2024-10-26', 2, 29, 57, '-24.49586308355', '-47.855645678937', '2', '16:34:00', 'Aceito'),
	(87, '2024-10-25', 2, 30, 56, '-24.494394026517', '-47.844691202044', '2', '16:25:00', 'Aceito'),
	(88, '2024-10-26', 1, 29, 57, '-24.497689693976', '-47.847594358027', '1', '06:26:00', 'Aceito'),
	(89, '2024-10-26', 1, 29, 57, '-24.495274242397', '-47.845684960485', '2', '12:45:00', 'Aceito'),
	(90, '2024-10-26', 2, 29, 57, '-24.497778476268', '-47.845555879176', '2', '05:32:00', 'Aceito'),
	(91, '2024-10-26', 2, 29, 57, '-24.499560515831', '-47.846917770803', '3', '05:00:00', 'Recusado'),
	(92, '2024-10-26', 2, 29, 57, '-24.494379381625', '-47.848231382668', '1', '05:54:00', 'Aceito'),
	(93, '2024-12-28', 5, 29, 57, '-24.49771928808', '-47.849107794464', '4', '06:00:00', 'Aceito'),
	(94, '2024-10-26', 3, 29, 57, '-24.497599996338', '-47.849364951253', '2', '01:00:00', 'Aceito'),
	(95, '2024-12-02', 3, 29, 57, '-24.503390549277', '-47.841259650886', '6', '01:00:00', 'Recusado'),
	(96, '2024-10-26', 2, 29, 57, '-24.497466365045', '-47.84987423569', '3', '12:38:00', 'Aceito'),
	(97, '2024-10-26', 3, 29, 57, '-24.497567961452', '-47.849449440837', '5', '12:00:00', 'Aceito'),
	(98, '2024-10-26', 3, 29, 57, '-24.498529919759', '-47.846390046179', '2', '04:00:00', 'Aceito'),
	(99, '2024-10-26', 3, 29, 57, '-24.493495803337', '-47.838353812695', '2', '12:00:00', 'Aceito'),
	(100, '2024-10-31', 3, 29, 57, '-24.494200591768', '-47.845266200602', '2', '12:30:00', 'Aceito'),
	(101, '2024-11-30', 2, 29, 57, '-24.494747028911', '-47.844887003303', '1', '12:00:00', 'Recusado'),
	(102, '2024-10-31', 2, 29, 57, '-24.497859326068', '-47.848258540034', '2', '09:00:00', 'Aceito'),
	(103, '2024-10-26', 2, 29, 57, '-24.498222386791', '-47.840964272618', '3', '12:22:00', 'Aceito'),
	(104, '2024-10-26', 3, 29, 49, '-24.498284625666', '-47.850800603628', '2', '12:00:00', 'Aceito'),
	(105, '2024-10-31', 2, 29, 57, '-24.494583189548', '-47.845512293279', '3', '09:00:00', 'Aceito'),
	(106, '2024-10-26', 2, 29, 57, '-24.508967594166', '-47.884970605373', '3', '12:00:00', 'Aceito'),
	(107, '2024-10-26', 9, 29, 57, '-24.731798500686', '-48.109152652323', '2', '12:45:00', 'Aceito'),
	(108, '2024-10-31', 2, 29, 57, '-24.728357644312', '-47.537320107222', '2', '09:30:00', 'Aceito'),
	(109, '2024-10-26', 1, 29, 57, '-25.011224566876', '-47.935198992491', '5', '12:25:00', 'Aceito'),
	(110, '2024-11-20', 5, 29, 57, '-24.499339325853', '-47.84928817302', '2', '10:00:00', 'Aceito'),
	(111, '2024-10-26', 2, 29, 57, '-24.499089151891', '-47.847922593355', '3', '11:00:00', 'Aceito'),
	(112, '2024-10-29', 3, 29, 57, '-24.496922075389', '-47.859463468194', '2', '12:00:00', 'Aceito'),
	(113, '2024-10-26', 3, 29, 57, '-24.498488732352', '-47.849599979818', '3', '12:01:00', 'Aceito'),
	(114, '2024-10-31', 5, 29, 57, '-24.500835172703', '-47.848899587989', '2', '12:00:00', 'Aceito'),
	(115, '2024-10-31', 2, 29, 49, '-24.498123841841', '-47.850381173193', '3', '05:53:00', 'Aceito'),
	(116, '2024-10-30', 6, 29, 49, '-24.496981263952', '-47.848448641598', '2', '00:00:00', 'Aceito'),
	(117, '2024-10-31', 3, 29, 49, '-24.498108282105', '-47.850433476269', '2', '12:00:00', 'Aceito'),
	(118, '2024-10-26', 3, 29, 49, '-24.52341745947', '-47.846777960658', '2', '07:00:00', 'Aceito'),
	(119, '2024-10-31', 2, 29, 57, '-24.497303139415', '-47.84910377115', '2', '12:00:00', 'Aceito'),
	(120, '2024-10-30', 2, 29, 57, '-24.49814977473', '-47.85027757287', '2', '12:01:00', 'Aceito'),
	(121, '2024-10-25', 1, 29, 57, '-24.500284490791', '-47.851018533111', '1', '07:30:00', 'Recusado'),
	(122, '2024-10-30', 2, 29, 57, '-24.498046348235', '-47.846985161304', '2', '14:00:00', 'Aceito'),
	(123, '2024-10-26', 2, 29, 57, '-24.499364038132', '-47.848796322942', '2', '15:47:00', 'Aguardando confirmação do guia'),
	(124, '2024-10-26', 2, 29, 57, '-24.500627408786', '-47.847095802426', '2', '12:00:00', 'Aceito'),
	(125, '2024-10-29', 2, 29, 57, '-24.496482431631', '-47.84791957587', '2', '12:00:00', 'Aceito'),
	(126, '2024-10-31', 2, 29, 57, '-24.497188118609', '-47.849696539342', '2', '08:00:00', 'Aceito'),
	(127, '2025-02-02', 2, 29, 57, '-24.497850478356', '-47.849776335061', '2', '12:00:00', 'Aceito'),
	(128, '2024-10-31', 2, 30, 56, '-24.497556062778', '-47.849545665085', '2', '12:00:00', 'Aceito'),
	(129, '2024-11-30', 2, 29, 49, '-24.738685713509', '-48.106101639569', '2', '04:00:00', 'Recusado');

-- Dumping structure for table valeotour.avaliacoes_guia
DROP TABLE IF EXISTS `avaliacoes_guia`;
CREATE TABLE IF NOT EXISTS `avaliacoes_guia` (
  `id_avaliacao_guia` int(11) NOT NULL AUTO_INCREMENT,
  `data_avaliacao` date DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_guia` int(11) DEFAULT NULL,
  `comentario_avaliacao_guia` varchar(500) DEFAULT NULL,
  `qtd_estrela_avaliacao_guia` float(2,1) DEFAULT NULL,
  PRIMARY KEY (`id_avaliacao_guia`) USING BTREE,
  KEY `id_usuario` (`id_usuario`),
  KEY `id_guia` (`id_guia`),
  CONSTRAINT `avaliacoes_guia_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
  CONSTRAINT `avaliacoes_guia_ibfk_2` FOREIGN KEY (`id_guia`) REFERENCES `guias` (`id_guia`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table valeotour.avaliacoes_guia: ~2 rows (approximately)
DELETE FROM `avaliacoes_guia`;
INSERT INTO `avaliacoes_guia` (`id_avaliacao_guia`, `data_avaliacao`, `id_usuario`, `id_guia`, `comentario_avaliacao_guia`, `qtd_estrela_avaliacao_guia`) VALUES
	(14, '2024-10-23', 57, 29, 'Excelente guia, recomendo.', 4.0),
	(15, '2024-10-23', 56, 30, 'Muito bom', 5.0);

-- Dumping structure for table valeotour.avaliacoes_ponto_turisticos
DROP TABLE IF EXISTS `avaliacoes_ponto_turisticos`;
CREATE TABLE IF NOT EXISTS `avaliacoes_ponto_turisticos` (
  `id_avaliacao_pt` int(11) NOT NULL AUTO_INCREMENT,
  `data_avaliacao` date DEFAULT NULL,
  `comentario_avaliacao_pt` varchar(500) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_ponto_turistico` int(11) DEFAULT NULL,
  `qtd_estrela_avaliacao_pt` float(2,1) DEFAULT NULL,
  PRIMARY KEY (`id_avaliacao_pt`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_ponto_turistico` (`id_ponto_turistico`),
  CONSTRAINT `avaliacoes_ponto_turisticos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
  CONSTRAINT `avaliacoes_ponto_turisticos_ibfk_2` FOREIGN KEY (`id_ponto_turistico`) REFERENCES `pontos_turisticos` (`id_ponto_turistico`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table valeotour.avaliacoes_ponto_turisticos: ~18 rows (approximately)
DELETE FROM `avaliacoes_ponto_turisticos`;
INSERT INTO `avaliacoes_ponto_turisticos` (`id_avaliacao_pt`, `data_avaliacao`, `comentario_avaliacao_pt`, `id_usuario`, `id_ponto_turistico`, `qtd_estrela_avaliacao_pt`) VALUES
	(13, '2024-10-21', 'Maravilhoso! Ótimas paisagens e agradável para passear com a família.', 49, 36, 5.0),
	(14, '2024-11-28', 'Atendimento bom e comida preparada com excelência ', 49, 33, 5.0),
	(15, '2024-10-21', 'Experiência maravilhosa, voltarei com toda certeza!', 54, 41, 4.9),
	(16, '2024-10-21', 'Encantador! Muito bom conhecer um pouco dos pontos históricos da nossa região.', 49, 47, 5.0),
	(17, '2024-10-22', 'muito bom', 56, 38, 3.3),
	(18, '2024-10-23', 'Legal!', 56, 42, 1.8),
	(19, '2024-10-22', 'gostei muito', 57, 41, 3.6),
	(20, '2024-10-24', 'muito legal', 56, 33, 2.3),
	(21, '2024-10-24', 'my bom', 56, 34, 5.0),
	(22, '2024-10-23', 'MT bom', 57, 47, 5.0),
	(23, '2024-10-24', 'aaaa', 56, 36, 1.8),
	(24, '2024-10-23', 'Meio pá ', 57, 35, 2.6),
	(25, '2024-10-24', 'aaanbbbbbbbbbbbb', 56, 47, 5.0),
	(26, '2024-10-24', 'Aaasaaaaaaa', 57, 34, 1.8),
	(27, '2024-10-24', 'muito bom', 56, 46, 1.8),
	(28, '2024-10-24', 'muito legal', 56, 41, 3.1),
	(29, '2024-10-24', 'legal', 56, 43, 2.8),
	(30, '2024-10-24', 'MT bommmm', 57, 33, 5.0),
	(31, '2024-11-28', 'mt bom', 49, 44, 5.0);

-- Dumping structure for table valeotour.canais_chat
DROP TABLE IF EXISTS `canais_chat`;
CREATE TABLE IF NOT EXISTS `canais_chat` (
  `id_canal_chat` int(11) NOT NULL AUTO_INCREMENT,
  `nome_canal` varchar(50) DEFAULT NULL,
  `id_guia` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_canal_chat`) USING BTREE,
  KEY `FK_conversas_guias` (`id_guia`),
  KEY `FK_conversas_usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table valeotour.canais_chat: ~6 rows (approximately)
DELETE FROM `canais_chat`;
INSERT INTO `canais_chat` (`id_canal_chat`, `nome_canal`, `id_guia`, `id_usuario`) VALUES
	(41, 'chat_49_56', 56, 49),
	(42, 'chat_54_56', 54, 56),
	(43, 'chat_56_57', 57, 56),
	(44, 'chat_49_57', 57, 49),
	(45, 'chat_49_50', 50, 49),
	(46, 'chat_55_57', 55, 57);

-- Dumping structure for table valeotour.fotos_pontos_turisticos
DROP TABLE IF EXISTS `fotos_pontos_turisticos`;
CREATE TABLE IF NOT EXISTS `fotos_pontos_turisticos` (
  `id_foto_pt` int(11) NOT NULL AUTO_INCREMENT,
  `caminho_imagem_pt` varchar(255) DEFAULT NULL,
  `id_ponto_turistico` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_foto_pt`),
  KEY `id_ponto_turistico` (`id_ponto_turistico`),
  CONSTRAINT `fotos_pontos_turisticos_ibfk_1` FOREIGN KEY (`id_ponto_turistico`) REFERENCES `pontos_turisticos` (`id_ponto_turistico`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table valeotour.fotos_pontos_turisticos: ~30 rows (approximately)
DELETE FROM `fotos_pontos_turisticos`;
INSERT INTO `fotos_pontos_turisticos` (`id_foto_pt`, `caminho_imagem_pt`, `id_ponto_turistico`) VALUES
	(72, '403336-mare_alta2.jpg', 33),
	(73, '844158-mare_alta1.jpg', 33),
	(74, '368275-feira2.jpg', 34),
	(75, '419907-barra_icapara1.jpg', 35),
	(76, '525844-barra_icapara.jpg', 35),
	(77, '150873-monumento_natural2.jpg', 36),
	(78, '870705-monumento_natural.jpg', 36),
	(79, '367438-dunas2.jpg', 37),
	(80, '546604-dunas1.jpg', 37),
	(81, '974468-beira_mar2.jpg', 38),
	(82, '83198-beira_mar1.jpg', 38),
	(83, '265848-casarao2.jpg', 39),
	(84, '343774-casarao1.jpg', 39),
	(85, '488982-trilha2.jpeg', 40),
	(86, '296484-trilha1.jpeg', 40),
	(87, '871587-rafting2.png', 41),
	(88, '551982-rafting1.png', 41),
	(89, '700260-caverna_diabo2.jpg', 42),
	(90, '393903-caverna_diabo1.jpg', 42),
	(91, '94177-igreja2.jpg', 43),
	(92, '715351-igreja1.jpg', 43),
	(93, '460437-trilha_betari1.jpg', 44),
	(94, '932137-trilha_betari2.jpg', 44),
	(95, '179304-pousada_cavernas1.jpg', 45),
	(96, '729389-pousada_cavernas.jpg', 45),
	(97, '375451-g_58_0_13_16112021091006.jpg', 46),
	(98, '837573-g_58_7_6_16112021091006.jpg', 46),
	(99, '686049-g_58_10_3_16112021091006.jpg', 46),
	(100, '262834-28369044_OQHE42det8eFJRY0weCDQ8q_18tZFphFKPYlMJr43uI.jpg', 47),
	(101, '527346-images.jpg', 47);

-- Dumping structure for table valeotour.guias
DROP TABLE IF EXISTS `guias`;
CREATE TABLE IF NOT EXISTS `guias` (
  `id_guia` int(11) NOT NULL AUTO_INCREMENT,
  `cadastur_frente` varchar(250) DEFAULT NULL,
  `cadastur_verso` varchar(250) DEFAULT NULL,
  `cadastur_guia` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `cidade_guia` varchar(50) DEFAULT NULL,
  `eixo_guia` varchar(50) DEFAULT NULL,
  `biografia_guia` varchar(500) DEFAULT NULL,
  `cpf_guia` varchar(50) DEFAULT NULL,
  `taxa_hora_guia` float DEFAULT NULL,
  `taxa_pessoa_guia` float DEFAULT NULL,
  PRIMARY KEY (`id_guia`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `guias_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table valeotour.guias: ~9 rows (approximately)
DELETE FROM `guias`;
INSERT INTO `guias` (`id_guia`, `cadastur_frente`, `cadastur_verso`, `cadastur_guia`, `id_usuario`, `cidade_guia`, `eixo_guia`, `biografia_guia`, `cpf_guia`, `taxa_hora_guia`, `taxa_pessoa_guia`) VALUES
	(23, NULL, NULL, 1000123, 50, 'Ilha Comprida', 'Gastronômico', 'Chef apaixonado por resgatar os sabores autênticos da Ilha Comprida. Com mais de 10 anos de experiência, minha missão é levar você em uma viagem gastronômica cheia de delícias locais e histórias que fazem cada prato ser único. Vamos juntos explorar os segredos da culinária caiçara?', '123.456.789-01', 30, 50),
	(24, NULL, NULL, 1000456, 51, 'Iguape', 'Gastronômico', 'Foodie e guia gastronômica de Iguape. Eu amo compartilhar os sabores da nossa terra através de experiências únicas de degustação. Vamos juntos conhecer o mercado local e preparar pratos que contam a história da nossa cultura?', '234.567.890-12', 22, 40),
	(25, NULL, NULL, 1000789, 52, 'Cananéia', 'Histórico', 'Historiador apaixonado por Cananéia. Venha comigo descobrir as riquezas do nosso passado, explorando pontos históricos e ouvindo as histórias que moldaram nossa cultura. Juntos, vamos desvendar segredos e curiosidades que fazem parte da nossa identidade.', '345.678.901-23', 30, 20),
	(26, NULL, NULL, 1000345, 53, 'Miracatu', 'Histórico', 'Arqueóloga e amante da história de Miracatu. Meu objetivo é levar você a uma viagem no tempo, explorando sítios arqueológicos e aprendendo sobre as culturas que habitaram nossa região. Vamos juntos descobrir nosso legado e suas histórias fascinantes.', '456.789.012-34', 32, 10),
	(27, NULL, NULL, 1000567, 54, 'Iporanga', 'Ecológico', 'Biólogo e apaixonado pela natureza de Iporanga. Eu sou seu guia para explorar a biodiversidade da Mata Atlântica. Juntos, vamos trilhar caminhos e descobrir a beleza do nosso meio ambiente, sempre com foco na preservação e na sustentabilidade.', '567.890.123-45', 40, 30),
	(28, NULL, NULL, 1000678, 55, 'Cananéia', 'Ecológico', 'Ecoturista de Cananéia, dedicando minha vida a conectar as pessoas à natureza. Vamos explorar as áreas de conservação e aprender sobre a importância da preservação do nosso planeta. Juntos, faremos a diferença.', '678.901.234-56', 70, 20),
	(29, NULL, NULL, 1000890, 56, 'Ilha Comprida', 'Aventura', 'Aventureiro de Ilha Comprida e amante de esportes radicais. Estou aqui para levar você a uma jornada emocionante com rafting e escaladas. Prepare-se para desafios que vão testar seus limites e proporcionar memórias inesquecíveis.', '789.012.345-67', 60, 30),
	(30, NULL, NULL, 1000912, 57, 'Miracatu', 'Aventura', 'Instrutora de esportes radicais em Miracatu. Minha paixão é criar experiências de aventura seguras e emocionantes. Venha se divertir e se conectar com a natureza em trilhas e atividades que vão fazer seu coração acelerar.', '890.123.456-78', 20, 40),
	(35, '', '', 277374901, 49, 'Miracatu', 'Aventura', 'Guia experiente', '287.373.47', 10, 40);

-- Dumping structure for table valeotour.horario_funcionamento
DROP TABLE IF EXISTS `horario_funcionamento`;
CREATE TABLE IF NOT EXISTS `horario_funcionamento` (
  `id_horario` int(11) NOT NULL AUTO_INCREMENT,
  `dia_da_semana` varchar(20) DEFAULT NULL,
  `hora_abertura` time DEFAULT NULL,
  `hora_fechamento` time DEFAULT NULL,
  `id_ponto_turistico` int(11) DEFAULT NULL,
  `status_funcionamento` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_horario`),
  KEY `id_ponto_turistico` (`id_ponto_turistico`),
  CONSTRAINT `horario_funcionamento_ibfk_1` FOREIGN KEY (`id_ponto_turistico`) REFERENCES `pontos_turisticos` (`id_ponto_turistico`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=280 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table valeotour.horario_funcionamento: ~105 rows (approximately)
DELETE FROM `horario_funcionamento`;
INSERT INTO `horario_funcionamento` (`id_horario`, `dia_da_semana`, `hora_abertura`, `hora_fechamento`, `id_ponto_turistico`, `status_funcionamento`) VALUES
	(168, 'Segunda', '00:00:00', '00:00:00', 33, 'Fechado'),
	(169, 'Terca', '09:00:00', '17:00:00', 33, 'Aberto'),
	(170, 'Quarta', '09:00:00', '17:00:00', 33, 'Aberto'),
	(171, 'Quinta', '09:00:00', '17:00:00', 33, 'Aberto'),
	(172, 'Sexta', '09:00:00', '17:00:00', 33, 'Aberto'),
	(173, 'Sabado', '10:00:00', '16:00:00', 33, 'Aberto'),
	(174, 'Domingo', '10:00:00', '16:00:00', 33, 'Aberto'),
	(175, 'Segunda', '06:00:00', '23:00:00', 34, 'Aberto'),
	(176, 'Terca', '06:00:00', '23:00:00', 34, 'Aberto'),
	(177, 'Quarta', '06:00:00', '23:00:00', 34, 'Aberto'),
	(178, 'Quinta', '06:00:00', '23:00:00', 34, 'Aberto'),
	(179, 'Sexta', '06:00:00', '23:00:00', 34, 'Aberto'),
	(180, 'Sabado', '06:00:00', '23:00:00', 34, 'Aberto'),
	(181, 'Domingo', '06:00:00', '23:00:00', 34, 'Aberto'),
	(182, 'Segunda', '10:00:00', '17:00:00', 35, 'Aberto'),
	(183, 'Terca', '10:00:00', '17:00:00', 35, 'Aberto'),
	(184, 'Quarta', '10:00:00', '17:00:00', 35, 'Aberto'),
	(185, 'Quinta', '10:00:00', '17:00:00', 35, 'Aberto'),
	(186, 'Sexta', '10:00:00', '17:00:00', 35, 'Aberto'),
	(187, 'Sabado', '10:00:00', '17:00:00', 35, 'Aberto'),
	(188, 'Domingo', '10:00:00', '17:00:00', 35, 'Aberto'),
	(189, 'Segunda', '04:00:00', '18:00:00', 36, 'Aberto'),
	(190, 'Terca', '04:00:00', '18:00:00', 36, 'Aberto'),
	(191, 'Quarta', '04:00:00', '18:00:00', 36, 'Aberto'),
	(192, 'Quinta', '04:00:00', '18:00:00', 36, 'Aberto'),
	(193, 'Sexta', '04:00:00', '18:00:00', 36, 'Aberto'),
	(194, 'Sabado', '04:00:00', '18:00:00', 36, 'Aberto'),
	(195, 'Domingo', '04:00:00', '18:00:00', 36, 'Aberto'),
	(196, 'Segunda', '00:00:00', '00:00:00', 37, 'Fechado'),
	(197, 'Terca', '00:00:00', '00:00:00', 37, 'Fechado'),
	(198, 'Quarta', '07:00:00', '17:00:00', 37, 'Aberto'),
	(199, 'Quinta', '07:00:00', '17:00:00', 37, 'Aberto'),
	(200, 'Sexta', '07:00:00', '17:00:00', 37, 'Aberto'),
	(201, 'Sabado', '07:00:00', '17:00:00', 37, 'Aberto'),
	(202, 'Domingo', '07:00:00', '17:00:00', 37, 'Aberto'),
	(203, 'Segunda', '00:00:00', '00:00:00', 38, 'Aberto'),
	(204, 'Terca', '00:00:00', '00:00:00', 38, 'Aberto'),
	(205, 'Quarta', '00:00:00', '00:00:00', 38, 'Aberto'),
	(206, 'Quinta', '00:00:00', '00:00:00', 38, 'Aberto'),
	(207, 'Sexta', '00:00:00', '00:00:00', 38, 'Aberto'),
	(208, 'Sabado', '00:00:00', '00:00:00', 38, 'Aberto'),
	(209, 'Domingo', '00:00:00', '00:00:00', 38, 'Aberto'),
	(210, 'Segunda', '00:00:00', '00:00:00', 39, 'Fechado'),
	(211, 'Terca', '00:00:00', '00:00:00', 39, 'Fechado'),
	(212, 'Quarta', '00:00:00', '00:00:00', 39, 'Fechado'),
	(213, 'Quinta', '19:00:00', '22:00:00', 39, 'Aberto'),
	(214, 'Sexta', '19:00:00', '22:00:00', 39, 'Aberto'),
	(215, 'Sabado', '19:00:00', '22:00:00', 39, 'Aberto'),
	(216, 'Domingo', '00:00:00', '00:00:00', 39, 'Fechado'),
	(217, 'Segunda', '00:00:00', '00:00:00', 40, 'Aberto'),
	(218, 'Terca', '00:00:00', '00:00:00', 40, 'Aberto'),
	(219, 'Quarta', '00:00:00', '00:00:00', 40, 'Aberto'),
	(220, 'Quinta', '00:00:00', '00:00:00', 40, 'Aberto'),
	(221, 'Sexta', '00:00:00', '00:00:00', 40, 'Aberto'),
	(222, 'Sabado', '00:00:00', '00:00:00', 40, 'Aberto'),
	(223, 'Domingo', '00:00:00', '00:00:00', 40, 'Aberto'),
	(224, 'Segunda', '00:00:00', '00:00:00', 41, 'Fechado'),
	(225, 'Terca', '00:00:00', '00:00:00', 41, 'Fechado'),
	(226, 'Quarta', '00:00:00', '00:00:00', 41, 'Fechado'),
	(227, 'Quinta', '00:00:00', '00:00:00', 41, 'Fechado'),
	(228, 'Sexta', '00:00:00', '00:00:00', 41, 'Aberto'),
	(229, 'Sabado', '00:00:00', '00:00:00', 41, 'Aberto'),
	(230, 'Domingo', '00:00:00', '00:00:00', 41, 'Aberto'),
	(231, 'Segunda', '08:00:00', '17:00:00', 42, 'Aberto'),
	(232, 'Terca', '08:00:00', '17:00:00', 42, 'Aberto'),
	(233, 'Quarta', '08:00:00', '17:00:00', 42, 'Aberto'),
	(234, 'Quinta', '08:00:00', '17:00:00', 42, 'Aberto'),
	(235, 'Sexta', '08:00:00', '17:00:00', 42, 'Aberto'),
	(236, 'Sabado', '08:00:00', '17:00:00', 42, 'Aberto'),
	(237, 'Domingo', '08:00:00', '17:00:00', 42, 'Aberto'),
	(238, 'Segunda', '00:00:00', '00:00:00', 43, 'Aberto'),
	(239, 'Terca', '00:00:00', '00:00:00', 43, 'Aberto'),
	(240, 'Quarta', '00:00:00', '00:00:00', 43, 'Aberto'),
	(241, 'Quinta', '00:00:00', '00:00:00', 43, 'Aberto'),
	(242, 'Sexta', '00:00:00', '00:00:00', 43, 'Aberto'),
	(243, 'Sabado', '00:00:00', '00:00:00', 43, 'Aberto'),
	(244, 'Domingo', '00:00:00', '00:00:00', 43, 'Aberto'),
	(245, 'Segunda', '06:00:00', '18:00:00', 44, 'Aberto'),
	(246, 'Terca', '06:00:00', '18:00:00', 44, 'Aberto'),
	(247, 'Quarta', '06:00:00', '18:00:00', 44, 'Aberto'),
	(248, 'Quinta', '06:00:00', '18:00:00', 44, 'Aberto'),
	(249, 'Sexta', '06:00:00', '18:00:00', 44, 'Aberto'),
	(250, 'Sabado', '06:00:00', '18:00:00', 44, 'Aberto'),
	(251, 'Domingo', '06:00:00', '18:00:00', 44, 'Aberto'),
	(252, 'Segunda', '00:00:00', '00:00:00', 45, 'Aberto'),
	(253, 'Terca', '00:00:00', '00:00:00', 45, 'Aberto'),
	(254, 'Quarta', '00:00:00', '00:00:00', 45, 'Aberto'),
	(255, 'Quinta', '00:00:00', '00:00:00', 45, 'Aberto'),
	(256, 'Sexta', '00:00:00', '00:00:00', 45, 'Aberto'),
	(257, 'Sabado', '00:00:00', '00:00:00', 45, 'Aberto'),
	(258, 'Domingo', '00:00:00', '00:00:00', 45, 'Aberto'),
	(259, 'Segunda', '00:00:00', '00:00:00', 46, 'Fechado'),
	(260, 'Terca', '13:30:00', '17:30:00', 46, 'Aberto'),
	(261, 'Quarta', '13:30:00', '17:30:00', 46, 'Aberto'),
	(262, 'Quinta', '13:30:00', '17:30:00', 46, 'Aberto'),
	(263, 'Sexta', '13:30:00', '17:30:00', 46, 'Aberto'),
	(264, 'Sabado', '13:30:00', '17:30:00', 46, 'Aberto'),
	(265, 'Domingo', '13:30:00', '17:30:00', 46, 'Aberto'),
	(266, 'Segunda', '00:00:00', '00:00:00', 47, 'Aberto'),
	(267, 'Terca', '00:00:00', '00:00:00', 47, 'Aberto'),
	(268, 'Quarta', '00:00:00', '00:00:00', 47, 'Aberto'),
	(269, 'Quinta', '00:00:00', '00:00:00', 47, 'Aberto'),
	(270, 'Sexta', '00:00:00', '00:00:00', 47, 'Aberto'),
	(271, 'Sabado', '00:00:00', '00:00:00', 47, 'Aberto'),
	(272, 'Domingo', '00:00:00', '00:00:00', 47, 'Aberto');

-- Dumping structure for table valeotour.pontos_turisticos
DROP TABLE IF EXISTS `pontos_turisticos`;
CREATE TABLE IF NOT EXISTS `pontos_turisticos` (
  `id_ponto_turistico` int(11) NOT NULL AUTO_INCREMENT,
  `nome_pt` varchar(255) DEFAULT NULL,
  `descricao_pt` varchar(255) DEFAULT NULL,
  `tipo_pt` varchar(30) DEFAULT NULL,
  `rua_pt` varchar(50) DEFAULT NULL,
  `email_pt` varchar(50) DEFAULT NULL,
  `senha_pt` varchar(50) DEFAULT NULL,
  `bairro_pt` varchar(50) DEFAULT NULL,
  `numero_pt` int(5) DEFAULT NULL,
  `cidade_pt` varchar(50) DEFAULT NULL,
  `latitude_pt` varchar(25) DEFAULT NULL,
  `longitude_pt` varchar(25) DEFAULT NULL,
  `foto_principal_pt` varchar(250) DEFAULT NULL,
  `telefone_pt` varchar(50) DEFAULT NULL,
  `eixo_pt` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_ponto_turistico`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table valeotour.pontos_turisticos: ~15 rows (approximately)
DELETE FROM `pontos_turisticos`;
INSERT INTO `pontos_turisticos` (`id_ponto_turistico`, `nome_pt`, `descricao_pt`, `tipo_pt`, `rua_pt`, `email_pt`, `senha_pt`, `bairro_pt`, `numero_pt`, `cidade_pt`, `latitude_pt`, `longitude_pt`, `foto_principal_pt`, `telefone_pt`, `eixo_pt`) VALUES
	(33, 'Quiosque Maré Alta', 'Restaurante especializado em frutos do mar, com vista para o mar de Ilha Comprida.', 'Alimentação', 'Avenida Beira Mar', 'marealta@ilhacomprida.com', '21232f297a57a5a743894a0e4a801fc3', 'Centro', 123, 'Ilha Comprida', '-24.730256385127063', '-47.51759648323059', '951052-mare_alta.jpg', '(13) 93455-6789', 'Gastronômico'),
	(34, 'Feira de Artesanato de Ilha Comprida', 'Feira com produtos artesanais e alimentos típicos da região.', 'Compras', 'Praça Central', 'feiraartesanato@ilhacomprida.com', '21232f297a57a5a743894a0e4a801fc3', 'Centro', 231, 'Ilha Comprida', '-24.7382371747161', '-47.55515813827515', '162010-feira.jpg', '(13) 93456-7890', 'Ecológico'),
	(35, ' Trilha da Barra do Icapara', 'Trilha moderada com vistas incríveis dos manguezais, ideal para observação de fauna e flora local.', 'Trilha', 'Acesso pela Rua da Praia', 'icapara@ilhacomprida.com', '21232f297a57a5a743894a0e4a801fc3', 'Barra do Icapara', 21, 'Ilha Comprida', '-24.680991199306323', '-47.45547222418407', '64555-barra_icapara2.jpg', '(13) 93458-9012', 'Aventura'),
	(36, 'Monumento Natural das Ilhas de Cananéia', 'Área de proteção que abriga diversas espécies de fauna e flora, com destaque para aves migratórias.', 'Patrimônio', 'Acesso pelo Rio Comprido', 'monumentocananeia@ilhacomprida.com', '21232f297a57a5a743894a0e4a801fc3', 'Zona Rural', 1, 'Ilha Comprida', '-24.86546032901143', '-47.71449261018891', '697539-monumento_natural1.png', '(13) 93459-5678', 'Ecológico'),
	(37, 'Trilha das Dunas', 'Trilha que atravessa uma área de dunas e restinga, com belas vistas da praia e do mar.', 'Trilha', 'Estrada das Dunas', 'trilhadasdunas@ilhacomprida.com', '21232f297a57a5a743894a0e4a801fc3', 'Zona Rural', 532, 'Ilha Comprida', '-24.90645847874497', '-47.760661915311516', '245989-dunas.jpg', '(13) 93459-7890', 'Aventura'),
	(38, 'Pousada Beira Mar', 'Pousada com vista para o mar, ideal para quem busca tranquilidade e contato com a natureza.', 'Hospedagem', 'Avenida Beira-Mar', 'pousadabeiramar@ilhacomprida.com', '21232f297a57a5a743894a0e4a801fc3', 'Centro', 345, 'Ilha Comprida', '-24.74519436827259', '-47.54526615142822', '667160-beira_mar.jpg', '(13) 93459-4567', 'Gastronômico'),
	(39, 'Casarão Gastronomia', 'Restaurante com pratos típicos do Vale do Ribeira, especializado no tradicional barreado.', 'Alimentação', 'Rua das Palmeiras', 'casarao@iporanga.com', '21232f297a57a5a743894a0e4a801fc3', 'Centro', 798, 'Iporanga', '-24.585253749100353', '-48.591775596141815', '65861-casarao.jpg', '(15) 93555-1234', 'Gastronômico'),
	(40, 'Pousada Trilha das Águas', 'Pousada rústica com fácil acesso ao PETAR, ideal para ecoturismo e aventura.', 'Hospedagem', 'Estrada do PETAR', 'trilhasaguas@iporanga.com', '21232f297a57a5a743894a0e4a801fc3', 'Zona Rural', 1, 'Iporanga', '-24.584124464518325', '-48.596863746643066', '17187-trilha.jpeg', '(15) 93555-3456', 'Ecológico'),
	(41, 'Rafting no Rio Betari', 'Descida de rafting nas águas cristalinas do Rio Betari, com belas paisagens naturais.', 'Trilha', 'Acesso pela Estrada do PETAR', 'raftingbetari@iporanga.com', '21232f297a57a5a743894a0e4a801fc3', 'Zona Rural', 241, 'Iporanga', '-24.585722087872178', '-48.629315269455354', '306330-rafting.png', '(15) 93555-4567', 'Aventura'),
	(42, 'Caverna do Diabo', 'Uma das maiores cavernas da América Latina, com formações geológicas impressionantes e trilhas guiadas.', 'Trilha', 'Rodovia SP-165', 'cavernadiabo@iporanga.com', '21232f297a57a5a743894a0e4a801fc3', 'Parque Estadual', 243, 'Iporanga', '-24.635861089246074', '-48.40370178222656', '813170-caverna_diabo.jpg', '(15) 93556-1234', 'Ecológico'),
	(43, ' Igreja Matriz de São José', 'Igreja histórica do século XVIII, marco cultural e religioso da cidade.', 'Patrimônio', 'Praça Central', 'igrejasaose@iporanga.com', '21232f297a57a5a743894a0e4a801fc3', 'Centro', 100, 'Iporanga', '-24.58543667760989', '-48.59196066856384', '608983-igreja.jpg', '(15) 93556-7890', 'Histórico'),
	(44, 'Trilha do Betari', 'Trilha com várias cachoeiras e piscinas naturais, ideal para aventureiros e amantes da natureza.', 'Trilha', 'Parque Estadual Turístico do Alto Ribeira', 'trilhabetari@iporanga.com', '21232f297a57a5a743894a0e4a801fc3', 'Zona Rural', 547, 'Iporanga', '-24.53398177894801', '-48.701298236846924', '807060-trilha_betari.jpg', '(15) 93556-9012', 'Aventura'),
	(45, 'Pousada Cavernas', 'Pousada rústica localizada próxima às cavernas da região, oferecendo uma experiência em meio à natureza.', 'Hospedagem', 'Pousada rústica localizada próxima às cavernas da ', 'pousadacaverna@iporanga.com', '21232f297a57a5a743894a0e4a801fc3', 'Zona Rural', 244, 'Iporanga', '-24.558521363907122', '-48.67243766784668', '336490-pousada_cavernas.png', '(15) 93556-5678', 'Ecológico'),
	(46, 'Museu Municipal Victor Sadowski', ' Museu histórico que abriga peças arqueológicas e documentos da colonização portuguesa na região.', 'Patrimônio', 'Rua do Comércio', 'museucananeia@cananeia.com', '21232f297a57a5a743894a0e4a801fc3', 'Centro', 102, 'Cananéia', '-25.016657054097667', '-47.9284647887266', '923011-g_58_0_2_19022020160411.jpg', '(13) 38521-234', 'Histórico'),
	(47, 'Basílica do Senhor Bom Jesus de Iguape', 'Uma das igrejas mais antigas do Brasil, famosa pelo Senhor Bom Jesus de Iguape, padroeiro da cidade.', 'Patrimônio', ' Praça da Basílica', 'basilica@iguape.com', '21232f297a57a5a743894a0e4a801fc3', 'Centro', 114, 'Iguape', '-24.709188322373603', '-47.55579714826307', '604538-img-01.jpg', '(13) 38411-131', 'Histórico');

-- Dumping structure for table valeotour.trilhas
DROP TABLE IF EXISTS `trilhas`;
CREATE TABLE IF NOT EXISTS `trilhas` (
  `id_trilha` int(11) NOT NULL AUTO_INCREMENT,
  `nome_trilha` varchar(255) DEFAULT NULL,
  `distancia_trilha` decimal(3,2) DEFAULT NULL,
  `id_ponto_turistico` int(11) DEFAULT NULL,
  `dificuldade_trilha` varchar(50) DEFAULT NULL,
  `tempo_trilha` time DEFAULT NULL,
  PRIMARY KEY (`id_trilha`),
  KEY `id_ponto_turistico` (`id_ponto_turistico`),
  CONSTRAINT `trilhas_ibfk_1` FOREIGN KEY (`id_ponto_turistico`) REFERENCES `pontos_turisticos` (`id_ponto_turistico`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table valeotour.trilhas: ~5 rows (approximately)
DELETE FROM `trilhas`;
INSERT INTO `trilhas` (`id_trilha`, `nome_trilha`, `distancia_trilha`, `id_ponto_turistico`, `dificuldade_trilha`, `tempo_trilha`) VALUES
	(2, ' Trilha da Barra do Icapara', 5.00, 35, 'Médio', '02:00:00'),
	(4, 'Trilha das Dunas', 4.00, 37, 'Fácil', '01:30:00'),
	(5, 'Rafting no Rio Betari', 7.00, 41, 'Médio', '03:00:00'),
	(6, 'Caverna do Diabo', 0.50, 42, 'Fácil', '01:30:00'),
	(7, 'Trilha do Betari', 6.00, 44, 'Médio', '03:00:00');

-- Dumping structure for table valeotour.usuarios
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `email_usuario` varchar(150) DEFAULT NULL,
  `nome_usuario` varchar(100) DEFAULT NULL,
  `caminho_imagem_usuario` varchar(250) DEFAULT NULL,
  `tipo_usuario` varchar(10) DEFAULT NULL,
  `senha_usuario` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table valeotour.usuarios: ~10 rows (approximately)
DELETE FROM `usuarios`;
INSERT INTO `usuarios` (`id_usuario`, `email_usuario`, `nome_usuario`, `caminho_imagem_usuario`, `tipo_usuario`, `senha_usuario`) VALUES
	(49, '@pedro', 'Pedro', 'man-5.png', 'Comum', '21232f297a57a5a743894a0e4a801fc3'),
	(50, '@joao', 'João Carvalho', 'man-3.png', 'Guia', '21232f297a57a5a743894a0e4a801fc3'),
	(51, '@maria', 'Maria Silva', 'women-1.png', 'Guia', '21232f297a57a5a743894a0e4a801fc3'),
	(52, '@carlos', 'Carlos Pereira', 'man-4.png', 'Guia', '21232f297a57a5a743894a0e4a801fc3'),
	(53, '@ana', 'Ana Beatriz', 'women-4.png', 'Guia', '21232f297a57a5a743894a0e4a801fc3'),
	(54, '@lucas', 'Lucas Mendes', 'man-2.png', 'Guia', '21232f297a57a5a743894a0e4a801fc3'),
	(55, '@juliana', 'Juliana Santos', 'women-2.png', 'Guia', '21232f297a57a5a743894a0e4a801fc3'),
	(56, '@douglas', 'Douglas Pontes', 'man-1.png', 'Guia', '21232f297a57a5a743894a0e4a801fc3'),
	(57, '@fernanda', 'Fernanda Rocha', 'women-3.png', 'Guia', '21232f297a57a5a743894a0e4a801fc3'),
	(58, '@luizz', 'Luiz', '67179ffc01c23.jpeg', 'Comum', '21232f297a57a5a743894a0e4a801fc3');

-- Dumping structure for table valeotour.verificacoes_guias
DROP TABLE IF EXISTS `verificacoes_guias`;
CREATE TABLE IF NOT EXISTS `verificacoes_guias` (
  `id_verificacao` int(11) NOT NULL AUTO_INCREMENT,
  `cidade_v` varchar(50) DEFAULT 'Aguardando verificação',
  `id_guia` int(11) DEFAULT NULL,
  `nome_v` varchar(50) DEFAULT 'Aguardando verificação',
  `status_verificacao` varchar(50) DEFAULT 'Aguardando verificação',
  `comentario_v` varchar(250) DEFAULT NULL,
  `cadastur_frente_v` varchar(250) DEFAULT 'Aguardando verificação',
  `cadastur_verso_v` varchar(250) DEFAULT 'Aguardando verificação',
  `cadastur_v` varchar(50) DEFAULT 'Aguardando verificação',
  `eixo_v` varchar(50) DEFAULT 'Aguardando verificação',
  `biografia_v` varchar(500) DEFAULT 'Aguardando verificação',
  `cpf_v` varchar(50) DEFAULT 'Aguardando verificação',
  `taxa_hora_v` varchar(50) DEFAULT 'Aguardando verificação',
  `taxa_pessoa_v` varchar(50) DEFAULT 'Aguardando verificação',
  `imagePath_v` varchar(50) DEFAULT 'Aguardando verificação',
  `email_v` varchar(50) DEFAULT 'Aguardando verificação',
  `data_v` date DEFAULT NULL,
  PRIMARY KEY (`id_verificacao`),
  KEY `FK_verificacoes_guias_guias` (`id_guia`),
  CONSTRAINT `FK_verificacoes_guias_guias` FOREIGN KEY (`id_guia`) REFERENCES `guias` (`id_guia`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table valeotour.verificacoes_guias: ~8 rows (approximately)
DELETE FROM `verificacoes_guias`;
INSERT INTO `verificacoes_guias` (`id_verificacao`, `cidade_v`, `id_guia`, `nome_v`, `status_verificacao`, `comentario_v`, `cadastur_frente_v`, `cadastur_verso_v`, `cadastur_v`, `eixo_v`, `biografia_v`, `cpf_v`, `taxa_hora_v`, `taxa_pessoa_v`, `imagePath_v`, `email_v`, `data_v`) VALUES
	(12, 'Aguardando verificação', 23, 'Aguardando verificação', 'Aprovado', NULL, 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', NULL),
	(13, 'Aguardando verificação', 24, 'Aguardando verificação', 'Aprovado', NULL, 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', NULL),
	(14, 'Aguardando verificação', 25, 'Aguardando verificação', 'Aprovado', NULL, 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', NULL),
	(15, 'Aguardando verificação', 26, 'Aguardando verificação', 'Aprovado', NULL, 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', NULL),
	(16, 'Aguardando verificação', 27, 'Aguardando verificação', 'Aprovado', NULL, 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', NULL),
	(17, 'Aguardando verificação', 28, 'Aguardando verificação', 'Aprovado', NULL, 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', NULL),
	(19, 'Aguardando verificação', 30, 'Aguardando verificação', 'Aprovado', NULL, 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', NULL),
	(23, 'Aprovado', 35, 'Aprovado', 'Reprovado', 'Por favor, encaminhe e preencha as informações do cadastur corretamente.\r\n\r\nAtt. equipe ValeOTour', 'Reprovado', 'Reprovado', 'Reprovado', 'Aprovado', 'Aprovado', 'Aprovado', 'Aprovado', 'Aprovado', 'Aprovado', 'Aprovado', '0000-00-00');

-- Dumping structure for table valeotour.verificacoes_pontos_turisticos
DROP TABLE IF EXISTS `verificacoes_pontos_turisticos`;
CREATE TABLE IF NOT EXISTS `verificacoes_pontos_turisticos` (
  `id_verificacao` int(11) NOT NULL AUTO_INCREMENT,
  `status_verificacao_pt` varchar(50) DEFAULT 'Aguardando verificação',
  `nome_v` varchar(50) DEFAULT 'Aguardando verificação',
  `descricao_v` varchar(50) DEFAULT 'Aguardando verificação',
  `tipo_v` varchar(50) DEFAULT 'Aguardando verificação',
  `rua_v` varchar(50) DEFAULT 'Aguardando verificação',
  `email_v` varchar(50) DEFAULT 'Aguardando verificação',
  `bairro_v` varchar(50) DEFAULT 'Aguardando verificação',
  `numero_v` varchar(50) DEFAULT 'Aguardando verificação',
  `cidade_v` varchar(50) DEFAULT 'Aguardando verificação',
  `latitude_v` varchar(50) DEFAULT 'Aguardando verificação',
  `longitude_v` varchar(50) DEFAULT 'Aguardando verificação',
  `foto_principal_v` varchar(50) DEFAULT 'Aguardando verificação',
  `telefone_v` varchar(50) DEFAULT 'Aguardando verificação',
  `comentario_v` varchar(250) DEFAULT 'Aguardando verificação',
  `id_ponto_turistico` int(11) DEFAULT NULL,
  `eixo_v` varchar(50) DEFAULT 'Aguardando verificação',
  PRIMARY KEY (`id_verificacao`),
  KEY `FK_verificacoes_pontos_turisticos_pontos_turisticos` (`id_ponto_turistico`),
  CONSTRAINT `FK_verificacoes_pontos_turisticos_pontos_turisticos` FOREIGN KEY (`id_ponto_turistico`) REFERENCES `pontos_turisticos` (`id_ponto_turistico`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table valeotour.verificacoes_pontos_turisticos: ~15 rows (approximately)
DELETE FROM `verificacoes_pontos_turisticos`;
INSERT INTO `verificacoes_pontos_turisticos` (`id_verificacao`, `status_verificacao_pt`, `nome_v`, `descricao_v`, `tipo_v`, `rua_v`, `email_v`, `bairro_v`, `numero_v`, `cidade_v`, `latitude_v`, `longitude_v`, `foto_principal_v`, `telefone_v`, `comentario_v`, `id_ponto_turistico`, `eixo_v`) VALUES
	(26, 'Aprovado', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 33, 'Aguardando verificação'),
	(27, 'Aprovado', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 34, 'Aguardando verificação'),
	(28, 'Aprovado', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 35, 'Aguardando verificação'),
	(29, 'Aprovado', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 36, 'Aguardando verificação'),
	(30, 'Aprovado', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 37, 'Aguardando verificação'),
	(31, 'Aprovado', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 38, 'Aguardando verificação'),
	(32, 'Aprovado', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 39, 'Aguardando verificação'),
	(33, 'Aprovado', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 40, 'Aguardando verificação'),
	(34, 'Aprovado', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 41, 'Aguardando verificação'),
	(35, 'Aprovado', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 42, 'Aguardando verificação'),
	(36, 'Aprovado', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 43, 'Aguardando verificação'),
	(37, 'Aprovado', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 44, 'Aguardando verificação'),
	(38, 'Aprovado', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 45, 'Aguardando verificação'),
	(39, 'Aprovado', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 46, 'Aguardando verificação'),
	(40, 'Aprovado', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 'Aguardando verificação', 47, 'Aguardando verificação');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
