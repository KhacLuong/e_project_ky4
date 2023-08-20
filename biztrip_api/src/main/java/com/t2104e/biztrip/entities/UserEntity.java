package com.t2104e.biztrip.entities;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor // thay thế constructor không tham số
@AllArgsConstructor // thay thế constructor có tham số
@Entity(name = "users")
@Table(name = "users", schema = "biztrip_database", catalog = "")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserEntity implements UserDetails {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;
    @Basic
    @Email
    @Column(name = "email")
    @Size(max = 100)
    private String email;
    @Basic
    @Column(name = "phone_number")
    @Size(max = 20, message = "Số điện thoại tối đa từ 10 đến 12 chữ số")
    private String phoneNumber;
    @Basic
    @Column(name = "password", nullable = false)
    @NotEmpty(message = "Mật khẩu không được bỏ trống!")
    @Size(min = 8, message = "Mật khẩu phải có tối thiểu 8 ký tự")
    private String password;
    @Basic
    @Column(name = "password_reset_token")
    private String passwordResetToken;
    @Basic
    @Column(name = "password_reset_expired")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date passwordResetExpired;
    @Basic
    @Column(name = "sms_token")
    private String smsToken;
    @Basic
    @Column(name = "sms_expired")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date smsExpired;
    @Basic
    @Column(name = "verify_token")
    private String verifyToken;
    @Basic
    @Column(name = "verify_at")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date verifyAt;
    @Basic
    @Column(name = "refresh_token")
    private String refreshToken;
    @Basic
    @Column(name = "token_revoked")
    public boolean tokenRevoked;
    @Basic
    @Column(name = "token_expired")
    public boolean tokenExpired;
    @Basic
    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private Role role;
    @Basic
    @Column(name = "created_at" ,columnDefinition="TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;
    @Basic
    @Column(name = "updated_at", columnDefinition="TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;
    @Basic
    @Column(name = "google_account")
    public Boolean googleAccount;
    @Basic
    @Column(name = "full_name")
    public String fullName;
    @Basic
    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    public Gender gender;
    @Basic
    @Column(name = "dob")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    public Date dateOfBirth;

    @OneToMany(mappedBy="userId", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<ReviewEntity> reviews;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public UserEntity( String createdAt, String dateOfBirth, String email, String fullName, Gender gender, Boolean googleAccount, String password,String passwordResetExpired, String passwordResetToken,  String phoneNumber, String refreshToken, Role role, String smsExpired, String smsToken, boolean tokenExpired, boolean tokenRevoked,String updatedAt,String verifyAt, String verifyToken) {
       SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        this.id = id;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.passwordResetToken = passwordResetToken;
        try {
            this.passwordResetExpired = passwordResetExpired!=null ? dateFormat.parse(passwordResetExpired) : null;
        } catch (ParseException e) {
            this.passwordResetExpired = null;
        }

        this.smsToken = smsToken;

        try {
            this.smsExpired = smsExpired!=null ? dateFormat.parse(smsExpired) : null;
        } catch (ParseException e) {
            this.smsExpired = null;
        }

        this.verifyToken = verifyToken;

        try {
            this.verifyAt = verifyAt!=null ? dateFormat.parse(verifyAt) : null;
        } catch (ParseException e) {
            this.verifyAt = null;
        }
        this.refreshToken = refreshToken;
        this.tokenRevoked = tokenRevoked;
        this.tokenExpired = tokenExpired;
        this.role = role;
        try {
            this.createdAt = createdAt!=null ? dateFormat.parse(createdAt) : null;
        } catch (ParseException e) {
             this.createdAt = null;
        }
        try {
            if (updatedAt!=null) {
                this.updatedAt = dateFormat.parse(updatedAt);
            }
        } catch (ParseException e) {
        }

        this.googleAccount = googleAccount;
        this.fullName = fullName;
        this.gender = gender;
        try {
            this.dateOfBirth = dateOfBirth!=null ? dateFormat.parse(dateOfBirth) : null;
        } catch (ParseException e) {
            this.dateOfBirth = null;
        }
    }
}