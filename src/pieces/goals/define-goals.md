# Requirements and Design Outline for `define-goals.html`

## Overview
The `define-goals.html` page is a dedicated interface for digital nomads to define and create personal and professional goals within the productivity dashboard application. It builds on the refactored "Goal Categories" page (`goals.html`) and "Goal Tracking" page (`goal-tracking.html`), emphasizing human-centric, flexible goal-setting in a decentralized, remote work environment. The page should integrate project management principles (e.g., dependencies, requirements, barriers, and tasks) to make goals actionable and aligned with ongoing projects, notes, and productivity metrics from the dashboard (`productivity.html`).

This page focuses on goal creation (defining new goals), while linking to tracking and categories for a cohesive experience. It uses Tailwind CSS for styling to match the SmartHR template, ensuring responsiveness and a clean, modern UI.

## Key Objectives
- **User-Centric Design**: Allow users (e.g., "Tim") to easily define goals that support personal growth, professional development, and project success, with minimal friction.
- **Integration with Dashboard**: Link goals to existing elements like projects (e.g., PRO-001 from `productivity.html`), notes (from `notes.html`), contributors, and productivity statuses (Engaged, Barrier, Recharging, Dormant).
- **Project Management Principles**:
  - **Dependencies**: Specify prerequisites (e.g., completing a task or note).
  - **Requirements**: List needed resources/skills (e.g., "React expertise" or "Online course access").
  - **Barriers**: Identify potential obstacles (e.g., "Time constraints") with optional mitigation notes.
  - **Tasks**: Automatically generate or link to actionable tasks for goal achievement, integrable with the dashboard's Task Statistics.
- **Flexibility for Digital Nomads**: Support asynchronous, location-independent work with fields for availability impacts (e.g., linking to "Notify Leave" modal) and external URIs (with types: git, gdoc, website, blog, x_post, grok_chat, other).
- **Consistency**: Use terminology from previous refactors (e.g., Goal Categories: Personal Growth, Professional Development; Contributors: Dedicated, Occasional, Newbie, Specialist).

## Page Structure
The page should follow a simple, intuitive layout:
1. **Header**: Title "Define Goals" with breadcrumb navigation (e.g., / Performance / Define Goals).
2. **Export Button**: Retain export options (PDF, Excel) for goal data.
3. **Add Goal Button**: Prominent button to open the "Add Goal" modal.
4. **Goal Definition Form/Modal**: Primary content for defining goals (see Modals section).
5. **Preview/Confirmation Section**: After submission, display a summary of the defined goal with options to edit or track.
6. **Footer**: "2014 - 2025 © ProductivityHub. Designed & Developed By xAI".

### Main Content
- **Form Layout**: Use a grid-based form (Tailwind `grid grid-cols-1 md:grid-cols-12 gap-y-4 gap-x-6`) for responsiveness.
- **Fields**:
  - **Goal Category**: Dropdown populated from `goals.html` categories (e.g., Personal Growth, Professional Development).
  - **Goal Name**: Text input (e.g., "Learn Advanced React").
  - **Objective**: Textarea for measurable outcome (e.g., "Complete React certification course").
  - **Start Date/End Date**: Date pickers (using flatpickr, as in modals).
  - **Description**: Textarea for details.
  - **Dependencies**: Multi-select or text input for linking to tasks/projects/notes (e.g., "Task ID T001, Project PRO-003").
  - **Requirements**: Text input or list for skills/resources (e.g., "React expertise, 10 hrs/week").
  - **Barriers**: Text input or list for obstacles (e.g., "Time constraints").
  - **Linked Tasks**: Checkbox or button to generate tasks (e.g., "Create subtasks in Task Statistics").
  - **Linked Resources**: Input for URI with type dropdown (e.g., URI: "https://reactjs.org", Type: "website").
  - **Assignee**: Dropdown of Contributors (e.g., Daniel Esbella).
  - **Status**: Dropdown (Active, Inactive).
  - **Progress**: Initial value (default 0%), with optional progress bar preview.
- **Submission**: "Define Goal" button submits the form, potentially via API to create the goal and generate tasks.

### Modals
- **Add Goal Modal**: Triggered by "Add Goal" button. Includes all form fields above. Buttons: Cancel, Define Goal.
- **Edit Goal Modal**: (If needed for immediate edits) Pre-filled form. Buttons: Cancel, Save Changes.
- **Confirm Delete**: Retained for any goal deletion, with message: "You want to delete this goal? This can't be undone."
- **Goal Confirmation Modal**: After submission, show a summary: "Goal Defined Successfully" with details and links to track in `goal-tracking.html`.

### UI/UX Considerations
- **Responsiveness**: Use Tailwind classes for mobile-friendly layout (e.g., `overflow-x-auto` for tables if previews are tabular).
- **Visuals**: Add progress bar previews (Tailwind CSS) and icons for URI types (e.g., Git icon for "git").
- **Validation**: Client-side checks (e.g., required fields, date validation) with error messages.
- **Accessibility**: ARIA labels for modals, keyboard navigation.
- **Real-Time Features**: WebSocket integration for updates (e.g., if a dependency completes, auto-update goal progress).

### Integration with Other Pages
- **Goals.html**: Pull Goal Categories for the dropdown.
- **Goal-Tracking.html**: After defining a goal, redirect or link to tracking page for monitoring progress.
- **Productivity.html**: Link goals to projects/tasks (e.g., auto-add tasks to Task Statistics) and update metrics (e.g., "Goals Achieved" as a new metric).
- **Notes.html**: Allow linking notes as dependencies or requirements (e.g., "Note ID N001: Research goal").
- **API Support**: Extend the dashboard API:
  - `POST /goals`: Create goal with dependencies, requirements, barriers, URIs.
  - `GET /goals/categories`: Fetch categories from `goals.html`.
  - `GET /projects` and `/tasks`: For dependency selectors.
  - `GET /uri-types`: For resource type dropdown.

### Potential Enhancements
- **Goal Templates**: Pre-filled forms based on categories (e.g., Professional Development auto-adds "Certification" objective).
- **Barrier Mitigation**: Auto-suggest solutions (e.g., "Find Contributor" for skill barriers, linking to dashboard).
- **Progress Automation**: Integrate with task completion to update goal progress dynamically.
- **Export**: Generate PDF/Excel with goal details, dependencies, and progress charts.

### Risks and Mitigations
- **Complexity**: If form is too long, split into steps (e.g., basic info, then dependencies).
- **Data Overload**: Limit dependencies/requirements to 5-10 items max for default view, then use faceted search to enable more detailed information.
- **Consistency**: Ensure URI types match dashboard (git, gdoc, etc.) for seamless integration.

This outline provides a solid foundation for the `define-goals.html` page. Next, I can generate the HTML code or refine based on feedback.