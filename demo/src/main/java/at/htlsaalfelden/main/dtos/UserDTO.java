package at.htlsaalfelden.main.dtos;

import at.htlsaalfelden.main.models.UserEntity;
import org.bson.types.ObjectId;

public record UserDTO(String _username, int _money, String _passwordHashed) {
    public UserDTO(UserEntity e){
        this(e.getUsername(), e.getMoney(), e.getPasswordHashed());
    }


    public UserEntity toUserEntity(){
        return new UserEntity(_username, _money, _passwordHashed);
    }
}