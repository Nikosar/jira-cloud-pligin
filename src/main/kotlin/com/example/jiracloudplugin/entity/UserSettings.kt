package com.example.jiracloudplugin.entity

import com.atlassian.connect.spring.AtlassianHost
import com.vladmihalcea.hibernate.type.json.JsonBinaryType
import com.vladmihalcea.hibernate.type.json.JsonStringType
import org.hibernate.annotations.Type
import org.hibernate.annotations.TypeDef
import org.hibernate.annotations.TypeDefs
import java.util.UUID
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.OneToOne

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
        var projects: List<Project>,
        var flag: Boolean
)

class Project(
        var jiraProject: JiraProject,
        var users: List<JiraUser>,
)

class JiraProject(
        var name: String,
        var id: String,
        var key: String
)

class JiraUser(
        var displayName: String,
        var accountId: String
)