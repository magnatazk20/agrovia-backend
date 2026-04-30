CREATE TABLE IF NOT EXISTS cycle_product_commission_requirements (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  cycle_product_id BIGINT UNSIGNED NOT NULL,
  commission_level_id BIGINT UNSIGNED NOT NULL,
  required_count INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_cycle_product_commission_req (cycle_product_id, commission_level_id),
  KEY idx_cycle_product_commission_req_product (cycle_product_id),
  KEY idx_cycle_product_commission_req_level (commission_level_id)
);
