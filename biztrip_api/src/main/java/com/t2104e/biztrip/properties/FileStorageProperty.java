package com.t2104e.biztrip.properties;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
//@ConfigurationProperties(prefix = "file")
public class FileStorageProperty {
    private String uploadDir;
}
