package com.viettel.vn.web.rest;

import com.viettel.vn.domain.SUBS_DAILY;
import com.viettel.vn.repository.SUBS_DAILYRepository;
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
 * REST controller for managing {@link com.viettel.vn.domain.SUBS_DAILY}.
 */
@RestController
@RequestMapping("/api")
public class SUBS_DAILYResource {

    private final Logger log = LoggerFactory.getLogger(SUBS_DAILYResource.class);

    private static final String ENTITY_NAME = "sUBS_DAILY";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SUBS_DAILYRepository sUBS_DAILYRepository;

    public SUBS_DAILYResource(SUBS_DAILYRepository sUBS_DAILYRepository) {
        this.sUBS_DAILYRepository = sUBS_DAILYRepository;
    }

    /**
     * {@code POST  /subs-dailies} : Create a new sUBS_DAILY.
     *
     * @param sUBS_DAILY the sUBS_DAILY to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sUBS_DAILY, or with status {@code 400 (Bad Request)} if the sUBS_DAILY has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/subs-dailies")
    public ResponseEntity<SUBS_DAILY> createSUBS_DAILY(@Valid @RequestBody SUBS_DAILY sUBS_DAILY) throws URISyntaxException {
        log.debug("REST request to save SUBS_DAILY : {}", sUBS_DAILY);
        if (sUBS_DAILY.getId() != null) {
            throw new BadRequestAlertException("A new sUBS_DAILY cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SUBS_DAILY result = sUBS_DAILYRepository.save(sUBS_DAILY);
        return ResponseEntity.created(new URI("/api/subs-dailies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /subs-dailies} : Updates an existing sUBS_DAILY.
     *
     * @param sUBS_DAILY the sUBS_DAILY to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sUBS_DAILY,
     * or with status {@code 400 (Bad Request)} if the sUBS_DAILY is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sUBS_DAILY couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/subs-dailies")
    public ResponseEntity<SUBS_DAILY> updateSUBS_DAILY(@Valid @RequestBody SUBS_DAILY sUBS_DAILY) throws URISyntaxException {
        log.debug("REST request to update SUBS_DAILY : {}", sUBS_DAILY);
        if (sUBS_DAILY.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SUBS_DAILY result = sUBS_DAILYRepository.save(sUBS_DAILY);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, sUBS_DAILY.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /subs-dailies} : get all the sUBS_DAILIES.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sUBS_DAILIES in body.
     */
    @GetMapping("/subs-dailies")
    public ResponseEntity<List<SUBS_DAILY>> getAllSUBS_DAILIES(Pageable pageable) {
        log.debug("REST request to get a page of SUBS_DAILIES");
        Page<SUBS_DAILY> page = sUBS_DAILYRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /subs-dailies/:id} : get the "id" sUBS_DAILY.
     *
     * @param id the id of the sUBS_DAILY to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sUBS_DAILY, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/subs-dailies/{id}")
    public ResponseEntity<SUBS_DAILY> getSUBS_DAILY(@PathVariable Long id) {
        log.debug("REST request to get SUBS_DAILY : {}", id);
        Optional<SUBS_DAILY> sUBS_DAILY = sUBS_DAILYRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sUBS_DAILY);
    }

    /**
     * {@code DELETE  /subs-dailies/:id} : delete the "id" sUBS_DAILY.
     *
     * @param id the id of the sUBS_DAILY to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/subs-dailies/{id}")
    public ResponseEntity<Void> deleteSUBS_DAILY(@PathVariable Long id) {
        log.debug("REST request to delete SUBS_DAILY : {}", id);
        sUBS_DAILYRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
