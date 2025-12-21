export type CleaningArea = 'Kitchen' | 'Bathrooms' | 'Bedrooms' | 'Common Areas';

export interface CleaningTask {
  task: string;
  routine: boolean;
  deep: boolean;
  moveInOut: boolean | string;
}

export const cleaningTasks: Record<CleaningArea, CleaningTask[]> = {
  Kitchen: [
    // Standard (included in all cleanings)
    { task: 'Wipe down & sanitize countertops', routine: true, deep: true, moveInOut: true },
    { task: 'Clean & polish sink & faucet', routine: true, deep: true, moveInOut: true },
    { task: 'Wipe down exterior of appliances', routine: true, deep: true, moveInOut: true },
    { task: 'Clean cabinet fronts & handles', routine: true, deep: true, moveInOut: true },
    { task: 'Clean & disinfect light switches & doorknobs', routine: true, deep: true, moveInOut: true },
    { task: 'Sweep & mop floors', routine: true, deep: true, moveInOut: true },
    { task: 'Empty garbage & replace bag', routine: true, deep: true, moveInOut: true },
    { task: 'Dust light fixtures', routine: true, deep: true, moveInOut: true },
    
    // Deep clean additions
    { task: 'Wipe down windowsills & window frames', routine: false, deep: true, moveInOut: true },
    { task: 'Clean window blinds / shades / shutters', routine: false, deep: true, moveInOut: true },
    { task: 'Clean inside windows & window tracks', routine: false, deep: true, moveInOut: true },
    { task: 'Spot clean walls & ceilings (especially near cooking areas)', routine: false, deep: true, moveInOut: true },
    { task: 'Wipe down vents, air returns & ceiling corners', routine: false, deep: true, moveInOut: true },
    { task: 'Wipe down baseboards', routine: false, deep: true, moveInOut: true },
    { task: 'Wipe down doors & door frames', routine: false, deep: true, moveInOut: true },
    { task: 'Wipe top edges of doors, trim & molding', routine: false, deep: true, moveInOut: true },
    { task: 'Clean inside microwave', routine: false, deep: true, moveInOut: true },
    { task: 'Clean stovetop burners, drip pans & knobs', routine: false, deep: true, moveInOut: true },
    { task: 'Degrease range hood exterior & filters', routine: false, deep: true, moveInOut: true },
    { task: 'Clean backsplash tile & grout', routine: false, deep: true, moveInOut: true },
    { task: 'Clean under small appliances & countertop items', routine: false, deep: true, moveInOut: true },
    { task: 'Clean under sink & plumbing area', routine: false, deep: true, moveInOut: true },
    { task: 'Clean top of refrigerator (exterior)', routine: false, deep: true, moveInOut: true },
    { task: 'Polish stainless steel surfaces', routine: false, deep: true, moveInOut: true },
    
    // Move-In/Out only
    { task: 'Clean behind & under appliances (if accessible)', routine: false, deep: false, moveInOut: true },
    { task: 'Clean inside all appliances (fridge, oven, dishwasher)', routine: false, deep: false, moveInOut: true },
    { task: 'Degrease & clean exhaust hood interior', routine: false, deep: false, moveInOut: true },
    { task: 'Clean inside cabinets & drawers', routine: false, deep: false, moveInOut: true },
  ],
  Bathrooms: [
    // Standard (included in all cleanings)
    { task: 'Dust light fixtures & shelves', routine: true, deep: true, moveInOut: true },
    { task: 'Dust windowsills & window frames', routine: true, deep: true, moveInOut: true },
    { task: 'Dust & tidy personal items & hand towels', routine: true, deep: true, moveInOut: true },
    { task: 'Clean & dry shower/tub', routine: true, deep: true, moveInOut: true },
    { task: 'Clean & dry sink, countertops & soap dish', routine: true, deep: true, moveInOut: true },
    { task: 'Clean all mirrors & glass', routine: true, deep: true, moveInOut: true },
    { task: 'Polish towel racks & toilet paper holder', routine: true, deep: true, moveInOut: true },
    { task: 'Clean inside, outside & around toilet', routine: true, deep: true, moveInOut: true },
    { task: 'Clean all light switches & doorknobs', routine: true, deep: true, moveInOut: true },
    { task: 'Wipe down & disinfect cabinet fronts', routine: true, deep: true, moveInOut: true },
    { task: 'Vacuum / sweep / mop floors', routine: true, deep: true, moveInOut: true },
    { task: 'Empty garbage & replace bag', routine: true, deep: true, moveInOut: true },
    
    // Deep clean additions
    { task: 'Wipe down windowsills & window frames', routine: false, deep: true, moveInOut: true },
    { task: 'Clean window blinds / shades / shutters', routine: false, deep: true, moveInOut: true },
    { task: 'Clean inside windows & window tracks', routine: false, deep: true, moveInOut: true },
    { task: 'Spot clean walls for scuffs & fingerprints', routine: false, deep: true, moveInOut: true },
    { task: 'Wipe down vents, air returns & ceiling corners', routine: false, deep: true, moveInOut: true },
    { task: 'Full tile & grout scrub (shower, floor, backsplash)', routine: false, deep: true, moveInOut: true },
    { task: 'Descale shower heads & faucets (mineral buildup)', routine: false, deep: true, moveInOut: true },
    { task: 'Clean exhaust fan cover', routine: false, deep: true, moveInOut: true },
    { task: 'Clean shower door tracks / runners', routine: false, deep: true, moveInOut: true },
    { task: 'Clean under & behind toilet base', routine: false, deep: true, moveInOut: true },
    { task: 'Clean under sink & plumbing area', routine: false, deep: true, moveInOut: true },
    { task: 'Wipe down baseboards', routine: false, deep: true, moveInOut: true },
    { task: 'Wipe down doors & door frames', routine: false, deep: true, moveInOut: true },
    { task: 'Wipe top edges of doors, trim & molding', routine: false, deep: true, moveInOut: true },
    
    // Move-In/Out only
    { task: 'Clean inside medicine cabinet', routine: false, deep: false, moveInOut: true },
    { task: 'Clean inside cabinets & drawers', routine: false, deep: false, moveInOut: true },
  ],
  Bedrooms: [
    // Standard (included in all cleanings)
    { task: 'Dust all surfaces & furniture', routine: true, deep: true, moveInOut: true },
    { task: 'Dust light fixtures', routine: true, deep: true, moveInOut: true },
    { task: 'Dust windowsills & window frames', routine: true, deep: true, moveInOut: true },
    { task: 'Dust & tidy decor & personal items', routine: true, deep: true, moveInOut: true },
    { task: 'Clean all mirrors', routine: true, deep: true, moveInOut: true },
    { task: 'Clean all light switches & doorknobs', routine: true, deep: true, moveInOut: true },
    { task: 'Make bed(s) & change sheets (if left out)', routine: true, deep: true, moveInOut: true },
    { task: 'Tidy area, arrange pillows & fold blankets', routine: true, deep: true, moveInOut: true },
    { task: 'Vacuum / sweep / mop floors', routine: true, deep: true, moveInOut: true },
    { task: 'Empty garbage & replace bag', routine: true, deep: true, moveInOut: true },
    
    // Deep clean additions
    { task: 'Wipe down windowsills & window frames', routine: false, deep: true, moveInOut: true },
    { task: 'Clean window blinds / shades / shutters', routine: false, deep: true, moveInOut: true },
    { task: 'Clean inside windows & window tracks', routine: false, deep: true, moveInOut: true },
    { task: 'Spot clean walls & baseboards for scuffs & marks', routine: false, deep: true, moveInOut: true },
    { task: 'Wipe down vents, air returns & ceiling corners', routine: false, deep: true, moveInOut: true },
    { task: 'Vacuum under beds & move light furniture', routine: false, deep: true, moveInOut: true },
    { task: 'Clean under & behind furniture (if accessible)', routine: false, deep: true, moveInOut: true },
    { task: 'Wipe down doors & door frames', routine: false, deep: true, moveInOut: true },
    { task: 'Wipe top edges of doors, trim & molding', routine: false, deep: true, moveInOut: true },
    { task: 'Wipe down closet doors, frames & tracks', routine: false, deep: true, moveInOut: true },
    { task: 'Wipe down baseboards', routine: false, deep: true, moveInOut: true },
    
    // Move-In/Out only
    { task: 'Clean inside closets & wipe down shelves', routine: false, deep: false, moveInOut: true },
  ],
  'Common Areas': [
    // Standard (included in all cleanings)
    { task: 'Dust all surfaces (tables, shelves, entertainment center)', routine: true, deep: true, moveInOut: true },
    { task: 'Dust light fixtures', routine: true, deep: true, moveInOut: true },
    { task: 'Dust windowsills & window frames', routine: true, deep: true, moveInOut: true },
    { task: 'Dust & arrange decorative items', routine: true, deep: true, moveInOut: true },
    { task: 'Clean all mirrors & glass surfaces', routine: true, deep: true, moveInOut: true },
    { task: 'Clean TV screen', routine: true, deep: true, moveInOut: true },
    { task: 'Tidy area, arrange pillows & fold blankets', routine: true, deep: true, moveInOut: true },
    { task: 'Vacuum upholstered furniture', routine: true, deep: true, moveInOut: true },
    { task: 'Clean & disinfect light switches & doorknobs', routine: true, deep: true, moveInOut: true },
    { task: 'Vacuum all floors & area rugs', routine: true, deep: true, moveInOut: true },
    { task: 'Sweep & mop hard floors', routine: true, deep: true, moveInOut: true },
    { task: 'Empty garbage & replace bags', routine: true, deep: true, moveInOut: true },
    
    // Deep clean additions
    { task: 'Wipe down windowsills & window frames', routine: false, deep: true, moveInOut: true },
    { task: 'Clean window blinds / shades / shutters', routine: false, deep: true, moveInOut: true },
    { task: 'Clean inside windows & window tracks', routine: false, deep: true, moveInOut: true },
    { task: 'Spot clean walls & baseboards for scuffs & fingerprints', routine: false, deep: true, moveInOut: true },
    { task: 'Wipe down vents, air returns & ceiling corners', routine: false, deep: true, moveInOut: true },
    { task: 'Vacuum couch cushions & clean upholstery crevices', routine: false, deep: true, moveInOut: true },
    { task: 'Clean under & behind furniture (if movable)', routine: false, deep: true, moveInOut: true },
    { task: 'Wipe down doors & door frames', routine: false, deep: true, moveInOut: true },
    { task: 'Wipe top edges of doors, molding & picture frames', routine: false, deep: true, moveInOut: true },
    { task: 'Wipe down baseboards', routine: false, deep: true, moveInOut: true },
    
    // Move-In/Out only
    { task: 'Clean inside cabinets & shelves', routine: false, deep: false, moveInOut: true },
  ]
};

export const getAllTasks = () => {
  return Object.values(cleaningTasks).flat();
};

export const getTaskCounts = () => {
  const allTasks = getAllTasks();
  
  const routineTasks = allTasks.filter(task => task.routine).length;
  const deepTasks = allTasks.filter(task => task.deep).length;
  const moveInOutTasks = allTasks.filter(task => task.moveInOut === true).length;
  
  return {
    routine: routineTasks,
    deep: deepTasks,
    moveInOut: moveInOutTasks
  };
};

export const taskCounts = getTaskCounts();


