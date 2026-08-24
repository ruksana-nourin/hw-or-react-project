-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 24, 2026 at 10:04 PM
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
-- Database: `library_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

CREATE TABLE `authors` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `status_id` int(10) UNSIGNED NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`id`, `name`, `email`, `phone`, `bio`, `status_id`, `created_at`, `updated_at`) VALUES
(1, 'Robert C. Martin', 'robert@example.com', '+1 555-1001', 'Author and software engineer.', 1, '2026-08-17 00:41:10', '2026-08-17 00:41:10'),
(2, 'James Clear', 'james@example.com', '+1 555-1002', 'Author and speaker focused on habits and personal development.', 1, '2026-08-17 00:41:10', '2026-08-17 00:41:10'),
(3, 'J. K. Rowling', 'jk@example.com', '+1 555-1003', 'Author best known for the Harry Potter series.', 1, '2026-08-17 00:41:10', '2026-08-17 00:41:10'),
(4, 'George Orwel', 'george@example.com', '+1 555-1004', 'English novelist and essayist.', 2, '2026-08-17 00:41:10', '2026-08-23 00:25:11'),
(5, 'Martin Fowler', 'martin@example.com', '+1 555-2001', 'Author and software development expert.', 1, '2026-08-23 00:41:05', '2026-08-23 00:41:05'),
(6, 'Rhonda Kaufman', 'ratox@mailinator.com', '+1 (139) 512-1953', '', 1, '2026-08-23 00:57:26', '2026-08-23 00:57:26'),
(7, 'Martin Fowler', 'martin@example.com', '+1 555-2001', 'Author and software development expert.', 1, '2026-08-24 21:27:08', '2026-08-24 21:27:08');

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(200) NOT NULL,
  `isbn` varchar(20) DEFAULT NULL,
  `author_id` int(10) UNSIGNED NOT NULL,
  `category_id` int(10) UNSIGNED NOT NULL,
  `publisher_id` int(10) UNSIGNED NOT NULL,
  `total_copies` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `status_id` int(10) UNSIGNED NOT NULL,
  `cover_image` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `title`, `isbn`, `author_id`, `category_id`, `publisher_id`, `total_copies`, `status_id`, `cover_image`, `created_at`, `updated_at`) VALUES
(1, 'Clean Code', '9780132350884', 1, 1, 1, 10, 1, 'uploads/books/WhatsApp Image 2026-08-25 at 1.46.34 AM.jpeg', '2026-08-17 00:56:17', '2026-08-25 01:49:28'),
(2, 'Atomic Habits', '9780735211292', 2, 2, 2, 12, 1, 'uploads/books/image copy 2.png', '2026-08-17 00:56:17', '2026-08-25 01:58:19'),
(3, 'Harry Potter and the Philosopher\'s Stone', '9780747532743', 3, 3, 3, 8, 1, 'uploads/books/image copy.png', '2026-08-17 00:56:17', '2026-08-25 01:56:12'),
(6, 'মজার ভূত', ' 908765432', 6, 6, 3, 10, 1, 'uploads/books/20260824-213609.jpeg', '2026-08-25 01:36:09', '2026-08-25 01:36:09'),
(9, 'বড় যদি হতে চাও', ' Nulla velit invento', 3, 5, 4, 84, 1, 'uploads/books/image.png', '2026-08-25 01:38:44', '2026-08-25 01:53:57'),
(11, 'The Sky is Pink', ' 98000340', 4, 2, 2, 68, 1, 'uploads/books/WhatsApp Image 2026-08-25 at 1.50.34 AM.jpeg', '2026-08-25 01:43:13', '2026-08-25 01:52:15'),
(12, 'A Court of Throns', ' 34567890', 4, 2, 4, 5, 1, 'uploads/books/20260824-220206.png', '2026-08-25 02:02:06', '2026-08-25 02:02:06');

-- --------------------------------------------------------

--
-- Table structure for table `book_statuses`
--

CREATE TABLE `book_statuses` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `book_statuses`
--

INSERT INTO `book_statuses` (`id`, `name`) VALUES
(3, 'Archived'),
(1, 'Available'),
(2, 'Unavailable');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `status_id` int(10) UNSIGNED NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `status_id`, `created_at`, `updated_at`) VALUES
(1, 'Programming', 'Books related to programming and software development.', 1, '2026-08-17 00:44:27', '2026-08-17 00:44:27'),
(2, 'Self Development', 'Books focused on personal growth and productivity.', 1, '2026-08-17 00:44:27', '2026-08-17 00:44:27'),
(3, 'Fiction', 'Novels and fictional literature.', 1, '2026-08-17 00:44:27', '2026-08-17 00:44:27'),
(4, 'Science', 'Books related to science and scientific topics.', 1, '2026-08-17 00:44:27', '2026-08-17 00:44:27'),
(5, 'History', 'Books related to historical events and civilizations.', 1, '2026-08-17 00:44:27', '2026-08-17 00:44:27'),
(6, 'Inactive Category', 'Currently unavailable category.', 2, '2026-08-17 00:44:27', '2026-08-17 00:44:27');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `name`) VALUES
(3, 'Accounts'),
(1, 'Administration'),
(4, 'IT'),
(2, 'Library');

-- --------------------------------------------------------

--
-- Table structure for table `fine_payments`
--

CREATE TABLE `fine_payments` (
  `id` int(10) UNSIGNED NOT NULL,
  `issue_id` int(10) UNSIGNED NOT NULL,
  `payment_status_id` int(10) UNSIGNED NOT NULL,
  `paid_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `payment_date` date DEFAULT NULL,
  `received_by` int(10) UNSIGNED DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fine_payments`
--

INSERT INTO `fine_payments` (`id`, `issue_id`, `payment_status_id`, `paid_amount`, `payment_date`, `received_by`, `notes`, `created_at`, `updated_at`) VALUES
(1, 2, 2, 0.00, NULL, NULL, 'Fine is unpaid', '2026-08-17 21:28:30', '2026-08-17 21:28:30'),
(2, 4, 2, 0.00, NULL, NULL, 'Fine is unpaid', '2026-08-17 21:28:30', '2026-08-17 21:28:30'),
(3, 5, 1, 30.00, '2026-07-30', 1, 'Fine paid in full', '2026-08-17 21:28:30', '2026-08-17 21:28:30'),
(4, 5, 1, 160.00, '2026-08-24', NULL, 'Fine payment', '2026-08-24 22:42:49', '2026-08-24 22:42:49'),
(5, 2, 0, 80.00, '2026-08-24', NULL, 'Fine payment', '2026-08-24 23:13:21', '2026-08-25 00:00:14'),
(6, 2, 1, 80.00, '2026-08-24', NULL, 'Fine payment', '2026-08-24 23:13:45', '2026-08-24 23:13:45'),
(7, 4, 2, 400.00, '2026-08-24', NULL, 'Fine payment', '2026-08-24 23:15:34', '2026-08-25 00:00:24'),
(8, 2, 1, 80.00, '2026-08-24', NULL, 'Fine payment', '2026-08-24 23:16:08', '2026-08-24 23:16:08');

-- --------------------------------------------------------

--
-- Table structure for table `issues`
--

CREATE TABLE `issues` (
  `id` int(10) UNSIGNED NOT NULL,
  `issue_code` varchar(20) NOT NULL,
  `member_id` int(10) UNSIGNED NOT NULL,
  `book_id` int(10) UNSIGNED NOT NULL,
  `issue_date` date NOT NULL,
  `due_date` date NOT NULL,
  `return_date` date DEFAULT NULL,
  `status_id` int(10) UNSIGNED NOT NULL,
  `fine_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `issued_by` int(10) UNSIGNED DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `issues`
