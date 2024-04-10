package at.htlsaalfelden.main.repositories;

import at.htlsaalfelden.main.models.UserEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository {

    UserEntity save(UserEntity personEntity);

    List<UserEntity> saveAll(List<UserEntity> personEntities);

    List<UserEntity> findAll();

    List<UserEntity> findAll(List<String> ids);

    UserEntity findOne(String id);

    long count();

    long delete(String id);

    long delete(List<String> ids);

    long deleteAll();

    UserEntity update(UserEntity personEntity);

    long update(List<UserEntity> personEntities);

    double getAverageAge();

}
