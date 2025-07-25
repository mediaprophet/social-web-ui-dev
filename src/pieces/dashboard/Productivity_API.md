# Ontological API Specification for Professional Productivity Dashboard

## Document Overview

This document provides a complete ontological API specification for the "Professional Productivity Dashboard" page, designed for digital nomads in remote, internet-based projects. The ontology defines core concepts, entities, relationships, and data models using a structured approach inspired by OWL (Web Ontology Language) and RDF, but simplified for API use. The API is RESTful, supporting JSON payloads, and includes endpoints for fetching/updating dashboard data.

The ontology emphasizes decentralized collaboration, productivity metrics, and integration with external resources via URIs. A "types" mechanism is included to classify URIs (e.g., Git repositories, Google Docs, websites, blogs, X posts, Grok chatlogs), enabling the API to represent and link to diverse external artifacts.

**Key Assumptions**:
- The dashboard is user-centric (e.g., for "Tim" as the current user).
- Authentication: Assume JWT or API key for user-specific data.
- URI Types: Defined as an enumeration for resource links, allowing dynamic presentation (e.g., embed previews for Grok chatlogs or X posts).
- Updates/Progress: Endpoints support real-time polling or WebSockets via a `/updates` URI for progress notifications (e.g., WebSocket URI: `ws://api.example.com/updates?user_id=123`).
- Base URL: `https://api.productivityhub.com/v1`.
- Error Handling: Standard HTTP codes (200 OK, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Server Error) with JSON error bodies.
- Pagination: For lists (e.g., projects, tasks), use `page` and `limit` query params.

## Ontology

### Classes (Entities)
- **User**: Represents the dashboard user (e.g., Tim). Properties: id (string), name (string), role (string, e.g., "UI/UX Designer"), skills (array of strings), availability_level (enum: "Engaged", "Barrier", "Recharging", "Dormant").
- **Project**: A collaborative initiative. Properties: id (string), name (string), description (string), start_date (date), end_date (date), priority (enum: "High", "Medium", "Low"), hours_spent (number), deadline (date), status (enum: "Ongoing", "On Hold", "Overdue", "Completed").
- **Task**: Individual work items within a project. Properties: id (string), project_id (string), description (string), status (enum: "Pending", "In Progress", "Completed", "Overdue"), urgency (enum: "High", "Medium", "Low"), dependencies (array of task_ids).
- **Contributor**: Individuals collaborating on projects. Properties: id (string), name (string), role (string), status (enum: "Dedicated", "Occasional", "Newbie", "Specialist"), performance (number, e.g., 99%).
- **Gap**: Unmet requirements in a project. Properties: id (string), project_id (string), category (enum: "Skill", "Task", "Resource", "Dependency", "Critical"), description (string), dependencies (array of strings), more_info_uri (string with type), user_can_address (boolean), resolved_by (string), resolved_date (date).
- **Accomplishment**: Resolved gaps or achievements. Properties: id (string), project_id (string), category (string), description (string), resolved_by (string), date_resolved (date).
- **Todo**: Personal tasks. Properties: id (string), title (string), tag (enum: "Internal", "Projects", "Meetings", "Reminder"), priority (enum: "High", "Medium", "Low"), description (string), assignee (string), status (enum: "Completed", "Pending", "On Hold", "In Progress").
- **Activity**: User or project events. Properties: id (string), type (string, e.g., "Session Log", "Recent Activity"), timestamp (datetime), description (string).
- **Metric**: Dashboard statistics. Properties: name (string, e.g., "Total Projects"), value (number), change (string, e.g., "+2.1%").
- **Notification**: Leave or unavailability notices. Properties: id (string), type (enum: "Unavailable", "Holidays", "Conference", "Travel", "Work Commitments", "Personal", "Other"), from_date (date), to_date (date), projects_affected (array of project_ids), availability_level (enum: "Completely Unavailable", "Mostly Unavailable", "Limited Availability"), timezone (string, optional), response_expectations (array of enums: "Urgent Requests", "Correspondence", "Notifications", "None"), delegate (string, optional), reason (string).
- **URIResource**: External links with types. Properties: uri (string), type (enum: "git" for Git repos, "gdoc" for Google Docs, "website" for general sites, "blog" for blogs, "x_post" for X/Social Media, "grok_chat" for Grok chatlogs, "other").

