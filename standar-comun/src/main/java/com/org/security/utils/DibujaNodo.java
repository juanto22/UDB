package com.org.security.utils;

import java.io.Serializable;
import javax.persistence.Embeddable;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Embeddable
@ToString
@Getter
@Setter
public class DibujaNodo implements Serializable {

    private String x;

    private String y;

    private String cssClass;

}
