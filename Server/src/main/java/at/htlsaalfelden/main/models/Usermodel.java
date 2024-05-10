package at.htlsaalfelden.main.models;

import lombok.Getter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Objects;

@Getter
@Document(collection = "users")
public class Usermodel {

    @Id
    private String id;
    @Field("username")
    private String username;
    @Field("money")
    private int money;
    @Field("passwordHashed")
    private String passwordHashed;

    // Constructors, getters, and setters

    public Usermodel() {
        // Default constructor required by Spring Data MongoDB
    }

    public Usermodel(String username, int money, String passwordHashed) {
        this.username = username;
        this.money = money;
        this.passwordHashed = passwordHashed;
    }

    // Getters and setters for id, username, money, and passwordHashed

    public Usermodel setId(String id) {
        this.id = id;
        return this;
    }

    public Usermodel setUsername(String username) {
        this.username = username;
        return this;
    }

    public Usermodel setMoney(int money) {
        this.money = money;
        return this;
    }

    public Usermodel setPasswordHashed(String passwordHashed) {
        this.passwordHashed = passwordHashed;
        return this;
    }

    @Override
    public boolean equals(Object o){
        if(this == o) return true;
        if(o == null || getClass() != o.getClass()) return false;
        Usermodel userEntity = (Usermodel)o;
        return Objects.equals(username, userEntity.username) && Objects.equals(passwordHashed, userEntity.passwordHashed);
    }

    @Override
    public String toString() {
        return "Usermodel{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", money=" + money +
                ", passwordHashed='" + passwordHashed + '\'' +
                '}';
    }
}
