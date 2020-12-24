package com.example.jiracloudplugin.entity

import com.atlassian.connect.spring.AtlassianHost
import com.vladmihalcea.hibernate.type.json.JsonBinaryType
import com.vladmihalcea.hibernate.type.json.JsonStringType
import org.hibernate.annotations.Type
import org.hibernate.annotations.TypeDef
import org.hibernate.annotations.TypeDefs
import javax.persistence.*

@Entity
@TypeDefs(
        TypeDef(name = "json", typeClass = JsonStringType::class),
        TypeDef(name = "jsonb", typeClass = JsonBinaryType::class)
)
class UserSettings(
        @Id
        var id: String,
        @OneToOne
        var atlassianHost: AtlassianHost,
        @Type(type = "jsonb")
        @Column(columnDefinition = "json")
        var settings: Settings
)

class Settings(
        var name: String,
        var flag: Boolean
)