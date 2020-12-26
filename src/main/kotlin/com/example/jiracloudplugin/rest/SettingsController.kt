package com.example.jiracloudplugin.rest

import com.atlassian.connect.spring.AtlassianHostUser
import com.example.jiracloudplugin.entity.Settings
import com.example.jiracloudplugin.entity.UserSettings
import com.example.jiracloudplugin.repository.SettingsRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import java.util.*

@Controller
@RequestMapping("/settings")
class SettingsController(val settingsRepository: SettingsRepository) {
    @GetMapping()
    fun get(@AuthenticationPrincipal hostUser: AtlassianHostUser): ResponseEntity<Any> {
        val userSettings = settingsRepository.findByAtlassianHost(hostUser.host)
        return userSettings?.settings
                ?.let { ResponseEntity.ok().body(it) }
                ?: ResponseEntity.notFound().build()
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    fun save(
            @AuthenticationPrincipal
            hostUser: AtlassianHostUser,
            @RequestBody
            settings: Settings
    ) {
        val userSettings = (settingsRepository.findByAtlassianHost(hostUser.host)
                ?.let { it.settings = settings; it }
                ?: UserSettings(UUID.randomUUID(), hostUser.host, settings))
        settingsRepository.save(userSettings)
    }
}