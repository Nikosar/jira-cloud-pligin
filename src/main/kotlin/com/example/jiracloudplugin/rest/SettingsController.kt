package com.example.jiracloudplugin.rest

import com.atlassian.connect.spring.AtlassianHostRestClients
import com.atlassian.connect.spring.AtlassianHostUser
import com.example.jiracloudplugin.entity.Settings
import com.example.jiracloudplugin.entity.UserSettings
import com.example.jiracloudplugin.repository.SettingsRepository
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.stereotype.Controller
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseStatus
import java.util.*

@Controller
@RequestMapping("/settings")
class SettingsController(
        val settingsRepository: SettingsRepository,
        val atlassianHostRestClients: AtlassianHostRestClients,
        @Value("\${addon.key}")
        val addonKey: String
) {
    @GetMapping()
    fun get(@AuthenticationPrincipal hostUser: AtlassianHostUser): ResponseEntity<Any> {
        val userSettings = settingsRepository.findByAtlassianHost(hostUser.host)

        return userSettings?.settings
                ?.let { ResponseEntity.ok().body(it) }
                ?: ResponseEntity.notFound().build()
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    @Transactional
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

        atlassianHostRestClients.authenticatedAsAddon(hostUser.host)
                .put("/rest/atlassian-connect/1/addons/${addonKey}/properties/settings", settings)
    }
}