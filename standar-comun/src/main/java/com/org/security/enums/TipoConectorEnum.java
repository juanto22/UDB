package com.org.security.enums;

public enum TipoConectorEnum {
    TOP(0, "TOP"),
    RIGHT(1, "RIGHT"),
    BOTTOM(2, "BOTTOM"),
    LEFT(3, "LEFT");

    Integer code;

    String description;

    private TipoConectorEnum(final Integer code, final String description) {
        this.code = code;
        this.description = description;
    }

    public Integer getCode() {
        return code;
    }

    public String getDescription() {
        return description;
    }

    public static TipoConectorEnum getTipoConectorEnum(final Integer code) {
        TipoConectorEnum ret = null;
        for (TipoConectorEnum ienum : values()) {
            if (ienum.getCode().equals(code)) {
                ret = ienum;
                break;
            }
        }
        return ret;
    }

}
