package com.viettel.vn.web.rest;

import com.viettel.vn.domain.Transaction_logs;
import com.viettel.vn.repository.Transaction_logsRepository;
import com.viettel.vn.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.viettel.vn.domain.Transaction_logs}.
 */
@RestController
@RequestMapping("/api")
public class Transaction_logsResource {

    private final Logger log = LoggerFactory.getLogger(Transaction_logsResource.class);

    private static final String ENTITY_NAME = "transaction_logs";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final Transaction_logsRepository transaction_logsRepository;

    public Transaction_logsResource(Transaction_logsRepository transaction_logsRepository) {
        this.transaction_logsRepository = transaction_logsRepository;
    }

    /**
     * {@code POST  /transaction-logs} : Create a new transaction_logs.
     *
     * @param transaction_logs the transaction_logs to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new transaction_logs, or with status {@code 400 (Bad Request)} if the transaction_logs has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/transaction-logs")
    public ResponseEntity<Transaction_logs> createTransaction_logs(@Valid @RequestBody Transaction_logs transaction_logs) throws URISyntaxException {
        log.debug("REST request to save Transaction_logs : {}", transaction_logs);
        if (transaction_logs.getId() != null) {
            throw new BadRequestAlertException("A new transaction_logs cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Transaction_logs result = transaction_logsRepository.save(transaction_logs);
        return ResponseEntity.created(new URI("/api/transaction-logs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /transaction-logs} : Updates an existing transaction_logs.
     *
     * @param transaction_logs the transaction_logs to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated transaction_logs,
     * or with status {@code 400 (Bad Request)} if the transaction_logs is not valid,
     * or with status {@code 500 (Internal Server Error)} if the transaction_logs couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/transaction-logs")
    public ResponseEntity<Transaction_logs> updateTransaction_logs(@Valid @RequestBody Transaction_logs transaction_logs) throws URISyntaxException {
        log.debug("REST request to update Transaction_logs : {}", transaction_logs);
        if (transaction_logs.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Transaction_logs result = transaction_logsRepository.save(transaction_logs);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, transaction_logs.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /transaction-logs} : get all the transaction_logs.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of transaction_logs in body.
     */
    @GetMapping("/transaction-logs")
    public ResponseEntity<List<Transaction_logs>> getAllTransaction_logs(Pageable pageable) {
        log.debug("REST request to get a page of Transaction_logs");
        Page<Transaction_logs> page = transaction_logsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /transaction-logs/:id} : get the "id" transaction_logs.
     *
     * @param id the id of the transaction_logs to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the transaction_logs, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/transaction-logs/{id}")
    public ResponseEntity<Transaction_logs> getTransaction_logs(@PathVariable Long id) {
        log.debug("REST request to get Transaction_logs : {}", id);
        Optional<Transaction_logs> transaction_logs = transaction_logsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(transaction_logs);
    }

    /**
     * {@code DELETE  /transaction-logs/:id} : delete the "id" transaction_logs.
     *
     * @param id the id of the transaction_logs to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/transaction-logs/{id}")
    public ResponseEntity<Void> deleteTransaction_logs(@PathVariable Long id) {
        log.debug("REST request to delete Transaction_logs : {}", id);
        transaction_logsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
