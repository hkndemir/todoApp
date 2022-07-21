package com.todolist.IData;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.todolist.Entity.Note;
public interface INoteData extends JpaRepository<Note,Integer> {	
	@Query(value = "select * from Notes where user_id = :value",nativeQuery = true)
    List<Note> getUserNote(int value);
}
