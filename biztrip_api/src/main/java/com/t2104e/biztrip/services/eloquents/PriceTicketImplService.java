package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.command.PriceTicketRequest;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.PriceTicketEntity;
import com.t2104e.biztrip.repositories.PriceTicketRepository;
import com.t2104e.biztrip.services.interfaces.IPriceTicketService;
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
public class PriceTicketImplService implements IPriceTicketService {
    @Autowired
    private PriceTicketRepository priceTicketRepository;

    @Override
    public ResponseDTO<?> getListPriceTicket(int pageNumber, int perPage, String sortField, String sortDir, String keyword) {
        Pageable pageable = Helper.pageableQuery(pageNumber, perPage, sortField, sortDir);
        var page = priceTicketRepository.findByKeyword(Objects.requireNonNullElse(keyword, ""), pageable);
        long totalItems = page.getTotalElements();
        int totalPages = page.getTotalPages();
        return ResponseService.ok(page.getContent(), "Lấy danh sách thành công", pageNumber, perPage, totalItems, totalPages, sortField, sortDir);
    }

    @Override
    public ResponseDTO<?> getOnePriceTicketById(long id) {
        Optional<PriceTicketEntity> op = priceTicketRepository.findById(id);
        if (op.isPresent()) {
            return ResponseService.ok(op.get(), "Lấy thành công");
        }
        return ResponseService.notFound("Không tìm thấy giá vé có id = " + id);
    }

    @Override
    public ResponseDTO<?> deletePriceTicket(long id) {
        Optional<PriceTicketEntity> op = priceTicketRepository.findById(id);
        if (op.isPresent()) {
            priceTicketRepository.delete(op.get());
            return ResponseService.ok(null, "Xóa thành công");
        }
        return ResponseService.notFound("Không tìm thấy giá vé có id = " + id);
    }

    @Override
    public ResponseDTO<?> createPriceTicket(PriceTicketEntity priceTicket) {
        priceTicket.setCreatedAt(new Date());
        priceTicket.setUpdatedAt(new Date());
        var data = priceTicketRepository.save(priceTicket);
        return ResponseService.created(data, "Tạo thành công");
    }

    @Override
    public ResponseDTO<?> updatePriceTicket(PriceTicketRequest priceTicketRequest) {
       Optional<PriceTicketEntity> optional = priceTicketRepository.findById(priceTicketRequest.getId());
        if (optional.isEmpty()) {
            return ResponseService.notFound("Không tìm thấy giá vé id = " + priceTicketRequest.getId());
        }
        PriceTicketEntity priceTicket = optional.get();
        priceTicket.setTitle(priceTicketRequest.getTitle());
        priceTicket.setFare(priceTicketRequest.getFare());
        priceTicket.setUpdatedAt(new Date());
        var data = priceTicketRepository.save(priceTicket);
        return ResponseService.created(data,"Cập nhật thành công");
    }
}
