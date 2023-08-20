package com.t2104e.biztrip.utils;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public final class Helper {
    public static Sort sortQuery(String sortField, String sortDir) {
        return sortDir.equals("asc") ? Sort.by(Sort.Order.asc(sortField)) : Sort.by(Sort.Order.desc(sortField));
    }

    public static Pageable pageableQuery(int pageNumber, int perPage, String sortField, String sortDir) {
        Sort sort = Helper.sortQuery(sortField, sortDir);
        return PageRequest.of(pageNumber - 1, perPage, sort);
    }
    public static String reservationCode() {
        String CHARACTERS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        int LENGTH = 7;
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(LENGTH);
        for (int i = 0; i < LENGTH; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            sb.append(CHARACTERS.charAt(randomIndex));
        }
        return sb.toString();
    }
    public static boolean isTimeWithinRange(Time time, Time startTime, Time endTime) {
        return time.compareTo(startTime) >= 0 && time.compareTo(endTime) <= 0;
    }
    public static boolean handleCheckCurrentTimeInAPeriodTime(String currentTimeStr, String periodTime) {
        Time currentTime = Time.valueOf(currentTimeStr);
        Time startTime = null;
        Time endTime = null;
        String[] timeRangeParts = periodTime.split("-");
        if (timeRangeParts.length == 2) {
            startTime = Time.valueOf(timeRangeParts[0]);
            endTime = Time.valueOf(timeRangeParts[1]);
        }
        return Helper.isTimeWithinRange(currentTime, startTime, endTime);
    }
    public static String decode(String value) {
        return URLDecoder.decode(value, StandardCharsets.UTF_8);
    }
    public static Long[] convertStringToArray(String str) {
        if (str != null && !str.isEmpty()) {
            String[] strArr = Helper.decode(str).split("\\|");
            Long[] arr = new Long[strArr.length];

            for (int i = 0; i < strArr.length; i++) {
                arr[i] = Long.parseLong(strArr[i]);
            }
            return arr;
        }
        return null;
    }
    public static Time convertStringToTime(String timeString) {
        if (timeString == null || timeString.isEmpty()) {
            return null;
        }
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
            LocalTime localTime = LocalTime.parse(Helper.decode(timeString), formatter);
            return Time.valueOf(localTime);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    public static Date convertStringToDate(String dateString) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        return sdf.parse(dateString);
    }
}
