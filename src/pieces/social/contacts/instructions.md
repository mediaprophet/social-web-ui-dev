You are GPT-4.1, a highly capable AI model specialized in generating sophisticated web pages. Your task is to create a spectacular `relationships.html` page based on the refactoring of a provided `contacts.html` template. This page should transform the traditional CRM contacts list into a dynamic, human-centric "Relationship Graph Interface" for the social web, supporting broad relationships with people, legal entities (e.g., companies), agents, products, services, websites, and semantic bookmarks (e.g., from browser history).

### Key Requirements for the Page:
- **Overall Theme and Spectacular Elements**:
  - Make it visually stunning: Use smooth animations (e.g., fade-ins for cards, hover effects with scale and shadow), responsive design (mobile-first, with grid layouts adapting to screen size), and subtle gradients or icons for engagement.
  - Support dark mode toggle (using Tailwind's dark: prefix, with a button to switch via JS).
  - Include interactive features: A toggle between card view, table view, and graph view (using vis.js for the graph, loaded via CDN).
  - Ensure high usability: Faceted search with autocomplete, drag-and-drop for reordering cards (if possible with vanilla JS), and tooltips for details.
  - Performance: Keep it lightweight, with lazy loading for images or graphs.

- **Structure and Components**:
  - Base it on the provided `contacts.html` structure: Include breadcrumbs (e.g., Relationships / Social Web / Relationship List), export dropdown (PDF/Excel), "Add New Relationship" button, filters (enhanced with entity types like Person, Website, etc.), and a main list/table.
  - Replace the table with a hybrid view: Default to a grid of cards (using Tailwind grid-cols), toggle to table or graph.
  - Cards: Each represents an entity (e.g., person, website) with name, type, role/URL, email/phone, location, rating (stars), owner, last interaction (date), tags (chips), status (badge), agreements (list with statuses), relations (links to related entities).
  - Graph View: Use vis.js to show nodes (colored by type: e.g., blue for Person, green for Website) and edges (labeled with relation types like "VISITED" or "COLLABORATED_WITH").
  - Modals: Enhance the "Add New Contact" modal to "Add New Relationship" with tabs: Basic Information (add entity type select, URL field for websites), Address, Social Profiles, Relations (add relation type, target entity, strength, date), Agreements (name, status, date, assignee, description), Access (visibility radios).
  - Similarly, update the Edit modal.
  - Add modals for agreements (like "Add New Deal" but renamed "Add Agreement") and pipelines if relevant.
  - Footer: Keep "2014 - 2025 © Social Web Dev. Designed & Developed By Dreams".

- **Data Model and Features**:
  - Use mock data with mixed entities: e.g., people (Darlee Robertson), websites (Example Blog with URL), products.
  - Ontological Structures: Include spatio-temporal factors (e.g., location, last interaction date), relation types (e.g., FRIEND_OF, VISITED), agreement statuses (Proposed, Signed).
  - Faceted Search: Filters for type, status, time range, sort; search input for name/tags/location.
  - Semantic Bookmarks: Treat websites/products as entities with "VISITED" relations from browser history simulation.
  - Human/Entity/Agent-Centric: Privacy controls in modals, owner fields, collaborative actions (e.g., buttons to "Message" or "Add to Project").
  - Agreements: Track contracts/deals with statuses, linked to entities.

- **Styling Compatibility**:
  - This must be compatible with the Tailwind-based UI toolkit from https://smarthr.co.in/demo/tailwind/template/src/index.
  - From the toolkit's analysis:
    - Cards: bg-white shadow-md rounded-lg p-4 mb-4; dark mode: bg-gray-800 text-white.
    - Tables: w-full table-auto text-left; headers bg-gray-200, borders border p-2.
    - Buttons/Links: text-blue-500 hover:text-blue-700; primary buttons bg-blue-500 text-white rounded px-4 py-2.
    - Layout: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 for responsive sections.
    - Color Scheme: Blue accents (blue-500), white/gray backgrounds (bg-white, bg-gray-200).
    - Forms: form-control for inputs (border p-2 rounded), selects similar.
    - Modals: fixed inset-0 bg-black bg-opacity-50; content bg-white rounded p-4.
    - Use Tailwind utility classes exclusively; include <script src="https://cdn.tailwindcss.com"></script> in <head>.
    - Add dark mode: <html class="dark"> toggle via JS button.
  - Enhance with Tailwind plugins if needed (e.g., for forms, but assume standard).

- **Technical Details**:
  - Use HTML5, vanilla JS for interactions (e.g., modal toggles, view switches, graph rendering).
  - Include CDNs: Tailwind, Bootstrap (if needed for modals, but prefer Tailwind), vis.js for graph.
  - JS: Add event listeners for filters (filter data client-side), dark mode toggle, graph render.
  - Mock Data: Hardcode an array of entities in JS; filter and render dynamically.
  - Accessibility: Add ARIA labels, keyboard navigation.
  - Output: Generate the full HTML file as a code block, ready to save as relationships.html.

- **Provided Original contacts.html**:
  [Insert the full <DOCUMENT> content from the user's message here, as the base template to refactor.]

Refactor creatively but stay true to the template's structure. Make it spectacular by adding flair like animated progress for ratings or interactive relation maps. Ensure the page is self-contained and runs in a browser.