package at.htlsaalfelden.main.Controller;


import at.htlsaalfelden.main.dtos.UserDTO;
import at.htlsaalfelden.main.services.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping(path="/User")
public class UserController {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    private UserService userService;
    private ObjectMapper mapper = new ObjectMapper();


    public UserController(UserService userService){this.userService = userService;}

    @GetMapping("/Users")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody List<UserDTO> getAllUsers() throws JsonProcessingException {
        return userService.findAll();
    }

    @PostMapping("/Create")
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody UserDTO createAccount(@RequestBody UserDTO u){
        List<UserDTO> users = userService.findAll();
        for (UserDTO existingUser : users) {
            if (u.toUserEntity().equals(existingUser.toUserEntity())) {
                return null;
            }
        }

        return userService.save(new UserDTO(u._username(), 1000, u._passwordHashed()));
    }

    @PostMapping("/Login")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody UserDTO logginAccount(@RequestBody UserDTO userDTO) throws JsonProcessingException {
        List<UserDTO> users = userService.findAll();

        for(UserDTO existingUser : users){
            if(userDTO.toUserEntity().equals(existingUser.toUserEntity())){
                return existingUser;
            }
        }

        return null;
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody UserDTO getCar(@PathVariable String id) {
        UserDTO userDTO = userService.findOne(id);
        if(userDTO == null) return null;
        return userDTO;
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<UserDTO> updateMoney(@RequestBody UserDTO userDTO){
        return ResponseEntity.ok(userService.update(userDTO));
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public final Exception handleAllExceptions(RuntimeException e) {
        LOGGER.error("Internal server error.", e);
        return e;
    }

}
