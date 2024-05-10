package at.htlsaalfelden.main.repositories;

import at.htlsaalfelden.main.models.Usermodel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActualUserRepository extends MongoRepository<Usermodel, String> {


    @Override
    Usermodel save(Usermodel s);

    List<Usermodel> findAll();


    @Query("{'Usermodel':  ?0}")
    Usermodel updateFirst(Usermodel model);

    Usermodel findOneByUsername(String username);

}
