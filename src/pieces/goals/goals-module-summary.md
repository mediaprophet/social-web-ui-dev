# Goals Module Summary and API Requirements

## Overview
The Goals Module is a core component of a human-centric social web application designed to help users manage personal, professional, work, and project-related goals. Built with the SmartHR Bootstrap 5 template, it supports multiple goal-structuring frameworks, including Maslow's hierarchy of needs, SMART, OKR, Self-Determination Theory (SDT), GROW, PERMA, Wheel of Life, Schwartz’s Values, and Time-Based Framework, ensuring alignment with diverse user motivations and priorities. The module facilitates task discovery, project collaboration, and AI-driven prioritization, leveraging semantic web principles and decentralized protocols. It comprises HTML pages (`goals.html`, `personal-goals.html`, `work-goals.html`, `project-goals.html`) and ontologies (`goals.ttl`, `project-goals.ttl`, plus model-specific ontologies) to structure data. This document outlines the module’s functionality and API requirements for backend integration.

## Module Components

### 1. Dashboard (`goals.html`)
- **Purpose**: Provides a unified overview of all goals across personal, professional, work, and project categories, with flexible categorization by multiple frameworks (Maslow, SMART, OKR, etc.).
- **Features**:
  - Metrics cards for total, personal, work, and project goals with progress stats (e.g., "155/200 +5.0%"), filterable by framework (e.g., SMART’s Measurable progress, OKR Key Results).
  - Goals breakdown by framework-selected categories (e.g., Maslow levels, Wheel of Life areas, SDT motivation types) with progress bars or radar charts (e.g., for Wheel of Life).
  - Top goal highlight across all categories, showing framework-specific attributes (e.g., SMART Specificity, PERMA Well-Being Focus).
  - Tracking overview with status breakdowns (Active, Completed, Overdue, On Hold) and recent goals from all frameworks.
  - Table listing all goals with columns for ID, Name, Category (e.g., Maslow, PERMA), Type, Priority, Progress, Deadline, and Project.
  - Task discovery panel for open-source, freelance, community, and civics initiatives, aligned with framework goals (e.g., Benevolence tasks for Schwartz).
  - AI suggestion banner for prioritizing goals/tasks, tailored to the selected framework (e.g., “Focus on Competence goal” for SDT).
  - Navigation to `personal-goals.html`, `work-goals.html`, `project-goals.html`, and `goal-tracking.html`.
  - Modal for adding new goals with fields supporting multiple frameworks (e.g., Maslow Category, SMART Specificity, OKR Key Results).

### 2. Personal Goals (`personal-goals.html`)
- **Purpose**: Manages individual goals related to health, welfare, and self-improvement, using frameworks like SDT, PERMA, or Wheel of Life for personal motivation.
- **Features**:
  - Metrics for goals categorized by framework (e.g., Physiological/Safety for Maslow, Positive Emotion for PERMA, Health for Wheel of Life).
  - Goals breakdown by selected framework with progress bars or visual charts (e.g., radar for Wheel of Life).
  - Top personal goal and tracking overview, highlighting framework-specific attributes (e.g., Autonomy for SDT).
  - Table with personal goals (e.g., "Learn Python", "Save for Rent") and framework-specific fields (e.g., Satisfaction Score for Wheel of Life).
  - Task discovery for personal and community tasks, matched to framework (e.g., Meaning tasks for PERMA).
  - Modals for adding/editing goal types and goals, with framework-specific fields (e.g., Reality/Options for GROW).
  - Delete modal for goal types.

### 3. Work Goals (`work-goals.html`)
- **Purpose**: Focuses on professional and project-related goals within a work context, leveraging SMART or OKR for measurable outcomes.
- **Features**:
  - Metrics for Professional Goals, Community/Civics Projects, and Project Milestones, with framework-specific filters (e.g., SMART Achievability, OKR Key Results).
  - Goals by project (e.g., PRO-001, PRO-002) with progress bars, adaptable to frameworks like GROW (Will Actions).
  - Top work goal and tracking overview, showing framework attributes (e.g., Measurable Criterion for SMART).
  - Table with work goals, including Project and Milestone columns, plus framework-specific columns (e.g., Key Result Progress for OKR).
  - Task discovery for work-related projects, aligned with frameworks (e.g., Achievement for Schwartz).
  - Modals for adding/editing work goal types and goals, with fields like Linked Project and Outcome, plus framework-specific fields (e.g., Will Actions for GROW).

