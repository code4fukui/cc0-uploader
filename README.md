# cc0-uploader

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A simple web application for uploading images and releasing them under the CC0 (public domain) license.

## Demo

**[https://cc0.sabae.cc/](https://cc0.sabae.cc/)**

## How it Works

The interface allows a user to select or drag-and-drop one or more image files. Upon clicking the upload button, the images are sent to the server, stored, and immediately displayed in a gallery on the main page.

**Important:** All uploaded images are treated as CC0 (public domain) and become freely available to anyone. Only upload images that you have the right to release into the public domain.

The gallery displays a thumbnail of each image, which links to the full-size version. A text field below each image provides the direct, copyable URL.

## Features

-   **Simple Interface**: Drag-and-drop or file-selection for image uploads.
-   **CC0 Licensing**: Explicitly designed for releasing images into the public domain.
-   **Instant Access**: Uploaded images are immediately available via a direct URL.
-   **Image Gallery**: Displays all uploaded images in reverse chronological order.
-   **Automatic Resizing**: Images are automatically constrained to a max width of 1220px.
-   **Lightweight Server**: Built with Deno, using URL-based imports and no package manager.

## Running Locally

### Requirements

-   [Deno](https://deno.land/) (v1.32+)

### Steps

1.  Clone the repository:
    ```sh
    git clone https://github.com/code4fukui/cc0-uploader.git
    cd cc0-uploader
    ```

2.  Run the server with the required permissions. You can optionally specify a port.
    ```sh
    # Run on the default port 8081
    deno run --allow-read --allow-write --allow-net server.js

    # Run on a custom port (e.g., 8000)
    deno run --allow-read --allow-write --allow-net server.js 8000
    ```

3.  Open your browser and navigate to `http://localhost:8081` (or your custom port).

## Technical Details

-   **Upload Endpoint**: `POST /api/upload`
    -   The server expects an array of binary image data encoded with CBOR.
-   **File Storage**: `static/data/[YYYYMMDD]/[N].jpg`
    -   Images are stored in directories named by date (e.g., `20231026`).
    -   Filenames are a sequence number for that day (e.g., `0.jpg`, `1.jpg`).
-   **Data Manifest**: `static/data/list.json`
    -   A JSON file that logs every upload. Each entry is an object with `day`, `fn` (filename), and `dt` (ISO 8601 timestamp) fields.
    -   **Note**: The `static/data/` directory is included in `.gitignore` and will be created automatically on the first file upload.

## License

MIT License — see [LICENSE](LICENSE).