package com.viettel.vn.web.rest;

import com.viettel.vn.ViettelApp;
import com.viettel.vn.domain.SUBS_DAILY;
import com.viettel.vn.repository.SUBS_DAILYRepository;
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
 * Integration tests for the {@link SUBS_DAILYResource} REST controller.
 */
@SpringBootTest(classes = ViettelApp.class)
public class SUBS_DAILYResourceIT {

    private static final String DEFAULT_SYSTEM_ID = "AAAAAAAAAA";
    private static final String UPDATED_SYSTEM_ID = "BBBBBBBBBB";

    private static final String DEFAULT_USER_ID = "AAAAAAAAAA";
    private static final String UPDATED_USER_ID = "BBBBBBBBBB";

    private static final String DEFAULT_SERVICE_ID = "AAAAAAAAAA";
    private static final String UPDATED_SERVICE_ID = "BBBBBBBBBB";

    private static final String DEFAULT_COMMAND_CODE = "AAAAAAAAAA";
    private static final String UPDATED_COMMAND_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_INFO = "AAAAAAAAAA";
    private static final String UPDATED_INFO = "BBBBBBBBBB";

    private static final String DEFAULT_RECEIVE_TIME = "AAAAAAAAAA";
    private static final String UPDATED_RECEIVE_TIME = "BBBBBBBBBB";

    private static final Integer DEFAULT_IS_PAUSE = 1;
    private static final Integer UPDATED_IS_PAUSE = 2;

    private static final String DEFAULT_CHANEL = "AAAAAAAAAA";
    private static final String UPDATED_CHANEL = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_NEXT_CHARGE_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_NEXT_CHARGE_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_LAST_CHARGE_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_LAST_CHARGE_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Integer DEFAULT_PRICE = 1;
    private static final Integer UPDATED_PRICE = 2;

    private static final String DEFAULT_OFF_TIME = "AAAAAAAAAA";
    private static final String UPDATED_OFF_TIME = "BBBBBBBBBB";

    private static final String DEFAULT_OFF_REASON = "AAAAAAAAAA";
    private static final String UPDATED_OFF_REASON = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE_REGISTER = "AAAAAAAAAA";
    private static final String UPDATED_TYPE_REGISTER = "BBBBBBBBBB";

    @Autowired
    private SUBS_DAILYRepository sUBS_DAILYRepository;

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

    private MockMvc restSUBS_DAILYMockMvc;

