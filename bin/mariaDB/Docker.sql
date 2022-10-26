-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `docker`;
USE `docker`;

-- -----------------------------------------------------
-- Table `mydb`.`docker`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `user` (
  `UID` VARCHAR(8) NOT NULL,
  `name` VARCHAR(200),
  `RG` VARCHAR(14),
  `email` VARCHAR(70),
  `password` VARCHAR(40),
  `isAdm` BOOLEAN,
  `card_id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`UID`),
  FOREIGN KEY (`card_id`)
  REFERENCES `card` (`id`),
  UNIQUE INDEX `RG_UNIQUE` (`RG` ASC)
)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `card`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `card` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `balance` FLOAT,
	PRIMARY KEY (`id`)
)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `card`
-- -----------------------------------------------------

CREATE TABLE `type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`)
)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

