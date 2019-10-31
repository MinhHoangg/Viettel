package com.viettel.vn.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A SUBS_DAILY.
 */
@Entity
@Table(name = "subs_daily")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SUBS_DAILY implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 15)
    @Column(name = "system_id", length = 15)
    private String systemID;

    @Size(max = 15)
    @Column(name = "user_id", length = 15)
    private String userID;

    @Size(max = 15)
    @Column(name = "service_id", length = 15)
    private String serviceID;

    @Column(name = "command_code")
    private String commandCode;

    @Size(max = 50)
    @Column(name = "info", length = 50)
    private String info;

    @Size(max = 35)
    @Column(name = "receive_time", length = 35)
    private String receiveTime;

    @Column(name = "is_pause")
    private Integer isPause;

    @Size(max = 15)
    @Column(name = "chanel", length = 15)
    private String chanel;

    @Column(name = "next_charge_date")
    private ZonedDateTime nextChargeDate;

    @Column(name = "last_charge_date")
    private ZonedDateTime lastChargeDate;

    @Column(name = "price")
    private Integer price;

    @Size(max = 35)
    @Column(name = "off_time", length = 35)
    private String offTime;

    @Size(max = 20)
    @Column(name = "off_reason", length = 20)
    private String offReason;

    @Size(max = 20)
    @Column(name = "type_register", length = 20)
    private String typeRegister;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSystemID() {
        return systemID;
    }

    public SUBS_DAILY systemID(String systemID) {
        this.systemID = systemID;
        return this;
    }

    public void setSystemID(String systemID) {
        this.systemID = systemID;
    }

    public String getUserID() {
        return userID;
    }

    public SUBS_DAILY userID(String userID) {
        this.userID = userID;
        return this;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getServiceID() {
        return serviceID;
    }

    public SUBS_DAILY serviceID(String serviceID) {
        this.serviceID = serviceID;
        return this;
    }

    public void setServiceID(String serviceID) {
        this.serviceID = serviceID;
    }

    public String getCommandCode() {
        return commandCode;
    }

    public SUBS_DAILY commandCode(String commandCode) {
        this.commandCode = commandCode;
        return this;
    }

    public void setCommandCode(String commandCode) {
        this.commandCode = commandCode;
    }

    public String getInfo() {
        return info;
    }

    public SUBS_DAILY info(String info) {
        this.info = info;
        return this;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public String getReceiveTime() {
        return receiveTime;
    }

    public SUBS_DAILY receiveTime(String receiveTime) {
        this.receiveTime = receiveTime;
        return this;
    }

    public void setReceiveTime(String receiveTime) {
        this.receiveTime = receiveTime;
    }

    public Integer getIsPause() {
        return isPause;
    }

    public SUBS_DAILY isPause(Integer isPause) {
        this.isPause = isPause;
        return this;
    }

    public void setIsPause(Integer isPause) {
        this.isPause = isPause;
    }

    public String getChanel() {
        return chanel;
    }

    public SUBS_DAILY chanel(String chanel) {
        this.chanel = chanel;
        return this;
    }

    public void setChanel(String chanel) {
        this.chanel = chanel;
    }

    public ZonedDateTime getNextChargeDate() {
        return nextChargeDate;
    }

    public SUBS_DAILY nextChargeDate(ZonedDateTime nextChargeDate) {
        this.nextChargeDate = nextChargeDate;
        return this;
    }

    public void setNextChargeDate(ZonedDateTime nextChargeDate) {
        this.nextChargeDate = nextChargeDate;
    }

    public ZonedDateTime getLastChargeDate() {
        return lastChargeDate;
    }

    public SUBS_DAILY lastChargeDate(ZonedDateTime lastChargeDate) {
        this.lastChargeDate = lastChargeDate;
        return this;
    }

    public void setLastChargeDate(ZonedDateTime lastChargeDate) {
        this.lastChargeDate = lastChargeDate;
    }

    public Integer getPrice() {
        return price;
    }

    public SUBS_DAILY price(Integer price) {
        this.price = price;
        return this;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public String getOffTime() {
        return offTime;
    }

    public SUBS_DAILY offTime(String offTime) {
        this.offTime = offTime;
        return this;
    }

    public void setOffTime(String offTime) {
        this.offTime = offTime;
    }

    public String getOffReason() {
        return offReason;
    }

    public SUBS_DAILY offReason(String offReason) {
        this.offReason = offReason;
        return this;
    }

    public void setOffReason(String offReason) {
        this.offReason = offReason;
    }

    public String getTypeRegister() {
        return typeRegister;
    }

    public SUBS_DAILY typeRegister(String typeRegister) {
        this.typeRegister = typeRegister;
        return this;
    }

    public void setTypeRegister(String typeRegister) {
        this.typeRegister = typeRegister;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SUBS_DAILY)) {
            return false;
        }
        return id != null && id.equals(((SUBS_DAILY) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SUBS_DAILY{" +
            "id=" + getId() +
            ", systemID='" + getSystemID() + "'" +
            ", userID='" + getUserID() + "'" +
            ", serviceID='" + getServiceID() + "'" +
            ", commandCode='" + getCommandCode() + "'" +
            ", info='" + getInfo() + "'" +
            ", receiveTime='" + getReceiveTime() + "'" +
            ", isPause=" + getIsPause() +
            ", chanel='" + getChanel() + "'" +
            ", nextChargeDate='" + getNextChargeDate() + "'" +
            ", lastChargeDate='" + getLastChargeDate() + "'" +
            ", price=" + getPrice() +
            ", offTime='" + getOffTime() + "'" +
            ", offReason='" + getOffReason() + "'" +
            ", typeRegister='" + getTypeRegister() + "'" +
            "}";
    }
}
