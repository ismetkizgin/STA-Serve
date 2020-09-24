-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Anamakine: localhost:3306
-- Üretim Zamanı: 24 Eyl 2020, 10:59:40
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
  `MartyrDateOfBrith` date NOT NULL,
  `MartyrDateOfDeath` date NOT NULL,
  `RankID` int NOT NULL,
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
  `UserStatusName` varchar(100) COLLATE utf8_turkish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;



-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblUserStatusTransaction`
--

CREATE TABLE `tblUserStatusTransaction` (
  `UserStatusTransactionName` varchar(100) COLLATE utf8_turkish_ci NOT NULL,
  `UserStatusName` varchar(50) COLLATE utf8_turkish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;


-- --------------------------------------------------------

--
-- Görünüm yapısı durumu `vwAuth`
-- (Asıl görünüm için aşağıya bakın)
--
CREATE TABLE `vwAuth` (
`UserStatusName` varchar(100)
,`UserStatusTransactionName` varchar(100)
);

-- --------------------------------------------------------

--
-- Görünüm yapısı durumu `vwUserList`
-- (Asıl görünüm için aşağıya bakın)
--
CREATE TABLE `vwUserList` (
`InstitutionID` int
,`InstitutionName` varchar(150)
,`UserEmail` varchar(100)
,`UserFirstName` varchar(50)
,`UserID` int
,`UserIdentityNo` bigint
,`UserLastName` varchar(50)
,`UserPhone` varchar(25)
,`UserStatusName` varchar(50)
);

-- --------------------------------------------------------

--
-- Görünüm yapısı `vwAuth`
--
DROP TABLE IF EXISTS `vwAuth`;

CREATE VIEW `vwAuth`  AS  select `U`.`UserStatusName` AS `UserStatusName`,`T`.`UserStatusTransactionName` AS `UserStatusTransactionName` from (`tblUserStatus` `U` join `tblUserStatusTransaction` `T` on((`U`.`UserStatusName` = `T`.`UserStatusName`))) ;

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
  ADD KEY `InstitutionID` (`InstitutionID`);

--
-- Tablo için indeksler `tblMartyrImage`
--
ALTER TABLE `tblMartyrImage`
  ADD PRIMARY KEY (`MartyrImageID`),
  ADD KEY `MartyrID` (`MartyrID`);

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
-- Tablo için indeksler `tblUserStatusTransaction`
--
ALTER TABLE `tblUserStatusTransaction`
  ADD PRIMARY KEY (`UserStatusTransactionName`),
  ADD KEY `UserStatusName` (`UserStatusName`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `tblInstitution`
--
ALTER TABLE `tblInstitution`
  MODIFY `InstitutionID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Tablo için AUTO_INCREMENT değeri `tblMartyr`
--
ALTER TABLE `tblMartyr`
  MODIFY `MartyrID` int NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblMartyrImage`
--
ALTER TABLE `tblMartyrImage`
  MODIFY `MartyrImageID` int NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblUser`
--
ALTER TABLE `tblUser`
  MODIFY `UserID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `tblMartyr`
--
ALTER TABLE `tblMartyr`
  ADD CONSTRAINT `tblMartyr_ibfk_1` FOREIGN KEY (`InstitutionID`) REFERENCES `tblInstitution` (`InstitutionID`);

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

--
-- Tablo kısıtlamaları `tblUserStatusTransaction`
--
ALTER TABLE `tblUserStatusTransaction`
  ADD CONSTRAINT `tblUserStatusTransaction_ibfk_1` FOREIGN KEY (`UserStatusName`) REFERENCES `tblUserStatus` (`UserStatusName`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;