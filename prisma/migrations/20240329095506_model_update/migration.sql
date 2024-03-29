-- CreateTable
CREATE TABLE `memailuser` (
    `id` VARCHAR(191) NOT NULL,
    `nEmailUserID` INTEGER UNSIGNED NOT NULL,
    `sEmail` VARCHAR(255) NOT NULL,
    `sPassword` VARCHAR(255) NOT NULL,
    `sFullName` VARCHAR(200) NOT NULL,
    `dtExpiry` VARCHAR(11) NOT NULL,
    `bSentReminder1` TINYINT UNSIGNED NOT NULL,
    `bSentReminder2` TINYINT UNSIGNED NOT NULL,
    `bSentReminder3` TINYINT UNSIGNED NOT NULL,
    `sComanyName` VARCHAR(100) NOT NULL,
    `sContactNo` VARCHAR(50) NOT NULL,
    `sPythaDongalNo` VARCHAR(50) NOT NULL,
    `bApproved` TINYINT NOT NULL,
    `bActive` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `bEmailVerified` TINYINT NOT NULL DEFAULT 0,
    `trial` TINYINT NOT NULL DEFAULT 0,
    `bFixed` TINYINT NULL DEFAULT 0,
    `dtCreated` DATETIME(0) NULL,
    `dtModified` DATETIME(0) NULL,

    UNIQUE INDEX `memailuser_sEmail_key`(`sEmail`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    UNIQUE INDEX `VerificationToken_email_token_key`(`email`, `token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PasswordResetToken` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PasswordResetToken_token_key`(`token`),
    UNIQUE INDEX `PasswordResetToken_email_token_key`(`email`, `token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Verify` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Verify_token_key`(`token`),
    UNIQUE INDEX `Verify_email_token_key`(`email`, `token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
