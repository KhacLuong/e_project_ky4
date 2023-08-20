package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.ContactEntity;
import com.t2104e.biztrip.repositories.ContactRepository;
import com.t2104e.biztrip.services.interfaces.IContactService;
import com.t2104e.biztrip.utils.Helper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
public class ContactImplService implements IContactService {
    @Autowired
    private ContactRepository contactRepository;

    @Override
    public ResponseDTO<?> getListContact(int pageNumber, int perPage, String sortField, String sortDir, String keyword) {
        Pageable pageable = Helper.pageableQuery(pageNumber, perPage, sortField, sortDir);
        var page = contactRepository.findByKeyword(Objects.requireNonNullElse(keyword, ""), pageable);
        long totalItems = page.getTotalElements();
        int totalPages = page.getTotalPages();
        return ResponseService.ok(page.getContent(), "Lấy danh sách thành công", pageNumber, perPage, totalItems, totalPages, sortField, sortDir);
    }

    @Override
    public ResponseDTO<?> deleteContact(long id) {
        Optional<ContactEntity> op = contactRepository.findById(id);
        if (op.isPresent()) {
            contactRepository.delete(op.get());
            return ResponseService.ok(null, "Xóa thành công");
        }
        return ResponseService.notFound("Không tìm thấy");
    }

    @Override
    public ResponseDTO<?> createContact(ContactEntity contact) {
        contact.setCreatedAt(new Date());
        contact.setUpdatedAt(new Date());
        var data = contactRepository.save(contact);
        return ResponseService.created(data, "Tạo thành công");
    }

    @Override
    public ResponseDTO<?> updateContact(long id) {
        Optional<ContactEntity> op = contactRepository.findById(id);
        if (op.isPresent()) {
            Date updatedAt = new Date();
            contactRepository.updateContact(updatedAt, id);
            return ResponseService.updated("Cập nhật thành công");
        }
        return ResponseService.notFound("Không tìm thấy");
    }
}
