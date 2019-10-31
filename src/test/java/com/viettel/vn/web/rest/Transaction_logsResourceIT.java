package com.viettel.vn.web.rest;

import com.viettel.vn.ViettelApp;
import com.viettel.vn.domain.Transaction_logs;
import com.viettel.vn.repository.Transaction_logsRepository;
import com.viettel.vn.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.viettel.vn.web.rest.TestUtil.sameInstant;
import static com.viettel.vn.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link Transaction_logsResource} REST controller.
 */
@SpringBootTest(classes = ViettelApp.class)
public class Transaction_logsResourceIT {

    private static final String DEFAULT_MSISDN = "AAAAAAAAAA";
    private static final String UPDATED_MSISDN = "BBBBBBBBBB";

    private static final String DEFAULT_CMD = "AAAAAAAAAA";
    private static final String UPDATED_CMD = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTIONS = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTIONS = "BBBBBBBBBB";

    private static final Integer DEFAULT_PRICE = 1;
    private static final Integer UPDATED_PRICE = 2;

    private static final ZonedDateTime DEFAULT_DATETIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATETIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Integer DEFAULT_RESULT = 1;
    private static final Integer UPDATED_RESULT = 2;

    private static final Integer DEFAULT_TRANS_ID = 1;
    private static final Integer UPDATED_TRANS_ID = 2;

    private static final String DEFAULT_SOURCE = "AAAAAAAAAA";
    private static final String UPDATED_SOURCE = "BBBBBBBBBB";

    private static final String DEFAULT_SUB_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_SUB_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_SYSTEMID = "AAAAAAAAAA";
    private static final String UPDATED_SYSTEMID = "BBBBBBBBBB";

    private static final String DEFAULT_SERVICEID = "AAAAAAAAAA";
    private static final String UPDATED_SERVICEID = "BBBBBBBBBB";

    private static final String DEFAULT_CHANNEL = "AAAAAAAAAA";
    private static final String UPDATED_CHANNEL = "BBBBBBBBBB";

    @Autowired
    private Transaction_logsRepository transaction_logsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTransaction_logsMockMvc;

