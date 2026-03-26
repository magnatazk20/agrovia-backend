-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS noor661 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE noor661;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(120)  NOT NULL,
  email       VARCHAR(180)  NOT NULL UNIQUE,
  password    VARCHAR(255)  NOT NULL,
  created_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de sessões / tokens (opcional, para JWT blacklist futura)
CREATE TABLE IF NOT EXISTS sessions (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id     INT UNSIGNED NOT NULL,
  token       VARCHAR(512) NOT NULL,
  expires_at  DATETIME     NOT NULL,
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Usuário de teste (senha: 123456)
-- A senha real será gerada pelo bcrypt no backend
INSERT IGNORE INTO users (name, email, password) VALUES
  ('Admin', 'admin@noor661.com', '$2b$10$placeholder_will_be_replaced_by_backend');

SELECT 'Banco noor661 criado com sucesso!' AS status;
