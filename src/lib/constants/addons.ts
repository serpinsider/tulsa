export interface AddOn {
  key: string;
  label: string;
  description: string;
  icon: string;
  tooltip?: string;
}

export const ADDONS: AddOn[] = [
  // Top priority addons - in order requested
  { 
    key: 'insideFridge', 
    label: 'Inside Fridge', 
    description: 'Deep clean fridge', 
    icon: 'inside-fridge.png',
    tooltip: "We clean inside your fridge and make it spotless again."
  },
  { 
    key: 'insideOven', 
    label: 'Inside Oven', 
    description: 'Deep clean oven', 
    icon: 'inside-oven.png',
    tooltip: "We clean the top and inside your oven."
  },
  { 
    key: 'microwave', 
    label: 'Microwave', 
    description: 'Clean microwave', 
    icon: 'microwave-clean.png',
    tooltip: "We clean your microwave inside and out."
  },
  { 
    key: 'organization', 
    label: 'Organization', 
    description: 'Organize spaces', 
    icon: 'organization.png',
    tooltip: "30 minutes of organizing, moving, doing anything you want us to do, weight limits may apply."
  },
  
  // Other addons
  { 
    key: 'tileAndGrout', 
    label: 'Tile & Grout', 
    description: 'Deep tile cleaning', 
    icon: 'shower-head.png',
    tooltip: "Deep cleaning for tile and grout."
  },
  { 
    key: 'wallStainRemoval', 
    label: 'Wall Stains', 
    description: 'Stain removal', 
    icon: 'wall-stain-removal.png',
    tooltip: "We remove wall stains and marks."
  },
  { 
    key: 'baseboardCleaning', 
    label: 'Baseboards', 
    description: 'Baseboard cleaning', 
    icon: 'baseboard-cleaning.png',
    tooltip: "Clean all baseboards."
  },
  { 
    key: 'bedroomBathroomCabinets', 
    label: 'Cabinet Cleaning', 
    description: 'Clean all cabinets', 
    icon: 'cabinets.png',
    tooltip: "We clean the insides of your cabinets for an hour, this is included in Move Out Cleans."
  },
  { 
    key: 'interiorWindows', 
    label: 'Interior Windows', 
    description: 'Clean windows', 
    icon: 'blinds.png',
    tooltip: "We wipe your windows on the inside, this is typically just 2 windows per addon."
  },
  { 
    key: 'dishes', 
    label: 'Dishes', 
    description: 'Wash dishes', 
    icon: 'dishes.png',
    tooltip: "We do all your dishes."
  },
  { 
    key: 'laundry', 
    label: 'Laundry', 
    description: 'Wash & fold', 
    icon: 'laundry.png',
    tooltip: "We do one or two loads of laundry depending on how long we're able to stay at your place while cleaning."
  },
  { 
    key: 'hardwood', 
    label: 'Hardwood Care', 
    description: 'Wood treatment', 
    icon: 'hardwood.png',
    tooltip: "Hardwood floor care and treatment."
  },
  { 
    key: 'basementCleaning', 
    label: 'Basement', 
    description: 'Full service', 
    icon: 'basement-cleaning.png',
    tooltip: "We clean your basement."
  },
  { 
    key: 'petCleaning', 
    label: 'Pet Cleaning', 
    description: 'Pet hair removal', 
    icon: 'pet-cleaning.png',
    tooltip: "We do not charge this if your pet does not shed, select this if your pet sheds or need cleaning more than regular mess."
  },
  { 
    key: 'washerDryer', 
    label: 'Stair Cleaning', 
    description: 'Stairway cleaning', 
    icon: 'stairs.png',
    tooltip: "Clean your stairs."
  },
  { 
    key: 'officeCleaning', 
    label: 'Office', 
    description: 'Clean workspace', 
    icon: 'office-cleaning.png',
    tooltip: "We clean your home office space."
  },
  { 
    key: 'superDeepClean', 
    label: 'Super Deep Clean', 
    description: 'Heavily soiled homes', 
    icon: 'super-cleaning.png',
    tooltip: "Intensive cleaning for heavily soiled homes, extreme messes, odors, or neglect. Adds $300 to your cleaning."
  }
];


