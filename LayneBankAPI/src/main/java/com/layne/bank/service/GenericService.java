package com.layne.bank.service;

import java.io.Serializable;

import org.springframework.data.repository.CrudRepository;

import com.layne.bank.service.exception.GenericServiceException;


public interface GenericService<T, ID extends Serializable> {
	default Iterable<T> findAll() {
		return getRepository().findAll();
	}
	
	default T get(ID id) {
		return getRepository().findOne(id);
	}
	
	default T save(T entity) {
		return getRepository().save(entity);
	}
	
	default void delete(ID id) {
		if (getRepository().exists(id)) {
			getRepository().delete(id);
		}
		else {
			throw new GenericServiceException("'id' doesn't exists: " + id);
		}
	}
	
	default void update(T entity) {
		if (getRepository().exists(getId(entity))) {
			getRepository().save(entity);
		}
		else {
			throw new GenericServiceException("Can't update it because it doesn't exist in DB: " + entity);
		}
	}
	
	ID getId(T entity);
	
	CrudRepository<T, ID> getRepository();
}
