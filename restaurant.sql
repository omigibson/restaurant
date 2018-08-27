-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Aug 27, 2018 at 08:32 AM
-- Server version: 5.7.21
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restaurant`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `guests` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `hash` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `guests`, `date`, `time`, `userID`, `hash`) VALUES
(80, 5, '2018-08-27', 18, 24, 'glbxufelgvq'),
(87, 5, '2018-08-25', 18, 27, 'gj9daz7e1la'),
(88, 3, '2018-08-29', 18, 28, 'edrg6g3hz3'),
(89, 4, '2018-08-30', 18, 29, '5r9cmyr67yi'),
(90, 5, '2018-08-31', 18, 30, 'ifcpdlyg7yp'),
(93, 2, '2018-08-29', 18, 31, 'nksnlaelv'),
(94, 3, '2018-08-23', 18, 32, '5jbl6axo8g8'),
(95, 3, '2018-08-23', 18, 33, 'p08dvnnuk7'),
(96, 3, '2018-08-23', 18, 34, 'n4pugjl8s6e'),
(97, 3, '2018-08-23', 18, 35, 'e59a8guswtb');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` char(255) NOT NULL,
  `email` char(255) NOT NULL,
  `tel` int(11) NOT NULL,
  `hash` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `name`, `email`, `tel`, `hash`) VALUES
(24, 'Ture', 'hej@mail.com', 89080923, 'glbxufelgvq'),
(25, 'Fetch mcGit', 'hej@git.gitty', 34536457, '5dwdcc0uvpv'),
(26, 'Jeppe', 'jeppe@hej.se', 4567890, 'rwbwxsu6tds'),
(27, 'Gittan McFetch', 'gittan@git.se', 34567890, 'gj9daz7e1la'),
(28, 'Committa Pulli', 'committa@pulli.com', 34567890, 'edrg6g3hz3'),
(29, 'Ture Fasle', 'ture@hej.se', 34567890, '5r9cmyr67yi'),
(30, 'Hunk Pulli', 'hunken_2000@hej.se', 2364766, 'ifcpdlyg7yp'),
(31, 'Omi', 'oumie.gibba@gmail.com', 7654321, 'nksnlaelv'),
(32, 'uyt', 'f@g.bg', 23456789, '5jbl6axo8g8'),
(33, 'uyt', 'f@g.bg', 23456789, 'p08dvnnuk7'),
(34, 'uyt', 'f@g.bg', 23456789, 'n4pugjl8s6e'),
(35, 'uyt', 'f@g.bg', 23456789, 'e59a8guswtb');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
