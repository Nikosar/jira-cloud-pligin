package com.example.jiracloudplugin.entity

import com.atlassian.connect.spring.AtlassianHost
import com.vladmihalcea.hibernate.type.json.JsonBinaryType
import com.vladmihalcea.hibernate.type.json.JsonStringType
import org.hibernate.annotations.Type
import org.hibernate.annotations.TypeDef
import org.hibernate.annotations.TypeDefs
import java.util.*
import javax.persistence.*

@Entity
@TypeDefs(
        TypeDef(name = "json", typeClass = JsonStringType::class),
        TypeDef(name = "jsonb", typeClass = JsonBinaryType::class)
)
class UserSettings(
        @Id
        var id: UUID,
        @OneToOne
        var atlassianHost: AtlassianHost,
        @Type(type = "jsonb")
        @Column(columnDefinition = "json")
        var settings: Settings
)

class Settings(
        var name: String,
        var projects: List<String>,
        var users: List<String>,
        var flag: Boolean
)