package at.htlsaalfelden.main.Controller;


import at.htlsaalfelden.main.dtos.UserDTO;
import at.htlsaalfelden.main.models.Usermodel;
import at.htlsaalfelden.main.services.ActualUserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(path="/User")
public class UserController {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
    private ActualUserService actualUserService;
    private ObjectMapper mapper = new ObjectMapper();

    @Autowired
    public UserController(ActualUserService actualUserService){
        this.actualUserService = actualUserService;
    }



    @GetMapping("/Users")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody ResponseEntity<List<Usermodel>> getAllUsers() throws JsonProcessingException {
        return new ResponseEntity<>(actualUserService.findAll(), HttpStatus.OK);
    }



    @PostMapping("/Create")
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody ResponseEntity<UserDTO> createAccount(@RequestBody UserDTO u) throws JsonProcessingException {
        List<Usermodel> users = actualUserService.findAll();

        for(Usermodel model : users){
            LOGGER.info(model.toString());
        }



        for (Usermodel existingUser : users) {
            if (u.ToUsermodel().equals(existingUser)) {
                return null;
            }
        }


        UserDTO actualObj = new UserDTO(u.get_username(), 1000, u.get_passwordHashed());

        LOGGER.info(mapper.writeValueAsString(actualObj));

        actualUserService.createUser(actualObj.ToUsermodel());

        return new ResponseEntity<>(actualObj, HttpStatus.CREATED);
    }


    @PostMapping("/Login")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody ResponseEntity<Usermodel> logginAccount(@RequestBody UserDTO userDTO) throws JsonProcessingException {
        List<Usermodel> users = actualUserService.findAll();

        try{

            for(Usermodel existingUser : users){
                if(userDTO.ToUsermodel().equals(existingUser)){
                    return new ResponseEntity<>(existingUser, HttpStatus.ACCEPTED);
                }
            }
        }catch (Exception ex){
            LOGGER.error("ERROR: " + ex.getMessage());
        }

        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public final Exception handleAllExceptions(RuntimeException e) {
        LOGGER.error("Internal server error.", e);
        return e;
    }
}