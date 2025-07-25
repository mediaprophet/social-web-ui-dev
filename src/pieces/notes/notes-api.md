# Ontological API Specification for Notes Page

## Document Overview

This document provides a complete ontological API specification for the "Notes" page, designed as part of a productivity application for digital nomads working on remote, internet-based projects. The ontology defines core concepts, entities, relationships, and data models using a structured approach inspired by OWL (Web Ontology Language) and RDF, but simplified for RESTful API use. The API supports JSON payloads and includes endpoints for managing notes, their categories, statuses, priorities, and associated actions.

The ontology emphasizes decentralized collaboration, note organization, and integration with external resources via URIs. A "types" mechanism classifies URIs (e.g., Git repositories, Google Docs, websites, blogs, X posts, Grok chatlogs), enabling dynamic presentation (e.g., embedding X posts or Grok chatlogs). The specification aligns with the "Professional Productivity Dashboard" ontology for consistency, supporting features like note filtering, bulk actions, and modal interactions.

**Key Assumptions**:
- The Notes page is user-centric (e.g., for a user like "Tim").
- Authentication: JWT or API key for user-specific data.
- URI Types: Defined as an enumeration for resource links, allowing rendering (e.g., Git diff for "git", tweet embed for "x_post").
- Updates/Progress: Endpoints support real-time updates via a `/updates` WebSocket URI (e.g., `ws://api.example.com/updates?user_id=123`).
- Base URL: `https://api.productivityhub.com/v1`.
- Error Handling: Standard HTTP codes (200 OK, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Server Error) with JSON error bodies: `{ "error": { "code": "string", "message": "string" } }`.
- Pagination: For lists (e.g., notes), use `page` and `limit` query params.
- UI Components: Modals (Add Notes, Edit Notes, Confirm Delete, View Notes) are client-side; API focuses on data operations.

## Ontology

### Classes (Entities)
- **User**: The note creator or viewer. Properties: `id` (string), `name` (string), `role` (string, e.g., "UI/UX Designer"), `skills` (array of strings).
- **Note**: A user-created note. Properties: `id` (string), `title` (string), `description` (string, max 60 characters), `category` (enum: "Personal", "Social", "Specific Project", "All Projects"), `status` (enum: "Pending", "Onhold", "Inprogress", "Done"), `priority` (enum: "High", "Medium", "Low"), `due_date` (date, optional), `assignee` (string, optional), `created_at` (datetime), `updated_at` (datetime), `is_important` (boolean), `is_trashed` (boolean).
- **Project**: A collaborative initiative linked to notes (via "Specific Project" or "All Projects"). Properties: `id` (string), `name` (string).
- **Contributor**: Individuals who may be assignees. Properties: `id` (string), `name` (string), `role` (string).
- **URIResource**: External links associated with notes. Properties: `uri` (string), `type` (enum: "git", "gdoc", "website", "blog", "x_post", "grok_chat", "other").
- **Activity**: Tracks note actions (e.g., creation, edit, deletion). Properties: `id` (string), `type` (string, e.g., "Note Created"), `timestamp` (datetime), `description` (string), `user_id` (string).
- **BulkAction**: Operations on multiple notes. Properties: `action` (enum: "Delete Marked", "Unmark All", "Mark All"), `note_ids` (array of strings).

### Properties (Attributes and Relationships)
- **ownsNote** (User -> Note): Links users to their created notes.
- **assignedTo** (Note -> Contributor): Assignee for a note.
- **linkedToProject** (Note -> Project): Associates notes with projects (if category is "Specific Project").
- **hasURI** (Note -> URIResource): External resources linked to a note.
- **hasActivity** (Note -> Activity): Actions performed on a note.
- **appliesTo** (BulkAction -> Note): Notes affected by bulk actions.
- **isImportant** (Note -> boolean): Marks a note as important.
- **isTrashed** (Note -> boolean): Marks a note as deleted (soft delete).
- **uriType** (URIResource -> enum): Classifies URIs for client rendering (e.g., embed Grok chatlog if "grok_chat").

### Relationships
- **User creates Note** (one-to-many): Users own multiple notes.
- **Note assignedTo Contributor** (many-to-one): A note may have one assignee.
- **Note references Project** (many-to-one): Notes tagged with a project.
- **Note linksTo URIResource** (one-to-many): Notes can have multiple URIs (e.g., a Google Doc for details).
- **BulkAction affects Note** (one-to-many): Bulk actions apply to selected notes.
- **Activity tracks Note** (one-to-many): Actions (edit, delete) generate activities.

## API Endpoints

All endpoints require authentication (e.g., Authorization header with JWT). Responses follow a standard JSON structure: `{ "data": [object/array], "meta": { "pagination": { "page": 1, "limit": 10, "total": 50 } }, "error": null }`.

### Notes
- **GET /notes**: List notes with filtering and sorting.
  - Query Params:
    - `user_id` (string, required for personalization).
    - `category` (enum: "Personal", "Social", "Specific Project", "All Projects").
    - `status` (enum: "Pending", "Onhold", "Inprogress", "Done").
    - `priority` (enum: "High", "Medium", "Low").
    - `is_important` (boolean).
    - `is_trashed` (boolean).
    - `sort_by` (enum: "recent", "last_modified", "last_modified_by_me").
    - `page` (integer, default 1).
    - `limit` (integer, default 10).
  - Response Model:
    ```json
    {
      "data": [
        {
          "id": "string",
          "title": "string",
          "description": "string",
          "category": "enum (Personal, Social, Specific Project, All Projects)",
          "status": "enum (Pending, Onhold, Inprogress, Done)",
          "priority": "enum (High, Medium, Low)",
          "due_date": "date",
          "assignee": {
            "id": "string",
            "name": "string",
            "role": "string"
          },
          "created_at": "datetime",
          "updated_at": "datetime",
          "is_important": "boolean",
          "is_trashed": "boolean",
          "project_id": "string",
          "uris": [
            {
              "uri": "string",
              "type": "enum (git, gdoc, website, blog, x_post, grok_chat, other)"
            }
          ]
        }
      ],
      "meta": {
        "pagination": {
          "page": 1,
          "limit": 10,
          "total": 50
        }
      }
    }
    ```
