package com.layne.bank.controller;

import java.net.URI;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.layne.bank.entity.Client;
import com.layne.bank.service.ClientService;
import com.layne.bank.vo.ResponseVO;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/clients")
public class ClientController {
	private final ClientService clientService;

	public ClientController(final ClientService clientService) {
		this.clientService = clientService;
	}

	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseVO<Iterable<Client>>> findAll() {
		return ResponseEntity.ok(new ResponseVO<>(clientService.findAll()));
	}

	@GetMapping(value = "/{client_id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseVO<Client>> get(@PathVariable("client_id") String userId) {
		return ResponseEntity.ok(new ResponseVO<>(clientService.get(userId)));
	}

	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ResponseVO<Client>> createUser(@RequestBody Client client) {
		Client savedClient = clientService.save(client);
		return ResponseEntity.created(URI.create("/" + savedClient.getClientId())).body(new ResponseVO<>(savedClient));
	}
	
	@PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> updateUser(@RequestBody Client client) {
		clientService.update(client);
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping(value = "/{clientId}")
	public ResponseEntity<ResponseVO<String>> delete(@PathVariable("clientId") String userId) {
		clientService.delete(userId);
		return ResponseEntity.ok(new ResponseVO<>(userId));
	}
}
