-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 31, 2023 at 04:46 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `WeightController-BD`
--

-- --------------------------------------------------------

--
-- Table structure for table `api_keys`
--

CREATE TABLE `users` (
  `usr_id` int(11) NOT NULL,
  `usr_nome` varchar(255) DEFAULT NULL,
  `usr_email` varchar(255) DEFAULT NULL,
  `usr_idade` int(11) DEFAULT NULL,
  `usr_password` text NOT NULL,
  `usr_picture` text NOT NULL DEFAULT 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  `usr_last_name` varchar(255) NOT NULL,
  `usr_sex` int(11) NOT NULL,
  `usr_born_date` date NOT NULL,
  `usr_weight` double DEFAULT NULL,
  `usr_height` double DEFAULT NULL,
  `usr_role` int(11) NOT NULL DEFAULT 1,
  `usr_user` varchar(255) DEFAULT NULL,
  `usr_changed` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `logins` (
  `ses_id` INT PRIMARY KEY AUTO_INCREMENT,
  `ses_key` VARCHAR(60) NOT NULL,
  `ses_user` INT,
  `ses_created_at` DATETIME NOT NULL DEFAULT current_timestamp(),
  FOREIGN KEY (`ses_user`) REFERENCES `users`(`usr_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `api_keys` (
  `api_id` INT PRIMARY KEY AUTO_INCREMENT,
  `api_key` VARCHAR(60) NOT NULL,
  `api_user` INT,
  `api_created_at` DATETIME NOT NULL DEFAULT current_timestamp(),
  `api_status` INT NOT NULL DEFAULT 1,
  FOREIGN KEY (`api_user`) REFERENCES `users`(`usr_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--
-- Dumping data for table `api_keys`
--

INSERT INTO `api_keys` (`api_id`, `api_key`, `api_user`, `api_created_at`, `api_status`) VALUES
(1, 'chaveValida', 1, '2023-07-29 23:09:52', 1),
(2, 'chaveValidaq', 3, '2023-07-29 23:25:15', 1),
(3, '87f9be2b33d0c40e9732839148e8807c638157ad', 1, '2023-07-30 16:12:50', 1),
(4, '8800b8eee2622f90f3a861076070b05e6041fef2', 1, '2023-07-30 16:16:24', 1),
(5, 'd4cfbd9d20956d3c4dcc6258aee848ada7ba572f', 1, '2023-07-30 16:16:29', 1),
(6, '3f1d2eba34885cd09e201e1d4b31f75be6f06ca8', 1, '2023-07-30 16:52:30', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`usr_id`, `usr_nome`, `usr_email`, `usr_idade`, `usr_password`, `usr_picture`, `usr_last_name`, `usr_sex`, `usr_born_date`, `usr_weight`, `usr_height`, `usr_role`, `usr_user`, `usr_changed`) VALUES
(1, 'Lucas', 'teste@ghfasd.com', 8, '', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', '', 0, '0000-00-00', NULL, NULL, 1, NULL, NULL),
(3, 'Lucas', 'teste4@ghfasd.com', 8, '', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', '', 0, '0000-00-00', NULL, NULL, 1, NULL, NULL),
(4, 'Lucas', 'teste5@ghfasd.com', 8, '', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', '', 0, '0000-00-00', NULL, NULL, 1, NULL, NULL),
(6, 'Lucas', 'teste7@ghfasd.com', 8, '', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', '', 0, '0000-00-00', NULL, NULL, 1, NULL, NULL),
(8, 'Lucas', 'teste0@ghfasd.com', 8, '', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', '', 0, '0000-00-00', NULL, NULL, 1, NULL, NULL),
(10, 'Lucas Perussi', 'perussilucas@hotmail.com', 8, '', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', '', 0, '0000-00-00', NULL, NULL, 1, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `api_keys`
--
ALTER TABLE `api_keys`
  ADD PRIMARY KEY (`api_id`),
  ADD KEY `api_user` (`api_user`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`usr_id`),
  ADD UNIQUE KEY `email` (`usr_email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `api_keys`
--
ALTER TABLE `api_keys`
  MODIFY `api_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `usr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `api_keys`
--
ALTER TABLE `api_keys`
  ADD CONSTRAINT `api_keys_ibfk_1` FOREIGN KEY (`api_user`) REFERENCES `users` (`usr_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
