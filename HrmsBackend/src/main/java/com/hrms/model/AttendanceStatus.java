package com.hrms.model;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum AttendanceStatus {
    PRESENT,
    ABSENT,
    ON_LEAVE,
    LATE,
    HALF_DAY,
    WORK_FROM_HOME;

    @JsonCreator
    public static AttendanceStatus from(String value) {
        for (AttendanceStatus status : AttendanceStatus.values()) {
            if (status.name().equalsIgnoreCase(value)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Invalid attendance status: " + value);
    }
}
