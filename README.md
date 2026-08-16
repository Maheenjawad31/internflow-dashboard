# InternFlow Dashboard

**Live Demo:** https://internflow-dashboard.vercel.app/

A lightweight web dashboard for managing interns, groups, and weekly task progress.

## Overview

InternFlow is a prototype team management dashboard designed to replace manual spreadsheet tracking with a simple web interface.

Team leads can view groups, members, and tasks, search and filter records, update task statuses, and monitor progress from one place.

## Features

- Dashboard overview

- Groups view

- Members directory

- Tasks management

- Member search

- Domain filtering

- Group filtering

- Task status filtering

- Change task status

- Task status persistence using localStorage

- Member details popup

- Group task completion progress

- Responsive desktop and mobile layout

## Tech Stack

- HTML5

- CSS3

- JavaScript ES Modules

- JavaScript data model

- Browser localStorage

- Git and GitHub

## Project Structure

internflow-dashboard/

- index.html

- [README.md](http://README.md)

- .gitignore

- css/style.css

- js/app.js

- js/data.js

- js/ui.js

## Data Model

The dashboard uses three main data collections.

### Groups

- ID

- Name

- Domain

- Description

### Interns

- ID

- Name

- Email

- Domain

- Group ID

### Tasks

- ID

- Title

- Week

- Group ID

- Status

Task statuses:

- Pending

- In Progress

- Complete

## How to Run

### Requirements

- Node.js

- Modern web browser

- Cursor or VS Code

### Steps

1. Clone or download the repository.

2. Open the project in Cursor or VS Code.

3. Open the project folder in a terminal.

4. Start a local server.

5. Open the local URL in your browser.

Example command:

npx serve .

## Screenshots

Screenshots will be added after final UI testing.

Recommended screenshots:

- Dashboard overview

- Groups view

- Members search and filtering

- Tasks and status management

- Member details popup

## Future Improvements

- Team lead authentication

- Firebase or SQLite database

- Live deployment

- Completion charts

- Weekly task history

- Individual intern progress

- Group performance analytics

## Project Status

Completed — Week 2 Internship Prototype.

The dashboard currently supports group, member, and task management functionality.

## Author

InternFlow Dashboard — Internship Project