- **POST /notes**: Create a note.
  - Body:
    ```json
    {
      "title": "string",
      "description": "string",
      "category": "enum",
      "status": "enum",
      "priority": "enum",
      "due_date": "date",
      "assignee_id": "string",
      "project_id": "string",
      "uris": [
        {
          "uri": "string",
          "type": "enum"
        }
      ]
    }
    ```
  - Response: Created Note object.
- **GET /notes/{id}**: Get note details.
  - Response: Note object.
- **PUT /notes/{id}**: Update note.
  - Body: Partial Note model.
  - Response: Updated Note object.
- **DELETE /notes/{id}**: Soft delete note (sets `is_trashed` to true).
  - Response: `{ "message": "Note moved to trash" }`.
- **PUT /notes/{id}/restore**: Restore trashed note.
  - Response: Restored Note object.
- **DELETE /notes/{id}/permanent**: Permanently delete note.
  - Response: `{ "message": "Note permanently deleted" }`.
- **PUT /notes/{id}/important**: Toggle `is_important`.
  - Body: `{ "is_important": "boolean" }`.
  - Response: Updated Note object.

### Bulk Actions
- **POST /notes/bulk**: Perform bulk actions.
  - Body:
    ```json
    {
      "action": "enum (Delete Marked, Unmark All, Mark All)",
      "note_ids": ["string"]
    }
    ```
  - Response: `{ "message": "Bulk action completed", "affected": "number" }`.

### Projects
- **GET /projects**: List projects for "Specific Project" category.
  - Query Params: `user_id` (string), `page`, `limit`.
  - Response: Array of Project objects: `{ "id": "string", "name": "string" }`.

### Contributors
- **GET /contributors**: List contributors for assignee dropdown.
  - Query Params: `user_id` (string), `page`, `limit`.
  - Response: Array of Contributor objects: `{ "id": "string", "name": "string", "role": "string" }`.

### Activities
- **GET /activities**: List note-related activities.
  - Query Params: `note_id` (string, optional), `user_id`, `page`, `limit`.
  - Response: Array of Activity objects:
    ```json
    [
      {
        "id": "string",
        "type": "string",
        "timestamp": "datetime",
        "description": "string",
        "user_id": "string"
      }
    ]
    ```

### URI Types
- **GET /uri-types**: Get enumeration of URI types for presentation.
  - Response:
    ```json
    {
      "types": [
        {"type": "git", "description": "Git repositories (e.g., GitHub links)"},
        {"type": "gdoc", "description": "Google Docs (e.g., shared docs)"},
        {"type": "website", "description": "General websites"},
        {"type": "blog", "description": "Blogs (e.g., updates)"},
        {"type": "x_post", "description": "X/Social Media posts"},
        {"type": "grok_chat", "description": "Grok chatlogs (e.g., grok.com)"},
        {"type": "other", "description": "Other URIs"}
      ]
    }
    ```
  - Usage: Clients use `type` to render URIs (e.g., embed X post for "x_post").

### Updates
- **WebSocket /updates**: Real-time updates for note changes.
  - Query Param: `user_id` (string).
  - Events: `{ "event": "note_updated", "data": Note object }`, `{ "event": "note_deleted", "data": { "id": "string" } }`.

## Data Models (JSON Schemas)

### Note Model
```json
{
  "id": "string",
  "title": "string",
  "description": "string (max 60 chars)",
  "category": "enum (Personal, Social, Specific Project, All Projects)",
  "status": "enum (Pending, Onhold, Inprogress, Done)",
  "priority": "enum (High, Medium, Low)",
  "due_date": "date",
  "assignee": {
    "id": "string",
    "name": "string",
    "role": "string"
  },
  "created_at": "datetime",
  "updated_at": "datetime",
  "is_important": "boolean",
  "is_trashed": "boolean",
  "project_id": "string",
  "uris": [
    {
      "uri": "string",
      "type": "enum (git, gdoc, website, blog, x_post, grok_chat, other)"
    }
  ]
}
```

### Bulk Action Model
```json
{
  "action": "enum (Delete Marked, Unmark All, Mark All)",
  "note_ids": ["string"]
}
```

### Activity Model
```json
{
  "id": "string",
  "type": "string",
  "timestamp": "datetime",
  "description": "string",
  "user_id": "string"
}
```

### URI Resource Model
```json
{
  "uri": "string",
  "type": "enum (git, gdoc, website, blog, x_post, grok_chat, other)"
}
```

## Security and Best Practices
- **Authentication**: JWT in Authorization header.
- **Authorization**: Restrict note access to `user_id` or assignees.
- **Rate Limiting**: 100 requests/min per user.
- **CORS**: Allow from dashboard domain.
- **Validation**: JSON Schema for input validation (e.g., max 60 chars for description).
- **Soft Deletes**: Notes are trashed (`is_trashed: true`) before permanent deletion.
- **Logging**: Audit note actions (create, update, delete).
- **WebSocket Security**: Validate tokens for `/updates` connections.

## Versioning and Changes
- **Version**: 1.0 (July 25, 2025).
- **Changes**: Initial release. Future updates may add more URI types or WebSocket event details.

This specification ensures the API supports the Notes page’s functionality, integrating with the Professional Productivity Dashboard for a cohesive user experience.