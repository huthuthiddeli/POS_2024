package at.htlsaalfelden.main.services;


import at.htlsaalfelden.main.dtos.UserDTO;
import at.htlsaalfelden.main.models.Usermodel;
import at.htlsaalfelden.main.repositories.ActualUserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActualUserService {
    private final ActualUserRepository repository;
    private static final Logger LOGGER = LoggerFactory.getLogger(ActualUserService.class);
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    public ActualUserService(ActualUserRepository repo, MongoTemplate template){
        this.repository = repo;
        this.mongoTemplate = template;
    }


    public Usermodel createUser(Usermodel u){
        return repository.save(u);
    }

    public Usermodel updateFirst(Usermodel updateObj){
        // Create a query to find the document to update
        Query query = new Query(Criteria.where("username").is(updateObj.getUsername()));

        // Create an update object to specify the changes
        Update update = new Update().set("money", updateObj.getMoney());

        // Perform the update operation
        return mongoTemplate.findAndModify(query, update, Usermodel.class);
    }

    public Usermodel findOneByUsername(UserDTO dto){

        Query query = new Query(Criteria.where("username").is(dto.get_username()));
        Usermodel user = mongoTemplate.findOne(query, Usermodel.class);

        if (user == null) {
            LOGGER.error("No user found like this: " + dto.toString());
            return null;
        }


        return user;
    }

    public void DeleteAll(){
        this.repository.deleteAll();
    }


    public List<Usermodel> findAll(){
        return repository.findAll();
    }
}