package com.t2104e.biztrip.services.interfaces;

import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.ContactEntity;

public interface IContactService {
    public ResponseDTO<?> getListContact(int pageNumber, int perPage, String sortField, String sortDir, String keyword);
    public ResponseDTO<?> deleteContact(long id);
    public ResponseDTO<?> createContact(ContactEntity contact);
    public ResponseDTO<?> updateContact(long id);
}
