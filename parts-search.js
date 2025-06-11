/**
 * Parts Search Functionality
 */

// Sample parts database with cross-references
const partsDatabase = {
    "694521": {
        manufacturer: "Briggs & Stratton",
        description: "Fuel Filter",
        price: "$8.99",
        availability: "In Stock",
        crossReferences: ["GF-296", "33-294"],
        supersededBy: null,
        supersedes: ["493629"]
    },
    "493629": {
        manufacturer: "Briggs & Stratton",
        description: "Fuel Filter (Old Version)",
        price: "Discontinued",
        availability: "Out of Stock",
        crossReferences: ["GF-296-OLD", "33-294-OLD"],
        supersededBy: "694521",
        supersedes: null
    },
    "17211-ZL8-023": {
        manufacturer: "Honda",
        description: "Air Filter",
        price: "$12.95",
        availability: "In Stock",
        crossReferences: ["100-012", "30-927"],
        supersededBy: null,
        supersedes: ["17211-ZL8-000", "17211-ZL8-003"]
    },
    "GF-296": {
        manufacturer: "Stens",
        description: "Fuel Filter - Briggs & Stratton Compatible",
        price: "$6.99",
        availability: "In Stock",
        crossReferences: ["694521", "33-294"],
        supersededBy: null,
        supersedes: null
    },
    "33-294": {
        manufacturer: "Oregon",
        description: "Fuel Filter - Briggs & Stratton Compatible",
        price: "$7.49",
        availability: "In Stock",
        crossReferences: ["694521", "GF-296"],
        supersededBy: null,
        supersedes: null
    }
};

// Function to search for parts
function searchParts(partNumber, brand, includeCrossReferences) {
    // Convert to uppercase for case-insensitive search
    partNumber = partNumber.toUpperCase();
    
    // Initialize results object
    const results = {
        original: null,
        crossReferences: [],
        supersededBy: null,
        supersedes: []
    };
    
    // Search for the original part
    if (partsDatabase[partNumber]) {
        const part = partsDatabase[partNumber];
        
        // If brand is specified, check if it matches
        if (brand && part.manufacturer.toLowerCase() !== brand.toLowerCase()) {
            // Brand doesn't match, check if there's a cross-reference for this brand
            let foundCrossRef = false;
            if (includeCrossReferences && part.crossReferences) {
                for (const crossRef of part.crossReferences) {
                    if (partsDatabase[crossRef] && 
                        partsDatabase[crossRef].manufacturer.toLowerCase() === brand.toLowerCase()) {
                        results.original = partsDatabase[crossRef];
                        foundCrossRef = true;
                        break;
                    }
                }
            }
            
            if (!foundCrossRef) {
                return results; // No matching part found for the specified brand
            }
        } else {
            results.original = part;
        }
        
        // Get superseded part if available
        if (part.supersededBy && partsDatabase[part.supersededBy]) {
            results.supersededBy = partsDatabase[part.supersededBy];
        }
        
        // Get parts this one supersedes if available
        if (part.supersedes) {
            for (const supersededPart of part.supersedes) {
                if (partsDatabase[supersededPart]) {
                    results.supersedes.push(partsDatabase[supersededPart]);
                }
            }
        }
        
        // Get cross-references if requested
        if (includeCrossReferences && part.crossReferences) {
            for (const crossRef of part.crossReferences) {
                if (partsDatabase[crossRef]) {
                    results.crossReferences.push(partsDatabase[crossRef]);
                }
            }
        }
    }
    
    return results;
}

