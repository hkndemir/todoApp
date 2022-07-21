package com.todolist.Manager;

import java.util.List;

import javax.persistence.NonUniqueResultException;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.todolist.Entity.User;
import com.todolist.IBusiness.IUserBusiness;
import com.todolist.IData.IUserData;

@Service
public class UserManager implements IUserBusiness {
	
	
	@Autowired
    private IUserData userRepository;
    public User getUser(User user) {
        System.out.println("Service GET *****");
        return userRepository.findByUsernameAndPassword(user.getUsername(), user.getPassword());
    }
    
    public boolean getUserByUsername(String username, String password) {
        boolean username_present;
        boolean password_present;
        try {
            username_present = userRepository.findTopByUsername(username) != null ? true : false;
            password_present = userRepository.findTopByPassword(password) != null ? true : false;          
        } catch(NonUniqueResultException nre) {
            return true;
        }
        return username_present && password_present;
    }
    
    public boolean findUserByUsername(String username) {
        boolean username_present;
        try {
            username_present = userRepository.findTopByUsername(username) != null ? true : false;
            System.out.println("Username present (U): " + username_present);
        } catch(NonUniqueResultException nre) {
            return true;
        }
        return username_present;
    }
    
    public void saveUser(User user) {
        userRepository.save(user);
    }
    
 
	public List<User> getAllUser() {	
		
		return this.userRepository.findAll();
	}

}
