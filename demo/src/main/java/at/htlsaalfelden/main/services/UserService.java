package at.htlsaalfelden.main.services;

import at.htlsaalfelden.main.dtos.UserDTO;
import java.util.List;

public interface UserService {
    UserDTO save(UserDTO UserDTO);

    List<UserDTO> saveAll(List<UserDTO> carEntities);

    List<UserDTO> findAll();

    List<UserDTO> findAll(List<String> ids);

    UserDTO findOne(String id);

    long count();

    long delete(String id);

    long delete(List<String> ids);

    long deleteAll();

    UserDTO update(UserDTO UserDTO);

    long update(List<UserDTO> CarEntities);

    double getAverageAge();
}
