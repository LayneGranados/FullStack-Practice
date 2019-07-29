package com.layne.bank.jpa;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.layne.bank.entity.Account;

import java.util.*;

@Transactional
public interface AccountRepository extends JpaRepository<Account, String> {

	List<Account> findByClientId(String clientId);

}
