package com.example.jiracloudplugin.repository

import com.atlassian.connect.spring.AtlassianHost
import com.example.jiracloudplugin.entity.UserSettings
import org.springframework.data.repository.CrudRepository

interface SettingsRepository : CrudRepository<UserSettings, String> {
    fun findByAtlassianHost(atlassianHost: AtlassianHost): UserSettings?
}