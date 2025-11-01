package com.vaibhav.Authify.service;

import com.vaibhav.Authify.io.ProfileRequest;
import com.vaibhav.Authify.io.ProfileResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


public interface ProfileService {


    public ProfileResponse createProfile(ProfileRequest request);

    ProfileResponse getProfile(String email);

    void sendResetOtp( String email);

    void resetPassword( String email, String otp, String newPassword);

    void sendOtp( String email);

    void verifyOtp(String email, String otp);
}
