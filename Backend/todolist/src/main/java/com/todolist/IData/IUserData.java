package com.todolist.IData;

import org.springframework.data.jpa.repository.JpaRepository;

import com.todolist.Entity.User;

public interface IUserData extends JpaRepository<User,Long> {	
	User findByUsernameAndPassword(String username, String password);

    User findTopByUsername(String username);

    User findTopByPassword(String password);
	


}
