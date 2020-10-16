-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Anamakine: localhost:3306
-- Üretim Zamanı: 16 Eki 2020, 03:33:29
-- Sunucu sürümü: 8.0.21-0ubuntu0.20.04.4
-- PHP Sürümü: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `sta_db`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblInstitution`
--

CREATE TABLE `tblInstitution` (
  `InstitutionID` int NOT NULL,
  `InstitutionName` varchar(150) COLLATE utf8_turkish_ci NOT NULL,
  `InstitutionCity` varchar(50) COLLATE utf8_turkish_ci NOT NULL,
  `InstitutionDistrict` varchar(50) COLLATE utf8_turkish_ci NOT NULL,
  `InstitutionEmail` varchar(100) COLLATE utf8_turkish_ci NOT NULL,
  `InstitutionPhone` varchar(25) COLLATE utf8_turkish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblMartyr`
--

CREATE TABLE `tblMartyr` (
  `MartyrID` int NOT NULL,
  `MartyrFirstName` varchar(50) COLLATE utf8_turkish_ci NOT NULL,
  `MartyrLastName` varchar(50) COLLATE utf8_turkish_ci NOT NULL,
  `MartyrDateOfBirth` date NOT NULL,
  `MartyrDateOfDeath` date NOT NULL,
  `RankName` varchar(50) CHARACTER SET utf8 COLLATE utf8_turkish_ci NOT NULL,
  `MartyrCity` varchar(50) COLLATE utf8_turkish_ci NOT NULL,
  `MartyrDistrict` varchar(50) COLLATE utf8_turkish_ci NOT NULL,
  `MartyrPlaceOfDeath` varchar(200) COLLATE utf8_turkish_ci NOT NULL,
  `MartyrContent` text COLLATE utf8_turkish_ci NOT NULL,
  `MartyrImagePath` text COLLATE utf8_turkish_ci NOT NULL,
  `InstitutionID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblMartyrImage`
--

CREATE TABLE `tblMartyrImage` (
  `MartyrImageID` int NOT NULL,
  `MartyrImagePath` int NOT NULL,
  `MartyrID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblRank`
--

CREATE TABLE `tblRank` (
  `RankName` varchar(50) COLLATE utf8_turkish_ci NOT NULL,
  `RankAbbreviation` varchar(20) COLLATE utf8_turkish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;


-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblUser`
--

CREATE TABLE `tblUser` (
  `UserID` int NOT NULL,
  `UserFirstName` varchar(50) COLLATE utf8_turkish_ci NOT NULL,
  `UserLastName` varchar(50) COLLATE utf8_turkish_ci NOT NULL,
  `UserPassword` varchar(99) COLLATE utf8_turkish_ci NOT NULL,
  `UserIdentityNo` bigint NOT NULL,
  `UserEmail` varchar(100) COLLATE utf8_turkish_ci NOT NULL,
  `UserPhone` varchar(25) COLLATE utf8_turkish_ci NOT NULL,
  `InstitutionID` int NOT NULL,
  `UserStatusName` varchar(50) COLLATE utf8_turkish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblUserStatus`
--

CREATE TABLE `tblUserStatus` (
  `UserStatusName` varchar(100) COLLATE utf8_turkish_ci NOT NULL,
  `UserStatusNumber` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `tblUserStatus`
--

INSERT INTO `tblUserStatus` (`UserStatusName`, `UserStatusNumber`) VALUES
('Administrator', 666),
('Editor', 444),
('Institution Admin', 555),
('Root', 777);

-- --------------------------------------------------------

--
-- Görünüm yapısı durumu `vwMartyrList`
-- (Asıl görünüm için aşağıya bakın)
--
CREATE TABLE `vwMartyrList` (
`MartyrID` int
,`MartyrFirstName` varchar(50)
,`MartyrLastName` varchar(50)
,`MartyrDateOfBirth` date
,`MartyrDateOfDeath` date
,`RankName` varchar(50)
,`MartyrCity` varchar(50)
,`MartyrDistrict` varchar(50)
,`MartyrPlaceOfDeath` varchar(200)
,`MartyrContent` text
,`MartyrImagePath` text
,`InstitutionID` int
,`RankAbbreviation` varchar(20)
,`InstitutionName` varchar(150)
);

-- --------------------------------------------------------

--
-- Görünüm yapısı durumu `vwUserList`
-- (Asıl görünüm için aşağıya bakın)
--
CREATE TABLE `vwUserList` (
`UserID` int
,`UserFirstName` varchar(50)
,`UserLastName` varchar(50)
,`UserIdentityNo` bigint
,`UserEmail` varchar(100)
,`UserPhone` varchar(25)
,`UserStatusName` varchar(50)
,`InstitutionID` int
,`InstitutionName` varchar(150)
);

-- --------------------------------------------------------

--
-- Görünüm yapısı `vwMartyrList`
--
DROP TABLE IF EXISTS `vwMartyrList`;

CREATE VIEW `vwMartyrList`  AS  select `tblMartyr`.`MartyrID` AS `MartyrID`,`tblMartyr`.`MartyrFirstName` AS `MartyrFirstName`,`tblMartyr`.`MartyrLastName` AS `MartyrLastName`,`tblMartyr`.`MartyrDateOfBirth` AS `MartyrDateOfBirth`,`tblMartyr`.`MartyrDateOfDeath` AS `MartyrDateOfDeath`,`tblMartyr`.`RankName` AS `RankName`,`tblMartyr`.`MartyrCity` AS `MartyrCity`,`tblMartyr`.`MartyrDistrict` AS `MartyrDistrict`,`tblMartyr`.`MartyrPlaceOfDeath` AS `MartyrPlaceOfDeath`,`tblMartyr`.`MartyrContent` AS `MartyrContent`,`tblMartyr`.`MartyrImagePath` AS `MartyrImagePath`,`tblMartyr`.`InstitutionID` AS `InstitutionID`,`tblRank`.`RankAbbreviation` AS `RankAbbreviation`,`tblInstitution`.`InstitutionName` AS `InstitutionName` from ((`tblMartyr` left join `tblRank` on((`tblMartyr`.`RankName` = `tblRank`.`RankName`))) join `tblInstitution` on((`tblInstitution`.`InstitutionID` = `tblMartyr`.`InstitutionID`))) ;

-- --------------------------------------------------------

--
-- Görünüm yapısı `vwUserList`
--
DROP TABLE IF EXISTS `vwUserList`;

CREATE VIEW `vwUserList`  AS  select `tblUser`.`UserID` AS `UserID`,`tblUser`.`UserFirstName` AS `UserFirstName`,`tblUser`.`UserLastName` AS `UserLastName`,`tblUser`.`UserIdentityNo` AS `UserIdentityNo`,`tblUser`.`UserEmail` AS `UserEmail`,`tblUser`.`UserPhone` AS `UserPhone`,`tblUser`.`UserStatusName` AS `UserStatusName`,`tblUser`.`InstitutionID` AS `InstitutionID`,`tblInstitution`.`InstitutionName` AS `InstitutionName` from (`tblUser` join `tblInstitution` on((`tblUser`.`InstitutionID` = `tblInstitution`.`InstitutionID`))) ;

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `tblInstitution`
--
ALTER TABLE `tblInstitution`
  ADD PRIMARY KEY (`InstitutionID`),
  ADD UNIQUE KEY `InstitutionName` (`InstitutionName`);

--
-- Tablo için indeksler `tblMartyr`
--
ALTER TABLE `tblMartyr`
  ADD PRIMARY KEY (`MartyrID`),
  ADD UNIQUE KEY `MartyrFirstName` (`MartyrFirstName`,`MartyrLastName`),
  ADD KEY `InstitutionID` (`InstitutionID`),
  ADD KEY `RankName` (`RankName`);

--
-- Tablo için indeksler `tblMartyrImage`
--
ALTER TABLE `tblMartyrImage`
  ADD PRIMARY KEY (`MartyrImageID`),
  ADD KEY `MartyrID` (`MartyrID`);

--
-- Tablo için indeksler `tblRank`
--
ALTER TABLE `tblRank`
  ADD PRIMARY KEY (`RankName`);

--
-- Tablo için indeksler `tblUser`
--
ALTER TABLE `tblUser`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `UserIdentityNo` (`UserIdentityNo`),
  ADD KEY `InstitutionID` (`InstitutionID`),
  ADD KEY `UserStatusName` (`UserStatusName`);

--
-- Tablo için indeksler `tblUserStatus`
--
ALTER TABLE `tblUserStatus`
  ADD PRIMARY KEY (`UserStatusName`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `tblInstitution`
--
ALTER TABLE `tblInstitution`
  MODIFY `InstitutionID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Tablo için AUTO_INCREMENT değeri `tblMartyr`
--
ALTER TABLE `tblMartyr`
  MODIFY `MartyrID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- Tablo için AUTO_INCREMENT değeri `tblMartyrImage`
--
ALTER TABLE `tblMartyrImage`
  MODIFY `MartyrImageID` int NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblUser`
--
ALTER TABLE `tblUser`
  MODIFY `UserID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `tblMartyr`
--
ALTER TABLE `tblMartyr`
  ADD CONSTRAINT `tblMartyr_ibfk_1` FOREIGN KEY (`InstitutionID`) REFERENCES `tblInstitution` (`InstitutionID`),
  ADD CONSTRAINT `tblMartyr_ibfk_2` FOREIGN KEY (`RankName`) REFERENCES `tblRank` (`RankName`);

--
-- Tablo kısıtlamaları `tblMartyrImage`
--
ALTER TABLE `tblMartyrImage`
  ADD CONSTRAINT `tblMartyrImage_ibfk_1` FOREIGN KEY (`MartyrID`) REFERENCES `tblMartyr` (`MartyrID`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `tblUser`
--
ALTER TABLE `tblUser`
  ADD CONSTRAINT `tblUser_ibfk_2` FOREIGN KEY (`InstitutionID`) REFERENCES `tblInstitution` (`InstitutionID`) ON DELETE CASCADE,
  ADD CONSTRAINT `tblUser_ibfk_3` FOREIGN KEY (`UserStatusName`) REFERENCES `tblUserStatus` (`UserStatusName`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;