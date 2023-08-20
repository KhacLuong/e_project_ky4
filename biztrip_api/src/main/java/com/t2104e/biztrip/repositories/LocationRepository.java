package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.entities.LocationEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LocationRepository extends JpaRepository<LocationEntity, Long> {

    @Query("SELECT lo from locations lo WHERE concat(lo.name, lo.address, lo.status, lo.createdAt, lo.updatedAt) like %?1%")
    Page<LocationEntity> findByKeyword(String keyword, Pageable pageable);

    @Query("SELECT lo from locations lo WHERE concat(lo.name, lo.address, lo.status, lo.createdAt, lo.updatedAt) like %?1%")
    List<LocationEntity> findByKeyword(String keyword, Sort sort);

    @Query("select lo from locations lo where lo.name like %?1% and lo.parentId = ?2")
    Page<LocationEntity> findByKeywordAAndParentId(String keyword, long parentId, Pageable pageable);

    List<LocationEntity> findAllByNameIgnoreCase(String name);

    List<LocationEntity> findAllByAddressIgnoreCase(String name);

    @Query("SELECT lo FROM  locations lo WHERE lo.name = :name AND lo.id <> :id")
    List<LocationEntity> findAllByNameAndIdNot(@Param("name") String name, @Param("id") Long id);

    List<LocationEntity> findAllByAddressIgnoreCaseAndIdNot(@Param("name") String name, @Param("id") Long id);

    //    @Modifying
//    @Query(value = "DELETE FROM schedule_location WHERE  location_id = :locationId",
//            nativeQuery = true)
//    void deleteScheduleLocationByIdLocation(long locationId);
    @Query("select l.id from locations l where l.parentId = ?1")
    Long[] findAllLocationByParentIdAndScheduleId(long parentId);

}
