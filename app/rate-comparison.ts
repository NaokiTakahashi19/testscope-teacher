// Illustrative display bands in percentage points, not significance tests.
export function comparisonBand(gap:number){return gap>=15?'high':gap>=5?'slightly-high':gap<=-15?'low':gap<=-5?'slightly-low':'normal'}
export const comparisonLabels={high:'高い','slightly-high':'やや高い',normal:'普通','slightly-low':'やや低い',low:'低い'};
