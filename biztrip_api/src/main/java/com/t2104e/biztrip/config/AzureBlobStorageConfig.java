package com.t2104e.biztrip.config;

import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;
import com.azure.storage.common.StorageSharedKeyCredential;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AzureBlobStorageConfig {
    @Value("${azure.storage.account-name}")
    private String accountName;

    @Value("${azure.storage.account-key}")
    private String accountKey;

    @Value("${azure.storage.blob-endpoint}")
    private String blobEndpoint;

    @Bean
    public BlobServiceClient getBlobServiceClient() {
        return new BlobServiceClientBuilder()
                .endpoint(blobEndpoint)
                .credential(new StorageSharedKeyCredential(accountName, accountKey))
                .buildClient();
    }

//    Converter<String, Date> stringToDateConverter = new Converter<String, Date>() {
//        @Override
//        public Date convert(MappingContext<String, Date> context) {
//            String dateString = context.getSource();
//            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//            try {
//                return dateFormat.parse(dateString);
//            } catch (ParseException e) {
//                e.printStackTrace();
//                return null;
//            }
//        }
//    };
//
//        modelMapper.addConverter(stringToDateConverter);
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
