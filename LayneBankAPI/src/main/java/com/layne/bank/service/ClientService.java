package com.layne.bank.service;

import java.util.UUID;

import com.layne.bank.entity.*;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import com.layne.bank.jpa.ClientRepository;

@Service
public class ClientService implements GenericService<Client, String> {
	private final ClientRepository clientRepository;
	
	public ClientService(final ClientRepository clientRepository) {
		this.clientRepository = clientRepository;
	}
	
	@Override
	public CrudRepository<Client, String> getRepository() {
		return this.clientRepository;
	}

	@Override
	public String getId(Client entity) {
		return entity.getClientId();
	}
	
	@Override
	public Client save(Client entity) {
		entity.setClientId(UUID.randomUUID().toString());
		return GenericService.super.save(entity);
	}

}