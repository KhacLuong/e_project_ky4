package com.t2104e.biztrip.utils;

import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;

import java.util.ArrayList;
import java.util.List;


@Service
public class ValidationHandle {

    public List<String> validation(BindingResult result){
        if (result.hasErrors()) {
            List<String> listMsg = new ArrayList<>();

            for (ObjectError err : result.getAllErrors()) {
                String field = ((FieldError) err).getField();
                listMsg.add(field + ": " + err.getDefaultMessage());
            }
            return  listMsg;
        }
        return null;
    }
}
