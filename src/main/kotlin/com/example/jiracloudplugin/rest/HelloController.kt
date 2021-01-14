package com.example.jiracloudplugin.rest

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class HelloController {
    @GetMapping("/hello")
    fun controllerHello(): String {
        return "helloworld"
    }

    @GetMapping("/app/**")
    fun hello1(): String {
        return "forward:/index.html"
    }
}