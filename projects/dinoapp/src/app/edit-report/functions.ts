import {extractSum, SUM} from '@ajf/core/models';
import {AjfTableCell} from '@ajf/core/table';

export function tableBeneficiari(projects: any[]): AjfTableCell[][] {
  const cellStyle = {border: 'gray 1px solid', textAlign: 'center'};
  const headerStyle = {
    textAlign: 'center',
    fontWeight: 'bold',
    paddingLeft: '24px!important',
    paddingTop: '24px',
    paddingRight: '24px',
    paddingBottom: '24px',
    backgroundColor: 'rgba(2, 37, 110, 0.4)',
    color: 'white',
  };

  return [
    [
      {value: 'Beneficiari', style: headerStyle},
      {value: 'Diretti', style: headerStyle},
      {value: 'Indiretti', style: headerStyle},
    ],
    [
      {value: 'Italia', style: cellStyle},
      {
        value: extractSum(projects, ['total_direct_m', 'total_direct_f']),
        style: cellStyle,
      },
      {
        value: `${SUM(projects, 'benef_indirect', 'country === "ITA"')}`,
        style: cellStyle,
      },
    ],
    [
      {value: 'Mondo', style: cellStyle, rowspan: 4},
      {value: `${0}`, style: cellStyle, rowspan: 4},
      {
        value: `${SUM(projects, 'benef_indirect', 'country != "ITA"')}`,
        style: cellStyle,
        rowspan: 4,
      },
    ],
  ];
}
function includeValueInForms(projects: any[], value: string): any[] {
  return projects.filter(p => Object.values(p).includes(value));
}

export function tableProgetti(projects: any[]): AjfTableCell[][] {
  console.log(projects);
  const cellStyle = {border: 'gray 1px solid', textAlign: 'center'};
  const sdgObj: {[goal: string]: any[]} = {};
  const goals = [
    'goal_2',
    'goal_3',
    'goal_4',
    'goal_5',
    'goal_6',
    'goal_8',
    'goal_10',
    'goal_11',
    'goal_13',
    'goal_16',
  ];

  const headerStyle = {
    textAlign: 'center',
    fontWeight: 'bold',
    paddingLeft: '24px!important',
    paddingTop: '24px',
    paddingRight: '24px',
    paddingBottom: '24px',
    backgroundColor: 'rgba(2, 37, 110, 0.4)',
    color: 'white',
  };
  const subHeaderStyle = {
    textAlign: 'center',
    fontWeight: 'bold',
    paddingLeft: '24px!important',
    paddingTop: '24px',
    paddingRight: '24px',
    paddingBottom: '24px',
    backgroundColor: 'rgba(2, 37, 110, 0.2)',
    color: 'white',
  };

  const table: AjfTableCell[][] = [
    [
      {value: 'SDG(SETTORE PRIORITARIO)', style: headerStyle},
      {value: 'PAESE', style: headerStyle},
      {value: 'PROGETTO', style: headerStyle},
      {value: 'BENEFICIARI DIRETTI', style: headerStyle},
      {value: 'BENEFICIARI INDIRETTI', style: headerStyle},
      {value: 'COSTO', style: headerStyle},
    ],
  ];
  goals.forEach(goal => {
    const sdgProjects = includeValueInForms(projects, goal);
    if (sdgProjects.length > 0) {
      sdgObj[goal] = sdgProjects;
    }
  });
  console.log(sdgObj);

  Object.keys(sdgObj).forEach(key => {
    const sdgProjects = sdgObj[key];
    table.push([
      {value: `SDG ${key}`, style: subHeaderStyle},
      {value: '', style: subHeaderStyle},
      {value: '', style: subHeaderStyle},
      {
        value: extractSum(sdgProjects, ['total_direct_m', 'total_direct_f']),
        style: subHeaderStyle,
      },
      {value: SUM(sdgProjects, 'benef_indirect'), style: subHeaderStyle},
      {value: SUM(sdgProjects, 'budget'), style: subHeaderStyle},
    ]);
    sdgProjects.forEach(sdgProject => {
      const row: AjfTableCell[] = [
        {value: '', style: cellStyle},
        {value: sdgProject.country, style: cellStyle},
        {value: sdgProject.title, style: cellStyle},
        {
          value: sdgProject.total_direct_m + sdgProject.total_direct_f,
          style: cellStyle,
        },
        {value: sdgProject.benef_indirect || 0, style: cellStyle},
        {value: sdgProject.budget || 0, style: cellStyle},
      ];
      table.push(row);
    });
  });
  table.push([
    {value: `TOTALE`, style: headerStyle},
    {value: '', style: headerStyle},
    {value: '', style: headerStyle},
    {
      value: extractSum(projects, ['total_direct_m', 'total_direct_f']),
      style: headerStyle,
    },
    {value: SUM(projects, 'benef_indirect'), style: headerStyle},
    {value: SUM(projects, 'budget'), style: headerStyle},
  ]);
  return table;
}
