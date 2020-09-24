--
-- Tablo döküm verisi `tblUserStatus`
--

INSERT INTO `tblUserStatus` (`UserStatusName`) VALUES
('Root'),
('Admin'),
('User');

--
-- Tablo döküm verisi `tblInstitution`
--

INSERT INTO `tblInstitution`(`InstitutionID`, `InstitutionName`, `InstitutionCity`, `InstitutionDistrict`, `InstitutionEmail`, `InstitutionPhone`) VALUES 
(1,'STA Kurumu','Diyarbakır','Kayapınar','info@sta.com','05555555555')

--
-- Tablo döküm verisi `tblUser`
--

INSERT INTO `tblUser` (`UserID`, `UserFirstName`, `UserLastName`, `UserPassword`, `UserIdentityNo`, `UserEmail`, `UserPhone`, `InstitutionID`, `UserStatusName`) VALUES
(15, 'İsmet', 'Kizgin', 'password', 1, 'ismetkizgin@hotmail.com', '0533834430', 1, 'Root');

--
-- Tablo döküm verisi `tblUserStatusTransaction`
--

INSERT INTO `tblUserStatusTransaction` (`UserStatusTransactionName`, `UserStatusName`) VALUES
('account-delete', 'Root'),
('sign-up', 'Root'),
('user', 'Root'),
('institution', 'Root');
