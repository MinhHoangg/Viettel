package com.viettel.vn.repository;
import com.viettel.vn.domain.SUBS_DAILY;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SUBS_DAILY entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SUBS_DAILYRepository extends JpaRepository<SUBS_DAILY, Long> {

}
