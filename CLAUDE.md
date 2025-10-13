# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React application designed to assist AI testers in crafting and managing justifications for comparative evaluations of AI responses. The application supports two main evaluation workflows:

1. **Dimension-based evaluation (DNG/DMG)**: Rate two responses across multiple dimensions (e.g., Instruction Following, Factuality, Language Fluency) with detailed justifications
2. **Rubric-based evaluation (RUB)**: Evaluate responses against custom rubric criteria with score assignments

## Commands

### Development Commands
```bash
npm start          # Run development server on http://localhost:3000
npm test           # Run tests in watch mode
npm run build      # Build production bundle
```

### Key Features
- Voice input for comments via Web Speech API
- Text formatting and editing with keyboard shortcuts
- Comment history with export functionality
- Excel file import (.xls) for batch instruction loading
- LocalStorage-based persistence for tasks and settings

## Architecture

### Core Application Structure

**Authentication Flow**:
- App.js (src/App.js:1) handles authentication via MD5 hash stored in localStorage
- Uses key `siteAccessHash` with hardcoded hash values
- On successful auth, renders `<AppRouter />` wrapped in `<PopupContext.Provider>`

**Routing**:
- Three main pages defined in src/router/routes.js:
  - `/main` - MainPage: Simple justification writing with templates
  - `/rub` - RubricPage: Rubric-based evaluation workflow
  - `/dmg` - DmgPage: Dimension-based evaluation workflow

**State Management**:
- No Redux or external state management
- Uses React Context for popup notifications (PopupContext in src/context)
- Heavy reliance on localStorage for persistence via src/utils/localStorage.js

### Key Utility Modules

**localStorage.js** (src/utils/localStorage.js):
- Central persistence layer for all app data
- Key functions: `toLS()`, `fromLS()`, `saveToHistory()`, `saveToArchItems()`
- Manages: comment history, dimension sets, text templates, hot buttons, archived items
- Uses JSON serialization for complex objects

**rubricsFn.js** (src/utils/rubricsFn.js):
- Creates `fieldFn` object returned by `createFieldFn()` - a comprehensive API for rubric manipulation
- Handles: rubric CRUD operations, field value management, keyboard shortcuts, rubric import from text
- Uses `defaultRubricator` structure from textParts.js

**dimentions.js** (src/utils/dimentions.js):
- Returns action button configurations via `getActionButtons()`
- Buttons trigger different justification composition strategies from rates.js

**rates.js** (src/utils/rates.js):
- Core justification generation logic
- Key functions:
  - `composeRateBothByDim()`: Generates side-by-side dimension comparison
  - `composeRateByScores()`: Groups dimensions by which response is better
  - `justificationByScores()`: Creates detailed justification with examples
  - `composeRateBothSimple()`: Quick summary format
- All functions accept `action` parameter to apply text transformations via `applyAction()`

**utilStr.js** (src/utils/utilStr.js):
- Text manipulation utilities
- `applyAction()`: Applies response formatting actions (e.g., "@R" -> "Response A/B")
- `baseRespName`: Defines available response format templates

### Dimension Sets System

**textParts.js** (src/constants/textParts.js):
- Defines `defaultDimSets` object with evaluation dimension configurations
- Two main sets: `set1` (6 dimensions) and `set2` (6 dimensions with different focus)
- Each dimension has: `id`, `a`/`b` field names, `name`, `short`, `better` description, optional `worth`, optional `justif` templates
- `constructDefItem(setName)`: Dynamically builds default item structure for a given set
- Also contains default structures: `defaultRubJust`, `defaultRubricator`, `defaultDimTempl`

### Component Organization

**Page Components**:
- MainPage, RubricPage, DmgPage are top-level page components
- Each has corresponding "PageBody" component handling main content
- Use consistent pattern: state in page, `fieldFn` creation for field operations, action management

**Edit Components** (src/components/EditBtns/):
- Reusable editing controls: format buttons, font size, text replacement
- `StrAreaEdit.jsx`: Main textarea component with voice input support
- `TopBtns.jsx`, `TopBtnsEnd.jsx`: Toolbar button groups

**Dimension Components** (src/components/Dimentions/):
- `DimSetsList.jsx`: Dimension set selector
- `ResponseFormatList.jsx`: Response format (@R, etc.) selector
- `EditOneDmg.jsx`, `EditFieldDmg.jsx`: Field editors for dimension evaluation

### Voice Input System

**voice.js** (src/utils/voice.js):
- Uses Web Speech API (SpeechRecognition)
- `startV()`: Starts continuous speech recognition
- `stopV()`: Stops recognition and triggers onChange callback
- Handles both mobile and desktop browser differences
- Language configurable via `lang` parameter (default: "en-US")

### Excel Import System

**readXls.js** (src/utils/readXls.js):
- `readXlsFile()`: Imports multi-sheet Excel files into template structure
- Expected format: Columns [text, comment, label] + [label, description]
- `rubEx()`: Exports rubric data to Excel format

### Text Processing

**replacements.js** (src/constants/replacements.js):
- Defines `hotbtnsArrDef` for quick text replacements
- Grammar and localization auto-replacement arrays

**analysis.js** (src/utils/analysis.js):
- `summariseRub()`: Generates summary text for rubric evaluations

## Development Guidelines

### Working with Dimensions
- Always use `defaultDimSets[setName]` to access dimension configuration
- Use `constructDefItem(setName)` to create new item structures
- Dimension field names follow pattern: `{DimensionId}_{A|B}` (e.g., `Instructions_A`)
- Eval scores stored separately in `item.Evals[fieldName]` (0-5 scale)

### Working with Rubrics
- Use `createFieldFn()` to get rubric manipulation API
- Rubrics stored in `item.rubricator` array
- Each rubric follows `defaultRubricator` structure
- Field IDs use format: `fieldName-index` for rubric fields

### localStorage Keys
- `justset`: Current dimension set name
- `History`: Array of historical justifications
- `items`: Archived tasks
- `txtTmp`: Custom text templates
- `txtHotRepl`: Custom hot button replacements
- `lastAction`: Last selected response format action
- `backgr`: Background image selection
- `siteAccessHash`: Authentication hash

### Keyboard Shortcuts
- F4: Apply current action to field
- F2: Apply "englBaseComm" action
- Ctrl+B: Apply "getFragment" action
- Shortcuts handled in `defaultKey()` function (src/utils/defaultKey.js)

### Response Format Actions
- Actions defined in `baseRespName` object (src/utils/utilStr.js)
- Applied via `applyAction(text, action)` function
- Examples: "@R" (Response A/B), "@Rn" (Response 1/2), etc.

## Important Patterns

### Field Value Management
Components use a standardized pattern for field editing:
1. `fieldFn.getFieldValue(fieldId)` - retrieves current value
2. `fieldFn.setNewVal(value, fieldId)` - updates value
3. `fieldFn.onFocus(ref)` - handles focus with auto-save of previous field
4. `fieldFn.onKeyDown(e)` - handles keyboard shortcuts

### History and Archive
- History: Auto-saved on task completion via `saveToHistorygeneral()`
- Archive: Manual save via `saveToArchItems()` with autosave support
- Both systems check for duplicates and update existing entries

### Popup Notifications
- Use `setPopupSettings` from PopupContext
- Called via `setPopup` function passed through props
- Used for user feedback on save operations, errors, etc.
