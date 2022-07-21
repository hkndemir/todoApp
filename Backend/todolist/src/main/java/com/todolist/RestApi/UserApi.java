package com.todolist.RestApi;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.todolist.Entity.User;
import com.todolist.Manager.UserManager;


@RestController
@CrossOrigin
public class UserApi {
	@Autowired
    private UserManager userService;

    @GetMapping("/login")
    private User getCurrentUser(@RequestBody User user) {
        return userService.getUser(user);
    }
    @GetMapping("/login/all")
    private List<User> get() {
       
        return userService.getAllUser();
    }

    @GetMapping("/login/{username}/{password}")
    private boolean findUserByUsername(@PathVariable String username, @PathVariable String password) {
      
        return userService.getUserByUsername(username, password);
    }

    @PostMapping("/createUser")
    private boolean addUser(@RequestBody User user) {
        boolean user_exits = userService.findUserByUsername(user.getUsername());
        if(user_exits) {
            return false;
        }
        userService.saveUser(user);
        return true;
    }
}
