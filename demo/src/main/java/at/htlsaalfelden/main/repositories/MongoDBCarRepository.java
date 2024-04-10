package at.htlsaalfelden.main.repositories;

import at.htlsaalfelden.main.models.UserEntity;
import com.mongodb.ReadConcern;
import com.mongodb.ReadPreference;
import com.mongodb.TransactionOptions;
import com.mongodb.WriteConcern;
import com.mongodb.client.ClientSession;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.FindOneAndReplaceOptions;
import com.mongodb.client.model.ReplaceOneModel;
import jakarta.annotation.PostConstruct;
import org.bson.BsonDocument;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Filters.in;
import static com.mongodb.client.model.ReturnDocument.AFTER;

@Repository
public class MongoDBCarRepository implements UserRepository {

    private static final TransactionOptions txnOptions = TransactionOptions.builder()
            .readPreference(ReadPreference.primary())
            .readConcern(ReadConcern.MAJORITY)
            .writeConcern(WriteConcern.MAJORITY)
            .build();
    private final MongoClient client;
    private MongoCollection<UserEntity> personCollection;

    public MongoDBCarRepository(MongoClient mongoClient) {
        this.client = mongoClient;
    }

    @PostConstruct
    void init() {
        personCollection = client.getDatabase("POS_SEMESTER_WIN").getCollection("Users", UserEntity.class);
    }

    @Override
    public UserEntity save(UserEntity UserEntity) {
        UserEntity.setId(new ObjectId());
        personCollection.insertOne(UserEntity);
        return UserEntity;
    }

    @Override
    public List<UserEntity> saveAll(List<UserEntity> personEntities) {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(() -> {
                personEntities.forEach(c -> c.setId(new ObjectId()));
                personCollection.insertMany(clientSession, personEntities);
                return personEntities;
            }, txnOptions);
        }
    }

    @Override
    public List<UserEntity> findAll() {
        return personCollection.find().into(new ArrayList<>());
    }

    @Override
    public List<UserEntity> findAll(List<String> ids) {
        return personCollection.find(in("_id", mapToObjectIds(ids))).into(new ArrayList<>());
    }

    @Override
    public UserEntity findOne(String id) {
        return personCollection.find(eq("_id", new ObjectId(id))).first();
    }

    @Override
    public long count() {
        return personCollection.countDocuments();
    }

    @Override
    public long delete(String id) {
        return personCollection.deleteOne(eq("_id", new ObjectId(id))).getDeletedCount();
    }

    @Override
    public long delete(List<String> ids) {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> personCollection.deleteMany(clientSession, in("_id", mapToObjectIds(ids))).getDeletedCount(),
                    txnOptions);
        }
    }

    @Override
    public long deleteAll() {
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> personCollection.deleteMany(clientSession, new BsonDocument()).getDeletedCount(), txnOptions);
        }
    }

    @Override
    public UserEntity update(UserEntity UserEntity) {
        FindOneAndReplaceOptions options = new FindOneAndReplaceOptions().returnDocument(AFTER);
        return personCollection.findOneAndReplace(eq("_id", UserEntity.getId()), UserEntity, options);
    }

    @Override
    public long update(List<UserEntity> personEntities) {
        List<ReplaceOneModel<UserEntity>> writes = personEntities.stream()
                .map(p -> new ReplaceOneModel<>(eq("_id", p.getId()),
                        p))
                .toList();
        try (ClientSession clientSession = client.startSession()) {
            return clientSession.withTransaction(
                    () -> personCollection.bulkWrite(clientSession, writes).getModifiedCount(), txnOptions);
        }
    }

    @Override
    public double getAverageAge() {
        return 0;
    }

    private List<ObjectId> mapToObjectIds(List<String> ids) {
        return ids.stream().map(ObjectId::new).toList();
    }
}
