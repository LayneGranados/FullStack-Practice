package com.layne.bank.service;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import com.layne.bank.entity.Account;
import com.layne.bank.jpa.AccountRepository;

import java.util.*;

@Service
public class AccountService implements GenericService<Account, String> {

	private final AccountRepository accountRepository;
	
	public AccountService(final AccountRepository accountRepository) {
		this.accountRepository = accountRepository;
	}

	@Override
	public String getId(Account entity) {
		return entity.getAccountId();
	}

	@Override
	public CrudRepository<Account, String> getRepository() {
		return this.accountRepository;
	}

	public List<Account> findByClientId(String clientId) {
		return this.accountRepository.findByClientId(clientId);
	}

	@Override
	public Account save(Account entity) {
		entity.setAccountId(UUID.randomUUID().toString());
		return GenericService.super.save(entity);
	}


}
