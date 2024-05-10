package at.htlsaalfelden.main.dtos;

import at.htlsaalfelden.main.models.Usermodel;
import lombok.Data;

@Data
public class UserDTO{
    private String _username;
    private int _money;
    private String  _passwordHashed;

    public UserDTO(String _username, int _money, String _passwordHashed){
        this._username = _username;
        this._money = _money;
        this._passwordHashed = _passwordHashed;
    }

    public Usermodel ToUsermodel(){return new Usermodel(_username, _money, _passwordHashed);}
}