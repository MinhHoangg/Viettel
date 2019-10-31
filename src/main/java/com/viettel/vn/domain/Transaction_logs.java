package com.viettel.vn.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A Transaction_logs.
 */
@Entity
@Table(name = "transaction_logs")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Transaction_logs implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 20)
    @Column(name = "msisdn", length = 20)
    private String msisdn;

    @Size(max = 20)
    @Column(name = "cmd", length = 20)
    private String cmd;

    @Size(max = 500)
    @Column(name = "descriptions", length = 500)
    private String descriptions;

    @Column(name = "price")
    private Integer price;

    @Column(name = "datetime")
    private ZonedDateTime datetime;

    @Column(name = "result")
    private Integer result;

    @NotNull
    @Column(name = "trans_id", nullable = false)
    private Integer trans_id;

    @Size(max = 100)
    @Column(name = "source", length = 100)
    private String source;

    @Size(max = 50)
    @Column(name = "sub_type", length = 50)
    private String sub_type;

    @Size(max = 15)
    @Column(name = "systemid", length = 15)
    private String systemid;

    @Size(max = 15)
    @Column(name = "serviceid", length = 15)
    private String serviceid;

    @Size(max = 15)
    @Column(name = "channel", length = 15)
    private String channel;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMsisdn() {
        return msisdn;
    }

    public Transaction_logs msisdn(String msisdn) {
        this.msisdn = msisdn;
        return this;
    }

    public void setMsisdn(String msisdn) {
        this.msisdn = msisdn;
    }

    public String getCmd() {
        return cmd;
    }

    public Transaction_logs cmd(String cmd) {
        this.cmd = cmd;
        return this;
    }

    public void setCmd(String cmd) {
        this.cmd = cmd;
    }

    public String getDescriptions() {
        return descriptions;
    }

    public Transaction_logs descriptions(String descriptions) {
        this.descriptions = descriptions;
        return this;
    }

    public void setDescriptions(String descriptions) {
        this.descriptions = descriptions;
    }

    public Integer getPrice() {
        return price;
    }

    public Transaction_logs price(Integer price) {
        this.price = price;
        return this;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public ZonedDateTime getDatetime() {
        return datetime;
    }

    public Transaction_logs datetime(ZonedDateTime datetime) {
        this.datetime = datetime;
        return this;
    }

    public void setDatetime(ZonedDateTime datetime) {
        this.datetime = datetime;
    }

    public Integer getResult() {
        return result;
    }

    public Transaction_logs result(Integer result) {
        this.result = result;
        return this;
    }

    public void setResult(Integer result) {
        this.result = result;
    }

    public Integer getTrans_id() {
        return trans_id;
    }

    public Transaction_logs trans_id(Integer trans_id) {
        this.trans_id = trans_id;
        return this;
    }

    public void setTrans_id(Integer trans_id) {
        this.trans_id = trans_id;
    }

    public String getSource() {
        return source;
    }

    public Transaction_logs source(String source) {
        this.source = source;
        return this;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getSub_type() {
        return sub_type;
    }

    public Transaction_logs sub_type(String sub_type) {
        this.sub_type = sub_type;
        return this;
    }

    public void setSub_type(String sub_type) {
        this.sub_type = sub_type;
    }

    public String getSystemid() {
        return systemid;
    }

    public Transaction_logs systemid(String systemid) {
        this.systemid = systemid;
        return this;
    }

    public void setSystemid(String systemid) {
        this.systemid = systemid;
    }

    public String getServiceid() {
        return serviceid;
    }

    public Transaction_logs serviceid(String serviceid) {
        this.serviceid = serviceid;
        return this;
    }

    public void setServiceid(String serviceid) {
        this.serviceid = serviceid;
    }

    public String getChannel() {
        return channel;
    }

    public Transaction_logs channel(String channel) {
        this.channel = channel;
        return this;
    }

    public void setChannel(String channel) {
        this.channel = channel;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Transaction_logs)) {
            return false;
        }
        return id != null && id.equals(((Transaction_logs) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Transaction_logs{" +
            "id=" + getId() +
            ", msisdn='" + getMsisdn() + "'" +
            ", cmd='" + getCmd() + "'" +
            ", descriptions='" + getDescriptions() + "'" +
            ", price=" + getPrice() +
            ", datetime='" + getDatetime() + "'" +
            ", result=" + getResult() +
            ", trans_id=" + getTrans_id() +
            ", source='" + getSource() + "'" +
            ", sub_type='" + getSub_type() + "'" +
            ", systemid='" + getSystemid() + "'" +
            ", serviceid='" + getServiceid() + "'" +
            ", channel='" + getChannel() + "'" +
            "}";
    }
}