### 4. Project Goals (`project-goals.html`)
- **Purpose**: Manages goals for structured projects, including community and civics initiatives, using OKR or GROW for project alignment.
- **Features**:
  - Metrics for Project Goals, Milestones, Outcomes, and Impacts, with framework filters (e.g., OKR Key Results, Time-Based Horizon).
  - Goals by project type (Community, Civics, Professional) with progress bars, adaptable to frameworks like Schwartz (Universalism).
  - Top project goal and tracking overview, with framework attributes (e.g., Outcome for GROW).
  - Table with project goals, including Milestone, Outcome, and Impact columns, plus framework-specific columns (e.g., Core Value for Schwartz).
  - Task discovery for project initiatives, matched to framework (e.g., Engagement tasks for PERMA).
  - Modals for adding/editing project goal types and goals, with fields like Impact and Resource Requirements, plus framework-specific fields (e.g., Options for GROW).

### 5. Ontologies
- **Goals Ontology (`goals.ttl`)**:
  - Defines `Goal`, `PersonalGoal`, `ProfessionalGoal`, `SocioeconomicGoal`, `HumanitarianGoal`, `Task`, `Project`, `Collaboration`, `Priority`, `Dependency`, and Maslow need levels (`maslow:NeedLevel`).
  - Properties: `hasTitle`, `hasDescription`, `achievesNeed`, `hasPriority`, `dependsOn`, `hasTask`, `partOfProject`, `involvesCollaboration`, `hasProgress`, `hasDeadline`.
- **Project Goals Ontology (`project-goals.ttl`)**:
  - Extends with `ProjectGoal`, `CommunityProject`, `CivicsProject`, `Milestone`, `Outcome`, `ResourceRequirement`, `Impact`.
  - Properties: `hasProjectGoal`, `achievesMilestone`, `hasOutcome`, `requiresResource`, `measuresImpact`, `isCommunityOriented`, `isCivicsOriented`, `hasStakeholder`.
- **SMART Goals Ontology (`smart-goals.ttl`)**:
  - Defines `SMARTGoal` with properties: `hasSpecificity`, `hasMeasurableCriterion`, `isAchievable`, `hasRelevance`, `hasTimeBound`.
- **OKR Goals Ontology (`okr-goals.ttl`)**:
  - Defines `OKRGoal` and `KeyResult` with properties: `hasObjective`, `hasKeyResult`, `keyResultDescription`, `keyResultProgress`.
- **SDT Goals Ontology (`sdt-goals.ttl`)**:
  - Defines `SDTGoal` and `MotivationType` (Autonomy, Competence, Relatedness) with property: `hasMotivationType`.
- **GROW Goals Ontology (`grow-goals.ttl`)**:
  - Defines `GROWGoal`, `Option`, and `WillAction` with properties: `hasReality`, `hasOption`, `optionDescription`, `hasWillAction`, `willActionDescription`.
- **PERMA Goals Ontology (`perma-goals.ttl`)**:
  - Defines `PERMAGoal` and `WellBeingFocus` (Positive Emotion, Engagement, Relationships, Meaning, Accomplishment) with property: `hasWellBeingFocus`.
- **Wheel of Life Goals Ontology (`wheeloflife-goals.ttl`)**:
  - Defines `WheelGoal` and `LifeArea` (Career, Health, Relationships, Finances, Personal Growth) with properties: `hasLifeArea`, `hasSatisfactionScore`.
- **Schwartz Values Goals Ontology (`schwartz-goals.ttl`)**:
  - Defines `SchwartzGoal` and `Value` (Achievement, Benevolence, Security, Self-Direction, Universalism) with property: `hasCoreValue`.
- **Time-Based Goals Ontology (`timebased-goals.ttl`)**:
  - Defines `TimeBasedGoal` and `TimeHorizon` (Short-Term, Mid-Term, Long-Term) with property: `hasTimeHorizon`.

## API Requirements