    private SUBS_DAILY sUBS_DAILY;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SUBS_DAILYResource sUBS_DAILYResource = new SUBS_DAILYResource(sUBS_DAILYRepository);
        this.restSUBS_DAILYMockMvc = MockMvcBuilders.standaloneSetup(sUBS_DAILYResource)
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
    public static SUBS_DAILY createEntity(EntityManager em) {
        SUBS_DAILY sUBS_DAILY = new SUBS_DAILY()
            .systemID(DEFAULT_SYSTEM_ID)
            .userID(DEFAULT_USER_ID)
            .serviceID(DEFAULT_SERVICE_ID)
            .commandCode(DEFAULT_COMMAND_CODE)
            .info(DEFAULT_INFO)
            .receiveTime(DEFAULT_RECEIVE_TIME)
            .isPause(DEFAULT_IS_PAUSE)
            .chanel(DEFAULT_CHANEL)
            .nextChargeDate(DEFAULT_NEXT_CHARGE_DATE)
            .lastChargeDate(DEFAULT_LAST_CHARGE_DATE)
            .price(DEFAULT_PRICE)
            .offTime(DEFAULT_OFF_TIME)
            .offReason(DEFAULT_OFF_REASON)
            .typeRegister(DEFAULT_TYPE_REGISTER);
        return sUBS_DAILY;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SUBS_DAILY createUpdatedEntity(EntityManager em) {
        SUBS_DAILY sUBS_DAILY = new SUBS_DAILY()
            .systemID(UPDATED_SYSTEM_ID)
            .userID(UPDATED_USER_ID)
            .serviceID(UPDATED_SERVICE_ID)
            .commandCode(UPDATED_COMMAND_CODE)
            .info(UPDATED_INFO)
            .receiveTime(UPDATED_RECEIVE_TIME)
            .isPause(UPDATED_IS_PAUSE)
            .chanel(UPDATED_CHANEL)
            .nextChargeDate(UPDATED_NEXT_CHARGE_DATE)
            .lastChargeDate(UPDATED_LAST_CHARGE_DATE)
            .price(UPDATED_PRICE)
            .offTime(UPDATED_OFF_TIME)
            .offReason(UPDATED_OFF_REASON)
            .typeRegister(UPDATED_TYPE_REGISTER);
        return sUBS_DAILY;
    }

    @BeforeEach
    public void initTest() {
        sUBS_DAILY = createEntity(em);
    }

    @Test
    @Transactional
    public void createSUBS_DAILY() throws Exception {
        int databaseSizeBeforeCreate = sUBS_DAILYRepository.findAll().size();

        // Create the SUBS_DAILY
        restSUBS_DAILYMockMvc.perform(post("/api/subs-dailies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sUBS_DAILY)))
            .andExpect(status().isCreated());

        // Validate the SUBS_DAILY in the database
        List<SUBS_DAILY> sUBS_DAILYList = sUBS_DAILYRepository.findAll();
        assertThat(sUBS_DAILYList).hasSize(databaseSizeBeforeCreate + 1);
        SUBS_DAILY testSUBS_DAILY = sUBS_DAILYList.get(sUBS_DAILYList.size() - 1);
        assertThat(testSUBS_DAILY.getSystemID()).isEqualTo(DEFAULT_SYSTEM_ID);
        assertThat(testSUBS_DAILY.getUserID()).isEqualTo(DEFAULT_USER_ID);
        assertThat(testSUBS_DAILY.getServiceID()).isEqualTo(DEFAULT_SERVICE_ID);
        assertThat(testSUBS_DAILY.getCommandCode()).isEqualTo(DEFAULT_COMMAND_CODE);
        assertThat(testSUBS_DAILY.getInfo()).isEqualTo(DEFAULT_INFO);
        assertThat(testSUBS_DAILY.getReceiveTime()).isEqualTo(DEFAULT_RECEIVE_TIME);
        assertThat(testSUBS_DAILY.getIsPause()).isEqualTo(DEFAULT_IS_PAUSE);
        assertThat(testSUBS_DAILY.getChanel()).isEqualTo(DEFAULT_CHANEL);
        assertThat(testSUBS_DAILY.getNextChargeDate()).isEqualTo(DEFAULT_NEXT_CHARGE_DATE);
        assertThat(testSUBS_DAILY.getLastChargeDate()).isEqualTo(DEFAULT_LAST_CHARGE_DATE);
        assertThat(testSUBS_DAILY.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testSUBS_DAILY.getOffTime()).isEqualTo(DEFAULT_OFF_TIME);
        assertThat(testSUBS_DAILY.getOffReason()).isEqualTo(DEFAULT_OFF_REASON);
        assertThat(testSUBS_DAILY.getTypeRegister()).isEqualTo(DEFAULT_TYPE_REGISTER);
    }

    @Test
    @Transactional
    public void createSUBS_DAILYWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sUBS_DAILYRepository.findAll().size();

        // Create the SUBS_DAILY with an existing ID
        sUBS_DAILY.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSUBS_DAILYMockMvc.perform(post("/api/subs-dailies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sUBS_DAILY)))
            .andExpect(status().isBadRequest());

        // Validate the SUBS_DAILY in the database
        List<SUBS_DAILY> sUBS_DAILYList = sUBS_DAILYRepository.findAll();
        assertThat(sUBS_DAILYList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSUBS_DAILIES() throws Exception {
        // Initialize the database
        sUBS_DAILYRepository.saveAndFlush(sUBS_DAILY);

        // Get all the sUBS_DAILYList
        restSUBS_DAILYMockMvc.perform(get("/api/subs-dailies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sUBS_DAILY.getId().intValue())))
            .andExpect(jsonPath("$.[*].systemID").value(hasItem(DEFAULT_SYSTEM_ID)))
            .andExpect(jsonPath("$.[*].userID").value(hasItem(DEFAULT_USER_ID)))
            .andExpect(jsonPath("$.[*].serviceID").value(hasItem(DEFAULT_SERVICE_ID)))
            .andExpect(jsonPath("$.[*].commandCode").value(hasItem(DEFAULT_COMMAND_CODE)))
            .andExpect(jsonPath("$.[*].info").value(hasItem(DEFAULT_INFO)))
            .andExpect(jsonPath("$.[*].receiveTime").value(hasItem(DEFAULT_RECEIVE_TIME)))
            .andExpect(jsonPath("$.[*].isPause").value(hasItem(DEFAULT_IS_PAUSE)))
            .andExpect(jsonPath("$.[*].chanel").value(hasItem(DEFAULT_CHANEL)))
            .andExpect(jsonPath("$.[*].nextChargeDate").value(hasItem(sameInstant(DEFAULT_NEXT_CHARGE_DATE))))
            .andExpect(jsonPath("$.[*].lastChargeDate").value(hasItem(sameInstant(DEFAULT_LAST_CHARGE_DATE))))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE)))
            .andExpect(jsonPath("$.[*].offTime").value(hasItem(DEFAULT_OFF_TIME)))
            .andExpect(jsonPath("$.[*].offReason").value(hasItem(DEFAULT_OFF_REASON)))
            .andExpect(jsonPath("$.[*].typeRegister").value(hasItem(DEFAULT_TYPE_REGISTER)));
    }
    
    @Test
    @Transactional
    public void getSUBS_DAILY() throws Exception {
        // Initialize the database
        sUBS_DAILYRepository.saveAndFlush(sUBS_DAILY);

        // Get the sUBS_DAILY
        restSUBS_DAILYMockMvc.perform(get("/api/subs-dailies/{id}", sUBS_DAILY.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sUBS_DAILY.getId().intValue()))
            .andExpect(jsonPath("$.systemID").value(DEFAULT_SYSTEM_ID))
            .andExpect(jsonPath("$.userID").value(DEFAULT_USER_ID))
            .andExpect(jsonPath("$.serviceID").value(DEFAULT_SERVICE_ID))
            .andExpect(jsonPath("$.commandCode").value(DEFAULT_COMMAND_CODE))
            .andExpect(jsonPath("$.info").value(DEFAULT_INFO))
            .andExpect(jsonPath("$.receiveTime").value(DEFAULT_RECEIVE_TIME))
            .andExpect(jsonPath("$.isPause").value(DEFAULT_IS_PAUSE))
            .andExpect(jsonPath("$.chanel").value(DEFAULT_CHANEL))
            .andExpect(jsonPath("$.nextChargeDate").value(sameInstant(DEFAULT_NEXT_CHARGE_DATE)))
            .andExpect(jsonPath("$.lastChargeDate").value(sameInstant(DEFAULT_LAST_CHARGE_DATE)))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE))
            .andExpect(jsonPath("$.offTime").value(DEFAULT_OFF_TIME))
            .andExpect(jsonPath("$.offReason").value(DEFAULT_OFF_REASON))
            .andExpect(jsonPath("$.typeRegister").value(DEFAULT_TYPE_REGISTER));
    }

    @Test
    @Transactional
    public void getNonExistingSUBS_DAILY() throws Exception {
        // Get the sUBS_DAILY
        restSUBS_DAILYMockMvc.perform(get("/api/subs-dailies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSUBS_DAILY() throws Exception {
        // Initialize the database
        sUBS_DAILYRepository.saveAndFlush(sUBS_DAILY);

        int databaseSizeBeforeUpdate = sUBS_DAILYRepository.findAll().size();

        // Update the sUBS_DAILY
        SUBS_DAILY updatedSUBS_DAILY = sUBS_DAILYRepository.findById(sUBS_DAILY.getId()).get();
        // Disconnect from session so that the updates on updatedSUBS_DAILY are not directly saved in db
        em.detach(updatedSUBS_DAILY);
        updatedSUBS_DAILY
            .systemID(UPDATED_SYSTEM_ID)
            .userID(UPDATED_USER_ID)
            .serviceID(UPDATED_SERVICE_ID)
            .commandCode(UPDATED_COMMAND_CODE)
            .info(UPDATED_INFO)
            .receiveTime(UPDATED_RECEIVE_TIME)
            .isPause(UPDATED_IS_PAUSE)
            .chanel(UPDATED_CHANEL)
            .nextChargeDate(UPDATED_NEXT_CHARGE_DATE)
            .lastChargeDate(UPDATED_LAST_CHARGE_DATE)
            .price(UPDATED_PRICE)
            .offTime(UPDATED_OFF_TIME)
            .offReason(UPDATED_OFF_REASON)
            .typeRegister(UPDATED_TYPE_REGISTER);

        restSUBS_DAILYMockMvc.perform(put("/api/subs-dailies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSUBS_DAILY)))
            .andExpect(status().isOk());

        // Validate the SUBS_DAILY in the database
        List<SUBS_DAILY> sUBS_DAILYList = sUBS_DAILYRepository.findAll();
        assertThat(sUBS_DAILYList).hasSize(databaseSizeBeforeUpdate);
        SUBS_DAILY testSUBS_DAILY = sUBS_DAILYList.get(sUBS_DAILYList.size() - 1);
        assertThat(testSUBS_DAILY.getSystemID()).isEqualTo(UPDATED_SYSTEM_ID);
        assertThat(testSUBS_DAILY.getUserID()).isEqualTo(UPDATED_USER_ID);
        assertThat(testSUBS_DAILY.getServiceID()).isEqualTo(UPDATED_SERVICE_ID);
        assertThat(testSUBS_DAILY.getCommandCode()).isEqualTo(UPDATED_COMMAND_CODE);
        assertThat(testSUBS_DAILY.getInfo()).isEqualTo(UPDATED_INFO);
        assertThat(testSUBS_DAILY.getReceiveTime()).isEqualTo(UPDATED_RECEIVE_TIME);
        assertThat(testSUBS_DAILY.getIsPause()).isEqualTo(UPDATED_IS_PAUSE);
        assertThat(testSUBS_DAILY.getChanel()).isEqualTo(UPDATED_CHANEL);
        assertThat(testSUBS_DAILY.getNextChargeDate()).isEqualTo(UPDATED_NEXT_CHARGE_DATE);
        assertThat(testSUBS_DAILY.getLastChargeDate()).isEqualTo(UPDATED_LAST_CHARGE_DATE);
        assertThat(testSUBS_DAILY.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testSUBS_DAILY.getOffTime()).isEqualTo(UPDATED_OFF_TIME);
        assertThat(testSUBS_DAILY.getOffReason()).isEqualTo(UPDATED_OFF_REASON);
        assertThat(testSUBS_DAILY.getTypeRegister()).isEqualTo(UPDATED_TYPE_REGISTER);
    }

    @Test
    @Transactional
    public void updateNonExistingSUBS_DAILY() throws Exception {
        int databaseSizeBeforeUpdate = sUBS_DAILYRepository.findAll().size();

        // Create the SUBS_DAILY

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSUBS_DAILYMockMvc.perform(put("/api/subs-dailies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sUBS_DAILY)))
            .andExpect(status().isBadRequest());

        // Validate the SUBS_DAILY in the database
        List<SUBS_DAILY> sUBS_DAILYList = sUBS_DAILYRepository.findAll();
        assertThat(sUBS_DAILYList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSUBS_DAILY() throws Exception {
        // Initialize the database
        sUBS_DAILYRepository.saveAndFlush(sUBS_DAILY);

        int databaseSizeBeforeDelete = sUBS_DAILYRepository.findAll().size();

        // Delete the sUBS_DAILY
        restSUBS_DAILYMockMvc.perform(delete("/api/subs-dailies/{id}", sUBS_DAILY.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SUBS_DAILY> sUBS_DAILYList = sUBS_DAILYRepository.findAll();
        assertThat(sUBS_DAILYList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SUBS_DAILY.class);
        SUBS_DAILY sUBS_DAILY1 = new SUBS_DAILY();
        sUBS_DAILY1.setId(1L);
        SUBS_DAILY sUBS_DAILY2 = new SUBS_DAILY();
        sUBS_DAILY2.setId(sUBS_DAILY1.getId());
        assertThat(sUBS_DAILY1).isEqualTo(sUBS_DAILY2);
        sUBS_DAILY2.setId(2L);
        assertThat(sUBS_DAILY1).isNotEqualTo(sUBS_DAILY2);
        sUBS_DAILY1.setId(null);
        assertThat(sUBS_DAILY1).isNotEqualTo(sUBS_DAILY2);
    }
}
