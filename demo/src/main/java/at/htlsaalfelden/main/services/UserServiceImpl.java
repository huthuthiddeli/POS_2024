package at.htlsaalfelden.main.services;

import at.htlsaalfelden.main.dtos.UserDTO;
import at.htlsaalfelden.main.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userService;

    public UserServiceImpl(UserRepository carRepository) {
        this.userService = carRepository;
    }

    @Override
    public UserDTO save(UserDTO UserDTO) {
        return new UserDTO(userService.save(UserDTO.toUserEntity()));
    }

    @Override
    public List<UserDTO> saveAll(List<UserDTO> personEntities) {
        return personEntities.stream()
                .map(UserDTO::toUserEntity)
                .peek(userService::save)
                .map(UserDTO::new)
                .toList();
    }

    @Override
    public List<UserDTO> findAll() {
        return userService.findAll().stream().map(UserDTO::new).toList();
    }

    @Override
    public List<UserDTO> findAll(List<String> ids) {
        return userService.findAll(ids).stream().map(UserDTO::new).toList();
    }

    @Override
    public UserDTO findOne(String id) {
        return new UserDTO(userService.findOne(id));
    }

    @Override
    public long count() {
        return userService.count();
    }

    @Override
    public long delete(String id) {
        return userService.delete(id);
    }

    @Override
    public long delete(List<String> ids) {
        return userService.delete(ids);
    }

    @Override
    public long deleteAll() {
        return userService.deleteAll();
    }

    @Override
    public UserDTO update(UserDTO PersonDTO) {
        return new UserDTO(userService.update(PersonDTO.toUserEntity()));
    }

    @Override
    public long update(List<UserDTO> personEntities) {
        return userService.update(personEntities.stream().map(UserDTO::toUserEntity).toList());
    }

    @Override
    public double getAverageAge() {
        return userService.getAverageAge();
    }
}