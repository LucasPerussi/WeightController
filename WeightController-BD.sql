-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 11-Ago-2023 às 20:03
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `weightcontroller-bd`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `api_keys`
--

CREATE TABLE `api_keys` (
  `api_id` int(11) NOT NULL,
  `api_key` varchar(60) NOT NULL,
  `api_user` int(11) DEFAULT NULL,
  `api_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `api_status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `api_keys`
--

INSERT INTO `api_keys` (`api_id`, `api_key`, `api_user`, `api_created_at`, `api_status`) VALUES
(7, 'chaveValida', NULL, '2023-08-11 09:50:50', 1),
(8, 'dbb5b43ee95c40747dda28728dd99ed75f0af2e3', 12, '2023-08-11 11:13:47', 1),
(9, '3ef93d50a25fcdca7df6da1e0943d1ed92f665c7', 12, '2023-08-11 11:19:51', 1),
(10, '9598002750107c5ecf770ea3fec7ee42b1ff6223', 12, '2023-08-11 11:21:42', 1),
(11, '0c63deeac68d76bb7a550cc0f909db0d0a4fc3e0', 12, '2023-08-11 13:00:45', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `logins`
--

CREATE TABLE `logins` (
  `ses_id` int(11) NOT NULL,
  `ses_key` varchar(60) NOT NULL,
  `ses_user` int(11) DEFAULT NULL,
  `ses_created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `logins`
--

INSERT INTO `logins` (`ses_id`, `ses_key`, `ses_user`, `ses_created_at`) VALUES
(4, '952d8df7b32e5fa7affc54d817b91d5584739abd510a186fe2', 12, '2023-08-11 13:06:26'),
(5, '6f6a221942eafe6549730a17682fc91058e404ff9d58ec9f14', 13, '2023-08-11 13:19:48'),
(6, 'c8a5b3e217d292cf5d749291bb9d033f9a434d132342e21fca', 12, '2023-08-11 13:22:42'),
(7, '6123b20cba797828dcc22cbf461119371701a767616819a0da', 12, '2023-08-11 14:09:17');

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
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

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`usr_id`, `usr_nome`, `usr_email`, `usr_idade`, `usr_password`, `usr_picture`, `usr_last_name`, `usr_sex`, `usr_born_date`, `usr_weight`, `usr_height`, `usr_role`, `usr_user`, `usr_changed`) VALUES
(12, 'Lucas', 'perussilucas@hotmail.com', 8, '$2b$10$8AMwJcGCLOgfWeMAnyk6AeQOYyQKEJ..euVJMTL5QemUrFWpDtY2O', '8', 'Perussi', 8, '0000-00-00', 8, 8, 2, 'Lucas-Perussi11810', NULL),
(13, 'Lucas', 'perussilucas@noob.com', 8, '$2b$10$/MQFPw/fT0p1QLx82NZgfOT5CCAIgqPfbEWytBU5IhIyG6n/H12h6', '8', 'Noob', 8, '0000-00-00', 8, 8, 1, 'Lucas-Noob11813', NULL);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `api_keys`
--
ALTER TABLE `api_keys`
  ADD PRIMARY KEY (`api_id`),
  ADD KEY `api_user` (`api_user`);

--
-- Índices para tabela `logins`
--
ALTER TABLE `logins`
  ADD PRIMARY KEY (`ses_id`),
  ADD KEY `ses_user` (`ses_user`);

--
-- Índices para tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`usr_id`),
  ADD KEY `usr_email` (`usr_email`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `api_keys`
--
ALTER TABLE `api_keys`
  MODIFY `api_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT de tabela `logins`
--
ALTER TABLE `logins`
  MODIFY `ses_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `usr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `api_keys`
--
ALTER TABLE `api_keys`
  ADD CONSTRAINT `api_keys_ibfk_1` FOREIGN KEY (`api_user`) REFERENCES `users` (`usr_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `logins`
--
ALTER TABLE `logins`
  ADD CONSTRAINT `logins_ibfk_1` FOREIGN KEY (`ses_user`) REFERENCES `users` (`usr_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
