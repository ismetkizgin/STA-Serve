--
-- Tablo döküm verisi `tblUser`
--

INSERT INTO `tblUser` (`UserID`, `UserFirstName`, `UserLastName`, `UserPassword`, `UserIdentityNo`, `UserEmail`, `UserPhone`, `InstitutionID`, `UserStatusID`) VALUES
(15, 'İsmet', 'Kizgin', 'password', 1, 'ismetkizgin@hotmail.com', '0533834430', 1, 1);

--
-- Tablo döküm verisi `tblUserStatus`
--

INSERT INTO `tblUserStatus` (`UserStatusID`, `UserStatusName`) VALUES
(1, 'Root'),
(2, 'Admin'),
(3, 'User');

--
-- Tablo döküm verisi `tblUserStatusTransaction`
--

INSERT INTO `tblUserStatusTransaction` (`UserStatusTransactionID`, `UserStatusTransactionName`, `UserStatusID`) VALUES
(1, 'account-delete', 1),
(2, 'sign-up', 1);
(3, 'user', 1);
(3, 'institution', 1);