### Properties (Attributes and Relationships)
- **hasProject** (User -> Project): Links users to their projects.
- **hasTask** (Project -> Task): Tasks within a project.
- **hasContributor** (Project -> Contributor): Contributors on a project.
- **hasGap** (Project -> Gap): Gaps in a project.
- **hasAccomplishment** (Project -> Accomplishment): Resolved gaps.
- **hasTodo** (User -> Todo): User's todos.
- **hasActivity** (User/Project -> Activity): Activities for users or projects.
- **hasMetric** (Dashboard -> Metric): Dashboard metrics.
- **hasNotification** (User -> Notification): User's leave notifications.
- **linksTo** (Any Entity -> URIResource): Associates URIs with entities (e.g., project docs as "gdoc").
- **dependsOn** (Task/Gap -> Task/Gap): Dependency relationships.
- **userCanAddress** (Gap -> boolean): Based on user's skills matching gap category.
- **uriType** (URIResource -> enum): Classifies the URI for presentation (e.g., embed Grok chatlog if "grok_chat").

### Relationships
- **User collaboratesOn Project** (many-to-many): Via Contributor role.
- **Project hasGap Gap** (one-to-many): Gaps block project progress.
- **Gap resolvedAs Accomplishment** (one-to-one): When a gap is addressed.
- **Task blockedBy Gap** (many-to-one): Tasks dependent on resolving gaps.
- **Notification affects Project** (many-to-many): Via projects_affected.
- **Entity references URIResource** (one-to-many): For external links, with type for rendering (e.g., Git diff for "git", tweet embed for "x_post").

## API Endpoints

All endpoints require authentication (e.g., Authorization header with JWT). Responses are JSON with a standard structure: `{ "data": [object/array], "meta": { "pagination": { "page": 1, "limit": 10, "total": 50 } }, "error": null }`.

### Dashboard Overview
- **GET /dashboard**: Fetch full dashboard data.
  - Query Params: `user_id` (string, required for personalization).
  - Response Model:
    ```json
    {
      "welcome": {
        "name": "string",
        "pending_tasks": "number",
        "project_invites": "number"
      },
      "metrics": [
        {
          "name": "string",
          "value": "number",
          "change": "string"
        }
      ],
      "contributors_by_role": {
        "increase": "string",
        "data": "array of objects"
      },
      "contributor_status": {
        "total": "number",
        "statuses": [
          {
            "type": "enum (Dedicated, Occasional, Newbie, Specialist)",
            "count": "number",
            "percentage": "number"
          }
        ],
        "top_contributor": {
          "name": "string",
          "role": "string",
          "performance": "number"
        }
      },
      "productivity_status": {
        "total": "number",
        "statuses": [
          {
            "type": "enum (Engaged, Barrier, Recharging, Dormant)",
            "percentage": "number"
          }
        ],
        "dormant_periods": "number"
      },
      "session_log": "array of activity objects",
      "project_opportunities": {
        "openings": "array of objects",
        "applicants": "array of objects"
      },
      "collaborators": "array of contributor objects",
      "todos": "array of todo objects",
      "progress_overview": {
        "income": "number",
        "expenses": "number",
        "last_updated": "datetime"
      },
      "milestones": "array of milestone objects",
      "projects": "array of project objects",
      "task_statistics": {
        "total": "number",
        "statuses": [
          {
            "type": "enum (Ongoing, On Hold, Overdue)",
            "percentage": "number"
          }
        ],
        "hours_spent": "string"
      },
      "online_meetups": "array of schedule objects",
      "recent_activities": "array of activity objects",
      "birthdays": "array of birthday objects",
      "updates_uri": "string (e.g., ws://api.example.com/updates?user_id=123)"
    }
    ```

### Projects
- **GET /projects**: List projects.
  - Query Params: `page` (integer, default 1), `limit` (integer, default 10), `filter` (string, e.g., "priority=High").
  - Response: Array of Project objects with linked Gaps and Tasks.
- **POST /projects**: Create a project.
  - Body: Project model (name, description, start_date, etc.).
  - Response: Created Project object.
- **GET /projects/{id}**: Get project details.
  - Response: Project object with URIs (e.g., git repo as {"uri": "https://github.com/repo", "type": "git"}).
- **PUT /projects/{id}**: Update project.
  - Body: Partial Project model.
- **DELETE /projects/{id}**: Delete project.

### Gaps and Accomplishments
- **GET /gaps**: List all gaps.
  - Query Params: `project_id` (string, optional), `category` (enum, optional).
  - Response: Array of Gap objects, with `user_can_address` computed based on user skills.
- **POST /gaps**: Create a gap.
  - Body: Gap model.
- **GET /gaps/{id}**: Get gap details.
- **PUT /gaps/{id}/resolve**: Resolve a gap (converts to Accomplishment).
  - Body: { "resolved_by": "string", "resolved_date": "date" }.
  - Response: Accomplishment object.
