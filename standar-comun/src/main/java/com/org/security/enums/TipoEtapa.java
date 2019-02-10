package com.org.security.enums;

public enum TipoEtapa {
    INICIAL("INI", "INICIAL"),
    ACEPTACION("ACT", "ACEPTACION"),
    INTERMEDIA("INT", "INTERMEDIA");

    String code;

    String description;

    private TipoEtapa(final String code, final String description) {
        this.code = code;
        this.description = description;
    }

    public String getCode() {
        return code;
    }

    public String getDescription() {
        return description;
    }

    public static TipoEtapa getTipoEtapa(final String code) {
        TipoEtapa ret = null;
        for (TipoEtapa activeEnum : values()) {
            if (activeEnum.getCode().equals(code)) {
                ret = activeEnum;
                break;
            }
        }
        return ret;
    }

}
