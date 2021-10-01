import {ReportSchema} from '@dewco/core/reports';
/**
 * The test schema is taken from WWGVC "hr".
 *
 * schema url: https://bitbucket.org/gnucoop/wwgvc-schema/src/9e5b700c9097/form/hr.json?at=master
 */
export const ajfReportSchema = {
  'content': {
    'content': [
      {
        'widgetType': 3,
        'htmlText': '<div color="primary"><h1>General fields</h1></div>',
        'styles': {
          'width': '100%',
          'display': 'block',
          'border': '1px solid gray',
          'margin': '10px 10px 0px 10px',
          'padding': '10px',
          'backgroundColor': 'white'
        },
        'visibility': {'condition': 'true'}
      },
      {
        'widgetType': 7,
        'content': [
          {
            'widgetType': 3,
            'htmlText': '<div color="primary"><h5>64-bit floating point number</h5></div>',
            'styles': {
              'width': '100%',
              'display': 'block',
              'border': '1px solid gray',
              'padding': '10px',
              'maxHeight': '600px',
              'backgroundColor': 'white'
            },
            'visibility': {'condition': 'true'}
          },
          {
            'widgetType': 7,
            'styles': {
              'backgroundColor': 'white',
              'display': 'block',
              'border': '1px solid gray',
              'padding': '10px',
              'maxHeight': '500px',
              'marginBottom': '10px'
            },
            'content': [{
              'widgetType': 0,
              'columns': [0.33, 0.33, 0.33],
              'content': [
                {
                  'widgetType': 7,
                  'styles':
                      {'display': 'block', 'padding': '10px', 'width': '100%', 'height': '100%'},
                  'content': [
                    {
                      'widgetType': 3,
                      'htmlText': '<div color="primary"><h5>Mean</h5></div>',
                      'styles': {
                        'width': '100%',
                        'display': 'block',
                        'border': '1px solid gray',
                        'padding': '10px',
                        'maxHeight': '600px',
                        'backgroundColor': 'white'
                      },
                      'visibility': {'condition': 'true'}
                    },
                    {
                      'widgetType': 3,
                      'htmlText': '<p>[[MEAN(forms,"number1")]] / [[MAX(forms,"number1")]]</p>',
                      'styles': {
                        'width': '100%',
                        'display': 'block',
                        'border': '1px solid gray',
                        'padding': '10px',
                        'maxHeight': '600px',
                        'backgroundColor': 'white'
                      },
                      'visibility': {'condition': 'true'}
                    }
                  ],
                  'visibility': {'condition': 'true'}
                },
                {
                  'widgetType': 7,
                  'styles':
                      {'display': 'block', 'padding': '10px', 'width': '100%', 'height': '100%'},
                  'content': [
                    {
                      'widgetType': 3,
                      'htmlText': '<div color="primary"><h5>Median</h5></div>',
                      'styles': {
                        'width': '100%',
                        'display': 'block',
                        'border': '1px solid gray',
                        'padding': '10px',
                        'maxHeight': '600px',
                        'backgroundColor': 'white'
                      },
                      'visibility': {'condition': 'true'}
                    },
                    {
                      'widgetType': 3,
                      'htmlText': '<p>[[MEDIAN(forms,"number1")]] / [[MAX(forms,"number1")]]</p>',
                      'styles': {
                        'width': '100%',
                        'display': 'block',
                        'border': '1px solid gray',
                        'padding': '10px',
                        'maxHeight': '600px',
                        'backgroundColor': 'white'
                      },
                      'visibility': {'condition': 'true'}
                    }
                  ],
                  'visibility': {'condition': 'true'}
                },
                {
                  'widgetType': 7,
                  'styles':
                      {'display': 'block', 'padding': '10px', 'width': '100%', 'height': '100%'},
                  'content': [
                    {
                      'widgetType': 3,
                      'htmlText': '<div color="primary"><h5>Mode</h5></div>',
                      'styles': {
                        'width': '100%',
                        'display': 'block',
                        'border': '1px solid gray',
                        'padding': '10px',
                        'maxHeight': '600px',
                        'backgroundColor': 'white'
                      },
                      'visibility': {'condition': 'true'}
                    },
                    {
                      'widgetType': 3,
                      'htmlText': '<p>[[MODE(forms,"number1")]]</p>',
                      'styles': {
                        'width': '100%',
                        'display': 'block',
                        'border': '1px solid gray',
                        'padding': '10px',
                        'maxHeight': '600px',
                        'backgroundColor': 'white'
                      },
                      'visibility': {'condition': 'true'}
                    }
                  ],
                  'visibility': {'condition': 'true'}
                }
              ],
              'styles': {},
              'visibility': {'condition': 'true'}
            }],
            'visibility': {'condition': 'true'}
          },
          {
            'widgetType': 3,
            'htmlText':
                '<div color="primary"><h5>A number with the added constraint of being an integer</h5></div>',
            'styles': {
              'width': '100%',
              'display': 'block',
              'border': '1px solid gray',
              'padding': '10px',
              'maxHeight': '600px',
              'backgroundColor': 'white'
            },
            'visibility': {'condition': 'true'}
          },
          {
            'widgetType': 7,
            'styles': {
              'backgroundColor': 'white',
              'display': 'block',
              'border': '1px solid gray',
              'padding': '10px',
              'maxHeight': '500px',
              'marginBottom': '10px'
            },
            'content': [{
              'widgetType': 0,
              'columns': [0.33, 0.33, 0.33],
              'content': [
                {
                  'widgetType': 7,
                  'styles':
                      {'display': 'block', 'padding': '10px', 'width': '100%', 'height': '100%'},
                  'content': [
                    {
                      'widgetType': 3,
                      'htmlText': '<div color="primary"><h5>Mean</h5></div>',
                      'styles': {
                        'width': '100%',
                        'display': 'block',
                        'border': '1px solid gray',
                        'padding': '10px',
                        'maxHeight': '600px',
                        'backgroundColor': 'white'
                      },
                      'visibility': {'condition': 'true'}
                    },
                    {
                      'widgetType': 3,
                      'htmlText': '<p>[[MEAN(forms,"number2")]] / [[MAX(forms,"number2")]]</p>',
                      'styles': {
                        'width': '100%',
                        'display': 'block',
                        'border': '1px solid gray',
                        'padding': '10px',
                        'maxHeight': '600px',
                        'backgroundColor': 'white'
                      },
                      'visibility': {'condition': 'true'}
                    }
                  ],
                  'visibility': {'condition': 'true'}
                },
                {
                  'widgetType': 7,
                  'styles':
                      {'display': 'block', 'padding': '10px', 'width': '100%', 'height': '100%'},
                  'content': [
                    {
                      'widgetType': 3,
                      'htmlText': '<div color="primary"><h5>Median</h5></div>',
                      'styles': {
                        'width': '100%',
                        'display': 'block',
                        'border': '1px solid gray',
                        'padding': '10px',
                        'maxHeight': '600px',
                        'backgroundColor': 'white'
                      },
                      'visibility': {'condition': 'true'}
                    },
                    {
                      'widgetType': 3,
                      'htmlText': '<p>[[MEDIAN(forms,"number2")]] / [[MAX(forms,"number2")]]</p>',
                      'styles': {
                        'width': '100%',
                        'display': 'block',
                        'border': '1px solid gray',
                        'padding': '10px',
                        'maxHeight': '600px',
                        'backgroundColor': 'white'
                      },
                      'visibility': {'condition': 'true'}
                    }
                  ],
                  'visibility': {'condition': 'true'}
                },
                {
                  'widgetType': 7,
                  'styles':
                      {'display': 'block', 'padding': '10px', 'width': '100%', 'height': '100%'},
                  'content': [
                    {
                      'widgetType': 3,
                      'htmlText': '<div color="primary"><h5>Mode</h5></div>',
                      'styles': {
                        'width': '100%',
                        'display': 'block',
                        'border': '1px solid gray',
                        'padding': '10px',
                        'maxHeight': '600px',
                        'backgroundColor': 'white'
                      },
                      'visibility': {'condition': 'true'}
                    },
                    {
                      'widgetType': 3,
                      'htmlText': '<p>[[MODE(forms,"number2")]]</p>',
                      'styles': {
                        'width': '100%',
                        'display': 'block',
                        'border': '1px solid gray',
                        'padding': '10px',
                        'maxHeight': '600px',
                        'backgroundColor': 'white'
                      },
                      'visibility': {'condition': 'true'}
                    }
                  ],
                  'visibility': {'condition': 'true'}
                }
              ],
              'styles': {},
              'visibility': {'condition': 'true'}
            }],
            'visibility': {'condition': 'true'}
          },
          {
            'widgetType': 3,
            'htmlText': '<div color="primary"><h5>Boolean answer (a checkbox)</h5></div>',
            'styles': {
              'width': '100%',
              'display': 'block',
              'border': '1px solid gray',
              'padding': '10px',
              'maxHeight': '600px',
              'backgroundColor': 'white'
            },
            'visibility': {'condition': 'true'}
          },
          {
            'widgetType': 7,
            'content': [
              {
                'widgetType': 3,
                'htmlText': '<h5>[[COUNTFORMS(forms,"bool != null")]] answers</h5>',
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'visibility': {'condition': 'true'}
              },
              {
                'widgetType': 4,
                'type': 6,
                'labels': {'formula': '[\'True\', \'False\']'},
                'dataset': [{
                  'label': 'true',
                  'formula': [{
                    'formula': '[COUNTFORMS(forms,"bool===true"),COUNTFORMS(forms,"bool===false")]'
                  }],
                  'options': {'backgroundColor': ['green', 'red']},
                  'aggregation': {'aggregation': 0}
                }],
                'options': {
                  'responsive': true,
                  'maintainAspectRatio': false,
                  'legend': {'display': true, 'position': 'bottom'}
                },
                'styles': {'width': '100%', 'height': '400px'},
                'exportable': true,
                'visibility': {'condition': 'true'}
              }
            ],
            'styles': {},
            'visibility': {'condition': 'true'}
          }
        ],
        'styles': {
          'with': '100%',
          'display': 'block',
          'border': '1px solid gray',
          'margin': '0px 10px 10px 50px',
          'padding': '10px',
          'backgroundColor': 'white'
        },
        'visibility': {'condition': 'true'}
      },
      {
        'widgetType': 3,
        'htmlText': '<div color="primary"><h1>Choice Fileds</h1></div>',
        'styles': {
          'width': '100%',
          'display': 'block',
          'border': '1px solid gray',
          'margin': '10px 10px 0px 10px',
          'padding': '10px',
          'backgroundColor': 'white'
        },
        'visibility': {'condition': 'true'}
      },
      {
        'widgetType': 7,
        'content': [
          {
            'widgetType': 3,
            'htmlText': '<div color="primary"><h5>Single choice answer</h5></div>',
            'styles': {
              'width': '100%',
              'display': 'block',
              'border': '1px solid gray',
              'padding': '10px',
              'maxHeight': '600px',
              'backgroundColor': 'white'
            },
            'visibility': {'condition': 'true'}
          },
          {
            'widgetType': 7,
            'content': [
              {
                'widgetType': 3,
                'htmlText': '<h5>[[COUNTFORMS(forms,"singlechoice != null")]] answers</h5>',
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'visibility': {'condition': 'true'}
              },
              {
                'widgetType': 4,
                'type': 1,
                'labels': {'formula': '[]'},
                'dataset': [
                  {
                    'label': 'Option1',
                    'formula': [{'formula': '[COUNTFORMS(forms,"singlechoice===\'option1\'")]'}],
                    'options': {'backgroundColor': '#FF6633', 'stack': 'Stack 0'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Option2',
                    'formula': [{'formula': '[COUNTFORMS(forms,"singlechoice===\'option2\'")]'}],
                    'options': {'backgroundColor': '#FFB399', 'stack': 'Stack 1'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Option3',
                    'formula': [{'formula': '[COUNTFORMS(forms,"singlechoice===\'option3\'")]'}],
                    'options': {'backgroundColor': '#FF33FF', 'stack': 'Stack 2'},
                    'aggregation': {'aggregation': 0}
                  }
                ],
                'options': {
                  'responsive': true,
                  'maintainAspectRatio': false,
                  'legend': {'display': true, 'position': 'bottom'}
                },
                'styles': {'width': '100%', 'height': '400px'},
                'exportable': true,
                'visibility': {'condition': 'true'}
              }
            ],
            'styles': {},
            'visibility': {'condition': 'true'}
          },
          {
            'widgetType': 3,
            'htmlText': '<div color="primary"><h5>Multiple choice answer 6 options</h5></div>',
            'styles': {
              'width': '100%',
              'display': 'block',
              'border': '1px solid gray',
              'padding': '10px',
              'maxHeight': '600px',
              'backgroundColor': 'white'
            },
            'visibility': {'condition': 'true'}
          },
          {
            'widgetType': 7,
            'content': [
              {
                'widgetType': 3,
                'htmlText': '<h5>[[COUNTFORMS(forms,"multiplechoice != null")]] answers</h5>',
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'visibility': {'condition': 'true'}
              },
              {
                'widgetType': 4,
                'type': 1,
                'labels': {'formula': '[]'},
                'dataset': [
                  {
                    'label': 'Option1',
                    'formula': [
                      {'formula': '[COUNTFORMS(forms,"multiplechoice.indexOf(\'option1\') > -1")]'}
                    ],
                    'options': {'backgroundColor': '#FF6633', 'stack': 'Stack 0'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Option2',
                    'formula': [
                      {'formula': '[COUNTFORMS(forms,"multiplechoice.indexOf(\'option2\') > -1")]'}
                    ],
                    'options': {'backgroundColor': '#FFB399', 'stack': 'Stack 1'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Option3',
                    'formula': [
                      {'formula': '[COUNTFORMS(forms,"multiplechoice.indexOf(\'option3\') > -1")]'}
                    ],
                    'options': {'backgroundColor': '#FF33FF', 'stack': 'Stack 2'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Option4',
                    'formula': [
                      {'formula': '[COUNTFORMS(forms,"multiplechoice.indexOf(\'option4\') > -1")]'}
                    ],
                    'options': {'backgroundColor': '#FFFF99', 'stack': 'Stack 3'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Option5',
                    'formula': [
                      {'formula': '[COUNTFORMS(forms,"multiplechoice.indexOf(\'option5\') > -1")]'}
                    ],
                    'options': {'backgroundColor': '#00B3E6', 'stack': 'Stack 4'},
                    'aggregation': {'aggregation': 0}
                  }
                ],
                'options': {
                  'responsive': true,
                  'maintainAspectRatio': false,
                  'legend': {'display': true, 'position': 'bottom'}
                },
                'styles': {'width': '100%', 'height': '400px'},
                'exportable': true,
                'visibility': {'condition': 'true'}
              }
            ],
            'styles': {},
            'visibility': {'condition': 'true'}
          },
          {
            'widgetType': 3,
            'htmlText':
                '<div color="primary"><h5>Multiple choice answer more than 6 options</h5></div>',
            'styles': {
              'width': '100%',
              'display': 'block',
              'border': '1px solid gray',
              'padding': '10px',
              'maxHeight': '600px',
              'backgroundColor': 'white'
            },
            'visibility': {'condition': 'true'}
          },
          {
            'widgetType': 7,
            'content': [
              {
                'widgetType': 3,
                'htmlText': '<h5>[[COUNTFORMS(forms,"multiplechoice != null")]] answers</h5>',
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'visibility': {'condition': 'true'}
              },
              {
                'widgetType': 4,
                'type': 1,
                'labels': {'formula': '[]'},
                'dataset': [
                  {
                    'label': 'Option1',
                    'formula': [
                      {'formula': '[COUNTFORMS(forms,"multiplechoice.indexOf(\'option1\') > -1")]'}
                    ],
                    'options': {'backgroundColor': '#FF6633', 'stack': 'Stack 0'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Option2',
                    'formula': [
                      {'formula': '[COUNTFORMS(forms,"multiplechoice.indexOf(\'option2\') > -1")]'}
                    ],
                    'options': {'backgroundColor': '#FFB399', 'stack': 'Stack 1'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Option3',
                    'formula': [
                      {'formula': '[COUNTFORMS(forms,"multiplechoice.indexOf(\'option3\') > -1")]'}
                    ],
                    'options': {'backgroundColor': '#FF33FF', 'stack': 'Stack 2'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Option4',
                    'formula': [
                      {'formula': '[COUNTFORMS(forms,"multiplechoice.indexOf(\'option4\') > -1")]'}
                    ],
                    'options': {'backgroundColor': '#FFFF99', 'stack': 'Stack 3'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Option5',
                    'formula': [
                      {'formula': '[COUNTFORMS(forms,"multiplechoice.indexOf(\'option5\') > -1")]'}
                    ],
                    'options': {'backgroundColor': '#00B3E6', 'stack': 'Stack 4'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Option6',
                    'formula': [
                      {'formula': '[COUNTFORMS(forms,"multiplechoice.indexOf(\'option6\') > -1")]'}
                    ],
                    'options': {'backgroundColor': '#E6B333', 'stack': 'Stack 5'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Option7',
                    'formula': [
                      {'formula': '[COUNTFORMS(forms,"multiplechoice.indexOf(\'option7\') > -1")]'}
                    ],
                    'options': {'backgroundColor': '#3366E6', 'stack': 'Stack 6'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Option8',
                    'formula': [
                      {'formula': '[COUNTFORMS(forms,"multiplechoice.indexOf(\'option8\') > -1")]'}
                    ],
                    'options': {'backgroundColor': '#999966', 'stack': 'Stack 7'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Option9',
                    'formula': [
                      {'formula': '[COUNTFORMS(forms,"multiplechoice.indexOf(\'option9\') > -1")]'}
                    ],
                    'options': {'backgroundColor': '#99FF99', 'stack': 'Stack 8'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Option10',
                    'formula': [
                      {'formula': '[COUNTFORMS(forms,"multiplechoice.indexOf(\'option10\') > -1")]'}
                    ],
                    'options': {'backgroundColor': '#B34D4D', 'stack': 'Stack 9'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Option11',
                    'formula': [
                      {'formula': '[COUNTFORMS(forms,"multiplechoice.indexOf(\'option11\') > -1")]'}
                    ],
                    'options': {'backgroundColor': '#80B300', 'stack': 'Stack 10'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Option12',
                    'formula': [
                      {'formula': '[COUNTFORMS(forms,"multiplechoice.indexOf(\'option12\') > -1")]'}
                    ],
                    'options': {'backgroundColor': '#809900', 'stack': 'Stack 11'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Option13',
                    'formula': [
                      {'formula': '[COUNTFORMS(forms,"multiplechoice.indexOf(\'option13\') > -1")]'}
                    ],
                    'options': {'backgroundColor': '#E6B3B3', 'stack': 'Stack 12'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Option14',
                    'formula': [
                      {'formula': '[COUNTFORMS(forms,"multiplechoice.indexOf(\'option14\') > -1")]'}
                    ],
                    'options': {'backgroundColor': '#6680B3', 'stack': 'Stack 13'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Option15',
                    'formula': [
                      {'formula': '[COUNTFORMS(forms,"multiplechoice.indexOf(\'option15\') > -1")]'}
                    ],
                    'options': {'backgroundColor': '#66991A', 'stack': 'Stack 14'},
                    'aggregation': {'aggregation': 0}
                  }
                ],
                'options': {
                  'responsive': true,
                  'maintainAspectRatio': false,
                  'legend': {'display': true, 'position': 'bottom'}
                },
                'styles': {'width': '100%', 'height': '400px'},
                'exportable': true,
                'visibility': {'condition': 'true'}
              }
            ],
            'styles': {},
            'visibility': {'condition': 'true'}
          }
        ],
        'styles': {
          'with': '100%',
          'display': 'block',
          'border': '1px solid gray',
          'margin': '0px 10px 10px 50px',
          'padding': '10px',
          'backgroundColor': 'white'
        },
        'visibility': {'condition': 'true'}
      },
      {
        'widgetType': 3,
        'htmlText': '<div color="primary"><h1>Hidden fileds with Relevant</h1></div>',
        'styles': {
          'width': '100%',
          'display': 'block',
          'border': '1px solid gray',
          'margin': '10px 10px 0px 10px',
          'padding': '10px',
          'backgroundColor': 'white'
        },
        'visibility': {'condition': 'true'}
      },
      {
        'widgetType': 7,
        'content': [
          {
            'widgetType': 3,
            'htmlText': '<div color="primary"><h5>Do you have a cat or a dog?</h5></div>',
            'styles': {
              'width': '100%',
              'display': 'block',
              'border': '1px solid gray',
              'padding': '10px',
              'maxHeight': '600px',
              'backgroundColor': 'white'
            },
            'visibility': {'condition': 'true'}
          },
          {
            'widgetType': 7,
            'content': [
              {
                'widgetType': 3,
                'htmlText': '<h5>[[COUNTFORMS(forms,"pet_type != null")]] answers</h5>',
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'visibility': {'condition': 'true'}
              },
              {
                'widgetType': 4,
                'type': 1,
                'labels': {'formula': '[]'},
                'dataset': [
                  {
                    'label': 'Dog',
                    'formula': [{'formula': '[COUNTFORMS(forms,"pet_type===\'dog\'")]'}],
                    'options': {'backgroundColor': '#FF6633', 'stack': 'Stack 0'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Cat',
                    'formula': [{'formula': '[COUNTFORMS(forms,"pet_type===\'cat\'")]'}],
                    'options': {'backgroundColor': '#FFB399', 'stack': 'Stack 1'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Black Cat',
                    'formula': [{'formula': '[COUNTFORMS(forms,"pet_type===\'blackcat\'")]'}],
                    'options': {'backgroundColor': '#FF33FF', 'stack': 'Stack 2'},
                    'aggregation': {'aggregation': 0}
                  }
                ],
                'options': {
                  'responsive': true,
                  'maintainAspectRatio': false,
                  'legend': {'display': true, 'position': 'bottom'}
                },
                'styles': {'width': '100%', 'height': '400px'},
                'exportable': true,
                'visibility': {'condition': 'true'}
              }
            ],
            'styles': {},
            'visibility': {'condition': 'true'}
          }
        ],
        'styles': {
          'with': '100%',
          'display': 'block',
          'border': '1px solid gray',
          'margin': '0px 10px 10px 50px',
          'padding': '10px',
          'backgroundColor': 'white'
        },
        'visibility': {'condition': 'true'}
      },
      {
        'widgetType': 3,
        'htmlText': '<div color="primary"><h1>Calculation fields</h1></div>',
        'styles': {
          'width': '100%',
          'display': 'block',
          'border': '1px solid gray',
          'margin': '10px 10px 0px 10px',
          'padding': '10px',
          'backgroundColor': 'white'
        },
        'visibility': {'condition': 'true'}
      },
      {
        'widgetType': 7,
        'content': [
          {
            'widgetType': 3,
            'htmlText': '<div color="primary"><h5>Price of your meal:</h5></div>',
            'styles': {
              'width': '100%',
              'display': 'block',
              'border': '1px solid gray',
              'padding': '10px',
              'maxHeight': '600px',
              'backgroundColor': 'white'
            },
            'visibility': {'condition': 'true'}
          },
          {
            'widgetType': 7,
            'styles': {
              'backgroundColor': 'white',
              'display': 'block',
              'border': '1px solid gray',
              'padding': '10px',
              'maxHeight': '500px',
              'marginBottom': '10px'
            },
            'content': [{
              'widgetType': 0,
              'columns': [0.33, 0.33, 0.33],
              'content': [
                {
                  'widgetType': 7,
                  'styles':
                      {'display': 'block', 'padding': '10px', 'width': '100%', 'height': '100%'},
                  'content': [
                    {
                      'widgetType': 3,
                      'htmlText': '<div color="primary"><h5>Mean</h5></div>',
                      'styles': {
                        'width': '100%',
                        'display': 'block',
                        'border': '1px solid gray',
                        'padding': '10px',
                        'maxHeight': '600px',
                        'backgroundColor': 'white'
                      },
                      'visibility': {'condition': 'true'}
                    },
                    {
                      'widgetType': 3,
                      'htmlText': '<p>[[MEAN(forms,"amount")]] / [[MAX(forms,"amount")]]</p>',
                      'styles': {
                        'width': '100%',
                        'display': 'block',
                        'border': '1px solid gray',
                        'padding': '10px',
                        'maxHeight': '600px',
                        'backgroundColor': 'white'
                      },
                      'visibility': {'condition': 'true'}
                    }
                  ],
                  'visibility': {'condition': 'true'}
                },
                {
                  'widgetType': 7,
                  'styles':
                      {'display': 'block', 'padding': '10px', 'width': '100%', 'height': '100%'},
                  'content': [
                    {
                      'widgetType': 3,
                      'htmlText': '<div color="primary"><h5>Median</h5></div>',
                      'styles': {
                        'width': '100%',
                        'display': 'block',
                        'border': '1px solid gray',
                        'padding': '10px',
                        'maxHeight': '600px',
                        'backgroundColor': 'white'
                      },
                      'visibility': {'condition': 'true'}
                    },
                    {
                      'widgetType': 3,
                      'htmlText': '<p>[[MEDIAN(forms,"amount")]] / [[MAX(forms,"amount")]]</p>',
                      'styles': {
                        'width': '100%',
                        'display': 'block',
                        'border': '1px solid gray',
                        'padding': '10px',
                        'maxHeight': '600px',
                        'backgroundColor': 'white'
                      },
                      'visibility': {'condition': 'true'}
                    }
                  ],
                  'visibility': {'condition': 'true'}
                },
                {
                  'widgetType': 7,
                  'styles':
                      {'display': 'block', 'padding': '10px', 'width': '100%', 'height': '100%'},
                  'content': [
                    {
                      'widgetType': 3,
                      'htmlText': '<div color="primary"><h5>Mode</h5></div>',
                      'styles': {
                        'width': '100%',
                        'display': 'block',
                        'border': '1px solid gray',
                        'padding': '10px',
                        'maxHeight': '600px',
                        'backgroundColor': 'white'
                      },
                      'visibility': {'condition': 'true'}
                    },
                    {
                      'widgetType': 3,
                      'htmlText': '<p>[[MODE(forms,"amount")]]</p>',
                      'styles': {
                        'width': '100%',
                        'display': 'block',
                        'border': '1px solid gray',
                        'padding': '10px',
                        'maxHeight': '600px',
                        'backgroundColor': 'white'
                      },
                      'visibility': {'condition': 'true'}
                    }
                  ],
                  'visibility': {'condition': 'true'}
                }
              ],
              'styles': {},
              'visibility': {'condition': 'true'}
            }],
            'visibility': {'condition': 'true'}
          }
        ],
        'styles': {
          'with': '100%',
          'display': 'block',
          'border': '1px solid gray',
          'margin': '0px 10px 10px 50px',
          'padding': '10px',
          'backgroundColor': 'white'
        },
        'visibility': {'condition': 'true'}
      },
      {
        'widgetType': 3,
        'htmlText': '<div color="primary"><h1>Multiple Slide</h1></div>',
        'styles': {
          'width': '100%',
          'display': 'block',
          'border': '1px solid gray',
          'margin': '10px 10px 0px 10px',
          'padding': '10px',
          'backgroundColor': 'white'
        },
        'visibility': {'condition': 'true'}
      },
      {
        'widgetType': 7,
        'content': [
          {
            'widgetType': 3,
            'htmlText': '<div color="primary"><h5>Child\'s birthweight</h5></div>',
            'styles': {
              'width': '100%',
              'display': 'block',
              'border': '1px solid gray',
              'padding': '10px',
              'maxHeight': '600px',
              'backgroundColor': 'white'
            },
            'visibility': {'condition': 'true'}
          },
          {
            'widgetType': 7,
            'styles': {
              'backgroundColor': 'white',
              'display': 'block',
              'border': '1px solid gray',
              'padding': '10px',
              'maxHeight': '500px',
              'marginBottom': '10px'
            },
            'content': [{
              'widgetType': 0,
              'columns': [0.33, 0.33, 0.33],
              'content': [
                {
                  'widgetType': 7,
                  'styles':
                      {'display': 'block', 'padding': '10px', 'width': '100%', 'height': '100%'},
                  'content': [
                    {
                      'widgetType': 3,
                      'htmlText': '<div color="primary"><h5>Mean</h5></div>',
                      'styles': {
                        'width': '100%',
                        'display': 'block',
                        'border': '1px solid gray',
                        'padding': '10px',
                        'maxHeight': '600px',
                        'backgroundColor': 'white'
                      },
                      'visibility': {'condition': 'true'}
                    },
                    {
                      'widgetType': 3,
                      'htmlText':
                          '<p>[[MEAN(forms,"birthweight")]] / [[MAX(forms,"birthweight")]]</p>',
                      'styles': {
                        'width': '100%',
                        'display': 'block',
                        'border': '1px solid gray',
                        'padding': '10px',
                        'maxHeight': '600px',
                        'backgroundColor': 'white'
                      },
                      'visibility': {'condition': 'true'}
                    }
                  ],
                  'visibility': {'condition': 'true'}
                },
                {
                  'widgetType': 7,
                  'styles':
                      {'display': 'block', 'padding': '10px', 'width': '100%', 'height': '100%'},
                  'content': [
                    {
                      'widgetType': 3,
                      'htmlText': '<div color="primary"><h5>Median</h5></div>',
                      'styles': {
                        'width': '100%',
                        'display': 'block',
                        'border': '1px solid gray',
                        'padding': '10px',
                        'maxHeight': '600px',
                        'backgroundColor': 'white'
                      },
                      'visibility': {'condition': 'true'}
                    },
                    {
                      'widgetType': 3,
                      'htmlText':
                          '<p>[[MEDIAN(forms,"birthweight")]] / [[MAX(forms,"birthweight")]]</p>',
                      'styles': {
                        'width': '100%',
                        'display': 'block',
                        'border': '1px solid gray',
                        'padding': '10px',
                        'maxHeight': '600px',
                        'backgroundColor': 'white'
                      },
                      'visibility': {'condition': 'true'}
                    }
                  ],
                  'visibility': {'condition': 'true'}
                },
                {
                  'widgetType': 7,
                  'styles':
                      {'display': 'block', 'padding': '10px', 'width': '100%', 'height': '100%'},
                  'content': [
                    {
                      'widgetType': 3,
                      'htmlText': '<div color="primary"><h5>Mode</h5></div>',
                      'styles': {
                        'width': '100%',
                        'display': 'block',
                        'border': '1px solid gray',
                        'padding': '10px',
                        'maxHeight': '600px',
                        'backgroundColor': 'white'
                      },
                      'visibility': {'condition': 'true'}
                    },
                    {
                      'widgetType': 3,
                      'htmlText': '<p>[[MODE(forms,"birthweight")]]</p>',
                      'styles': {
                        'width': '100%',
                        'display': 'block',
                        'border': '1px solid gray',
                        'padding': '10px',
                        'maxHeight': '600px',
                        'backgroundColor': 'white'
                      },
                      'visibility': {'condition': 'true'}
                    }
                  ],
                  'visibility': {'condition': 'true'}
                }
              ],
              'styles': {},
              'visibility': {'condition': 'true'}
            }],
            'visibility': {'condition': 'true'}
          }
        ],
        'styles': {
          'with': '100%',
          'display': 'block',
          'border': '1px solid gray',
          'margin': '0px 10px 10px 50px',
          'padding': '10px',
          'backgroundColor': 'white'
        },
        'visibility': {'condition': 'true'}
      },
      {
        'widgetType': 3,
        'htmlText': '<div color="primary"><h1>Multiple Slide with history disabled</h1></div>',
        'styles': {
          'width': '100%',
          'display': 'block',
          'border': '1px solid gray',
          'margin': '10px 10px 0px 10px',
          'padding': '10px',
          'backgroundColor': 'white'
        },
        'visibility': {'condition': 'true'}
      },
      {
        'widgetType': 7,
        'content': [
          {
            'widgetType': 3,
            'htmlText': '<div color="primary"><h5>Child\'s birthweight</h5></div>',
            'styles': {
              'width': '100%',
              'display': 'block',
              'border': '1px solid gray',
              'padding': '10px',
              'maxHeight': '600px',
              'backgroundColor': 'white'
            },
            'visibility': {'condition': 'true'}
          },
          {
            'widgetType': 7,
            'styles': {
              'backgroundColor': 'white',
              'display': 'block',
              'border': '1px solid gray',
              'padding': '10px',
              'maxHeight': '500px',
              'marginBottom': '10px'
            },
            'content': [{
              'widgetType': 0,
              'columns': [0.33, 0.33, 0.33],
              'content': [
                {
                  'widgetType': 7,
                  'styles':
                      {'display': 'block', 'padding': '10px', 'width': '100%', 'height': '100%'},
                  'content': [
                    {
                      'widgetType': 3,
                      'htmlText': '<div color="primary"><h5>Mean</h5></div>',
                      'styles': {
                        'width': '100%',
                        'display': 'block',
                        'border': '1px solid gray',
                        'padding': '10px',
                        'maxHeight': '600px',
                        'backgroundColor': 'white'
                      },
                      'visibility': {'condition': 'true'}
                    },
                    {
                      'widgetType': 3,
                      'htmlText':
                          '<p>[[MEAN(forms,"birthweight")]] / [[MAX(forms,"birthweight")]]</p>',
                      'styles': {
                        'width': '100%',
                        'display': 'block',
                        'border': '1px solid gray',
                        'padding': '10px',
                        'maxHeight': '600px',
                        'backgroundColor': 'white'
                      },
                      'visibility': {'condition': 'true'}
                    }
                  ],
                  'visibility': {'condition': 'true'}
                },
                {
                  'widgetType': 7,
                  'styles':
                      {'display': 'block', 'padding': '10px', 'width': '100%', 'height': '100%'},
                  'content': [
                    {
                      'widgetType': 3,
                      'htmlText': '<div color="primary"><h5>Median</h5></div>',
                      'styles': {
                        'width': '100%',
                        'display': 'block',
                        'border': '1px solid gray',
                        'padding': '10px',
                        'maxHeight': '600px',
                        'backgroundColor': 'white'
                      },
                      'visibility': {'condition': 'true'}
                    },
                    {
                      'widgetType': 3,
                      'htmlText':
                          '<p>[[MEDIAN(forms,"birthweight")]] / [[MAX(forms,"birthweight")]]</p>',
                      'styles': {
                        'width': '100%',
                        'display': 'block',
                        'border': '1px solid gray',
                        'padding': '10px',
                        'maxHeight': '600px',
                        'backgroundColor': 'white'
                      },
                      'visibility': {'condition': 'true'}
                    }
                  ],
                  'visibility': {'condition': 'true'}
                },
                {
                  'widgetType': 7,
                  'styles':
                      {'display': 'block', 'padding': '10px', 'width': '100%', 'height': '100%'},
                  'content': [
                    {
                      'widgetType': 3,
                      'htmlText': '<div color="primary"><h5>Mode</h5></div>',
                      'styles': {
                        'width': '100%',
                        'display': 'block',
                        'border': '1px solid gray',
                        'padding': '10px',
                        'maxHeight': '600px',
                        'backgroundColor': 'white'
                      },
                      'visibility': {'condition': 'true'}
                    },
                    {
                      'widgetType': 3,
                      'htmlText': '<p>[[MODE(forms,"birthweight")]]</p>',
                      'styles': {
                        'width': '100%',
                        'display': 'block',
                        'border': '1px solid gray',
                        'padding': '10px',
                        'maxHeight': '600px',
                        'backgroundColor': 'white'
                      },
                      'visibility': {'condition': 'true'}
                    }
                  ],
                  'visibility': {'condition': 'true'}
                }
              ],
              'styles': {},
              'visibility': {'condition': 'true'}
            }],
            'visibility': {'condition': 'true'}
          }
        ],
        'styles': {
          'with': '100%',
          'display': 'block',
          'border': '1px solid gray',
          'margin': '0px 10px 10px 50px',
          'padding': '10px',
          'backgroundColor': 'white'
        },
        'visibility': {'condition': 'true'}
      }
    ],
    styles: {},
  }
};

export const reportSchemas: ReportSchema[] = [{
  id: '',
  name: 'generic_report',
  form_schema_ids: [],
  label: 'Generic Report',
  icon: 'leaderboard',
  schema: ajfReportSchema,
  created_at: '',
  updated_at: '',
},];
