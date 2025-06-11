# Parts HUB / Cross Reference & Parts Locator Implementation

This README provides instructions on how to implement the Parts HUB / Cross Reference & Parts locator functionality for the Small Engine Systems website.

## Overview

The Parts HUB / Cross Reference & Parts locator allows users to search for parts across multiple manufacturers, find cross-referenced parts, and see superseded parts. This functionality is essential for helping customers find the right parts for their equipment.

## Files

1. **parts-search.js**: Contains the JavaScript code for the parts search functionality, including:
   - Sample parts database with cross-references
   - Search function to find parts by part number
   - Functions to display search results
   - Event listeners for the search form

2. **parts-hub-changes.html**: Contains the HTML changes needed to implement the Parts HUB functionality, including:
   - Updated search form with IDs for JavaScript interaction
   - Search results section with containers for original parts, cross-references, and superseded parts
   - Script tag to include the parts-search.js file

## Implementation Steps

1. **Update the Search Form**:
   - Replace the existing search form in the hero section (around line 96 in Green Website Code.txt) with the updated form from parts-hub-changes.html.
   - This adds IDs to the form elements so they can be accessed by JavaScript.

2. **Add the Search Results Section**:
   - Add the search results section from parts-hub-changes.html to the "Parts Lookup" tab content (around line 182 in Green Website Code.txt).
   - This section will display the search results, including original parts, cross-references, and superseded parts.

3. **Include the JavaScript File**:
   - Add the script tag from parts-hub-changes.html before the closing body tag in Green Website Code.txt.
   - Make sure the parts-search.js file is in the same directory as the HTML file.

4. **Test the Functionality**:
   - Open the website in a browser.
   - Enter a part number (e.g., "694521", "17211-ZL8-023", or "GF-296") in the search form.
   - Select a brand (optional) and make sure the "Include cross-reference numbers" checkbox is checked.
   - Click the Search button to see the results.

## Sample Part Numbers for Testing

- **694521**: Briggs & Stratton Fuel Filter (has cross-references and supersedes another part)
- **493629**: Briggs & Stratton Fuel Filter (old version, superseded by 694521)
- **17211-ZL8-023**: Honda Air Filter (has cross-references)
- **GF-296**: Stens Fuel Filter (cross-reference to Briggs & Stratton part)
- **33-294**: Oregon Fuel Filter (cross-reference to Briggs & Stratton part)

## Future Enhancements

1. **Expand the Parts Database**:
   - Add more parts to the database, including parts from all major manufacturers.
   - Include more detailed information about each part, such as dimensions, compatibility, etc.

2. **API Integration**:
   - Integrate with external APIs to get real-time parts information.
   - Add caching to improve performance and reduce API calls.

3. **User Experience Improvements**:
   - Add auto-suggestions for part numbers as the user types.
   - Implement a comparison view for cross-referenced parts.
   - Add the ability to save search history.

4. **Mobile Optimization**:
   - Ensure the search form and results display correctly on mobile devices.
   - Add touch-friendly interactions for mobile users.

## Troubleshooting

If the search functionality is not working correctly, check the following:

1. Make sure the parts-search.js file is correctly included in the HTML file.
2. Check the browser console for any JavaScript errors.
3. Verify that all the required HTML elements with the correct IDs are present in the HTML file.
4. Test with the sample part numbers provided above to ensure the search function is working correctly.