# Decap CMS Setup

This project uses Decap CMS (formerly Netlify CMS) for content management. Here's how to set it up and use it:

## Setup

1. **Install dependencies** (already done):
   ```bash
   npm install decap-cms-app
   ```

2. **Set up environment variables**:
   Create a `.env.local` file in the root directory and add:
   ```
   NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password
   ```

3. **Start the local backend** (for development):
   ```bash
   npm run cms
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

## Usage

1. Navigate to `/admin` in your browser
2. Enter the password you set in the environment variable
3. You'll see the Decap CMS interface with two collections:
   - **Projects**: Manage your portfolio projects
   - **Images**: Manage images associated with projects

## Collections

### Projects
- **Title**: The project name
- **Slug**: URL-friendly identifier (e.g., "mountain-escape")
- **Description**: Project description
- **Featured**: Whether to highlight this project
- **Order**: Display order (lower numbers appear first)

### Images
- **Title**: Image title
- **Slug**: URL-friendly identifier
- **Image URL**: Full URL to the image
- **Alt Text**: Accessibility description
- **Aspect Ratio**: Choose from predefined options
- **Project**: Link to a project (dropdown)
- **Order**: Display order within the project

## File Structure

The CMS creates and manages these files:
- `app/data/*.json` - Project data
- `app/data/images/*.json` - Image data
- `public/images/` - Uploaded media files

## Production Deployment

For production, you'll need to:

1. **Set up Git Gateway** (if using Netlify):
   - Enable Git Gateway in your Netlify dashboard
   - Set up OAuth providers for authentication

2. **Alternative backends**:
   - GitHub backend (direct Git access)
   - GitLab backend
   - Bitbucket backend

## Local Development

The CMS is configured with `local_backend: true`, which means:
- Changes are saved locally during development
- No authentication required for local editing
- Perfect for testing and development

## Security

- The admin password is stored in environment variables
- Never commit `.env.local` to version control
- Use strong passwords in production
- Consider implementing additional authentication for production

## Customization

You can modify the CMS configuration in:
- `public/admin/config.yml` - Main configuration
- `app/admin/page.tsx` - CMS initialization

The configuration supports:
- Custom widgets
- Field validation
- Media handling
- Workflow states
- Editorial workflow 