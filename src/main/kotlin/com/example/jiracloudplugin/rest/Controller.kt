package com.example.jiracloudplugin.rest

import com.atlassian.connect.spring.AtlassianHostUser
import com.example.jiracloudplugin.repository.SettingsRepository
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class Controller(val settingsRepository: SettingsRepository) {
    @GetMapping("/hello")
    fun controllerHello(): String {
        return "helloworld"
    }

    @GetMapping("/settings")
    fun settings(@AuthenticationPrincipal hostUser: AtlassianHostUser): ResponseEntity<Any> {
        val userSettings = settingsRepository.findByAtlassianHost(hostUser.host)
        return userSettings?.settings
                ?.let { ResponseEntity.ok().body(it) }
                ?: ResponseEntity.notFound().build()
    }
}