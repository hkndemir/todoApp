package com.todolist.Manager;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todolist.Entity.Note;
import com.todolist.IData.INoteData;
import com.todolist.IBusiness.INoteBusiness;
@Service
public class NoteManager implements INoteBusiness{
	private INoteData noteData;
	
    @Autowired
	public NoteManager(INoteData noteDate) {	
    	
		this.noteData = noteDate;
	}

	
	
	@Override
	public void add(Note note) {
		this.noteData.save(note);
	
	}

	@Override
	public void update(Note note) {
		this.noteData.save(note);	
	}

	@Override
	@Transactional
	public void delete(Note note) {
		this.noteData.delete(note);		
	}
 
	@Override
	@Transactional
	public List<Note> getAll() {	
		
		return this.noteData.findAll();
	}
	

	@Override
	@Transactional
	public List<Note> getUserNote(int val) {	
		
		return this.noteData.getUserNote(val);
	}
	@Override

	@Transactional
	public Optional<Note> getById(int id) {
		return this.noteData.findById((int) id);
	}

}
