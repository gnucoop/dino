import {AjfChoicesOriginType} from '@ajf/core/forms';
import {FormSchema} from '@dewco/core/forms';

export const ajfSchema = {
  'nodes': [
    {
      'id': 1,
      'name': '_1',
      'label': 'BENEFICIARY',
      'nodes': [
        {
          'id': 101,
          'name': 'f_1_101',
          'size': 'normal',
          'label': 'Name',
          'parent': 1,
          'editable': true,
          'nodeType': 0,
          'fieldType': 0,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': [{'condition': 'true'}]
        },
        {
          'id': 102,
          'name': 'f_1_102',
          'size': 'normal',
          'label': 'Surname',
          'parent': 101,
          'editable': true,
          'nodeType': 0,
          'fieldType': 0,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': [{'condition': 'true'}]
        },
        {
          'id': 103,
          'name': 'f_1_103',
          'size': 'normal',
          'label': 'Sex',
          'parent': 102,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 4,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'SEX',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [{'label': 'Male', 'value': 'Male'}, {'label': 'Female', 'value': 'Female'}],

          },
          'forceExpanded': false,
          'choicesOriginRef': 'SEX',
          'conditionalBranches': [{'condition': 'true'}]
        },
        {
          'id': 104,
          'name': '_1_104',
          'size': 'normal',
          'label': 'Name of the District',
          'parent': 103,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 4,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'DISTRICT_NAMES',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [
              {'label': 'Quelimane', 'value': 'quelimane'},
              {'label': 'Nicoadala', 'value': 'nicoadala'},
              {'label': 'Namacurra', 'value': 'namacurra'}
            ]
          },
          'forceExpanded': false,
          'choicesOriginRef': 'DISTRICT_NAMES',
          'conditionalBranches': []
        },
        {
          'id': 105,
          'name': 'f_1_105',
          'size': 'normal',
          'label': 'From Which community?',
          'parent': 104,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 5,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': '_1_104 === \'quelimane\''},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'QUELIMANE_COMMUNITY',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [
              {'label': 'Eduba', 'value': 'eduba'}, {'label': 'Mazuere', 'value': 'mazuere'},
              {'label': 'Navilembo', 'value': 'navilembo'}, {'label': 'Mucor', 'value': 'mucor'},
              {'label': 'Nangoela', 'value': 'nangoela'}, {'label': 'Sareva', 'value': 'sareva'}
            ]
          },
          'forceExpanded': false,
          'choicesOriginRef': 'QUELIMANE_COMMUNITY',
          'conditionalBranches': []
        },
        {
          'id': 106,
          'name': 'f_1_106',
          'size': 'normal',
          'label': 'From Which community?',
          'parent': 105,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 5,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': '_1_104 === \'nicoadala\''},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'NICOADALA_COMMUNITY',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [
              {'label': 'Curungo', 'value': 'Curungo'},
              {'label': '25 de junho', 'value': '25 de junho'},
              {'label': 'Supinho', 'value': 'supinho'}, {'label': 'Maningue', 'value': 'maningue'},
              {'label': 'Mariebe', 'value': 'mariebe'},
              {'label': 'Mucelo-Novo', 'value': 'mucelo-Novo'}
            ]
          },
          'forceExpanded': false,
          'choicesOriginRef': 'NICOADALA_COMMUNITY',
          'conditionalBranches': []
        },
        {
          'id': 107,
          'name': 'f_1_107',
          'size': 'normal',
          'label': 'From Which community?',
          'parent': 106,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 5,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': '_1_104 === \'namacurra\''},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'NAMACURRA_COMMUNITY',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [
              {'label': 'Cocodane', 'value': 'cocodane'}, {'label': 'Mutange', 'value': 'mutange'},
              {'label': 'Muebele', 'value': 'muebele'}, {'label': 'Pida', 'value': 'pida'},
              {'label': 'Mixixine', 'value': 'mixixine'}, {'label': 'Furquia', 'value': 'furquia'}
            ]
          },
          'forceExpanded': false,
          'choicesOriginRef': 'NAMACURRA_COMMUNITY',
          'conditionalBranches': []
        },
        {
          'id': 108,
          'name': 'season',
          'size': 'normal',
          'label': 'In which season are the data collected?',
          'parent': 107,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 4,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'season',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [
              {'label': 'First agricultural campaign (October-March)', 'value': 'first_campaign'}, {
                'label': 'Second agricultural campaign (April-September)',
                'value': 'second_campaign'
              }
            ],

          },
          'forceExpanded': false,
          'choicesOriginRef': 'season',
          'conditionalBranches': []
        },
        {
          'id': 109,
          'name': 'affected_by',
          'size': 'normal',
          'label': 'The agricultural campaign has been affected by:',
          'parent': 108,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 4,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'affected_by',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [
              {'label': 'Drought', 'value': 'drought'}, {'label': 'Flood', 'value': 'flood'},
              {'label': 'Phytopathological diseases', 'value': 'diseases'},
              {'label': 'None', 'value': 'none'}
            ],

          },
          'forceExpanded': false,
          'choicesOriginRef': 'affected_by',
          'conditionalBranches': []
        },
        {
          'id': 110,
          'name': 'severity',
          'size': 'normal',
          'label': 'Degree of severity',
          'parent': 109,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 4,
          'parentNode': 0,
          'visibility': {'condition': 'affected_by !== "none"'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'severity',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [
              {'label': 'Low', 'value': 'low'}, {'label': 'Medium', 'value': 'medium'},
              {'label': 'High', 'value': 'high'}
            ],

          },
          'forceExpanded': false,
          'choicesOriginRef': 'severity',
          'conditionalBranches': []
        }
      ],
      'parent': 0,
      'nodeType': 3,
      'parentNode': 0,
      'visibility': {'condition': 'true'},
      'conditionalBranches': [{'condition': 'true'}]
    },
    {
      'id': 2,
      'name': '_2',
      'label': 'ECONOMIC INDICATORS',
      'nodes': [
        {
          'id': 200,
          'name': '_2_200',
          'size': 'normal',
          'label': 'Economic Activity',
          'parent': 2,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 5,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'ECONOMIC_ACTIVITY',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [
              {'label': 'Farmer', 'value': 'farmer'}, {'label': 'Trader', 'value': 'trader'},
              {'label': 'Fisherman', 'value': 'fisherman'},
              {'label': 'Other(specificy)', 'value': 'other'}
            ],

          },
          'forceExpanded': false,
          'choicesOriginRef': 'ECONOMIC_ACTIVITY',
          'conditionalBranches': []
        },
        {
          'id': 199,
          'name': '_2_199',
          'size': 'normal',
          'label': 'What is the most important crop?',
          'parent': 200,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 5,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': '_2_200 == \'farmer\''},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'crop_seeds',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [
              {'label': 'Rice', 'value': 'rice'},
              {'label': 'Corn', 'value': 'corn'},
              {'label': 'Cassava', 'value': 'cassava'},
              {'label': 'Sweet Potato', 'value': 'sweet_potato'},
              {'label': 'Ihame', 'value': 'ihame'},
              {'label': 'Salad', 'value': 'salad'},
              {'label': 'Onion', 'value': 'onion'},
              {'label': 'Cabbage', 'value': 'cabbage'},
              {'label': 'Cucumber', 'value': 'cucumber'},
              {'label': 'Orange', 'value': 'orange'},
              {'label': 'Pineapple', 'value': 'pineapple'},
              {'label': 'Peanut', 'value': 'peanut'},
              {'label': 'Sesame', 'value': 'sesame'},
              {'label': 'Pepper', 'value': 'pepper'},
              {'label': 'Beans', 'value': 'beans'},
              {'label': 'Beet', 'value': 'beet'},
              {'label': 'Cashew Nut', 'value': 'cashew_nut'},
              {'label': 'Carrot', 'value': 'carrot'},
              {'label': 'Okra', 'value': 'okra'},
              {'label': 'Eggplant', 'value': 'eggplant'},
              {'label': 'Mango', 'value': 'mango'},
              {'label': 'Pumpkin', 'value': 'pumpkin'},
              {'label': 'Other (specify)', 'value': 'other'}
            ],

          },
          'forceExpanded': false,
          'choicesOriginRef': 'crop_seeds',
          'conditionalBranches': []
        },
        {
          'id': 201,
          'name': '_2_201',
          'size': 'normal',
          'label': 'Other (specificy)',
          'parent': 199,
          'editable': true,
          'nodeType': 0,
          'fieldType': 0,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': '_2_200 == \'other\''},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 202,
          'name': '_2_202',
          'size': 'normal',
          'label': 'Total monthly income (Meticais) - income received during the last' +
              ' agricultural campaign',
          'parent': 201,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 4,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'PARTITION_1000_TO_5000',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [
              {'label': '0-1000', 'value': '0-1000'}, {'label': '1001-2000', 'value': '1001-2000'},
              {'label': '2001-3000', 'value': '2001-3000'},
              {'label': '3001-4000', 'value': '3001-4000'},
              {'label': '4001-5000', 'value': '4001-5000'}, {'label': '>5000', 'value': '>5000'}
            ],

          },
          'forceExpanded': false,
          'choicesOriginRef': 'PARTITION_1000_TO_5000',
          'conditionalBranches': []
        },
        {
          'id': 204,
          'name': '_2_204',
          'size': 'normal',
          'label': 'Total monthly expenditures (Meticais) food, clothing, housing (rent),' +
              ' energy, transport, durable goods, health costs, leisure, and miscellaneous' +
              ' services',
          'parent': 202,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 4,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'PARTITION_500_TO_3000',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [
              {'label': '0-500', 'value': '0-500'}, {'label': '501-1000', 'value': '501-1000'},
              {'label': '1001-1500', 'value': '1001-1500'},
              {'label': '1501-2000', 'value': '1501-2000'},
              {'label': '2001-2500', 'value': '2001-2500'},
              {'label': '2501-3000', 'value': '2501-3000'}, {'label': '>3000', 'value': '>3000'}
            ],

          },
          'forceExpanded': false,
          'choicesOriginRef': 'PARTITION_500_TO_3000',
          'conditionalBranches': []
        },
        {
          'id': 205,
          'name': '_2_205',
          'size': 'normal',
          'label': 'Number of Family Members',
          'parent': 204,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 206,
          'name': '_2_206',
          'size': 'normal',
          'label': 'Number of children below 15 years',
          'parent': 205,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        }
      ],
      'parent': 1,
      'nodeType': 3,
      'parentNode': 0,
      'visibility': {'condition': 'true'},
      'conditionalBranches': [{'condition': 'true'}]
    },
    {
      'id': 3,
      'name': '_3',
      'label': 'FOOD SECURITY INDICATORS/01',
      'nodes': [
        {
          'id': 300,
          'name': '_3_300',
          'size': 'normal',
          'label': 'Age',
          'parent': 3,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': [{'condition': 'true'}]
        },
        {
          'id': 301,
          'name': '_3_301',
          'size': 'normal',
          'label': 'Number of meals consumed per day',
          'parent': 300,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 4,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'NUMBER_1_TO_4',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [
              {'label': '1', 'value': '1'}, {'label': '2', 'value': '2'},
              {'label': '3', 'value': '3'}, {'label': '>4', 'value': '4'}
            ],

          },
          'forceExpanded': false,
          'choicesOriginRef': 'NUMBER_1_TO_4',
          'conditionalBranches': []
        },
        {
          'id': 302,
          'name': '_3_302',
          'size': 'normal',
          'label': 'How many type of fruit do you consume each day?',
          'parent': 301,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 4,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'NUMBER_1_TO_4',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [
              {'label': '1', 'value': '1'}, {'label': '2', 'value': '2'},
              {'label': '3', 'value': '3'}, {'label': '>4', 'value': '4'}
            ],

          },
          'forceExpanded': false,
          'choicesOriginRef': 'NUMBER_1_TO_4',
          'conditionalBranches': []
        },
        {
          'id': 303,
          'name': '_3_303',
          'size': 'normal',
          'label': 'More (specificy)',
          'parent': 302,
          'editable': true,
          'nodeType': 0,
          'fieldType': 0,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': '_3_302 == \'more\''},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 304,
          'HTML':
              '<h1>How many times per week do you consume the following foods in this period?</h1>',
          'name': '_3_304',
          'size': 'normal',
          'label': '',
          'parent': 303,
          'editable': true,
          'nodeType': 0,
          'fieldType': 7,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 305,
          'HTML': '<h2>Protein:</h2>',
          'name': '',
          'size': 'normal',
          'label': '',
          'parent': 304,
          'editable': true,
          'nodeType': 0,
          'fieldType': 7,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 306,
          'name': '_3_306',
          'size': 'small',
          'label': 'Meat (goat, cow, chicken, fish)',
          'parent': 305,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 6,
            'notEmpty': true,
            'conditions': [
              {
                'condition': '_3_306 >= 0',
                'errorMessage': 'Meat cannot be negative',
                'clientValidation': true
              },
              {
                'condition': '_3_306 <= 6',
                'errorMessage': 'Meat count must be < 6',
                'clientValidation': true
              }
            ]
          },
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 307,
          'name': '_3_307',
          'size': 'small',
          'label': 'Legumes',
          'parent': 306,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 6,
            'notEmpty': true,
            'conditions': [
              {
                'condition': '_3_307 >= 0',
                'errorMessage': 'Legumes cannot be negative',
                'clientValidation': true
              },
              {
                'condition': '_3_307 <= 6',
                'errorMessage': 'Legumes count must be < 6',
                'clientValidation': true
              }
            ]
          },
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 308,
          'HTML': '<h2>Vitamins:</h2>',
          'name': '',
          'size': 'normal',
          'label': '',
          'parent': 307,
          'editable': true,
          'nodeType': 0,
          'fieldType': 7,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 309,
          'name': '_3_309',
          'size': 'small',
          'label': 'Fruits',
          'parent': 308,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 6,
            'notEmpty': true,
            'conditions': [
              {
                'condition': '_3_309 >= 0',
                'errorMessage': 'Fruits cannot be negative',
                'clientValidation': true
              },
              {
                'condition': '_3_309 <= 6',
                'errorMessage': 'Fruits count must be < 6',
                'clientValidation': true
              }
            ]
          },
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 310,
          'name': '_3_310',
          'size': 'small',
          'label': 'Vegetables',
          'parent': 309,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 6,
            'notEmpty': true,
            'conditions': [
              {
                'condition': '_3_310 >= 0',
                'errorMessage': 'vegetables cannot be negative',
                'clientValidation': true
              },
              {
                'condition': '_3_310 <= 6',
                'errorMessage': 'Vegetables count must be < 6',
                'clientValidation': true
              }
            ]
          },
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 311,
          'HTML': '<h2>Carbohydrates:</h2>',
          'name': '',
          'size': 'normal',
          'label': '',
          'parent': 310,
          'editable': true,
          'nodeType': 0,
          'fieldType': 7,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 312,
          'name': '_3_312',
          'size': 'small',
          'label': 'Rice',
          'parent': 311,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 6,
            'notEmpty': true,
            'conditions': [
              {
                'condition': '_3_312 >= 0',
                'errorMessage': 'Rice cannot be negative',
                'clientValidation': true
              },
              {
                'condition': '_3_312 <= 6',
                'errorMessage': 'Rice count must be < 6',
                'clientValidation': true
              }
            ]
          },
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 313,
          'name': '_3_313',
          'size': 'small',
          'label': 'Manioc',
          'parent': 312,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 6,
            'notEmpty': true,
            'conditions': [
              {
                'condition': 'diversity_periodically_manioc >= 0',
                'errorMessage': 'Manioc cannot be negative',
                'clientValidation': true
              },
              {
                'condition': 'diversity_periodically_manioc <= 6',
                'errorMessage': 'Manioc count must be < 6',
                'clientValidation': true
              }
            ]
          },
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 314,
          'name': '_3_314',
          'size': 'small',
          'label': 'Corn',
          'parent': 313,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 6,
            'notEmpty': true,
            'conditions': [
              {
                'condition': '_3_314 >= 0',
                'errorMessage': 'Corn cannot be negative',
                'clientValidation': true
              },
              {
                'condition': '_3_314 <= 6',
                'errorMessage': 'Corn count must be < 6',
                'clientValidation': true
              }
            ]
          },
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 315,
          'name': '_3_315',
          'size': 'small',
          'label': 'Potatoes, Yam, Tubers',
          'parent': 314,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 6,
            'notEmpty': true,
            'conditions': [
              {
                'condition': '_3_315 >= 0',
                'errorMessage': 'Potatoes, Yam, Tubers cannot be negative',
                'clientValidation': true
              },
              {
                'condition': '_3_315 <= 6',
                'errorMessage': 'Potatoes, Yam, Tubers counts must be < 6',
                'clientValidation': true
              }
            ]
          },
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 316,
          'name': '_3_316',
          'size': 'small',
          'label': 'Sorghum, Mapira',
          'parent': 315,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 6,
            'notEmpty': true,
            'conditions': [
              {
                'condition': '_3_316 >= 0',
                'errorMessage': 'Sorghum, Mapira cannot be negative',
                'clientValidation': true
              },
              {
                'condition': '_3_316 <= 6',
                'errorMessage': 'Sorghum, Mapira counts must be < 6',
                'clientValidation': true
              }
            ]
          },
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 317,
          'name': '_3_317',
          'size': 'normal',
          'label': 'Other (specify)',
          'parent': 316,
          'editable': true,
          'nodeType': 0,
          'fieldType': 0,
          'hasChoices': true,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 318,
          'name': '_3_318',
          'size': 'small',
          'label': 'How many times?',
          'parent': 317,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 6,
            'notEmpty': true,
            'conditions': [
              {
                'condition': '_3_318 >= 0',
                'errorMessage': 'cannot be negative',
                'clientValidation': true
              },
              {
                'condition': '_3_318 <= 6',
                'errorMessage': 'counts must be < 6',
                'clientValidation': true
              }
            ]
          },
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        }
      ],
      'parent': 2,
      'nodeType': 3,
      'parentNode': 0,
      'visibility': {'condition': 'true'},
      'conditionalBranches': [{'condition': 'true'}]
    },
    {
      'id': 4,
      'name': '_4',
      'label': 'FOOD SECURITY INDICATORS/02',
      'nodes': [
        {
          'id': 400,
          'name': '_4_400',
          'size': 'normal',
          'label': 'Do you believe that your diet, and that your family members, are' +
              ' adequate/sufficient for proper physical development and good health?',
          'parent': 4,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 4,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'YES_NO',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [{'label': 'Yes', 'value': 'yes'}, {'label': 'No', 'value': 'no'}],

          },
          'forceExpanded': false,
          'choicesOriginRef': 'YES_NO',
          'conditionalBranches': []
        },
        {
          'id': 401,
          'name': '_4_401',
          'size': 'normal',
          'label': 'List main weaknessess',
          'parent': 400,
          'editable': true,
          'nodeType': 0,
          'fieldType': 1,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': '_4_400 == \'no\''},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 402,
          'name': '_4_402',
          'size': 'normal',
          'label': 'Overall area of production (m2/6 month) during the last agricultural campaign',
          'parent': 401,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 4,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'PARTITION_200_TO_10000',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [
              {'label': '0-200', 'value': '0-200'}, {'label': '201-500', 'value': '201-500'},
              {'label': '501-1000', 'value': '501-1000'},
              {'label': '1001-1500', 'value': '1001-1500'},
              {'label': '1501-2000', 'value': '1501-2000'},
              {'label': '2001-5000', 'value': '2001-5000'},
              {'label': '5001-10000', 'value': '5001-10000'},
              {'label': '> 10000', 'value': '> 10000'}
            ],

          },
          'forceExpanded': false,
          'choicesOriginRef': 'PARTITION_200_TO_10000',
          'conditionalBranches': []
        },
        {
          'id': 40222,
          'name': '_4_40222',
          'size': 'normal',
          'label': 'Are you participating to the field work in the community demonstrative camp?',
          'parent': 402,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 4,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'YES_NO_SOMETIMES',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [
              {'label': 'Yes, totally', 'value': 'totally'},
              {'label': 'Yes, sometimes', 'value': 'sometimes'},
              {'label': 'Seldom', 'value': 'seldom'}, {'label': 'Never', 'value': 'never'}
            ],

          },
          'forceExpanded': false,
          'choicesOriginRef': 'YES_NO_SOMETIMES',
          'conditionalBranches': []
        },
        {
          'id': 403,
          'name': '_4_403',
          'size': 'normal',
          'label': 'Agricultural practice that you applied in your individual fields during the' +
              ' last agricultural campaign',
          'parent': 40222,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 5,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'AGRICULTURAL_PRACTICES',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [
              {
                'label': 'Agriculture Syntropical/Sustainable',
                'value': 'agriculture_syntropical_Sustainable'
              },
              {'label': 'Conservation agriculture', 'value': 'conservation_agriculture'},
              {'label': 'Traditional agriculture', 'value': 'traditional_agriculture'},
              {'label': 'Slash and burn', 'value': 'slash_and_burn'},
              {'label': 'Other', 'value': 'other'}
            ]
          },
          'forceExpanded': false,
          'choicesOriginRef': 'AGRICULTURAL_PRACTICES',
          'conditionalBranches': []
        },
        {
          'id': 40333,
          'name': '_4_40333',
          'size': 'normal',
          'label': 'For which crops do you apply syntropic agriculture?',
          'parent': 403,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 5,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility':
              {'condition': 'valueInChoice(_4_403, \'agriculture_syntropical_Sustainable\')'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'crop_seeds',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [
              {'label': 'Rice', 'value': 'rice'},
              {'label': 'Corn', 'value': 'corn'},
              {'label': 'Cassava', 'value': 'cassava'},
              {'label': 'Sweet Potato', 'value': 'sweet_potato'},
              {'label': 'Ihame', 'value': 'ihame'},
              {'label': 'Salad', 'value': 'salad'},
              {'label': 'Onion', 'value': 'onion'},
              {'label': 'Cabbage', 'value': 'cabbage'},
              {'label': 'Cucumber', 'value': 'cucumber'},
              {'label': 'Orange', 'value': 'orange'},
              {'label': 'Pineapple', 'value': 'pineapple'},
              {'label': 'Peanut', 'value': 'peanut'},
              {'label': 'Sesame', 'value': 'sesame'},
              {'label': 'Pepper', 'value': 'pepper'},
              {'label': 'Beans', 'value': 'beans'},
              {'label': 'Beet', 'value': 'beet'},
              {'label': 'Cashew Nut', 'value': 'cashew_nut'},
              {'label': 'Carrot', 'value': 'carrot'},
              {'label': 'Okra', 'value': 'okra'},
              {'label': 'Eggplant', 'value': 'eggplant'},
              {'label': 'Mango', 'value': 'mango'},
              {'label': 'Pumpkin', 'value': 'pumpkin'},
              {'label': 'Other (specify)', 'value': 'other'}
            ],

          },
          'forceExpanded': false,
          'choicesOriginRef': 'crop_seeds',
          'conditionalBranches': []
        },
        {
          'id': 404,
          'name': '_4_404',
          'size': 'normal',
          'label': 'If other, specify',
          'parent': 40333,
          'editable': true,
          'nodeType': 0,
          'fieldType': 0,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'valueInChoice(_4_403, \'other\')'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 405,
          'name': '_4_405',
          'size': 'normal',
          'label': 'Overall Food Production (KG/in the last agricultural campaign)',
          'parent': 404,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 4,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'PARTITION_50_TO_300',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [
              {'label': '0-50', 'value': '0-50'}, {'label': '51-100', 'value': '51-100'},
              {'label': '101-150', 'value': '101-150'}, {'label': '151-200', 'value': '151-200'},
              {'label': '201-250', 'value': '201-250'}, {'label': '251-300', 'value': '251-300'},
              {'label': '*300', 'value': '*300'}
            ],

          },
          'forceExpanded': false,
          'choicesOriginRef': 'PARTITION_50_TO_300',
          'conditionalBranches': []
        }
      ],
      'parent': 3,
      'nodeType': 3,
      'parentNode': 0,
      'visibility': {'condition': 'true'},
      'conditionalBranches': [{'condition': 'true'}]
    },
    {
      'id': 5,
      'name': '_5',
      'label': 'Food production per crop in the last agricultural campaign',
      'nodes': [
        {
          'id': 500,
          'name': '_5_500',
          'size': 'normal',
          'label': 'Rice',
          'parent': 5,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 501,
          'name': '_5_501',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 500,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 6,
            'notEmpty': true,
            'conditions': [{
              'condition': '_5_501 >= 0',
              'errorMessage': 'Weight cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_5_500 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 502,
          'name': '_5_502',
          'size': 'normal',
          'label': 'Corn',
          'parent': 501,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 503,
          'name': '_5_503',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 502,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 6,
            'notEmpty': true,
            'conditions': [{
              'condition': '_5_503 >= 0',
              'errorMessage': 'Weight cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_5_502 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 504,
          'name': '_5_504',
          'size': 'normal',
          'label': 'Cassava',
          'parent': 503,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 505,
          'name': '_5_505',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 504,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 6,
            'notEmpty': true,
            'conditions': [{
              'condition': '_5_505 >= 0',
              'errorMessage': 'Weight cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_5_504 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 506,
          'name': '_5_506',
          'size': 'normal',
          'label': 'Sweet Potato',
          'parent': 505,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 507,
          'name': '_5_507',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 506,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 6,
            'notEmpty': true,
            'conditions': [{
              'condition': '_5_507 >= 0',
              'errorMessage': 'Weight cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_5_506 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 508,
          'name': '_5_508',
          'size': 'normal',
          'label': 'Ihame',
          'parent': 507,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 509,
          'name': '_5_509',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 508,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 6,
            'notEmpty': true,
            'conditions': [{
              'condition': '_5_509 >= 0',
              'errorMessage': 'Weight cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_5_508 == \'true\''},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 510,
          'name': '_5_510',
          'size': 'normal',
          'label': 'Salad',
          'parent': 509,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 511,
          'name': '_5_511',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 510,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 6,
            'notEmpty': true,
            'conditions': [{
              'condition': '_5_511 >= 0',
              'errorMessage': 'Weight cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_5_510 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 512,
          'name': '_5_512',
          'size': 'normal',
          'label': 'Onion',
          'parent': 511,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 513,
          'name': '_5_513',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 512,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 6,
            'notEmpty': true,
            'conditions': [{
              'condition': '_5_513 >= 0',
              'errorMessage': 'Weight cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_5_512 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 514,
          'name': '_5_514',
          'size': 'normal',
          'label': 'Cabbage',
          'parent': 513,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 515,
          'name': '_5_515',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 514,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 6,
            'notEmpty': true,
            'conditions': [{
              'condition': '_5_515 >= 0',
              'errorMessage': 'Weight cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_5_514 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 516,
          'name': '_5_516',
          'size': 'normal',
          'label': 'Cucumber',
          'parent': 515,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 517,
          'name': '_5_517',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 516,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 6,
            'notEmpty': true,
            'conditions': [{
              'condition': '_5_517 >= 0',
              'errorMessage': 'Weight cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_5_516 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 518,
          'name': '_5_518',
          'size': 'normal',
          'label': 'Orange',
          'parent': 517,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 519,
          'name': '_5_519',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 518,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 6,
            'notEmpty': true,
            'conditions': [{
              'condition': '_5_519 >= 0',
              'errorMessage': 'Weight cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_5_518 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 520,
          'name': '_5_520',
          'size': 'normal',
          'label': 'Pineapple',
          'parent': 519,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 521,
          'name': '_5_521',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 520,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 6,
            'notEmpty': true,
            'conditions': [{
              'condition': '_5_521 >= 0',
              'errorMessage': 'Weight cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_5_520 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 522,
          'name': '_5_522',
          'size': 'normal',
          'label': 'Peanut',
          'parent': 521,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 523,
          'name': '_5_523',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 522,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 6,
            'notEmpty': true,
            'conditions': [{
              'condition': '_5_523 >= 0',
              'errorMessage': 'Weight cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_5_522 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 524,
          'name': '_5_524',
          'size': 'normal',
          'label': 'Sesame',
          'parent': 523,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 525,
          'name': '_5_525',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 524,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 6,
            'notEmpty': true,
            'conditions': [{
              'condition': '_5_525 >= 0',
              'errorMessage': 'Weight cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_5_524 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 526,
          'name': '_5_526',
          'size': 'normal',
          'label': 'Pepper',
          'parent': 525,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 527,
          'name': '_5_527',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 526,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 6,
            'notEmpty': true,
            'conditions': [{
              'condition': '_5_527 >= 0',
              'errorMessage': 'Weight cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_5_526 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 528,
          'name': '_5_528',
          'size': 'normal',
          'label': 'Beans',
          'parent': 527,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 529,
          'name': '_5_529',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 528,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 6,
            'notEmpty': true,
            'conditions': [{
              'condition': '_5_529 >= 0',
              'errorMessage': 'Weight cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_5_528 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 530,
          'name': '_5_530',
          'size': 'normal',
          'label': 'Beet',
          'parent': 529,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 531,
          'name': '_5_531',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 530,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 6,
            'notEmpty': true,
            'conditions': [{
              'condition': '_5_531 >= 0',
              'errorMessage': 'Weight cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_5_530 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 532,
          'name': '_5_532',
          'size': 'normal',
          'label': 'Cashew Nut',
          'parent': 531,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 533,
          'name': '_5_533',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 532,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 6,
            'notEmpty': true,
            'conditions': [{
              'condition': '_5_533 >= 0',
              'errorMessage': 'Weight cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_5_532 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 534,
          'name': '_5_534',
          'size': 'normal',
          'label': 'Carrot',
          'parent': 533,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 535,
          'name': '_5_535',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 534,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 6,
            'notEmpty': true,
            'conditions': [{
              'condition': '_5_535 >= 0',
              'errorMessage': 'Weight cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_5_534 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 536,
          'name': '_5_536',
          'size': 'normal',
          'label': 'Okra',
          'parent': 535,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 537,
          'name': '_5_537',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 536,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 6,
            'notEmpty': true,
            'conditions': [{
              'condition': '_5_537 >= 0',
              'errorMessage': 'Weight cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_5_536 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 538,
          'name': '_5_538',
          'size': 'normal',
          'label': 'Eggplant',
          'parent': 537,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 539,
          'name': '_5_539',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 538,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 6,
            'notEmpty': true,
            'conditions': [{
              'condition': '_5_539 >= 0',
              'errorMessage': 'Weight cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_5_538 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 540,
          'name': '_5_540',
          'size': 'normal',
          'label': 'Mango',
          'parent': 539,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 541,
          'name': '_5_541',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 540,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 6,
            'notEmpty': true,
            'conditions': [{
              'condition': '_5_541 >= 0',
              'errorMessage': 'Weight cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_5_540 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 542,
          'name': '_5_542',
          'size': 'normal',
          'label': 'Pumpkin',
          'parent': 541,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 543,
          'name': '_5_543',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 542,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 6,
            'notEmpty': true,
            'conditions': [{
              'condition': '_5_543 >= 0',
              'errorMessage': 'Weight cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_5_542 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 544,
          'name': '_5_544',
          'size': 'normal',
          'label': 'Other (specificy)',
          'parent': 543,
          'editable': true,
          'nodeType': 0,
          'fieldType': 0,
          'hasChoices': true,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 545,
          'name': '_5_545',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 544,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 6,
            'notEmpty': true,
            'conditions': [{
              'condition': '_5_545 >= 0',
              'errorMessage': 'Weight cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_5_544'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 54666,
          'name': 'prod_volume',
          'size': 'normal',
          'label': 'Overall volume of production (KG)',
          'parent': 545,
          'formula': {
            'formula': '_5_501+_5_503+_5_505+_5_507+_5_509 + _5_511+_5_513+_5_515+_5_517+_5_519' +
                '+ _5_521+_5_523+_5_525+_5_527+_5_529+_5_531+_5_533+_5_535+_5_537+_5_539+_5_541' +
                '+_5_543+_5_545'
          },
          'editable': false,
          'nodeType': 0,
          'fieldType': 6,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 546,
          'name': '_5_546',
          'size': 'normal',
          'label': 'Do you use any irrigation system?',
          'parent': 54666,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 4,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'YES_NO',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [{'label': 'Yes', 'value': 'yes'}, {'label': 'No', 'value': 'no'}],

          },
          'forceExpanded': false,
          'choicesOriginRef': 'YES_NO',
          'conditionalBranches': []
        },
        {
          'id': 547,
          'name': '_5_547',
          'size': 'normal',
          'label': 'Type of irrigation',
          'parent': 546,
          'editable': true,
          'nodeType': 0,
          'fieldType': 0,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': '_5_546 == \'yes\''},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 548,
          'name': '_5_548',
          'size': 'normal',
          'label': 'Why',
          'parent': 547,
          'editable': true,
          'nodeType': 0,
          'fieldType': 0,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': '_5_546 == \'no\''},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 5490,
          'name': '_5_5490',
          'size': 'normal',
          'label': 'Do you use your own seeds for farming?',
          'parent': 548,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 4,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'YES_NO',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [{'label': 'Yes', 'value': 'yes'}, {'label': 'No', 'value': 'no'}],

          },
          'forceExpanded': false,
          'choicesOriginRef': 'YES_NO',
          'conditionalBranches': []
        },
        {
          'id': 5491,
          'name': 'self_prod',
          'size': 'normal',
          'label': 'Which of these crop seeds are self-produced?',
          'parent': 5490,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 5,
          'parentNode': 0,
          'visibility': {'condition': '_5_5490 === "yes"'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'crop_seeds',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [
              {'label': 'Rice', 'value': 'rice'},
              {'label': 'Corn', 'value': 'corn'},
              {'label': 'Cassava', 'value': 'cassava'},
              {'label': 'Sweet Potato', 'value': 'sweet_potato'},
              {'label': 'Ihame', 'value': 'ihame'},
              {'label': 'Salad', 'value': 'salad'},
              {'label': 'Onion', 'value': 'onion'},
              {'label': 'Cabbage', 'value': 'cabbage'},
              {'label': 'Cucumber', 'value': 'cucumber'},
              {'label': 'Orange', 'value': 'orange'},
              {'label': 'Pineapple', 'value': 'pineapple'},
              {'label': 'Peanut', 'value': 'peanut'},
              {'label': 'Sesame', 'value': 'sesame'},
              {'label': 'Pepper', 'value': 'pepper'},
              {'label': 'Beans', 'value': 'beans'},
              {'label': 'Beet', 'value': 'beet'},
              {'label': 'Cashew Nut', 'value': 'cashew_nut'},
              {'label': 'Carrot', 'value': 'carrot'},
              {'label': 'Okra', 'value': 'okra'},
              {'label': 'Eggplant', 'value': 'eggplant'},
              {'label': 'Mango', 'value': 'mango'},
              {'label': 'Pumpkin', 'value': 'pumpkin'},
              {'label': 'Other (specify)', 'value': 'other'}
            ],

          },
          'forceExpanded': false,
          'choicesOriginRef': 'crop_seeds',
          'conditionalBranches': []
        },
        {
          'id': 5492,
          'name': 'self_prod_other',
          'size': 'normal',
          'label': 'If other, specify',
          'parent': 5491,
          'editable': true,
          'nodeType': 0,
          'fieldType': 0,
          'parentNode': 0,
          'visibility': {'condition': 'valueInChoice(self_prod, "other")'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 5510,
          'name': '_5_5510',
          'size': 'normal',
          'label': 'What type of fertilizer do you use for farming?',
          'parent': 5492,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 5,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'fertilizer_type',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [
              {'label': 'Organic', 'value': 'organic'},
              {'label': 'Non-organic', 'value': 'non-organic'}, {'label': 'None', 'value': 'none'}
            ]
          },
          'forceExpanded': false,
          'choicesOriginRef': 'fertilizer_type',
          'conditionalBranches': []
        },
        {
          'id': 551,
          'name': '_5_551',
          'size': 'normal',
          'label': 'Do you use compost?',
          'parent': 5510,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 4,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'YES_NO',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [{'label': 'Yes', 'value': 'yes'}, {'label': 'No', 'value': 'no'}],

          },
          'forceExpanded': false,
          'choicesOriginRef': 'YES_NO',
          'conditionalBranches': []
        },
        {
          'id': 553,
          'name': '_5_553',
          'size': 'normal',
          'label': 'Do you produce your own compost/fertilizer?',
          'parent': 551,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 4,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': '_5_551 == \'yes\''},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'YES_NO',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [{'label': 'Yes', 'value': 'yes'}, {'label': 'No', 'value': 'no'}],

          },
          'forceExpanded': false,
          'choicesOriginRef': 'YES_NO',
          'conditionalBranches': []
        },
        {
          'id': 55333,
          'name': '_5_55333',
          'size': 'normal',
          'label': 'For how many months have you been producing your own fertilizer?',
          'parent': 553,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': '_5_553 == \'yes\''},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 55334,
          'name': '_5_55334',
          'size': 'normal',
          'label':
              'Did you learn from the project how to produce and use your own compost/fertilizer?',
          'parent': 55333,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 4,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': '_5_553 == \'yes\''},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'YES_NO',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [{'label': 'Yes', 'value': 'yes'}, {'label': 'No', 'value': 'no'}],

          },
          'forceExpanded': false,
          'choicesOriginRef': 'YES_NO',
          'conditionalBranches': []
        },
        {
          'id': 554,
          'name': '_5_554',
          'size': 'normal',
          'label': 'Do you use more fertilizer purchased or self-produced?',
          'parent': 55334,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 4,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': '_5_551 == \'yes\''},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'FERTILIZER_PURCHASED_OR_SELF_PRODUCED',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [
              {'label': 'Purchased', 'value': 'purchased'},
              {'label': 'Self-produced fertilizer', 'value': 'Self-produced_fertilizer'}
            ],

          },
          'forceExpanded': false,
          'choicesOriginRef': 'FERTILIZER_PURCHASED_OR_SELF_PRODUCED',
          'conditionalBranches': []
        },
        {
          'id': 5550,
          'name': '_5_555',
          'size': 'normal',
          'label': 'Do you use pesticides?',
          'parent': 554,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 4,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'YES_NO',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [{'label': 'Yes', 'value': 'yes'}, {'label': 'No', 'value': 'no'}],

          },
          'forceExpanded': false,
          'choicesOriginRef': 'YES_NO',
          'conditionalBranches': []
        },
        {
          'id': 555,
          'name': '_5_5550',
          'size': 'normal',
          'label': 'What type of pesticides do you use for farming?',
          'parent': 5550,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 5,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': '_5_555 === "yes"'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'ORGANIC_OR_NOT',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [
              {'label': 'Organic', 'value': 'organic'},
              {'label': 'Non-organic', 'value': 'non-organic'}
            ]
          },
          'forceExpanded': false,
          'choicesOriginRef': 'ORGANIC_OR_NOT',
          'conditionalBranches': []
        },
        {
          'id': 557,
          'name': '_5_557',
          'size': 'normal',
          'label': 'Do you produce your own pesticide?',
          'parent': 555,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 4,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': '_5_555 == \'yes\''},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'YES_NO',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [{'label': 'Yes', 'value': 'yes'}, {'label': 'No', 'value': 'no'}],

          },
          'forceExpanded': false,
          'choicesOriginRef': 'YES_NO',
          'conditionalBranches': []
        },
        {
          'id': 55777,
          'name': '_5_55777',
          'size': 'normal',
          'label': 'For how many months have you been producing your own pesticide?',
          'parent': 557,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': '_5_557 == \'yes\''},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 558,
          'name': '_5_558',
          'size': 'normal',
          'label': 'Do you use more pesticide purchased or self-produced?',
          'parent': 55777,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 4,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': '_5_555 == \'yes\''},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'PESTICIDIES_PURCHASED_OR_SELF_PRODUCED',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [
              {'label': 'Purchased', 'value': 'purchased'},
              {'label': 'Self-produced pesticides', 'value': 'Self-produced_pesticides'}
            ],

          },
          'forceExpanded': false,
          'choicesOriginRef': 'PESTICIDIES_PURCHASED_OR_SELF_PRODUCED',
          'conditionalBranches': []
        },
        {
          'id': 559,
          'name': '_5_559',
          'size': 'normal',
          'label': 'Do you use another type of method of control of the curses and diseases?',
          'parent': 558,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 4,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'YES_NO',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [{'label': 'Yes', 'value': 'yes'}, {'label': 'No', 'value': 'no'}],

          },
          'forceExpanded': false,
          'choicesOriginRef': 'YES_NO',
          'conditionalBranches': []
        },
        {
          'id': 560,
          'name': '_5_560',
          'size': 'normal',
          'label': 'Which?',
          'parent': 559,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 4,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': '_5_559 == \'yes\''},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'METHOD_OF_CONTROL',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [
              {'label': 'Cultural', 'value': 'cultural'},
              {'label': 'Biological', 'value': 'biological'},
              {'label': 'Mechanical', 'value': 'mechanical'},
              {'label': 'Integrated', 'value': 'integrated'}, {'label': 'Other', 'value': 'other'}
            ]
          },
          'forceExpanded': false,
          'choicesOriginRef': 'METHOD_OF_CONTROL',
          'conditionalBranches': []
        },
        {
          'id': 561,
          'name': '_5_561',
          'size': 'normal',
          'label': '',
          'parent': 560,
          'editable': true,
          'nodeType': 0,
          'fieldType': 0,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': '_5_560 == \'other\''},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 562,
          'name': '_5_562',
          'size': 'normal',
          'label': 'Why?',
          'parent': 561,
          'editable': true,
          'nodeType': 0,
          'fieldType': 0,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': '_5_559 == \'no\''},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 563,
          'name': '_5_563',
          'size': 'normal',
          'label': 'How many months in the last agricultural campaign are you able to produce?',
          'parent': 562,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 4,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'PARTITION_3_TO_12',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [
              {'label': 'from 1 to 3', 'value': 'from_1_to_3'},
              {'label': 'from 4 to 6', 'value': 'from_4_to_6'},
              {'label': 'from 7 to 9', 'value': 'from_7_to_9'},
              {'label': 'from 10 to 12', 'value': 'from_10_to_12'}
            ]
          },
          'forceExpanded': false,
          'choicesOriginRef': 'PARTITION_3_TO_12',
          'conditionalBranches': []
        },
        {
          'id': 564,
          'name': '_5_564',
          'size': 'small',
          'label': 'How many crops do you grow in the last agricultural campaign?',
          'parent': 563,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'notEmpty': true,
            'conditions': [{
              'condition': '_5_564 >= 0',
              'errorMessage': 'Number cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 565,
          'name': '_5_565',
          'size': 'normal',
          'label': 'Do you produce organic agricultural products?',
          'parent': 564,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 4,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'YES_NO',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [{'label': 'Yes', 'value': 'yes'}, {'label': 'No', 'value': 'no'}],

          },
          'forceExpanded': false,
          'choicesOriginRef': 'YES_NO',
          'conditionalBranches': []
        },
        {
          'id': 567,
          'name': 'kg_sold',
          'size': 'normal',
          'label':
              'How many KG of what you produced in the last agricultural campaign did you sell?',
          'parent': 565,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 569,
          'name': '_5_569',
          'size': 'normal',
          'label': 'Please, specify',
          'parent': 567,
          'editable': true,
          'nodeType': 0,
          'fieldType': 0,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'valueInChoice(_5_568, \'other\')'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 570,
          'name': '_5_570',
          'size': 'normal',
          'label': 'In your daily activity, are you informed about weather conditions, market' +
              ' prices, events and fairs for sale and visibility?',
          'parent': 569,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 4,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'YES_NO',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [{'label': 'Yes', 'value': 'yes'}, {'label': 'No', 'value': 'no'}],

          },
          'forceExpanded': false,
          'choicesOriginRef': 'YES_NO',
          'conditionalBranches': []
        },
        {
          'id': 571,
          'name': '_5_571',
          'size': 'small',
          'label': 'how do you have access to this type of information?',
          'parent': 570,
          'editable': true,
          'nodeType': 0,
          'fieldType': 0,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': '_5_570 == \'yes\''},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 572,
          'name': '_5_572',
          'size': 'normal',
          'label': 'What do you think are the biggest obstacles to the productivity of your' +
              ' fields? (Max 3 choices)',
          'parent': 571,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 5,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'OBSTACLES',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [
              {'label': 'Water availability', 'value': 'water_availability'},
              {'label': 'Seeds availability', 'value': 'seeds_availability'},
              {'label': 'Cost of seeds', 'value': 'seeds_cost'},
              {'label': 'Cost of fertilizer', 'value': 'fertilizer_cost'},
              {'label': 'Equipments', 'value': 'equipments'},
              {'label': 'Seeds quality', 'value': 'seeds_quality'},
              {'label': 'Fertilizers availability', 'value': 'fertilizers_availability'},
              {'label': 'Extension of cultivated land', 'value': 'extension_of_cultivated_land'},
              {'label': 'Credit', 'value': 'credit'},
              {'label': 'Technologies', 'value': 'technologies'},
              {'label': 'Other (specify)', 'value': 'other'}
            ]
          },
          'forceExpanded': false,
          'choicesOriginRef': 'OBSTACLES',
          'conditionalBranches': []
        },
        {
          'id': 573,
          'name': '_5_573',
          'size': 'normal',
          'label': 'Please, explain briefly why',
          'parent': 572,
          'editable': true,
          'nodeType': 0,
          'fieldType': 0,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'valueInChoice(_5_572, \'other\')'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 575,
          'name': '_5_575',
          'size': 'normal',
          'label': 'Which is the situation of the crops of your field?',
          'parent': 573,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 5,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'PRODUCTION_SHARE',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [
              {'label': 'Good growth', 'value': 'good_growth'},
              {'label': 'Low growth', 'value': 'low_growth'},
              {'label': 'Medium growth', 'value': 'medium_growth'},
              {'label': 'Attack of curses', 'value': 'attack_of_curses'},
              {'label': 'Excessive heatstroke', 'value': 'excessive_heatstroke'},
              {'label': 'Flood', 'value': 'flood'},
              {'label': 'Uncontrolled burning', 'value': 'uncontrolled_burning'}
            ]
          },
          'forceExpanded': false,
          'choicesOriginRef': 'PRODUCTION_SHARE',
          'conditionalBranches': []
        }
      ],
      'parent': 4,
      'nodeType': 3,
      'parentNode': 0,
      'visibility': {'condition': 'true'},
      'conditionalBranches': [{'condition': 'true'}]
    },
    {
      'id': 6,
      'name': '_6',
      'label': 'RESULT 2 - INDICATORS',
      'nodes': [
        {
          'id': 600,
          'HTML': '<h1>How many KG of your agricultural production was earmarked for sale' +
              ' in the last agricultural campaign?</h1>',
          'name': 'result_2_indicators_text_1',
          'size': 'normal',
          'label': '',
          'parent': 6,
          'editable': true,
          'nodeType': 0,
          'fieldType': 7,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 601,
          'name': '_6_601',
          'size': 'normal',
          'label': 'Rice',
          'parent': 600,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 602,
          'name': '_6_602',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 601,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_602 >= 0',
              'errorMessage': 'value cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_601 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 603,
          'name': '_6_603',
          'size': 'normal',
          'label': 'Corn',
          'parent': 602,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 604,
          'name': '_6_604',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 603,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_604 >= 0',
              'errorMessage': 'value cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_603 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 605,
          'name': '_6_605',
          'size': 'normal',
          'label': 'Cassava',
          'parent': 604,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 606,
          'name': '_6_606',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 605,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_606 >= 0',
              'errorMessage': 'value cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_605 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 607,
          'name': '_6_607',
          'size': 'normal',
          'label': 'Sweet Potato',
          'parent': 606,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 608,
          'name': '_6_608',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 607,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_608 >= 0',
              'errorMessage': 'value cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_607 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 609,
          'name': '_6_609',
          'size': 'normal',
          'label': 'Ihame',
          'parent': 608,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 610,
          'name': '_6_610',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 609,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_610 >= 0',
              'errorMessage': 'value cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_609 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 611,
          'name': '_6_611',
          'size': 'normal',
          'label': 'Salad',
          'parent': 610,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 612,
          'name': '_6_612',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 611,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_612 >= 0',
              'errorMessage': 'value cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_611 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 613,
          'name': '_6_613',
          'size': 'normal',
          'label': 'Onion',
          'parent': 612,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 614,
          'name': '_6_614',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 613,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_614 >= 0',
              'errorMessage': 'value cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_613 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 615,
          'name': '_6_615',
          'size': 'normal',
          'label': 'Cabbage',
          'parent': 614,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 616,
          'name': '_6_616',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 615,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_616 >= 0',
              'errorMessage': 'value cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_615 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 617,
          'name': '_6_617',
          'size': 'normal',
          'label': 'Cucumber',
          'parent': 616,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 618,
          'name': '_6_618',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 617,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_618 >= 0',
              'errorMessage': 'value cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_617 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 619,
          'name': '_6_619',
          'size': 'normal',
          'label': 'Orange',
          'parent': 618,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 620,
          'name': '_6_620',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 619,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_620 >= 0',
              'errorMessage': 'value cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_619 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 621,
          'name': '_6_621',
          'size': 'normal',
          'label': 'Pineapple',
          'parent': 620,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 622,
          'name': '_6_622',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 621,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_622 >= 0',
              'errorMessage': 'value cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_621 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 623,
          'name': '_6_623',
          'size': 'normal',
          'label': 'Peanut',
          'parent': 622,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 624,
          'name': '_6_624',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 623,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_624 >= 0',
              'errorMessage': 'value cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_623 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 625,
          'name': '_6_625',
          'size': 'normal',
          'label': 'Sesame',
          'parent': 624,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 626,
          'name': '_6_626',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 625,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_626 >= 0',
              'errorMessage': 'value cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_625 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 627,
          'name': '_6_627',
          'size': 'normal',
          'label': 'Pepper',
          'parent': 626,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 628,
          'name': '_6_628',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 627,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_628 >= 0',
              'errorMessage': 'value cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_627 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 629,
          'name': '_6_629',
          'size': 'normal',
          'label': 'Beans',
          'parent': 628,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 630,
          'name': '_6_630',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 629,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_630 >= 0',
              'errorMessage': 'value cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_629 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 631,
          'name': '_6_631',
          'size': 'normal',
          'label': 'Beet',
          'parent': 630,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 632,
          'name': '_6_632',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 631,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_632 >= 0',
              'errorMessage': 'value cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_631 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 633,
          'name': '_6_633',
          'size': 'normal',
          'label': 'Cashew Nut',
          'parent': 632,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 634,
          'name': '_6_634',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 633,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_634 >= 0',
              'errorMessage': 'value cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_633 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 635,
          'name': '_6_635',
          'size': 'normal',
          'label': 'Carrot',
          'parent': 634,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 636,
          'name': '_6_636',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 635,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_636 >= 0',
              'errorMessage': 'value cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_635 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 637,
          'name': '_6_637',
          'size': 'normal',
          'label': 'Okra',
          'parent': 636,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 638,
          'name': '_6_638',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 637,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_638 >= 0',
              'errorMessage': 'value cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_637 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 639,
          'name': '_6_639',
          'size': 'normal',
          'label': 'Eggplant',
          'parent': 638,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 640,
          'name': '_6_640',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 639,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_640 >= 0',
              'errorMessage': 'value cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_639 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 641,
          'name': '_6_641',
          'size': 'normal',
          'label': 'Mango',
          'parent': 640,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 642,
          'name': '_6_642',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 641,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_642 >= 0',
              'errorMessage': 'value cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_641 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 643,
          'name': '_6_643',
          'size': 'normal',
          'label': 'Pumpkin',
          'parent': 642,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 644,
          'name': '_6_644',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 643,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_644 >= 0',
              'errorMessage': 'value cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_643 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 645,
          'name': '_6_645',
          'size': 'normal',
          'label': 'Other (specificy)',
          'parent': 644,
          'editable': true,
          'nodeType': 0,
          'fieldType': 0,
          'hasChoices': true,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 646,
          'name': '_6_646',
          'size': 'small',
          'label': 'Weight (Kg)',
          'parent': 645,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_646 >= 0',
              'errorMessage': 'value cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_645'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 647,
          'name': '_6_647',
          'size': 'small',
          'label': 'Overall volume of production sold (KG)',
          'parent': 646,
          'formula': {
            'formula': '_6_602+_6_604+_6_606+_6_608 + _6_610+_6_612+_6_614+_6_616+_6_618+_6_620' +
                '+_6_622+_6_624+_6_626+_6_628+_6_630+_6_632+_6_634+_6_636+_6_638+_6_640+_6_642' +
                '+_6_644+_6_646'
          },
          'editable': false,
          'nodeType': 0,
          'fieldType': 6,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 648,
          'name': '_6_648',
          'size': 'small',
          'label': 'How much do you earn in the last agricultural campaign from the sale of' +
              ' agricultural products from your field?',
          'parent': 647,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_648 >= 0',
              'errorMessage': 'cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 649,
          'HTML': '<h1>Price per crop/KG in the last agri campaign</h1>',
          'name': '_6_649',
          'size': 'normal',
          'label': '',
          'parent': 648,
          'editable': true,
          'nodeType': 0,
          'fieldType': 7,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 650,
          'name': '_6_650',
          'size': 'normal',
          'label': 'Rice',
          'parent': 649,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 651,
          'name': '_6_651',
          'size': 'small',
          'label': 'Meticais/KG Number',
          'parent': 650,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_651 >= 0',
              'errorMessage': 'percentage cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_650 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 652,
          'name': '_6_652',
          'size': 'normal',
          'label': 'Corn',
          'parent': 651,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 653,
          'name': '_6_653',
          'size': 'small',
          'label': 'Meticais/KG Number',
          'parent': 652,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_653 >= 0',
              'errorMessage': 'percentage cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_652 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 654,
          'name': '_6_654',
          'size': 'normal',
          'label': 'Cassava',
          'parent': 653,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 655,
          'name': '_6_655',
          'size': 'small',
          'label': 'Meticais/KG Number',
          'parent': 654,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_655 >= 0',
              'errorMessage': 'percentage cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_654 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 656,
          'name': '_6_656',
          'size': 'normal',
          'label': 'Sweet Potato',
          'parent': 655,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 657,
          'name': '_6_657',
          'size': 'small',
          'label': 'Meticais/KG Number',
          'parent': 656,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_657 >= 0',
              'errorMessage': 'percentage cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_656 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 658,
          'name': '_6_658',
          'size': 'normal',
          'label': 'Ihame',
          'parent': 657,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 659,
          'name': '_6_659',
          'size': 'small',
          'label': 'Meticais/KG Number',
          'parent': 658,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_659 >= 0',
              'errorMessage': 'percentage cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_658 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 660,
          'name': '_6_660',
          'size': 'normal',
          'label': 'Salad',
          'parent': 659,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 661,
          'name': '_6_661',
          'size': 'small',
          'label': 'Meticais/KG Number',
          'parent': 600,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_661 >= 0',
              'errorMessage': 'percentage cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_660 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 662,
          'name': '_6_662',
          'size': 'normal',
          'label': 'Onion',
          'parent': 661,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 663,
          'name': '_6_663',
          'size': 'small',
          'label': 'Meticais/KG Number',
          'parent': 662,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_663 >= 0',
              'errorMessage': 'percentage cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_662 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 664,
          'name': '_6_664',
          'size': 'normal',
          'label': 'Cabbage',
          'parent': 663,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 665,
          'name': '_6_665',
          'size': 'small',
          'label': 'Meticais/KG Number',
          'parent': 664,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_665 >= 0',
              'errorMessage': 'percentage cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_664 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 666,
          'name': '_6_666',
          'size': 'normal',
          'label': 'Cucumber',
          'parent': 665,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 667,
          'name': '_6_667',
          'size': 'small',
          'label': 'Meticais/KG Number',
          'parent': 666,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_667 >= 0',
              'errorMessage': 'percentage cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_666 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 668,
          'name': '_6_668',
          'size': 'normal',
          'label': 'Orange',
          'parent': 667,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 669,
          'name': '_6_669',
          'size': 'small',
          'label': 'Meticais/KG Number',
          'parent': 668,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_669 >= 0',
              'errorMessage': 'percentage cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_668 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 670,
          'name': '_6_670',
          'size': 'normal',
          'label': 'Pineapple',
          'parent': 669,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 671,
          'name': '_6_671',
          'size': 'small',
          'label': 'Meticais/KG Number',
          'parent': 670,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_671 >= 0',
              'errorMessage': 'percentage cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_670 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 672,
          'name': '_6_672',
          'size': 'normal',
          'label': 'Peanut',
          'parent': 671,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 673,
          'name': '_6_673',
          'size': 'small',
          'label': 'Meticais/KG Number',
          'parent': 672,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_673 >= 0',
              'errorMessage': 'percentage cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_672 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 674,
          'name': '_6_674',
          'size': 'normal',
          'label': 'Sesame',
          'parent': 673,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 675,
          'name': '_6_675',
          'size': 'small',
          'label': 'Meticais/KG Number',
          'parent': 674,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_675 >= 0',
              'errorMessage': 'percentage cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_674 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 676,
          'name': '_6_676',
          'size': 'normal',
          'label': 'Pepper',
          'parent': 675,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 677,
          'name': '_6_677',
          'size': 'small',
          'label': 'Meticais/KG Number',
          'parent': 674,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_677 >= 0',
              'errorMessage': 'percentage cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_676 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 678,
          'name': '_6_678',
          'size': 'normal',
          'label': 'Beans',
          'parent': 677,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 679,
          'name': '_6_679',
          'size': 'small',
          'label': 'Meticais/KG Number',
          'parent': 678,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_679 >= 0',
              'errorMessage': 'percentage cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_678 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 680,
          'name': '_6_680',
          'size': 'normal',
          'label': 'Beet',
          'parent': 679,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 681,
          'name': '_6_681',
          'size': 'small',
          'label': 'Meticais/KG Number',
          'parent': 680,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_681 >= 0',
              'errorMessage': 'percentage cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_680 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 682,
          'name': '_6_682',
          'size': 'normal',
          'label': 'Cashew Nut',
          'parent': 681,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 683,
          'name': '_6_683',
          'size': 'small',
          'label': 'Meticais/KG Number',
          'parent': 682,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_683 >= 0',
              'errorMessage': 'percentage cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_682 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 684,
          'name': '_6_684',
          'size': 'normal',
          'label': 'Carrot',
          'parent': 683,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 685,
          'name': '_6_685',
          'size': 'small',
          'label': 'Meticais/KG Number',
          'parent': 684,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_685 >= 0',
              'errorMessage': 'percentage cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_684 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 686,
          'name': '_6_686',
          'size': 'normal',
          'label': 'Okra',
          'parent': 685,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 687,
          'name': '_6_687',
          'size': 'small',
          'label': 'Meticais/KG Number',
          'parent': 686,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_687 >= 0',
              'errorMessage': 'percentage cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_686 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 688,
          'name': '_6_688',
          'size': 'normal',
          'label': 'Eggplant',
          'parent': 687,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 689,
          'name': '_6_689',
          'size': 'small',
          'label': 'Meticais/KG Number',
          'parent': 688,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_689 >= 0',
              'errorMessage': 'percentage cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_688 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 690,
          'name': '_6_690',
          'size': 'normal',
          'label': 'Mango',
          'parent': 689,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 691,
          'name': '_6_691',
          'size': 'small',
          'label': 'Meticais/KG Number',
          'parent': 690,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_691 >= 0',
              'errorMessage': 'percentage cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_690 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 692,
          'name': '_6_692',
          'size': 'normal',
          'label': 'Pumpkin',
          'parent': 691,
          'editable': true,
          'nodeType': 0,
          'fieldType': 3,
          'hasChoices': false,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 693,
          'name': '_6_693',
          'size': 'small',
          'label': 'Meticais/KG Number',
          'parent': 692,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_693 >= 0',
              'errorMessage': 'percentage cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_692 == true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 694,
          'name': '_6_694',
          'size': 'normal',
          'label': 'Other (specificy)',
          'parent': 693,
          'editable': true,
          'nodeType': 0,
          'fieldType': 0,
          'hasChoices': true,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 695,
          'name': '_6_695',
          'size': 'small',
          'label': 'Meticais/KG Number',
          'parent': 694,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_695 >= 0',
              'errorMessage': 'Weight cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': '_6_694'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 64999,
          'name': '_6_64999',
          'size': 'normal',
          'label': 'Total monthly income from agricultural activity (Meticais)',
          'parent': 695,
          'formula': {
            'formula': '_6_602*_6_651+_6_604*_6_653+_6_606*_6_655+_6_608*_6_657+_6_610*_6_659' +
                '+_6_612*_6_661+_6_614*_6_663+_6_616*_6_665+_6_618*_6_667+_6_620*_6_669+_6_622' +
                '*_6_671+_6_624*_6_673+_6_626*_6_675+_6_628*_6_677+_6_630*_6_679+_6_632*_6_681' +
                '+_6_634*_6_683+_6_636*_6_685+_6_638*_6_687+_6_640*_6_689+_6_642*_6_691+_6_644' +
                '*_6_693+_6_646*_6_695'
          },
          'editable': false,
          'nodeType': 0,
          'fieldType': 6,
          'parentNode': 0,
          'visibility': {'condition': 'valueInChoice(_2_200, \'farmer\')'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 568,
          'name': '_5_568',
          'size': 'normal',
          'label': 'Application of the value of the sale',
          'parent': 64999,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 5,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'APPLICATION_VALUE',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [
              {'label': 'Domestic utensils', 'value': 'domestic_utensils'},
              {'label': 'Seeds', 'value': 'seeds'}, {'label': 'Equipments', 'value': 'equipments'},
              {'label': 'Labor payment in the field', 'value': 'labor_payment_in_the_field'},
              {'label': 'Domestic applicances', 'value': 'domestic_applicances'},
              {'label': 'Agricultural inputs', 'value': 'agricultural_inputs'},
              {'label': 'Other', 'value': 'other'}
            ]
          },
          'forceExpanded': false,
          'choicesOriginRef': 'APPLICATION_VALUE',
          'conditionalBranches': []
        },
        {
          'id': 696,
          'name': '_6_696',
          'size': 'normal',
          'label': 'Do you use storage systems',
          'parent': 568,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 4,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'YES_NO',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [{'label': 'Yes', 'value': 'yes'}, {'label': 'No', 'value': 'no'}],

          },
          'forceExpanded': false,
          'choicesOriginRef': 'YES_NO',
          'conditionalBranches': []
        },
        {
          'id': 697,
          'name': '_6_697',
          'size': 'normal',
          'label': 'please specify type/location/distance from cultivated lands',
          'parent': 696,
          'editable': true,
          'nodeType': 0,
          'fieldType': 0,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': '_6_696 == \'yes\''},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 699,
          'name': '_6_699',
          'size': 'small',
          'label': 'Difference between KG produced and KG sold',
          'parent': 697,
          'formula': {
            'formula': '(_5_501+_5_503+_5_505+_5_507+_5_509+_5_511+_5_513+_5_515+_5_517+_5_519' +
                '+_5_521+_5_523+_5_525+_5_527+_5_529 + _5_531+_5_533+_5_535+_5_537+_5_539+_5_541' +
                '+_5_543+_5_545) - (_6_602+_6_604+_6_606+_6_608+_6_610+_6_612+_6_614+_6_616' +
                '+_6_618+ _6_620+_6_622+_6_624+_6_626+_6_628+_6_630+_6_632+_6_634+_6_636+_6_638' +
                '+ _6_640+_6_642+_6_644+_6_646)'
          },
          'editable': false,
          'nodeType': 0,
          'fieldType': 6,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 5999,
          'name': '_6_6000',
          'size': 'normal',
          'label': 'How do you transport your agricultural products to the market?',
          'parent': 699,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 4,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'transport',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [
              {'label': 'My own means of transport', 'value': 'own_means'},
              {'label': 'Project bicycle', 'value': 'bicycle'},
              {'label': 'Project truck', 'value': 'truck'}, {'label': 'Taxi', 'value': 'taxi'},
              {'label': 'Other', 'value': 'other'}
            ],

          },
          'forceExpanded': false,
          'choicesOriginRef': 'transport',
          'conditionalBranches': []
        },
        {
          'id': 6000,
          'name': 'transport_other',
          'size': 'normal',
          'label': 'If other, specify',
          'parent': 5999,
          'editable': true,
          'nodeType': 0,
          'fieldType': 0,
          'parentNode': 0,
          'visibility': {'condition': 'transport === "other"'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 6001,
          'name': '_6_6001',
          'size': 'small',
          'label': 'Average delivery time from the producer to retailers and/or point of sale',
          'parent': 6000,
          'editable': true,
          'nodeType': 0,
          'fieldType': 2,
          'hasChoices': false,
          'parentNode': 0,
          'validation': {
            'maxValue': 100,
            'notEmpty': true,
            'conditions': [{
              'condition': '_6_6001 >= 0',
              'errorMessage': 'cannot be negative',
              'clientValidation': true
            }]
          },
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 6002,
          'name': '_6_6002',
          'size': 'normal',
          'label': 'What are your sales channels?',
          'parent': 6001,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 5,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'SALES_CHANNELS',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [
              {'label': 'cooperatives', 'value': 'cooperatives'},
              {'label': 'market', 'value': 'market'}, {'label': 'street', 'value': 'street'},
              {'label': 'fairs', 'value': 'fairs'}, {'label': 'Field sale', 'value': 'field_sale'},
              {'label': 'other', 'value': 'other'}
            ]
          },
          'forceExpanded': false,
          'choicesOriginRef': 'SALES_CHANNELS',
          'conditionalBranches': []
        },
        {
          'id': 60022,
          'name': '_6_60022',
          'size': 'normal',
          'label': 'If other, specify',
          'parent': 6002,
          'editable': true,
          'nodeType': 0,
          'fieldType': 0,
          'parentNode': 0,
          'visibility': {'condition': 'valueInChoice(_6_6002, "other")'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 6003,
          'name': '_6_6003',
          'size': 'normal',
          'label': 'Are you satisfied with these channels?',
          'parent': 60022,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 4,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'YES_NO',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [{'label': 'Yes', 'value': 'yes'}, {'label': 'No', 'value': 'no'}],

          },
          'forceExpanded': false,
          'choicesOriginRef': 'YES_NO',
          'conditionalBranches': []
        },
        {
          'id': 6004,
          'name': '_6_6004',
          'size': 'normal',
          'label': 'Please, explain briefly why',
          'parent': 6003,
          'editable': true,
          'nodeType': 0,
          'fieldType': 0,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 6005,
          'name': '_6_6005',
          'size': 'normal',
          'label': 'Do you have any link with cooperatives or associations for marketing purposes?',
          'parent': 6004,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 4,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'YES_NO',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [{'label': 'Yes', 'value': 'yes'}, {'label': 'No', 'value': 'no'}],

          },
          'forceExpanded': false,
          'choicesOriginRef': 'YES_NO',
          'conditionalBranches': []
        },
        {
          'id': 6006,
          'name': '_6_6006',
          'size': 'normal',
          'label': 'Please, specify which/location/type of link',
          'parent': 6005,
          'editable': true,
          'nodeType': 0,
          'fieldType': 0,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': '_6_6005 == \'yes\''},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 6009,
          'name': '_6_6009',
          'size': 'normal',
          'label': 'Do you think this kind of contacts could support your activity?',
          'parent': 6006,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 4,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': '_6_6005 == \'no\''},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'YES_NO',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [{'label': 'Yes', 'value': 'yes'}, {'label': 'No', 'value': 'no'}],

          },
          'forceExpanded': false,
          'choicesOriginRef': 'YES_NO',
          'conditionalBranches': []
        },
        {
          'id': 6010,
          'name': '_6_6010',
          'size': 'normal',
          'label': 'Please, explain briefly how',
          'parent': 6009,
          'editable': true,
          'nodeType': 0,
          'fieldType': 0,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': '_6_6005 == \'no\' && _6_6009 == \'yes\''},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 6011,
          'name': '_6_6010',
          'size': 'normal',
          'label': 'How do you benefit from these links?',
          'parent': 6010,
          'editable': true,
          'nodeType': 0,
          'fieldType': 0,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': '_6_6005 == \'yes\''},
          'defaultValue': null,
          'conditionalBranches': []
        },
        {
          'id': 6013,
          'name': '_6_6013',
          'size': 'normal',
          'label': 'What do you think are the biggest obstacles in saling your products?',
          'parent': 6011,
          'choices': [],
          'editable': true,
          'nodeType': 0,
          'fieldType': 5,
          'hasChoices': true,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'forceNarrow': false,
          'defaultValue': null,
          'choicesOrigin': {
            'name': 'MARKETING_PRODUCTS_OSTACLES',
            'type': 'fixed' as AjfChoicesOriginType,
            'label': '',
            'choices': [
              {'label': 'Storage', 'value': 'storage'},
              {'label': 'Transport to markets', 'value': 'transport_to_markets'}, {
                'label': 'Lack of information on market prices',
                'value': 'lack_of_information_on_market_prices'
              },
              {
                'label': 'Bargaining with intermediaries',
                'value': 'bargaining_with_intermediaries'
              },
              {
                'label': 'Lack of direct contacts with retailers',
                'value': 'lack_of_direct_contacts_with_retailers'
              },
              {'label': 'Access to Credit', 'value': 'access_to_credit'}
            ]
          },
          'forceExpanded': false,
          'choicesOriginRef': 'MARKETING_PRODUCTS_OSTACLES',
          'conditionalBranches': []
        },
        {
          'id': 6014,
          'name': '_6_6014',
          'size': 'normal',
          'label': 'Other(specificy)',
          'parent': 6013,
          'editable': true,
          'nodeType': 0,
          'fieldType': 0,
          'hasChoices': true,
          'parentNode': 0,
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': []
        }
      ],
      'parent': 5,
      'nodeType': 3,
      'parentNode': 0,
      'visibility': {'condition': 'true'},
      'conditionalBranches': [{'condition': 'true'}]
    }
  ],
  'initContext': {},
  'choicesOrigins': [
    {
      'name': 'SEX',
      'type': 'fixed' as AjfChoicesOriginType,
      'label': '',
      'choices': [{'label': 'Male', 'value': 'Male'}, {'label': 'Female', 'value': 'Female'}],

    },
    {
      'name': 'DISTRICT_NAMES',
      'type': 'fixed' as AjfChoicesOriginType,
      'label': '',
      'choices': [
        {'label': 'Quelimane', 'value': 'quelimane'}, {'label': 'Nicoadala', 'value': 'nicoadala'},
        {'label': 'Namacurra', 'value': 'namacurra'}
      ]
    },
    {
      'name': 'QUELIMANE_COMMUNITY',
      'type': 'fixed' as AjfChoicesOriginType,
      'label': '',
      'choices': [
        {'label': 'Eduba', 'value': 'eduba'}, {'label': 'Mazuere', 'value': 'mazuere'},
        {'label': 'Navilembo', 'value': 'navilembo'}, {'label': 'Mucor', 'value': 'mucor'},
        {'label': 'Nangoela', 'value': 'nangoela'}, {'label': 'Sareva', 'value': 'sareva'}
      ]
    },
    {
      'name': 'NICOADALA_COMMUNITY',
      'type': 'fixed' as AjfChoicesOriginType,
      'label': '',
      'choices': [
        {'label': 'Curungo', 'value': 'Curungo'}, {'label': '25 de junho', 'value': '25 de junho'},
        {'label': 'Supinho', 'value': 'supinho'}, {'label': 'Maningue', 'value': 'maningue'},
        {'label': 'Mariebe', 'value': 'mariebe'}, {'label': 'Mucelo-Novo', 'value': 'mucelo-Novo'}
      ]
    },
    {
      'name': 'NAMACURRA_COMMUNITY',
      'type': 'fixed' as AjfChoicesOriginType,
      'label': '',
      'choices': [
        {'label': 'Cocodane', 'value': 'cocodane'}, {'label': 'Mutange', 'value': 'mutange'},
        {'label': 'Muebele', 'value': 'muebele'}, {'label': 'Pida', 'value': 'pida'},
        {'label': 'Mixixine', 'value': 'mixixine'}, {'label': 'Furquia', 'value': 'furquia'}
      ]
    },
    {
      'name': 'ECONOMIC_ACTIVITY',
      'type': 'fixed' as AjfChoicesOriginType,
      'label': '',
      'choices': [
        {'label': 'Farmer', 'value': 'farmer'}, {'label': 'Trader', 'value': 'trader'},
        {'label': 'Fisherman', 'value': 'fisherman'},
        {'label': 'Other(specificy)', 'value': 'other'}
      ],

    },
    {
      'name': 'PARTITION_1000_TO_5000',
      'type': 'fixed' as AjfChoicesOriginType,
      'label': '',
      'choices': [
        {'label': '0-1000', 'value': '0-1000'}, {'label': '1001-2000', 'value': '1001-2000'},
        {'label': '2001-3000', 'value': '2001-3000'}, {'label': '3001-4000', 'value': '3001-4000'},
        {'label': '4001-5000', 'value': '4001-5000'}, {'label': '>5000', 'value': '>5000'}
      ],

    },
    {
      'name': 'PARTITION_500_TO_3000',
      'type': 'fixed' as AjfChoicesOriginType,
      'label': '',
      'choices': [
        {'label': '0-500', 'value': '0-500'}, {'label': '501-1000', 'value': '501-1000'},
        {'label': '1001-1500', 'value': '1001-1500'}, {'label': '1501-2000', 'value': '1501-2000'},
        {'label': '2001-2500', 'value': '2001-2500'}, {'label': '2501-3000', 'value': '2501-3000'},
        {'label': '>3000', 'value': '>3000'}
      ],

    },
    {
      'name': 'PARTITION_200_TO_10000',
      'type': 'fixed' as AjfChoicesOriginType,
      'label': '',
      'choices': [
        {'label': '0-200', 'value': '0-200'}, {'label': '201-500', 'value': '201-500'},
        {'label': '501-1000', 'value': '501-1000'}, {'label': '1001-1500', 'value': '1001-1500'},
        {'label': '1501-2000', 'value': '1501-2000'}, {'label': '2001-5000', 'value': '2001-5000'},
        {'label': '5001-10000', 'value': '5001-10000'}, {'label': '> 10000', 'value': '> 10000'}
      ],

    },
    {
      'name': 'PARTITION_50_TO_300',
      'type': 'fixed' as AjfChoicesOriginType,
      'label': '',
      'choices': [
        {'label': '0-50', 'value': '0-50'}, {'label': '51-100', 'value': '51-100'},
        {'label': '101-150', 'value': '101-150'}, {'label': '151-200', 'value': '151-200'},
        {'label': '201-250', 'value': '201-250'}, {'label': '251-300', 'value': '251-300'},
        {'label': '*300', 'value': '*300'}
      ],

    },
    {
      'name': 'PARTITION_3_TO_12',
      'type': 'fixed' as AjfChoicesOriginType,
      'label': '',
      'choices': [
        {'label': 'from 1 to 3', 'value': 'from_1_to_3'},
        {'label': 'from 4 to 6', 'value': 'from_4_to_6'},
        {'label': 'from 7 to 9', 'value': 'from_7_to_9'},
        {'label': 'from 10 to 12', 'value': 'from_10_to_12'}
      ]
    },
    {
      'name': 'NUMBER_1_TO_4',
      'type': 'fixed' as AjfChoicesOriginType,
      'label': '',
      'choices': [
        {'label': '1', 'value': '1'}, {'label': '2', 'value': '2'}, {'label': '3', 'value': '3'},
        {'label': '>4', 'value': '4'}
      ],

    },
    {
      'name': 'YES_NO',
      'type': 'fixed' as AjfChoicesOriginType,
      'label': '',
      'choices': [{'label': 'Yes', 'value': 'yes'}, {'label': 'No', 'value': 'no'}],

    },
    {
      'name': 'FERTILIZER_PURCHASED_OR_SELF_PRODUCED',
      'type': 'fixed' as AjfChoicesOriginType,
      'label': '',
      'choices': [
        {'label': 'Purchased', 'value': 'purchased'},
        {'label': 'Self-produced fertilizer', 'value': 'Self-produced_fertilizer'}
      ],

    },
    {
      'name': 'PESTICIDIES_PURCHASED_OR_SELF_PRODUCED',
      'type': 'fixed' as AjfChoicesOriginType,
      'label': '',
      'choices': [
        {'label': 'Purchased', 'value': 'purchased'},
        {'label': 'Self-produced pesticides', 'value': 'Self-produced_pesticides'}
      ],

    },
    {
      'name': 'ORGANIC_OR_NOT',
      'type': 'fixed' as AjfChoicesOriginType,
      'label': '',
      'choices': [
        {'label': 'Organic', 'value': 'organic'}, {'label': 'Non-organic', 'value': 'non-organic'}
      ]
    },
    {
      'name': 'fertilizer_type',
      'type': 'fixed' as AjfChoicesOriginType,
      'label': '',
      'choices': [
        {'label': 'Organic', 'value': 'organic'}, {'label': 'Non-organic', 'value': 'non-organic'},
        {'label': 'None', 'value': 'none'}
      ]
    },
    {
      'name': 'METHOD_OF_CONTROL',
      'type': 'fixed' as AjfChoicesOriginType,
      'label': '',
      'choices': [
        {'label': 'Cultural', 'value': 'cultural'}, {'label': 'Biological', 'value': 'biological'},
        {'label': 'Mechanical', 'value': 'mechanical'},
        {'label': 'Integrated', 'value': 'integrated'}, {'label': 'Other', 'value': 'other'}
      ]
    },
    {
      'name': 'PRODUCTION_SHARE',
      'type': 'fixed' as AjfChoicesOriginType,
      'label': '',
      'choices': [
        {'label': 'Good growth', 'value': 'good_growth'},
        {'label': 'Low growth', 'value': 'low_growth'},
        {'label': 'Medium growth', 'value': 'medium_growth'},
        {'label': 'Attack of curses', 'value': 'attack_of_curses'},
        {'label': 'Excessive heatstroke', 'value': 'excessive_heatstroke'},
        {'label': 'Flood', 'value': 'flood'},
        {'label': 'Uncontrolled burning', 'value': 'uncontrolled_burning'}
      ]
    },
    {
      'name': 'PRODUCTION_PERCENTAGE',
      'type': 'fixed' as AjfChoicesOriginType,
      'label': '',
      'choices': [
        {'label': '0%', 'value': '0'}, {'label': '20%', 'value': '20'},
        {'label': '40%', 'value': '40'}, {'label': '60%', 'value': '60'},
        {'label': '80%', 'value': '80'}
      ]
    },
    {
      'name': 'MANAGES_TRANSPORT',
      'type': 'fixed' as AjfChoicesOriginType,
      'label': '',
      'choices': [
        {'label': 'Beneficiary (household level)', 'value': 'beneficiary_household_level'},
        {'label': 'Community member', 'value': 'community_member'},
        {'label': 'Project Truck', 'value': 'project_truck'}
      ]
    },
    {
      'name': 'VALUE_CHAIN',
      'type': 'fixed' as AjfChoicesOriginType,
      'label': '',
      'choices': [
        {'label': 'Weak', 'value': 'weak'}, {'label': 'Intermediate', 'value': 'intermediate'},
        {'label': 'Strong', 'value': 'strong'}
      ]
    },
    {
      'name': 'MARKETING_PRODUCTS_OSTACLES',
      'type': 'fixed' as AjfChoicesOriginType,
      'label': '',
      'choices': [
        {'label': 'Storage', 'value': 'storage'},
        {'label': 'Transport to markets', 'value': 'transport_to_markets'}, {
          'label': 'Lack of information on market prices',
          'value': 'lack_of_information_on_market_prices'
        },
        {'label': 'Bargaining with intermediaries', 'value': 'bargaining_with_intermediaries'}, {
          'label': 'Lack of direct contacts with retailers',
          'value': 'lack_of_direct_contacts_with_retailers'
        },
        {'label': 'Access to Credit', 'value': 'access_to_credit'}
      ]
    },
    {
      'name': 'AGRICULTURAL_PRACTICES',
      'type': 'fixed' as AjfChoicesOriginType,
      'label': '',
      'choices': [
        {
          'label': 'Agriculture Syntropical/Sustainable',
          'value': 'agriculture_syntropical_Sustainable'
        },
        {'label': 'Conservation agriculture', 'value': 'conservation_agriculture'},
        {'label': 'Traditional agriculture', 'value': 'traditional_agriculture'},
        {'label': 'Slash and burn', 'value': 'slash_and_burn'}, {'label': 'Other', 'value': 'other'}
      ]
    },
    {
      'name': 'APPLICATION_VALUE',
      'type': 'fixed' as AjfChoicesOriginType,
      'label': '',
      'choices': [
        {'label': 'Domestic utensils', 'value': 'domestic_utensils'},
        {'label': 'Seeds', 'value': 'seeds'}, {'label': 'Equipments', 'value': 'equipments'},
        {'label': 'Labor payment in the field', 'value': 'labor_payment_in_the_field'},
        {'label': 'Domestic applicances', 'value': 'domestic_applicances'},
        {'label': 'Agricultural inputs', 'value': 'agricultural_inputs'},
        {'label': 'Other', 'value': 'other'}
      ]
    },
    {
      'name': 'OBSTACLES',
      'type': 'fixed' as AjfChoicesOriginType,
      'label': '',
      'choices': [
        {'label': 'Water availability', 'value': 'water_availability'},
        {'label': 'Seeds availability', 'value': 'seeds_availability'},
        {'label': 'Cost of seeds', 'value': 'seeds_cost'},
        {'label': 'Cost of fertilizer', 'value': 'fertilizer_cost'},
        {'label': 'Equipments', 'value': 'equipments'},
        {'label': 'Seeds quality', 'value': 'seeds_quality'},
        {'label': 'Fertilizers availability', 'value': 'fertilizers_availability'},
        {'label': 'Extension of cultivated land', 'value': 'extension_of_cultivated_land'},
        {'label': 'Credit', 'value': 'credit'}, {'label': 'Technologies', 'value': 'technologies'},
        {'label': 'Other (specify)', 'value': 'other'}
      ]
    },
    {
      'name': 'SALES_CHANNELS',
      'type': 'fixed' as AjfChoicesOriginType,
      'label': '',
      'choices': [
        {'label': 'cooperatives', 'value': 'cooperatives'}, {'label': 'market', 'value': 'market'},
        {'label': 'street', 'value': 'street'}, {'label': 'fairs', 'value': 'fairs'},
        {'label': 'Field sale', 'value': 'field_sale'}, {'label': 'other', 'value': 'other'}
      ]
    },
    {
      'name': 'affected_by',
      'type': 'fixed' as AjfChoicesOriginType,
      'label': '',
      'choices': [
        {'label': 'Drought', 'value': 'drought'}, {'label': 'Flood', 'value': 'flood'},
        {'label': 'Phytopathological diseases', 'value': 'diseases'},
        {'label': 'None', 'value': 'none'}
      ],

    },
    {
      'name': 'crop_seeds',
      'type': 'fixed' as AjfChoicesOriginType,
      'label': '',
      'choices': [
        {'label': 'Rice', 'value': 'rice'},
        {'label': 'Corn', 'value': 'corn'},
        {'label': 'Cassava', 'value': 'cassava'},
        {'label': 'Sweet Potato', 'value': 'sweet_potato'},
        {'label': 'Ihame', 'value': 'ihame'},
        {'label': 'Salad', 'value': 'salad'},
        {'label': 'Onion', 'value': 'onion'},
        {'label': 'Cabbage', 'value': 'cabbage'},
        {'label': 'Cucumber', 'value': 'cucumber'},
        {'label': 'Orange', 'value': 'orange'},
        {'label': 'Pineapple', 'value': 'pineapple'},
        {'label': 'Peanut', 'value': 'peanut'},
        {'label': 'Sesame', 'value': 'sesame'},
        {'label': 'Pepper', 'value': 'pepper'},
        {'label': 'Beans', 'value': 'beans'},
        {'label': 'Beet', 'value': 'beet'},
        {'label': 'Cashew Nut', 'value': 'cashew_nut'},
        {'label': 'Carrot', 'value': 'carrot'},
        {'label': 'Okra', 'value': 'okra'},
        {'label': 'Eggplant', 'value': 'eggplant'},
        {'label': 'Mango', 'value': 'mango'},
        {'label': 'Pumpkin', 'value': 'pumpkin'},
        {'label': 'Other (specify)', 'value': 'other'}
      ],

    },
    {
      'name': 'season',
      'type': 'fixed' as AjfChoicesOriginType,
      'label': '',
      'choices': [
        {'label': 'First agricultural campaign (October-March)', 'value': 'first_campaign'},
        {'label': 'Second agricultural campaign (April-September)', 'value': 'second_campaign'}
      ],

    },
    {
      'name': 'severity',
      'type': 'fixed' as AjfChoicesOriginType,
      'label': '',
      'choices': [
        {'label': 'Low', 'value': 'low'}, {'label': 'Medium', 'value': 'medium'},
        {'label': 'High', 'value': 'high'}
      ],

    },
    {
      'name': 'transport',
      'type': 'fixed' as AjfChoicesOriginType,
      'label': '',
      'choices': [
        {'label': 'My own means of transport', 'value': 'own_means'},
        {'label': 'Project bicycle', 'value': 'bicycle'},
        {'label': 'Project truck', 'value': 'truck'}, {'label': 'Taxi', 'value': 'taxi'},
        {'label': 'Other', 'value': 'other'}
      ],

    },
    {
      'name': 'YES_NO_SOMETIMES',
      'type': 'fixed' as AjfChoicesOriginType,
      'label': '',
      'choices': [
        {'label': 'Yes, totally', 'value': 'totally'},
        {'label': 'Yes, sometimes', 'value': 'sometimes'}, {'label': 'Seldom', 'value': 'seldom'},
        {'label': 'Never', 'value': 'never'}
      ],

    }
  ],
  'stringIdentifier':
      [{'label': 'Gender', 'value': ['f_1_103']}, {'label': 'District', 'value': ['_1_104']}],
  'attachmentsOrigins': []
};

export const testAjfSchema: FormSchema = {
  id: '1',
  name: 'test_schema',
  schema: ajfSchema,
  created_at: '',
  updated_at: '',
};
