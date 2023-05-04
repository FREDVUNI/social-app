-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 04, 2023 at 09:27 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `social`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `details` text NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `userId`, `postId`, `details`, `createdAt`) VALUES
(2, 1, 2, 'Amazing ', '2023-05-04 10:24:54'),
(3, 1, 1, 'Great work', '2023-05-04 10:25:24');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `userId`, `postId`, `createdAt`) VALUES
(1, 1, 2, '2023-05-04 10:25:07'),
(2, 1, 1, '2023-05-04 10:25:14');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `details` text NOT NULL,
  `image` varchar(200) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `userId`, `details`, `image`, `createdAt`) VALUES
(1, 1, 'The __dirname variable is a Node.js global variable that provides the absolute path of the directory that contains the currently executing JavaScript file. However, it may not be available in all JavaScript environments, such as a web browser.', '1683139413533.png', '2023-05-03 21:43:33'),
(2, 1, 'The __dirname variable is a Node.js global variable that provides the absolute path of the directory that contains the currently executing JavaScript file. However, it may not be available in all JavaScript environments, such as a web browser.', '1683139431956.jpg', '2023-05-03 21:43:51'),
(4, 2, 'The __dirname variable is a Node.js global variable that provides the absolute path of the directory that contains the currently executing JavaScript file. However, it may not be available in all JavaScript environments, such as a web browser.', '1683139451739.jpg', '2023-05-03 21:44:11'),
(5, 3, 'The __dirname variable is a Node.js global variable that provides the absolute path of the directory that contains the currently executing JavaScript file. However, it may not be available in all JavaScript environments, such as a web browser.', '1683139472350.jpg', '2023-05-03 21:44:32'),
(6, 4, 'The __dirname variable is a Node.js global variable that provides the absolute path of the directory that contains the currently executing JavaScript file. However, it may not be available in all JavaScript environments, such as a web browser.', '1683139505968.jpg', '2023-05-03 21:45:06'),
(7, 2, 'The __dirname variable is a Node.js global variable that provides the absolute path of the directory that contains the currently executing JavaScript file. However, it may not be available in all JavaScript environments, such as a web browser.', '1683139517682.jpg', '2023-05-03 21:45:17'),
(8, 3, 'The __dirname variable is a Node.js global variable that provides the absolute path of the directory that contains the currently executing JavaScript file. However, it may not be available in all JavaScript environments, such as a web browser.', '1683139529891.jpg', '2023-05-03 21:45:29'),
(9, 4, 'The __dirname variable is a Node.js global variable that provides the absolute path of the directory that contains the currently executing JavaScript file. However, it may not be available in all JavaScript environments, such as a web browser.', '1683139581684.jpg', '2023-05-03 21:46:21');

-- --------------------------------------------------------

--
-- Table structure for table `relationships`
--

CREATE TABLE `relationships` (
  `id` int(11) NOT NULL,
  `follower_userId` int(11) NOT NULL,
  `followed_userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `relationships`
--

INSERT INTO `relationships` (`id`, `follower_userId`, `followed_userId`, `createdAt`) VALUES
(1, 1, 2, '2023-05-03 21:47:48'),
(2, 1, 3, '2023-05-04 08:19:44');

-- --------------------------------------------------------

--
-- Table structure for table `stories`
--

CREATE TABLE `stories` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `image` varchar(200) NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `name` varchar(200) NOT NULL,
  `coverImage` varchar(150) NOT NULL,
  `profileImage` varchar(120) NOT NULL,
  `website` varchar(200) NOT NULL,
  `city` varchar(30) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `name`, `coverImage`, `profileImage`, `website`, `city`, `createdAt`) VALUES
(1, 'Fred', 'fredvuni809@gmail.com', '$2b$10$B42OP3klgCA3kEoHrbBIdOK2Xris0u6gdtbbptI40xNSjVhAXg3FG', 'Fred', '1683139633409.jpg', '1683139633432.jpg', 'www.kampala.com', 'Kampala', '2023-04-14 12:30:24'),
(2, 'vuni', 'fredvuni@gmail.com', '$2b$10$5F3qwt8eeu1C7eRtECCob.QJCebMnJWDfa.1o1Iy.pUpTvcQzibLC', 'Fred', '', '', '', '', '2023-04-21 13:12:53'),
(3, 'Timmy', 'timmy@gmail.com', '$2b$10$wPfrzNF7Rybb9.lqympl8O4JJwW2P/qWXPE2JfX6wwTqaDjSNHCle', 'Timmy', '', '', '', '', '2023-04-21 13:13:26'),
(4, 'Freddy', 'vuni@gmail.com', '$2b$10$kRXV8XC/v.xjnfFNmTqL4.GOTSPMqATrXZLdkxW7Ik3xbiz872TvS', 'Freddy', '', '', '', '', '2023-05-01 08:28:07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `postId` (`postId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `postId` (`postId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `relationships`
--
ALTER TABLE `relationships`
  ADD PRIMARY KEY (`id`),
  ADD KEY `follower_userId` (`follower_userId`),
  ADD KEY `follwed_userId` (`followed_userId`);

--
-- Indexes for table `stories`
--
ALTER TABLE `stories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `relationships`
--
ALTER TABLE `relationships`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `stories`
--
ALTER TABLE `stories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `relationships`
--
ALTER TABLE `relationships`
  ADD CONSTRAINT `relationships_ibfk_1` FOREIGN KEY (`follower_userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `relationships_ibfk_2` FOREIGN KEY (`followed_userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `stories`
--
ALTER TABLE `stories`
  ADD CONSTRAINT `stories_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
