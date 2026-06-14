export function rollTable(entries: { rangeStart: number, rangeEnd: number, value: string, pointerTableId?: number }[]) {
    const roll = Math.floor(Math.random() * 100) + 1; // This is too simple, need to determine the max range first
    
    // Better: find the max rangeEnd
    const max = Math.max(...entries.map(e => e.rangeEnd));
    const actualRoll = Math.floor(Math.random() * max) + 1;
    
    const result = entries.find(e => actualRoll >= e.rangeStart && actualRoll <= e.rangeEnd);
    
    return {
        roll: actualRoll,
        result: result || null,
        max
    };
}
