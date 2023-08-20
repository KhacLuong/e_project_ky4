package com.t2104e.biztrip.services.eloquents;

import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.models.BlobContainerAccessPolicies;
import com.azure.storage.blob.models.BlobHttpHeaders;
import com.azure.storage.blob.models.PublicAccessType;
import com.azure.storage.blob.specialized.BlockBlobClient;
import com.t2104e.biztrip.services.interfaces.IFileService;
import lombok.NonNull;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedInputStream;
import java.io.IOException;

@Log4j2
@Service
@Transactional
public class FileService implements IFileService {
    @Autowired
    private BlobServiceClient blobServiceClient;

    @Override
    public String uploadAndDownloadFile(@NonNull MultipartFile file, String containerName) {
        BlobHttpHeaders headers = new BlobHttpHeaders().setContentType("image/jpg");
        BlobContainerClient blobContainerClient = getBlobContainerClient(containerName);
        String filename = file.getOriginalFilename();
        BlockBlobClient blockBlobClient = blobContainerClient.getBlobClient(filename).getBlockBlobClient();
        try {
            // Delete the file if it already exists in the container
            if (blockBlobClient.exists()) {
                blockBlobClient.delete();
            }
            // Upload the file to Azure Blob Storage
            blockBlobClient.uploadWithResponse(new BufferedInputStream(file.getInputStream()), file.getSize(), headers, null, null, null, null, null, null);
            return blockBlobClient.getBlobUrl();
        } catch (IOException e) {
            log.error("Error while processing file {}", e.getLocalizedMessage());
            return null;
        }
    }


    private @NonNull BlobContainerClient getBlobContainerClient(@NonNull String containerName) {
        BlobContainerClient blobContainerClient = blobServiceClient.getBlobContainerClient(containerName);
        // Create the container if it doesn't exist
        if (!blobContainerClient.exists()) {
            blobContainerClient.create();

            // Set the public access level to "Blob"
            BlobContainerAccessPolicies accessPolicies = new BlobContainerAccessPolicies(PublicAccessType.BLOB, null);
            blobContainerClient.setAccessPolicy(PublicAccessType.BLOB, null);
        }

        return blobContainerClient;
    }
}
