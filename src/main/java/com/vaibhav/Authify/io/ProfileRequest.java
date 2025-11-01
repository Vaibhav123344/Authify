package com.vaibhav.Authify.io;


import jakarta.validation.constraints.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProfileRequest {
    @NotBlank(message = "email should not be empty")
    private String name;
    @Email(message = "enter valid email address")
    @NotNull(message= "Email should not be null")
    private String email;
    @Size(min = 6,message = "Password must be aleast 6 chars")
    private String password;
}
