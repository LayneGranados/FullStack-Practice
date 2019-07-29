package com.layne.bank.jpa;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.layne.bank.entity.Client;

@Transactional
public interface ClientRepository extends JpaRepository<Client, String> {

}
