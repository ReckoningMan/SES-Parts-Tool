/**
 * Parts HUB / Cross Reference & Parts Locator
 * 
 * This script provides functionality for searching parts across multiple manufacturers,
 * finding cross-references, and displaying superseded parts.
 */

// Parts database with sample data
const partsDatabase = {
    manufacturers: {
        "ariens": { 
            name: "Ariens", 
            website: "https://www.ariens.com/en-us/parts",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Ariens_logo.svg/1200px-Ariens_logo.svg.png"
        },
        "briggs": { 
            name: "Briggs & Stratton", 
            website: "https://www.briggsandstratton.com/parts",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Briggs_%26_Stratton_logo.svg/1200px-Briggs_%26_Stratton_logo.svg.png"
        },
        "honda": { 
            name: "Honda", 
            website: "https://powerequipment.honda.com/parts",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Honda_Logo.svg/2560px-Honda_Logo.svg.png"
        },
        "kohler": { 
            name: "Kohler", 
            website: "https://kohlerengines.com/en/parts",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Kohler_Logo.svg/1200px-Kohler_Logo.svg.png"
        },
        "toro": { 
            name: "Toro", 
            website: "https://www.parts.toro.com/portal/server.pt/community/parts_view/225",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toro_logo.svg/1200px-Toro_logo.svg.png"
        },
        "husqvarna": { 
            name: "Husqvarna", 
            website: "https://www.husqvarna.com/us/parts/",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Husqvarna_logo.svg/2560px-Husqvarna_logo.svg.png"
        },
        "mtd": { 
            name: "MTD", 
            website: "https://www.mtdparts.com/en_US/ari-partstream.html",
            logo: "https://www.mtdparts.com/on/demandware.static/Sites-mtdparts-Site/-/default/dw9e0e7e7c/images/logo.png"
        },
        "stens": { 
            name: "Stens", 
            website: "https://www.stens.com/quick-reference-guides",
            logo: "https://www.stens.com/media/wysiwyg/stens-logo.png"
        },
        "oregon": { 
            name: "Oregon", 
            website: "https://www.oregonchain.com/en_US/Parts",
            logo: "https://www.oregonproducts.com/en/-/media/Images/Oregon/Global/logo.ashx"
        }
    },
    parts: {
        // Briggs & Stratton parts
        "694521": {
            manufacturer: "briggs",
            description: "Fuel Filter",
            price: "$8.99",
            availability: "In Stock",
            crossReferences: ["GF-296", "33-294"],
            supersededBy: null,
            supersedes: ["493629"]
        },
        "493629": {
            manufacturer: "briggs",
            description: "Fuel Filter (Old Version)",
            price: "Discontinued",
            availability: "Out of Stock",
            crossReferences: ["GF-296-OLD", "33-294-OLD"],
            supersededBy: "694521",
            supersedes: null
        },
        
        // Honda parts
        "17211-ZL8-023": {
            manufacturer: "honda",
            description: "Air Filter",
            price: "$12.95",
            availability: "In Stock",
            crossReferences: ["100-012", "30-927"],
            supersededBy: null,
            supersedes: ["17211-ZL8-000", "17211-ZL8-003"]
        },
        "17211-ZL8-003": {
            manufacturer: "honda",
            description: "Air Filter (Previous Version)",
            price: "Discontinued",
            availability: "Out of Stock",
            crossReferences: ["100-012-OLD"],
            supersededBy: "17211-ZL8-023",
            supersedes: ["17211-ZL8-000"]
        },
        
        // Kohler parts
        "25-883-03-S1": {
            manufacturer: "kohler",
            description: "Air Filter Element",
            price: "$15.49",
            availability: "In Stock",
            crossReferences: ["100-031", "30-930"],
            supersededBy: null,
            supersedes: ["25-883-03-S"]
        },
        
        // Stens cross-reference parts
        "100-012": {
            manufacturer: "stens",
            description: "Air Filter - Honda Compatible",
            price: "$9.95",
            availability: "In Stock",
            crossReferences: ["17211-ZL8-023", "30-927"],
            supersededBy: null,
            supersedes: null
        },
        "100-031": {
            manufacturer: "stens",
            description: "Air Filter Element - Kohler Compatible",
            price: "$11.99",
            availability: "In Stock",
            crossReferences: ["25-883-03-S1", "30-930"],
            supersededBy: null,
            supersedes: null
        },
        "GF-296": {
            manufacturer: "stens",
            description: "Fuel Filter - Briggs & Stratton Compatible",
            price: "$6.99",
            availability: "In Stock",
            crossReferences: ["694521", "33-294"],
            supersededBy: null,
            supersedes: null
        },
        
        // Oregon parts
        "30-927": {
            manufacturer: "oregon",
            description: "Air Filter - Honda Compatible",
            price: "$10.49",
            availability: "In Stock",
            crossReferences: ["17211-ZL8-023", "100-012"],
            supersededBy: null,
            supersedes: null
        },
        "30-930": {
            manufacturer: "oregon",
            description: "Air Filter - Kohler Compatible",
            price: "$12.49",
            availability: "In Stock",
            crossReferences: ["25-883-03-S1", "100-031"],
            supersededBy: null,
            supersedes: null
        },
        "33-294": {
            manufacturer: "oregon",
            description: "Fuel Filter - Briggs & Stratton Compatible",
            price: "$7.49",
            availability: "In Stock",
            crossReferences: ["694521", "GF-296"],
            supersededBy: null,
            supersedes: null


