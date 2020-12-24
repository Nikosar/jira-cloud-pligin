package com.example.jiracloudplugin.security

import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.security.config.annotation.web.builders.WebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter

@Profile("dev")
@Configuration
class DevSecurityConfigurer: WebSecurityConfigurerAdapter() {
    override fun configure(web: WebSecurity?) {
        web!!.ignoring().antMatchers("/**")
    }
}