package com.viettel.vn.repository;
import com.viettel.vn.domain.Transaction_logs;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Transaction_logs entity.
 */
@SuppressWarnings("unused")
@Repository
public interface Transaction_logsRepository extends JpaRepository<Transaction_logs, Long> {

}
