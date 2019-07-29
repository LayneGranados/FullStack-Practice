package com.layne.bank.controller;

import java.net.URI;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.layne.bank.entity.Account;
import com.layne.bank.service.AccountService;
import com.layne.bank.vo.ResponseVO;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/")
public class AccountController {
	private final AccountService accountService;

	public AccountController(final AccountService accountService) {
		this.accountService = accountService;
	}

	@GetMapping(value = "/clients/{client_id}/accounts",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseVO<Iterable<Account>>> findAll(@PathVariable("client_id") String clientId) {
		System.out.println("clientId: "+clientId);
		return ResponseEntity.ok(new ResponseVO<>(accountService.findByClientId(clientId)));
	}

	@GetMapping(value = "/clients/{client_id}/accounts/{account_id}",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseVO<Account>> get(@PathVariable("client_id") String clientId,
	                                               @PathVariable("account_id") String accountId) {
		return ResponseEntity.ok(new ResponseVO<>(accountService.get(accountId)));
	}

	@PostMapping(value = "/clients/{client_id}/accounts",
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseVO<Account>> create(@PathVariable("client_id") String clientId, @RequestBody Account account) {
		account.setClientId(clientId);
		Account savedAccount = accountService.save(account);
		return ResponseEntity
				.created(URI.create("/clients/"+clientId+"/accounts/" + account.getAccountId()))
				.body(new ResponseVO<>(savedAccount));
	}

	@PutMapping(value = "/clients/{client_id}/accounts/{account_id}",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> update(@RequestBody Account accountId) {
		accountService.update(accountId);
		return ResponseEntity.noContent().build();
	}

	@DeleteMapping(value = "/clients/{client_id}/accounts/{account_id}",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseVO<String>> delete(@PathVariable("client_id") String clientId,
	                                                 @PathVariable("account_id") String accountId) {
		accountService.delete(accountId);
		return ResponseEntity.ok(new ResponseVO<>(accountId));
	}

}