--

INSERT INTO `issues` (`id`, `issue_code`, `member_id`, `book_id`, `issue_date`, `due_date`, `return_date`, `status_id`, `fine_amount`, `issued_by`, `notes`, `created_at`, `updated_at`) VALUES
(1, 'ISS-0001', 1, 1, '2026-08-17', '2026-08-31', '2026-08-23', 2, 0.00, 1, 'Currently issued', '2026-08-17 20:34:37', '2026-08-23 23:51:47'),
(2, 'ISS-0002', 2, 2, '2026-08-01', '2026-08-15', '2026-08-23', 3, 80.00, 2, 'Currently issued', '2026-08-17 20:34:37', '2026-08-24 00:22:53'),
(3, 'ISS-0003', 3, 3, '2026-07-10', '2026-07-24', '2026-07-22', 2, 0.00, 1, 'Returned on time', '2026-08-17 20:34:37', '2026-08-17 20:34:37'),
(4, 'ISS-0004', 4, 4, '2026-07-01', '2026-07-14', '2026-08-23', 3, 400.00, 3, 'Book is overdue', '2026-08-17 20:34:37', '2026-08-23 23:51:26'),
(5, 'ISS-0005', 5, 1, '2026-06-01', '2026-06-15', '2026-07-01', 3, 160.00, 1, 'Returned late', '2026-08-17 20:34:37', '2026-08-24 00:21:31'),
(6, 'ISS-0006', 1, 1, '2026-08-23', '2026-08-30', NULL, 1, 0.00, NULL, NULL, '2026-08-23 01:52:04', '2026-08-23 01:52:04'),
(7, 'ISS-0007', 3, 1, '2026-08-22', '2026-08-23', NULL, 1, 0.00, NULL, NULL, '2026-08-23 01:56:54', '2026-08-23 01:56:54'),
(8, 'ISS-0008', 2, 4, '2026-08-19', '2026-08-26', '2026-08-20', 2, 0.00, NULL, NULL, '2026-08-23 02:41:38', '2026-08-23 23:50:17'),
(9, 'ISS-0009', 3, 3, '2026-08-13', '2026-08-20', '2026-08-24', 3, 40.00, NULL, NULL, '2026-08-25 00:02:26', '2026-08-25 00:03:50');

