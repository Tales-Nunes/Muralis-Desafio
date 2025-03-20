package com.tales.Muralis_Desafio.Enums;

public enum ContactType {
    TELEFONE(1),
    EMAIL(2);

    private int code;

    private ContactType(int code) {
        this.code = code;
    }
    public int getCode() {
        return code;
    }
    public static ContactType valueOf(int code) {
        for(ContactType value : ContactType.values()) {
            if(value.getCode() == code)
                return value;
        }
        throw new IllegalArgumentException("Invalid ContactType Code");
    }
}
