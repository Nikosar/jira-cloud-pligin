package com.example.jiracloudplugin

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.jpa.repository.config.EnableJpaRepositories

@SpringBootApplication
@EnableJpaRepositories
class JiraCloudPluginApplication

fun main(args: Array<String>) {
    runApplication<JiraCloudPluginApplication>(*args)
}