-- --------------------------------------------------------

--
-- Table structure for table `issue_statuses`
--

CREATE TABLE `issue_statuses` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `issue_statuses`
--

INSERT INTO `issue_statuses` (`id`, `name`) VALUES
(1, 'Issued'),
(3, 'late'),
(4, 'Lost'),
(2, 'Returned');

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `id` int(10) UNSIGNED NOT NULL,
  `member_code` varchar(30) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `membership_type_id` int(10) UNSIGNED NOT NULL,
  `registration_fee` decimal(10,2) NOT NULL DEFAULT 0.00,
  `payment_status_id` int(10) UNSIGNED NOT NULL,
  `registration_date` date NOT NULL,
  `address` text DEFAULT NULL,
  `status_id` int(10) UNSIGNED NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `member_code`, `name`, `email`, `phone`, `membership_type_id`, `registration_fee`, `payment_status_id`, `registration_date`, `address`, `status_id`, `created_at`, `updated_at`) VALUES
(1, 'MEM-0001', 'Sana Ahmed', 'roksana@example.com', '+8801712345678', 1, 500.00, 1, '2026-01-10', 'Dhaka, Bangladesh', 1, '2026-08-17 00:35:10', '2026-08-23 01:33:49'),
(2, 'MEM-0002', 'Tanvir Hasan', 'tanvir@example.com', '+8801812345678', 2, 300.00, 1, '2026-02-15', 'Gazipur, Bangladesh', 2, '2026-08-17 00:35:10', '2026-08-25 00:41:01'),
(3, 'MEM-0003', 'Nusrat Jahan', 'nusrat@example.com', '+8801912345678', 3, 1000.00, 2, '2026-03-05', 'Dhaka, Bangladesh', 1, '2026-08-17 00:35:10', '2026-08-17 00:35:10'),
(4, 'MEM-0004', 'Sabbir Rahman', 'sabbir@example.com', '+8801612345678', 2, 300.00, 3, '2026-04-20', 'Mymensingh, Bangladesh', 1, '2026-08-17 00:35:10', '2026-08-17 00:35:10'),
(5, 'MEM-0005', 'Nadia Akter', 'nadia@example.com', '+8801512345678', 1, 500.00, 1, '2026-05-12', 'Chattogram, Bangladesh', 1, '2026-08-17 00:35:10', '2026-08-17 00:35:10');

-- --------------------------------------------------------

--
-- Table structure for table `membership_payments`
--

