package at.htlsaalfelden.main.dtos;

import at.htlsaalfelden.main.models.UserEntity;
import org.bson.types.ObjectId;

public record UserDTO(String username, int money, String passwordHashed) {
    public UserDTO(UserEntity e){
        this(e.getUsername(), e.getMoney(), e.getPasswordHashed());
    }


    public UserEntity toUserEntity(){
        return new UserEntity(username, money, passwordHashed);
    }
}