### 1. General Requirements
- **Protocol**: RESTful API over HTTPS, JSON format for requests/responses, with optional RDF/Turtle serialization for ontology support.
- **Authentication**: OAuth 2.0 or JWT for user authorization, ensuring secure access to user-specific goals.
- **Content Type**: `application/json` (default), `text/turtle` for ontology queries.
- **Error Handling**: Standard HTTP status codes (e.g., 200 OK, 400 Bad Request, 401 Unauthorized) with JSON error messages (e.g., `{"error": "Invalid input"}`).
- **Pagination**: Support `limit` and `offset` query parameters for large goal/task lists (e.g., `/goals?limit=10&offset=20`).
- **CORS**: Enable cross-origin resource sharing for frontend integration.
- **Framework Support**: Allow filtering and structuring goals by framework (Maslow, SMART, OKR, etc.) via query parameters or headers.

### 2. Endpoints

#### **Goals Management**
- **GET /goals**
  - **Description**: Retrieve a list of all user goals across frameworks.
  - **Query Parameters**:
    - `framework` (optional): Filter by framework (e.g., "Maslow", "SMART", "OKR", "SDT", "GROW", "PERMA", "WheelOfLife", "Schwartz", "TimeBased").
    - `category` (optional): Filter by framework-specific category (e.g., "Safety" for Maslow, "Competence" for SDT, "Health" for Wheel of Life).
    - `type` (optional): Filter by goal type (e.g., "Personal", "CommunityProject").
    - `project` (optional): Filter by project ID (e.g., "PRO-001").
    - `status` (optional): Filter by status (e.g., "Active", "Completed").
    - `limit`, `offset` (optional): Pagination.
  - **Response** (200 OK):
    ```json
    {
      "goals": [
        {
          "id": "GL-001",
          "name": "Learn Python",
          "framework": "Maslow",
          "category": "Self-Actualization",
          "type": "Professional",
          "priority": "High",
          "progress": 85,
          "deadline": "2025-10-10T00:00:00Z",
          "project": "PRO-003",
          "description": "Complete Python course",
          "status": "Active",
          "assignee": "Daniel Esbella",
          "dependencies": ["Complete PRO-003 task"],
          "frameworkAttributes": {
            "maslowLevel": "Self-Actualization"
          }
        },
        {
          "id": "GL-002",
          "name": "Run Marathon",
          "framework": "GROW",
          "category": null,
          "type": "Personal",
          "priority": "Medium",
          "progress": 50,
          "deadline": "2026-06-30T00:00:00Z",
          "project": null,
          "description": "Train for marathon",
          "status": "Active",
          "assignee": null,
          "dependencies": [],
          "frameworkAttributes": {
            "reality": "Run 5km weekly",
            "options": ["Join running club", "Hire coach"],
            "willActions": ["Train 4 days/week"]
          }
        }
      ],
      "total": 155,
      "limit": 10,
      "offset": 0
    }
    ```
  - **Error** (400 Bad Request):
    ```json
    {"error": "Invalid framework or category"}
    ```

- **GET /goals/:id**
  - **Description**: Retrieve details of a specific goal, including framework-specific attributes.
  - **Response** (200 OK):
    ```json
    {
      "id": "PG-001",
      "name": "Secure Funding",
      "framework": "OKR",
      "category": null,
      "type": "CommunityProject",
      "priority": "High",
      "progress": 65,
      "deadline": "2025-09-25T00:00:00Z",
      "project": "PRO-002",
      "description": "Raise $5000",
      "status": "Active",
      "assignee": null,
      "dependencies": ["Stakeholder approval"],
      "frameworkAttributes": {
        "objective": "Fund community project",
        "keyResults": [
          {"id": "KR-001", "description": "Raise $5000", "progress": 65}
        ]
      }
    }
    ```
  - **Error** (404 Not Found):
    ```json
    {"error": "Goal not found"}
    ```

- **POST /goals**
  - **Description**: Create a new goal with framework-specific attributes.
  - **Request Body**:
    ```json
    {
      "name": "Learn Advanced React",
      "framework": "SMART",
      "category": null,
      "type": "Professional",
      "priority": "High",
      "deadline": "2025-12-31T00:00:00Z",
      "project": "PRO-003",
      "description": "Complete React certification",
      "status": "Active",
      "assignee": "Daniel Esbella",
      "dependencies": ["Complete PRO-003 UI task"],
      "frameworkAttributes": {
        "specificity": "Complete React course",
        "measurableCriterion": "Pass certification exam",
        "isAchievable": true,
        "relevance": "Career advancement",
        "timeBound": "2025-12-31T00:00:00Z"
      }
    }
    ```
  - **Response** (201 Created):
    ```json
    {
      "id": "GL-004",
      "name": "Learn Advanced React",
      ...
    }
    ```
  - **Error** (400 Bad Request):
    ```json
    {"error": "Missing required field: name"}
    ```