// Function to display search results
function displaySearchResults(results) {
    // Get DOM elements
    const searchResults = document.getElementById('search-results');
    const loadingIndicator = document.getElementById('loading-indicator');
    const noResults = document.getElementById('no-results');
    const resultsContainer = document.getElementById('results-container');
    const originalPart = document.getElementById('original-part');
    const crossReferenceSection = document.getElementById('cross-reference-section');
    const crossReferenceParts = document.getElementById('cross-reference-parts');
    const supersededSection = document.getElementById('superseded-section');
    const supersededParts = document.getElementById('superseded-parts');
    const sourceCount = document.getElementById('source-count');
    
    // Hide loading indicator
    loadingIndicator.classList.add('hidden');
    
    // Show search results section
    searchResults.classList.remove('hidden');
    
    // Check if we found any results
    if (!results.original) {
        noResults.classList.remove('hidden');
        resultsContainer.classList.add('hidden');
        return;
    }
    
    // Hide no results message and show results container
    noResults.classList.add('hidden');
    resultsContainer.classList.remove('hidden');
    
    // Display original part
    originalPart.innerHTML = `
        <div class="flex justify-between">
            <div>
                <h5 class="font-semibold">${results.original.manufacturer} ${results.original.description}</h5>
                <p class="text-sm text-gray-600">Part #: ${results.original.partNumber || ''}</p>
            </div>
            <div class="text-right">
                <p class="font-semibold">${results.original.price}</p>
                <p class="text-sm ${results.original.availability === 'In Stock' ? 'text-green-600' : 'text-yellow-600'}">${results.original.availability}</p>
            </div>
        </div>
    `;
    
    // Display cross-references if available
    if (results.crossReferences.length > 0) {
        crossReferenceSection.classList.remove('hidden');
        crossReferenceParts.innerHTML = '';
        
        results.crossReferences.forEach(part => {
            crossReferenceParts.innerHTML += `
                <div class="bg-gray-50 rounded-lg p-3">
                    <div class="flex justify-between">
                        <div>
                            <h5 class="font-semibold">${part.manufacturer} ${part.description}</h5>
                            <p class="text-sm text-gray-600">Part #: ${part.partNumber || ''}</p>
                        </div>
                        <div class="text-right">
                            <p class="font-semibold">${part.price}</p>
                            <p class="text-sm ${part.availability === 'In Stock' ? 'text-green-600' : 'text-yellow-600'}">${part.availability}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    } else {
        crossReferenceSection.classList.add('hidden');
    }
    
    // Display superseded parts if available
    if (results.supersededBy || results.supersedes.length > 0) {
        supersededSection.classList.remove('hidden');
        supersededParts.innerHTML = '';
        
        if (results.supersededBy) {
            supersededParts.innerHTML += `
                <div class="bg-blue-50 rounded-lg p-3 border border-blue-200">
                    <p class="text-sm text-blue-700 mb-2">This part has been replaced by:</p>
                    <div class="flex justify-between">
                        <div>
                            <h5 class="font-semibold">${results.supersededBy.manufacturer} ${results.supersededBy.description}</h5>
                            <p class="text-sm text-gray-600">Part #: ${results.supersededBy.partNumber || ''}</p>
                        </div>
                        <div class="text-right">
                            <p class="font-semibold">${results.supersededBy.price}</p>
                            <p class="text-sm ${results.supersededBy.availability === 'In Stock' ? 'text-green-600' : 'text-yellow-600'}">${results.supersededBy.availability}</p>
                        </div>
                    </div>
                </div>
            `;
        }
        
        results.supersedes.forEach(part => {
            supersededParts.innerHTML += `
                <div class="bg-gray-50 rounded-lg p-3 mt-2">
                    <p class="text-sm text-gray-700 mb-2">This part replaces:</p>
                    <div class="flex justify-between">
                        <div>
                            <h5 class="font-semibold">${part.manufacturer} ${part.description}</h5>
                            <p class="text-sm text-gray-600">Part #: ${part.partNumber || ''}</p>
                        </div>
                        <div class="text-right">
                            <p class="font-semibold">${part.price}</p>
                            <p class="text-sm ${part.availability === 'In Stock' ? 'text-green-600' : 'text-yellow-600'}">${part.availability}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    } else {
        supersededSection.classList.add('hidden');
    }
    
    // Update source count
    let sources = 1; // Original source
    if (results.crossReferences.length > 0) sources++;
    if (results.supersededBy || results.supersedes.length > 0) sources++;
    sourceCount.textContent = sources;
}

// Initialize the search form
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the search form
    const searchForm = document.getElementById('parts-search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get search parameters
            const partNumber = document.getElementById('part-number-input').value.trim();
            const brand = document.getElementById('brand-select').value;
            const includeCrossReferences = document.getElementById('include-cross-reference').checked;
            
            // Show loading indicator
            const searchResults = document.getElementById('search-results');
            const loadingIndicator = document.getElementById('loading-indicator');
            const resultsContainer = document.getElementById('results-container');
            const noResults = document.getElementById('no-results');
            
            searchResults.classList.remove('hidden');
            loadingIndicator.classList.remove('hidden');
            resultsContainer.classList.add('hidden');
            noResults.classList.add('hidden');
            
            // Simulate API delay
            setTimeout(function() {
                // Perform search
                const results = searchParts(partNumber, brand, includeCrossReferences);
                
                // Display results
                displaySearchResults(results);
                
                // Scroll to results
                searchResults.scrollIntoView({ behavior: 'smooth' });
            }, 1000);
        });
    }
});