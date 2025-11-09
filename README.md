It is a full-stack Subject attendance tracker for students. Users register/login (JWT), add subjects (theory/lab), track attended vs total classes, set a target percentage, and get guidance like “attend next class” or “can miss 1 class.” A routine module stores daily schedules and optional notification times, a to-do module manages tasks. The stack is MERN (MongoDB, Express, React, Node) with a clean API, optimistic UI updates, and dark/light theming. I focused on robustness (authentication, validation, error handling), a responsive UI, and a data model that facilitates easy analytics later.

1. A MERN web app for students to track attendance by subject (theory/lab), with live guidance like “attend next N” or “can miss N.”

2. Features: add/rename/delete subjects, mark present/absent, set target %, routine with “Today: HH:MM” and timetable image, plus a simple To-Do list.

3. Frontend: React + Vite + TypeScript; swipe-to-delete, progress ring, pill tabs, Axios with JWT interceptor, dark/light theme.

4. Backend: Node/Express + MongoDB; JWT auth; REST routes for auth, subjects, routines, tasks; denormalized counts for fast reads.

5. Built for clarity and reliability (loading/disabled states, errors surfaced); easy to scale (Atlas, S3, workers) and extend (alerts, analytics, unique indexes).