- **PUT /goals/:id**
  - **Description**: Update an existing goal, including framework attributes (e.g., `{"frameworkAttributes": {"progress": 90}}` for OKR Key Results).
  - **Response** (200 OK): Updated goal object.
  - **Error** (404 Not Found): `{"error": "Goal not found"}`.

- **DELETE /goals/:id**
  - **Description**: Delete a goal.
  - **Response** (204 No Content): Empty response.
  - **Error** (404 Not Found): `{"error": "Goal not found"}`.

#### **Goal Types Management**
- **GET /goal-types**
  - **Description**: Retrieve available goal types across frameworks with their attributes.
  - **Response** (200 OK):
    ```json
    {
      "goalTypes": [
        {
          "type": "Personal",
          "framework": "Maslow",
          "maslowLevel": "Safety",
          "description": "Goals for individual well-being",
          "status": "Active"
        },
        {
          "type": "CommunityProject",
          "framework": "Schwartz",
          "coreValue": "Universalism",
          "description": "Goals for community initiatives",
          "status": "Active"
        },
        ...
      ]
    }
    ```

- **POST /goal-types**
  - **Description**: Create a new goal type with framework-specific attributes.
  - **Request Body**:
    ```json
    {
      "type": "CompetenceGoal",
      "framework": "SDT",
      "motivationType": "Competence",
      "description": "Goals for skill mastery",
      "status": "Active"
    }
    ```
  - **Response** (201 Created): Created goal type object.

- **PUT /goal-types/:type**
  - **Description**: Update a goal type (e.g., description, framework attributes).
  - **Response** (200 OK): Updated goal type object.

- **DELETE /goal-types/:type**
  - **Description**: Delete a goal type (with validation to prevent deleting types with associated goals).
  - **Response** (204 No Content): Empty response.

#### **Task/Project Discovery**
- **GET /tasks/discovery**
  - **Description**: Fetch suggested tasks/projects aligned with user goals and frameworks.
  - **Query Parameters**:
    - `userId` (optional): Personalize suggestions.
    - `framework` (optional): Filter by framework (e.g., "PERMA" for Meaning tasks).
    - `type` (optional): Filter by task type (e.g., "OpenSource", "Community").
  - **Response** (200 OK):
    ```json
    {
      "tasks": [
        {
          "id": "TASK-001",
          "title": "Contribute to Sustainable App",
          "type": "OpenSource",
          "description": "Join open-source project",
          "project": "PRO-005",
          "skills": ["Python", "React"],
          "source": "GitHub",
          "frameworkMatch": {
            "framework": "Schwartz",
            "coreValue": "Universalism"
          }
        },
        ...
      ]
    }
    ```

#### **AI Suggestions**
- **GET /suggestions**
  - **Description**: Retrieve AI-driven suggestions for goal/task prioritization across frameworks.
  - **Query Parameters**:
    - `userId` (required): User context.
    - `framework` (optional): Filter by framework (e.g., "OKR").
  - **Response** (200 OK):
    ```json
    {
      "suggestions": [
        {
          "text": "Prioritize 'Learn Python' with key result completion",
          "goalId": "GL-001",
          "framework": "OKR",
          "priority": "High",
          "frameworkAttributes": {
            "keyResult": "Complete 3 projects"
          }
        },
        {
          "text": "Focus on Health goal to improve satisfaction",
          "goalId": "GL-002",
          "framework": "WheelOfLife",
          "priority": "Medium",
          "frameworkAttributes": {
            "lifeArea": "Health",
            "satisfactionScore": 6
          }
        }
      ]
    }
    ```

#### **Projects**
- **GET /projects**
  - **Description**: Retrieve projects associated with goals, including framework-specific attributes.
  - **Response** (200 OK):
    ```json
    {
      "projects": [
        {
          "id": "PRO-001",
          "name": "Office Management App",
          "type": "Professional",
          "goals": ["WG-001", "PG-003"],
          "milestones": ["UI Milestone"],
          "status": "Active",
          "frameworkAttributes": {
            "framework": "OKR",
            "objective": "Deliver functional app"
          }
        },
        ...
      ]
    }
    ```

- **GET /projects/:id**
  - **Description**: Retrieve project details, including associated goals and framework attributes.
  - **Response** (200 OK): Detailed project object.