    private Transaction_logs transaction_logs;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final Transaction_logsResource transaction_logsResource = new Transaction_logsResource(transaction_logsRepository);
        this.restTransaction_logsMockMvc = MockMvcBuilders.standaloneSetup(transaction_logsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Transaction_logs createEntity(EntityManager em) {
        Transaction_logs transaction_logs = new Transaction_logs()
            .msisdn(DEFAULT_MSISDN)
            .cmd(DEFAULT_CMD)
            .descriptions(DEFAULT_DESCRIPTIONS)
            .price(DEFAULT_PRICE)
            .datetime(DEFAULT_DATETIME)
            .result(DEFAULT_RESULT)
            .trans_id(DEFAULT_TRANS_ID)
            .source(DEFAULT_SOURCE)
            .sub_type(DEFAULT_SUB_TYPE)
            .systemid(DEFAULT_SYSTEMID)
            .serviceid(DEFAULT_SERVICEID)
            .channel(DEFAULT_CHANNEL);
        return transaction_logs;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Transaction_logs createUpdatedEntity(EntityManager em) {
        Transaction_logs transaction_logs = new Transaction_logs()
            .msisdn(UPDATED_MSISDN)
            .cmd(UPDATED_CMD)
            .descriptions(UPDATED_DESCRIPTIONS)
            .price(UPDATED_PRICE)
            .datetime(UPDATED_DATETIME)
            .result(UPDATED_RESULT)
            .trans_id(UPDATED_TRANS_ID)
            .source(UPDATED_SOURCE)
            .sub_type(UPDATED_SUB_TYPE)
            .systemid(UPDATED_SYSTEMID)
            .serviceid(UPDATED_SERVICEID)
            .channel(UPDATED_CHANNEL);
        return transaction_logs;
    }

    @BeforeEach
    public void initTest() {
        transaction_logs = createEntity(em);
    }

    @Test
    @Transactional
    public void createTransaction_logs() throws Exception {
        int databaseSizeBeforeCreate = transaction_logsRepository.findAll().size();

        // Create the Transaction_logs
        restTransaction_logsMockMvc.perform(post("/api/transaction-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transaction_logs)))
            .andExpect(status().isCreated());

        // Validate the Transaction_logs in the database
        List<Transaction_logs> transaction_logsList = transaction_logsRepository.findAll();
        assertThat(transaction_logsList).hasSize(databaseSizeBeforeCreate + 1);
        Transaction_logs testTransaction_logs = transaction_logsList.get(transaction_logsList.size() - 1);
        assertThat(testTransaction_logs.getMsisdn()).isEqualTo(DEFAULT_MSISDN);
        assertThat(testTransaction_logs.getCmd()).isEqualTo(DEFAULT_CMD);
        assertThat(testTransaction_logs.getDescriptions()).isEqualTo(DEFAULT_DESCRIPTIONS);
        assertThat(testTransaction_logs.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testTransaction_logs.getDatetime()).isEqualTo(DEFAULT_DATETIME);
        assertThat(testTransaction_logs.getResult()).isEqualTo(DEFAULT_RESULT);
        assertThat(testTransaction_logs.getTrans_id()).isEqualTo(DEFAULT_TRANS_ID);
        assertThat(testTransaction_logs.getSource()).isEqualTo(DEFAULT_SOURCE);
        assertThat(testTransaction_logs.getSub_type()).isEqualTo(DEFAULT_SUB_TYPE);
        assertThat(testTransaction_logs.getSystemid()).isEqualTo(DEFAULT_SYSTEMID);
        assertThat(testTransaction_logs.getServiceid()).isEqualTo(DEFAULT_SERVICEID);
        assertThat(testTransaction_logs.getChannel()).isEqualTo(DEFAULT_CHANNEL);
    }

    @Test
    @Transactional
    public void createTransaction_logsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = transaction_logsRepository.findAll().size();

        // Create the Transaction_logs with an existing ID
        transaction_logs.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTransaction_logsMockMvc.perform(post("/api/transaction-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transaction_logs)))
            .andExpect(status().isBadRequest());

        // Validate the Transaction_logs in the database
        List<Transaction_logs> transaction_logsList = transaction_logsRepository.findAll();
        assertThat(transaction_logsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTrans_idIsRequired() throws Exception {
        int databaseSizeBeforeTest = transaction_logsRepository.findAll().size();
        // set the field null
        transaction_logs.setTrans_id(null);

        // Create the Transaction_logs, which fails.

        restTransaction_logsMockMvc.perform(post("/api/transaction-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transaction_logs)))
            .andExpect(status().isBadRequest());

        List<Transaction_logs> transaction_logsList = transaction_logsRepository.findAll();
        assertThat(transaction_logsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTransaction_logs() throws Exception {
        // Initialize the database
        transaction_logsRepository.saveAndFlush(transaction_logs);

        // Get all the transaction_logsList
        restTransaction_logsMockMvc.perform(get("/api/transaction-logs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transaction_logs.getId().intValue())))
            .andExpect(jsonPath("$.[*].msisdn").value(hasItem(DEFAULT_MSISDN)))
            .andExpect(jsonPath("$.[*].cmd").value(hasItem(DEFAULT_CMD)))
            .andExpect(jsonPath("$.[*].descriptions").value(hasItem(DEFAULT_DESCRIPTIONS)))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE)))
            .andExpect(jsonPath("$.[*].datetime").value(hasItem(sameInstant(DEFAULT_DATETIME))))
            .andExpect(jsonPath("$.[*].result").value(hasItem(DEFAULT_RESULT)))
            .andExpect(jsonPath("$.[*].trans_id").value(hasItem(DEFAULT_TRANS_ID)))
            .andExpect(jsonPath("$.[*].source").value(hasItem(DEFAULT_SOURCE)))
            .andExpect(jsonPath("$.[*].sub_type").value(hasItem(DEFAULT_SUB_TYPE)))
            .andExpect(jsonPath("$.[*].systemid").value(hasItem(DEFAULT_SYSTEMID)))
            .andExpect(jsonPath("$.[*].serviceid").value(hasItem(DEFAULT_SERVICEID)))
            .andExpect(jsonPath("$.[*].channel").value(hasItem(DEFAULT_CHANNEL)));
    }
    
    @Test
    @Transactional
    public void getTransaction_logs() throws Exception {
        // Initialize the database
        transaction_logsRepository.saveAndFlush(transaction_logs);

        // Get the transaction_logs
        restTransaction_logsMockMvc.perform(get("/api/transaction-logs/{id}", transaction_logs.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(transaction_logs.getId().intValue()))
            .andExpect(jsonPath("$.msisdn").value(DEFAULT_MSISDN))
            .andExpect(jsonPath("$.cmd").value(DEFAULT_CMD))
            .andExpect(jsonPath("$.descriptions").value(DEFAULT_DESCRIPTIONS))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE))
            .andExpect(jsonPath("$.datetime").value(sameInstant(DEFAULT_DATETIME)))
            .andExpect(jsonPath("$.result").value(DEFAULT_RESULT))
            .andExpect(jsonPath("$.trans_id").value(DEFAULT_TRANS_ID))
            .andExpect(jsonPath("$.source").value(DEFAULT_SOURCE))
            .andExpect(jsonPath("$.sub_type").value(DEFAULT_SUB_TYPE))
            .andExpect(jsonPath("$.systemid").value(DEFAULT_SYSTEMID))
            .andExpect(jsonPath("$.serviceid").value(DEFAULT_SERVICEID))
            .andExpect(jsonPath("$.channel").value(DEFAULT_CHANNEL));
    }

    @Test
    @Transactional
    public void getNonExistingTransaction_logs() throws Exception {
        // Get the transaction_logs
        restTransaction_logsMockMvc.perform(get("/api/transaction-logs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTransaction_logs() throws Exception {
        // Initialize the database
        transaction_logsRepository.saveAndFlush(transaction_logs);

        int databaseSizeBeforeUpdate = transaction_logsRepository.findAll().size();

        // Update the transaction_logs
        Transaction_logs updatedTransaction_logs = transaction_logsRepository.findById(transaction_logs.getId()).get();
        // Disconnect from session so that the updates on updatedTransaction_logs are not directly saved in db
        em.detach(updatedTransaction_logs);
        updatedTransaction_logs
            .msisdn(UPDATED_MSISDN)
            .cmd(UPDATED_CMD)
            .descriptions(UPDATED_DESCRIPTIONS)
            .price(UPDATED_PRICE)
            .datetime(UPDATED_DATETIME)
            .result(UPDATED_RESULT)
            .trans_id(UPDATED_TRANS_ID)
            .source(UPDATED_SOURCE)
            .sub_type(UPDATED_SUB_TYPE)
            .systemid(UPDATED_SYSTEMID)
            .serviceid(UPDATED_SERVICEID)
            .channel(UPDATED_CHANNEL);

        restTransaction_logsMockMvc.perform(put("/api/transaction-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTransaction_logs)))
            .andExpect(status().isOk());

        // Validate the Transaction_logs in the database
        List<Transaction_logs> transaction_logsList = transaction_logsRepository.findAll();
        assertThat(transaction_logsList).hasSize(databaseSizeBeforeUpdate);
        Transaction_logs testTransaction_logs = transaction_logsList.get(transaction_logsList.size() - 1);
        assertThat(testTransaction_logs.getMsisdn()).isEqualTo(UPDATED_MSISDN);
        assertThat(testTransaction_logs.getCmd()).isEqualTo(UPDATED_CMD);
        assertThat(testTransaction_logs.getDescriptions()).isEqualTo(UPDATED_DESCRIPTIONS);
        assertThat(testTransaction_logs.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testTransaction_logs.getDatetime()).isEqualTo(UPDATED_DATETIME);
        assertThat(testTransaction_logs.getResult()).isEqualTo(UPDATED_RESULT);
        assertThat(testTransaction_logs.getTrans_id()).isEqualTo(UPDATED_TRANS_ID);
        assertThat(testTransaction_logs.getSource()).isEqualTo(UPDATED_SOURCE);
        assertThat(testTransaction_logs.getSub_type()).isEqualTo(UPDATED_SUB_TYPE);
        assertThat(testTransaction_logs.getSystemid()).isEqualTo(UPDATED_SYSTEMID);
        assertThat(testTransaction_logs.getServiceid()).isEqualTo(UPDATED_SERVICEID);
        assertThat(testTransaction_logs.getChannel()).isEqualTo(UPDATED_CHANNEL);
    }

    @Test
    @Transactional
    public void updateNonExistingTransaction_logs() throws Exception {
        int databaseSizeBeforeUpdate = transaction_logsRepository.findAll().size();

        // Create the Transaction_logs

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTransaction_logsMockMvc.perform(put("/api/transaction-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transaction_logs)))
            .andExpect(status().isBadRequest());

        // Validate the Transaction_logs in the database
        List<Transaction_logs> transaction_logsList = transaction_logsRepository.findAll();
        assertThat(transaction_logsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTransaction_logs() throws Exception {
        // Initialize the database
        transaction_logsRepository.saveAndFlush(transaction_logs);

        int databaseSizeBeforeDelete = transaction_logsRepository.findAll().size();

        // Delete the transaction_logs
        restTransaction_logsMockMvc.perform(delete("/api/transaction-logs/{id}", transaction_logs.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Transaction_logs> transaction_logsList = transaction_logsRepository.findAll();
        assertThat(transaction_logsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Transaction_logs.class);
        Transaction_logs transaction_logs1 = new Transaction_logs();
        transaction_logs1.setId(1L);
        Transaction_logs transaction_logs2 = new Transaction_logs();
        transaction_logs2.setId(transaction_logs1.getId());
        assertThat(transaction_logs1).isEqualTo(transaction_logs2);
        transaction_logs2.setId(2L);
        assertThat(transaction_logs1).isNotEqualTo(transaction_logs2);
        transaction_logs1.setId(null);
        assertThat(transaction_logs1).isNotEqualTo(transaction_logs2);
    }
}