CREATE TABLE `membership_payments` (
  `id` int(10) UNSIGNED NOT NULL,
  `member_id` int(10) UNSIGNED NOT NULL,
  `amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `payment_status_id` int(10) UNSIGNED NOT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `payment_date` date DEFAULT NULL,
  `received_by` int(10) UNSIGNED DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `membership_payments`
--

INSERT INTO `membership_payments` (`id`, `member_id`, `amount`, `payment_status_id`, `payment_method`, `payment_date`, `received_by`, `notes`, `created_at`, `updated_at`) VALUES
(1, 1, 500.00, 1, 'Cash', '2026-08-01', 1, 'Registration fee paid in full', '2026-08-17 21:36:00', '2026-08-17 21:36:00'),
(2, 2, 500.00, 2, NULL, NULL, NULL, 'Registration fee unpaid', '2026-08-17 21:36:00', '2026-08-17 21:36:00'),
(3, 3, 500.00, 3, 'Cash', '2026-08-05', 2, 'Partial registration fee payment', '2026-08-17 21:36:00', '2026-08-17 21:36:00');

-- --------------------------------------------------------

--
-- Table structure for table `membership_types`
--

CREATE TABLE `membership_types` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `duration_months` int(10) UNSIGNED NOT NULL,
  `fee` decimal(10,2) NOT NULL DEFAULT 0.00,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `membership_types`
--

INSERT INTO `membership_types` (`id`, `name`, `duration_months`, `fee`, `description`) VALUES
(1, 'Regular', 12, 500.00, 'Standard library membership'),
(2, 'Student', 12, 300.00, 'Membership for students'),
(3, 'Premium', 12, 1000.00, 'Premium membership with additional benefits');

-- --------------------------------------------------------

--
-- Table structure for table `payment_statuses`
--

CREATE TABLE `payment_statuses` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment_statuses`
--

INSERT INTO `payment_statuses` (`id`, `name`) VALUES
(1, 'Paid'),
(3, 'Partial'),
(2, 'Unpaid');

-- --------------------------------------------------------

--
-- Table structure for table `publishers`
--

CREATE TABLE `publishers` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `status_id` int(10) UNSIGNED NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `publishers`
--

INSERT INTO `publishers` (`id`, `name`, `email`, `phone`, `address`, `website`, `status_id`, `created_at`, `updated_at`) VALUES
(1, 'Pearson', 'contact@pearson.com', '+1 555-2001', 'New York, USA', 'https://www.pearson.com', 1, '2026-08-17 00:47:02', '2026-08-17 00:47:02'),
(2, 'Penguin Random House', 'contact@penguinrandomhouse.com', '+1 555-2002', 'New York, USA', 'https://www.penguinrandomhouse.com', 1, '2026-08-17 00:47:02', '2026-08-17 00:47:02'),
(3, 'HarperCollins', 'contact@harpercollins.com', '+1 555-2003', 'New York, USA', 'https://www.harpercollins.com', 1, '2026-08-17 00:47:02', '2026-08-17 00:47:02'),
(4, 'Oxford University Press', 'contact@oup.com', '+44 1865 556767', 'Oxford, UK', 'https://global.oup.com', 1, '2026-08-17 00:47:02', '2026-08-17 00:47:02');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'Admin'),
(2, 'Librarian'),
(3, 'Staff');

-- --------------------------------------------------------

--
-- Table structure for table `statuses`
--

CREATE TABLE `statuses` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `statuses`
--

INSERT INTO `statuses` (`id`, `name`) VALUES
(1, 'Active'),
(2, 'Inactive');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL,
  `status_id` int(10) UNSIGNED NOT NULL,
  `department_id` int(10) UNSIGNED DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `password`, `role_id`, `status_id`, `department_id`, `address`, `notes`, `last_login`, `created_at`, `updated_at`) VALUES
(1, 'Sarah Ahmed', 'sarah@example.com', '+1 555 0184', '$2y$10$examplehashedpassword1', 1, 1, 1, 'New York, USA', 'Senior Administrator', NULL, '2026-08-17 00:18:40', '2026-08-17 00:18:40'),
(2, 'John Smith', 'john@example.com', '+1 555 0185', '$2y$10$examplehashedpassword2', 2, 1, 2, 'Dhaka, Bangladesh', 'Library librarian', NULL, '2026-08-17 00:18:40', '2026-08-17 00:18:40'),
(5, 'Roxy', 'roxy@mail.com', '4567', '$2y$10$examplehashedpassword2', 1, 2, 1, 'asdfgh', 'erewt', '2026-08-18 23:54:26', '2026-08-19 23:55:37', '2026-08-19 23:58:21'),
(6, 'Ruksana Nourin', 'ruksananourin@gmail.com', '01787370634', '$2y$10$5KPDpjmrqWkaBFzfUazGFuY4Xyb9rPoPw9SEudFgAB.ePIxU.Je42', 1, 2, 3, 'Habiganj', '', NULL, '2026-08-22 23:29:24', '2026-08-22 23:29:24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `isbn` (`isbn`);

--
-- Indexes for table `book_statuses`
--
ALTER TABLE `book_statuses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `fine_payments`
--
ALTER TABLE `fine_payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `issues`
--
ALTER TABLE `issues`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `issue_code` (`issue_code`);

--
-- Indexes for table `issue_statuses`
--
ALTER TABLE `issue_statuses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `member_code` (`member_code`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `membership_payments`
--
ALTER TABLE `membership_payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `membership_types`
--
ALTER TABLE `membership_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `payment_statuses`
--
ALTER TABLE `payment_statuses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `publishers`
--
ALTER TABLE `publishers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `statuses`
--
ALTER TABLE `statuses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authors`
--
ALTER TABLE `authors`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `book_statuses`
--
ALTER TABLE `book_statuses`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `fine_payments`
--
ALTER TABLE `fine_payments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `issues`
--
ALTER TABLE `issues`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `issue_statuses`
--
ALTER TABLE `issue_statuses`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `membership_payments`
--
ALTER TABLE `membership_payments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `membership_types`
--
ALTER TABLE `membership_types`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `payment_statuses`
--
ALTER TABLE `payment_statuses`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `publishers`
--
ALTER TABLE `publishers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `statuses`
--
ALTER TABLE `statuses`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
