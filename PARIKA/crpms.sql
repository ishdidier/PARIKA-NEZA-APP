-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 20, 2025 at 06:00 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crpms`
--

-- --------------------------------------------------------

--
-- Table structure for table `car`
--

CREATE TABLE `car` (
  `PlateNumber` varchar(250) NOT NULL,
  `type` varchar(250) NOT NULL,
  `Model` varchar(250) NOT NULL,
  `ManufacturingYear` int(11) DEFAULT NULL,
  `DriverPhone` varchar(50) NOT NULL,
  `MechanicName` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `car`
--

INSERT INTO `car` (`PlateNumber`, `type`, `Model`, `ManufacturingYear`, `DriverPhone`, `MechanicName`) VALUES
('3456', 'fsvhbjnm,', 'fghjk', 3456, '2345678', 'dfgbjnm'),
('45y', 'vbnm', 'vbn', 3456, '3456', 'masn ms'),
('RAA', 'fgbhjn', 'fghj', 34567, '2345678', 'KAK'),
('RAA500', 'js', 'nsbjks', 2002, '3456789', 'nmdb hkjsmd'),
('RAC500', 'rava', 'toyota', 19999, '0795574443', 'KAMARA'),
('RDa', 'bjnjsk', 'sgvbhj', 1234, '3456789', 'kamara');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `PaymentNumber` int(11) NOT NULL,
  `AmountPaid` int(11) DEFAULT NULL,
  `PaymentDate` datetime DEFAULT NULL,
  `PlateNumber` varchar(250) NOT NULL,
  `ServiceCode` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`PaymentNumber`, `AmountPaid`, `PaymentDate`, `PlateNumber`, `ServiceCode`) VALUES
(1, NULL, NULL, 'RAA500', 1),
(2, 5000, '2025-05-20 00:00:00', 'RDa', 1),
(3, 5000, '2025-05-20 00:00:00', 'RAA500', 1);

-- --------------------------------------------------------

--
-- Table structure for table `servicerecord`
--

CREATE TABLE `servicerecord` (
  `RecordNumber` int(11) NOT NULL,
  `ServiceDate` date DEFAULT NULL,
  `PlateNumber` varchar(250) NOT NULL,
  `ServiceCode` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `servicerecord`
--

INSERT INTO `servicerecord` (`RecordNumber`, `ServiceDate`, `PlateNumber`, `ServiceCode`) VALUES
(1, '2025-05-20', 'RAA500', 1),
(2, NULL, 'RDa', 1),
(3, '2025-05-20', '45y', 1);

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `ServiceCode` int(11) NOT NULL,
  `ServiceName` varchar(250) NOT NULL,
  `ServicePrice` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`ServiceCode`, `ServiceName`, `ServicePrice`) VALUES
(1, 'Wheel alignment', 5000),
(4, 'disc replacement1', 4000000);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userid` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `name`, `password`) VALUES
(1, 'mama', '$2b$10$CCzZP8b4ks1NQxAesCHreuR9XdKqSzw6HN3yqNmig6HUh5CbcvZJq'),
(2, 'wow', '$2b$10$iuIOWOr/YYU/baXq7EEYN..YPB0ERB258wv7HnCLVMmtaTisa5FEO'),
(3, 'celestin', '$2b$10$RlcbXAeyKjbutzalnLJ1DOM/X9ATAme9I2nuP/tGOdb7UtMPwvXFO');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`PlateNumber`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`PaymentNumber`),
  ADD KEY `PlateNumber` (`PlateNumber`),
  ADD KEY `ServiceCode` (`ServiceCode`);

--
-- Indexes for table `servicerecord`
--
ALTER TABLE `servicerecord`
  ADD PRIMARY KEY (`RecordNumber`),
  ADD KEY `PlateNumber` (`PlateNumber`),
  ADD KEY `ServiceCode` (`ServiceCode`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`ServiceCode`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `PaymentNumber` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `servicerecord`
--
ALTER TABLE `servicerecord`
  MODIFY `RecordNumber` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `ServiceCode` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`PlateNumber`) REFERENCES `car` (`PlateNumber`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`ServiceCode`) REFERENCES `services` (`ServiceCode`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `servicerecord`
--
ALTER TABLE `servicerecord`
  ADD CONSTRAINT `servicerecord_ibfk_1` FOREIGN KEY (`PlateNumber`) REFERENCES `car` (`PlateNumber`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `servicerecord_ibfk_2` FOREIGN KEY (`ServiceCode`) REFERENCES `services` (`ServiceCode`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
