package com.example.jiracloudplugin.rest

import com.atlassian.connect.spring.AtlassianHostUser
import com.example.jiracloudplugin.repository.SettingsRepository
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PutMapping

@Controller
class HelloController {
    @GetMapping("/hello")
    fun controllerHello(): String {
        return "helloworld"
    }
}