### 3. Data Models
- **Goal**:
  ```json
  {
    "id": string,
    "name": string,
    "framework": string (Maslow, SMART, OKR, SDT, GROW, PERMA, WheelOfLife, Schwartz, TimeBased),
    "category": string (optional, framework-specific, e.g., "Safety", "Competence"),
    "type": string (Personal, Professional, etc.),
    "priority": string (Low, Medium, High),
    "progress": integer (0-100),
    "deadline": string (ISO-8601),
    "project": string (optional),
    "description": string,
    "status": string (Active, Inactive, Completed, etc.),
    "assignee": string (optional),
    "dependencies": string[] (optional),
    "frameworkAttributes": {
      "maslowLevel": string (optional),
      "specificity": string (SMART, optional),
      "measurableCriterion": string (SMART, optional),
      "isAchievable": boolean (SMART, optional),
      "relevance": string (SMART, optional),
      "timeBound": string (SMART, optional),
      "objective": string (OKR, optional),
      "keyResults": [{id: string, description: string, progress: integer}] (OKR, optional),
      "motivationType": string (SDT, optional),
      "reality": string (GROW, optional),
      "options": string[] (GROW, optional),
      "willActions": string[] (GROW, optional),
      "wellBeingFocus": string (PERMA, optional),
      "lifeArea": string (WheelOfLife, optional),
      "satisfactionScore": integer (WheelOfLife, optional),
      "coreValue": string (Schwartz, optional),
      "timeHorizon": string (TimeBased, optional)
    }
  }
  ```
- **Goal Type**:
  ```json
  {
    "type": string,
    "framework": string,
    "frameworkAttributes": {
      "maslowLevel": string (optional),
      "motivationType": string (optional),
      "wellBeingFocus": string (optional),
      ...
    },
    "description": string,
    "status": string
  }
  ```
- **Task**:
  ```json
  {
    "id": string,
    "title": string,
    "type": string,
    "description": string,
    "project": string (optional),
    "skills": string[],
    "source": string,
    "frameworkMatch": {
      "framework": string,
      "category": string (optional)
    }
  }
  ```
- **Project**:
  ```json
  {
    "id": string,
    "name": string,
    "type": string (CommunityProject, CivicsProject, Professional),
    "goals": string[],
    "milestones": string[],
    "status": string,
    "frameworkAttributes": {
      "framework": string,
      ...
    }
  }
  ```

### 4. Integration Considerations
- **Semantic Web Support**: API must support RDF/Turtle serialization for all ontologies via content negotiation (e.g., `Accept: text/turtle`). SPARQL queries should enable cross-framework analysis.
- **Decentralized Protocols**: Task discovery endpoint should integrate with external platforms (e.g., GitHub, Upwork) using APIs or scraping, respecting rate limits.
- **AI Integration**: Suggestions endpoint requires integration with an AI model (e.g., via xAI’s API at https://x.ai/api) to analyze goals across frameworks and prioritize tasks.
- **Real-Time Updates**: Support WebSocket or Server-Sent Events for real-time updates (e.g., progress changes in OKR Key Results).
- **Scalability**: Use caching (e.g., Redis) for `/goals` and `/tasks/discovery` endpoints.
- **Privacy**: Ensure GDPR compliance for user data, with consent for AI processing and framework-specific data (e.g., satisfaction scores).

### 5. Future Enhancements
- **Framework Selection**: Allow users to choose a preferred framework in the UI, dynamically updating modals and dashboards.
- **Goal Dependency Graph**: API endpoint to visualize dependencies (`goals:dependsOn`) as a graph, supporting all frameworks.
- **Collaboration API**: Endpoints for managing collaborations (`goals:involvesCollaboration`), with framework-specific team alignment.
- **Analytics**: Endpoint for framework-specific analytics (e.g., completion rates by Wheel of Life area or OKR Key Results).
- **Mobile Support**: Optimize API responses for mobile apps with reduced payloads.

## Conclusion
The Goals Module, enhanced with multiple goal-structuring frameworks (Maslow, SMART, OKR, SDT, GROW, PERMA, Wheel of Life, Schwartz, Time-Based), provides a flexible, human-centric system for managing diverse goals. The updated API requirements support these frameworks, enabling semantic interoperability, personalized prioritization, and seamless integration with the SmartHR template’s dashboard-driven design.