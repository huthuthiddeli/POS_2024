package at.htlsaalfelden.main.models;

import org.apache.catalina.User;
import org.bson.types.ObjectId;

import java.util.Objects;

public class UserEntity {
    private String username;
    private ObjectId id;
    private int money;
    private String passwordHashed;

    public UserEntity(){}

    public UserEntity(String username, int money, String passwordHashed){
        this.username = username;
        this.money = money;
        this.passwordHashed = passwordHashed;
    }

    public UserEntity(String username, ObjectId id, int money, String passwordHashed){
        this.username = username;
        this.id = id;
        this.money = money;
        this.passwordHashed = passwordHashed;
    }

    public String getUsername(){
        return this.username;
    }

    public ObjectId getId(){
        return this.id;
    }

    public int getMoney(){
        return this.money;
    }

    public UserEntity setUsername(String s){
        this.username = s;
        return this;
    }

    public UserEntity setId(ObjectId id){
        this.id = id;
        return this;
    }

    public UserEntity setMoney(int money){
        this.money = money;
        return this;
    }

    public UserEntity setPasswordHashed(String passwordHashed){
        this.passwordHashed = passwordHashed;
        return this;
    }


    public String getPasswordHashed(){
        return this.passwordHashed;
    }

    @Override
    public String toString(){
        return "Userentity{" +"username=" + username + ", id= " + id + " money=" + money
                + ", passwordHashed=" + passwordHashed;
    }

    @Override
    public boolean equals(Object o){
        if(this == o) return true;
        if(o == null || getClass() != o.getClass()) return false;
        UserEntity userEntity = (UserEntity)o;
        return Objects.equals(username, userEntity.username) && Objects.equals(passwordHashed, userEntity.passwordHashed);
    }

    @Override
    public int hashCode(){
        return Objects.hash(username, id, money, passwordHashed);
    }
}