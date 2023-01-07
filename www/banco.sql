-- MySQL Workbench Forward Engineering

SET @aOLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `banco`;
USE `banco` ;

-- -----------------------------------------------------
-- Table `mydb`.`TIPO`
-- -----------------------------------------------------
CREATE TABLE `TIPO` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `NOME` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`USUARIO`
-- -----------------------------------------------------
CREATE TABLE `USUARIO` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `NOME` VARCHAR(100) NOT NULL,
  `CELULAR` INT NOT NULL,
  `LOGIN` VARCHAR(16) NOT NULL,
  `SENHA` VARCHAR(255) NOT NULL,
  `TIPO_ID` INT NOT NULL,
  `CARTAO_ID` INT NOT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;

-- -- -----------------------------------------------------
-- -- Table `mydb`.`EMPRESA`
-- -- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `EMPRESA` (
  `IDEMPRESA` INT NOT NULL AUTO_INCREMENT,
  `NOME` VARCHAR(150) NOT NULL,
  `RESUMO` LONGTEXT NOT NULL,
  `HORARIO` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`IDEMPRESA`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`CARTAO`
-- -----------------------------------------------------
CREATE TABLE `CARTAO` (
  `UID` varchar(8) NOT NULL,
  `PASS` int(99)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Despejando dados para a tabela `user`
--
--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `user`
--
ALTER TABLE `CARTAO`
  ADD PRIMARY KEY (`UID`);
COMMIT;