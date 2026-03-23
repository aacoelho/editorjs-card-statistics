# Card Image Tool for Editor.js

Provides Card Image blocks for the [Editor.js](https://editorjs.io/).

![Card Image Demo](./assets/images/toolbox.png)

## Features

- **Value Field**: Add numbers, percentages, or any metric
- **Title Field**: Descriptive labels for your card image
- **Description Field**: Additional context or details
- **Content Alignment**: Left, center, or right alignment options
- **HTML Support**: All fields support rich text formatting

![Alignment Options](./assets/images/block.png)

## Installation

Use your package manager to install the package `editorjs-card-image`.

```bash
npm install editorjs-card-image

yarn add editorjs-card-image
```

## Usage Example

### Basic Setup

```javascript
import EditorJS from "@editorjs/editorjs"
import CardImage from "editorjs-card-image"

const editor = new EditorJS({
  tools: {
    cardImage: CardImage,
  },
})
```

### With Custom Configuration

```javascript
const editor = new EditorJS({
  tools: {
    cardImage: {
      class: CardImage,
      inlineToolbar: ["bold", "italic"],
      config: {
        valuePlaceholder: "Enter image value",
        titlePlaceholder: "Add a title",
        descriptionPlaceholder: "Add description",
      },
    },
  },
})
```

### Output Data

```json
{
  "type": "cardImage",
  "data": {
    "value": "94%",
    "title": "Customer Satisfaction",
    "description": "Based on 1,200+ reviews",
    "align": "center"
  }
}
```

## Development

This tool uses [Vite](https://vitejs.dev/) as builder.

**Commands**

`npm run dev` — run development environment with hot reload

`npm run build` — build the tool for production to the `dist` folder

## Configuration Options

| Option                   | Type     | Default                  | Description                            |
| ------------------------ | -------- | ------------------------ | -------------------------------------- |
| `valuePlaceholder`       | `string` | `'Add image value'` | Placeholder text for value field       |
| `titlePlaceholder`       | `string` | `'Add title'`            | Placeholder text for title field       |
| `descriptionPlaceholder` | `string` | `'Add description'`      | Placeholder text for description field |

## Links

[Editor.js](https://editorjs.io) • [Create Tool](https://github.com/editor-js/create-tool)