- **GET /accomplishments**: List resolved gaps.
  - Response: Array of Accomplishment objects.

### Contributors
- **GET /contributors**: List contributors.
  - Response: Array of Contributor objects.
- **POST /contributors**: Add contributor.
  - Body: Contributor model.

### Tasks and Todos
- **GET /tasks**: List tasks.
  - Query Params: `project_id` (string), `urgency` (enum).
  - Response: Array of Task objects, with dependencies resolved.
- **POST /tasks**: Create task.
  - Body: Task model.
- **GET /todos**: List todos.
  - Response: Array of Todo objects.
- **POST /todos**: Create todo.
  - Body: Todo model.

### Activities and Metrics
- **GET /activities**: List activities (e.g., session logs, recent).
  - Response: Array of Activity objects.
- **GET /metrics**: Get dashboard metrics.
  - Response: Array of Metric objects.

### Notifications
- **GET /notifications**: List leave notifications.
  - Response: Array of Notification objects.
- **POST /notifications**: Create notification.
  - Body: Notification model (from_date, to_date, projects_affected, availability_level, etc.).
- **PUT /notifications/{id}**: Update notification.

### URI Types Function
- **GET /uri-types**: Get enumeration of URI types for presentation.
  - Response:
    ```json
    {
      "types": [
        {"type": "git", "description": "Git repositories (e.g., GitHub links for code review)"},
        {"type": "gdoc", "description": "Google Docs (e.g., project docs for collaboration)"},
        {"type": "website", "description": "General websites (e.g., reference links)"},
        {"type": "blog", "description": "Blogs (e.g., progress updates)"},
        {"type": "x_post", "description": "X/Social Media posts (e.g., announcements)"},
        {"type": "grok_chat", "description": "Grok chatlogs (e.g., AI discussions from grok.com)"},
        {"type": "other", "description": "Other URIs"}
      ]
    }
    ```
- **Integration**: When returning URIs in responses (e.g., in Project or Gap), include `"uri_type": "enum"` for client-side rendering (e.g., embed X post if "x_post").

### Data Models (JSON Schemas)
#### Project Model
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "start_date": "date",
  "end_date": "date",
  "priority": "enum (High, Medium, Low)",
  "hours_spent": "number",
  "deadline": "date",
  "status": "enum (Ongoing, On Hold, Overdue, Completed)",
  "contributors": "array of Contributor IDs",
  "tasks": "array of Task IDs",
  "gaps": "array of Gap IDs",
  "uris": [
    {
      "uri": "string",
      "type": "enum (git, gdoc, website, blog, x_post, grok_chat, other)"
    }
  ]
}
```

#### Gap Model
```json
{
  "id": "string",
  "project_id": "string",
  "category": "enum (Skill, Task, Resource, Dependency, Critical)",
  "description": "string",
  "dependencies": "array of strings (e.g., task IDs or descriptions)",
  "more_info_uri": {
    "uri": "string",
    "type": "enum"
  },
  "user_can_address": "boolean",
  "resolved_by": "string (optional)",
  "resolved_date": "date (optional)"
}
```

#### Notification Model
```json
{
  "id": "string",
  "type": "enum (Unavailable, Holidays, Conference, Travel, Work Commitments, Personal, Other)",
  "from_date": "date",
  "to_date": "date",
  "projects_affected": "array of project_ids",
  "availability_level": "enum (Completely Unavailable, Mostly Unavailable, Limited Availability)",
  "timezone": "string (optional)",
  "response_expectations": "array of enums (Urgent Requests, Correspondence, Notifications, None)",
  "delegate": "string (optional, contributor ID)",
  "reason": "string"
}
```

#### Other Models
- Contributor, Task, Todo, Activity, Metric, Accomplishment: Similar structures with properties as defined in Classes.

## Security and Best Practices
- **Authentication**: JWT in Authorization header.
- **Authorization**: User-specific data filtered by `user_id`.
- **Rate Limiting**: 100 requests/min per user.
- **CORS**: Allow from dashboard domain.
- **Validation**: Use JSON Schema for input validation.
- **Logging**: Track API calls for auditing.
- **Updates URI**: WebSocket for real-time progress (e.g., gap resolutions, task updates).

## Versioning and Changes
- **Version**: 1.0 (July 25, 2025).
- **Changes**: Initial release. Future updates may add WebSocket details or more URI types.

This specification ensures the API supports the dashboard's needs, including ontological structure for entities/relationships and URI types for external integrations.