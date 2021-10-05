import {ReportSchema} from '@dewco/core/reports';

/**
 * The test schema is taken from WWGVC "hr".
 *
 * schema url: https://bitbucket.org/gnucoop/wwgvc-schema/src/9e5b700c9097/form/hr.json?at=master
 */
// tslint:disable
export const ajfReportSchema = {
  'content': {
    'styles': [],
    'content': [
      {
        'styles': {'width': '100%', 'dislay': 'block'},
        'htmlText': '<div color="primary"><h1>Location</h1></div>',
        'visibility': {'condition': 'true'},
        'widgetType': 3
      },
      {
        'styles': {'with': '100%', 'dislay': 'block'},
        'content': [
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>District</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {},
            'content': [
              {
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'htmlText': '<h5>[[COUNTFORMS(forms,"district != null")]] answers</h5>',
                'visibility': {'condition': 'true'},
                'widgetType': 3
              },
              {
                'type': 1,
                'labels': {'formula': '[]'},
                'styles': {'width': '100%', 'height': '400px'},
                'dataset': [
                  {
                    'label': 'Agago',
                    'formula': [{'formula': '[COUNTFORMS(forms,"district===\'agago\'")]'}],
                    'options': {'stack': 'Stack 0', 'backgroundColor': '#FF6633'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Arua',
                    'formula': [{'formula': '[COUNTFORMS(forms,"district===\'arua\'")]'}],
                    'options': {'stack': 'Stack 1', 'backgroundColor': '#FFB399'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Lamwo',
                    'formula': [{'formula': '[COUNTFORMS(forms,"district===\'lamwo\'")]'}],
                    'options': {'stack': 'Stack 2', 'backgroundColor': '#FF33FF'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Kitgum',
                    'formula': [{'formula': '[COUNTFORMS(forms,"district===\'kitgum\'")]'}],
                    'options': {'stack': 'Stack 3', 'backgroundColor': '#FFFF99'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Pader',
                    'formula': [{'formula': '[COUNTFORMS(forms,"district===\'pader\'")]'}],
                    'options': {'stack': 'Stack 4', 'backgroundColor': '#00B3E6'},
                    'aggregation': {'aggregation': 0}
                  }
                ],
                'options': {
                  'legend': {'display': true, 'position': 'bottom'},
                  'scales': {'xAxes': [], 'yAxes': []},
                  'responsive': true,
                  'maintainAspectRatio': false
                },
                'exportable': true,
                'visibility': {'condition': 'true'},
                'widgetType': 4
              }
            ],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          },
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>Sub County</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {},
            'content': [
              {
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'htmlText': '<h5>[[COUNTFORMS(forms,"sub_county != null")]] answers</h5>',
                'visibility': {'condition': 'true'},
                'widgetType': 3
              },
              {
                'type': 6,
                'labels': {
                  'formula':
                      '[\'Aiivu\',\'Andelezu HCII\',\'Aivu\',\'Adumi\',\'Ajia\',\'Arivu\',\'Aroi\',\'Ayivuni \',\'Bileaffe\',\'Bileafe HCIII\',\'Omugo\',\'Odupi\',\'Omugo HCIV\',\'Omugo Extension (Settlement)\',\'Ofua HCIII\',\'Uriama\',\'Uriama/Rigbo\',\'Oluko\',\'Oli River Division\',\'Vurra\',\'Wandi HC III\',\'Pajulu\',\'Manibe\',\'Logiri\',\'Katrini\',\'Dadamu\',\'Ndaapi HCII\',\'Cilio HC III\',\'St.Francis-Ocodri HC III\',\'Katriini\',\'Imvepi settlement\',\'RhinoCamp ext.\',\'Paluga\',\'Padibe\',\'Potika\',\'Lokung\',\'Madi Opei\',\'Agoro\',\'Palabek Kal\',\'Palabek Gem\',\'Paluda\',\'Ogili\',\'Orom\',\'Namokora\',\'Omiya Nyima\',\'Kitgum Matidi\',\'Lagoro\',\'Amida\',\'Akwang\',\'Mucwini\',\'Central Division\',\'Pager Division\',\'Pandwong division\',\'Layamo\',\'Adilang\',\'Arum\',\'Kalongo\',\'Kotomor\',\'Lamiyo\',\'Lapono\',\'Lira Palwoo\',\'Lukole\',\'Omot\',\'Omiya Pachwa\',\'Paimol\',\'Parabongo\',\'Patongo\',\'Patongo TC\',\'Wol\',\'Pajule\',\'Acholibur\',\'Pader TC\',\'Anga gura\',\'Atanga\',\'Laguti\',\'Latanya\',\'Dure\',\'Ogom\',\'Pader S/C\',\'Puranga TC\',\'Puranga S/C\',\'Awere\']'
                },
                'styles': {'width': '100%', 'height': '400px'},
                'dataset': [{
                  'label': 'Sub County',
                  'formula': [{
                    'formula':
                        '[COUNTFORMS(forms,"sub_county===\'aiivu\'"),COUNTFORMS(forms,"sub_county===\'andelezu-hcii\'"),COUNTFORMS(forms,"sub_county===\'aivu\'"),COUNTFORMS(forms,"sub_county===\'adumi\'"),COUNTFORMS(forms,"sub_county===\'ajia\'"),COUNTFORMS(forms,"sub_county===\'arivu\'"),COUNTFORMS(forms,"sub_county===\'aroi\'"),COUNTFORMS(forms,"sub_county===\'ayivuni\'"),COUNTFORMS(forms,"sub_county===\'bileaffe\'"),COUNTFORMS(forms,"sub_county===\'bileaffe-hcii\'"),COUNTFORMS(forms,"sub_county===\'omugo\'"),COUNTFORMS(forms,"sub_county===\'odupi\'"),COUNTFORMS(forms,"sub_county===\'omugo_hciv\'"),COUNTFORMS(forms,"sub_county===\'omugo_extension\'"),COUNTFORMS(forms,"sub_county===\'ofua_hciii\'"),COUNTFORMS(forms,"sub_county===\'uriama\'"),COUNTFORMS(forms,"sub_county===\'uriama_rigbo\'"),COUNTFORMS(forms,"sub_county===\'oluko\'"),COUNTFORMS(forms,"sub_county===\'oli_river_division\'"),COUNTFORMS(forms,"sub_county===\'vurra\'"),COUNTFORMS(forms,"sub_county===\'wandi_hciii\'"),COUNTFORMS(forms,"sub_county===\'pajulu\'"),COUNTFORMS(forms,"sub_county===\'manibe\'"),COUNTFORMS(forms,"sub_county===\'logiri\'"),COUNTFORMS(forms,"sub_county===\'katrini\'"),COUNTFORMS(forms,"sub_county===\'dadamu\'"),COUNTFORMS(forms,"sub_county===\'ndaapi_hcii\'"),COUNTFORMS(forms,"sub_county===\'cilio_hcii\'"),COUNTFORMS(forms,"sub_county===\'st.francis-ocodri_hciii\'"),COUNTFORMS(forms,"sub_county===\'katriini\'"),COUNTFORMS(forms,"sub_county===\'imvepi_settlement\'"),COUNTFORMS(forms,"sub_county===\'rhinocamp_ext.\'"),COUNTFORMS(forms,"sub_county===\'paluga\'"),COUNTFORMS(forms,"sub_county===\'padibe\'"),COUNTFORMS(forms,"sub_county===\'potika\'"),COUNTFORMS(forms,"sub_county===\'lokung\'"),COUNTFORMS(forms,"sub_county===\'madi_opei\'"),COUNTFORMS(forms,"sub_county===\'agoro\'"),COUNTFORMS(forms,"sub_county===\'palabek_kal\'"),COUNTFORMS(forms,"sub_county===\'palabek_gem\'"),COUNTFORMS(forms,"sub_county===\'paluda\'"),COUNTFORMS(forms,"sub_county===\'ogili\'"),COUNTFORMS(forms,"sub_county===\'orom\'"),COUNTFORMS(forms,"sub_county===\'namokora\'"),COUNTFORMS(forms,"sub_county===\'omiya_nyima\'"),COUNTFORMS(forms,"sub_county===\'kitgum_matidi\'"),COUNTFORMS(forms,"sub_county===\'lagoro\'"),COUNTFORMS(forms,"sub_county===\'amida\'"),COUNTFORMS(forms,"sub_county===\'akwang\'"),COUNTFORMS(forms,"sub_county===\'mucwini\'"),COUNTFORMS(forms,"sub_county===\'central_division\'"),COUNTFORMS(forms,"sub_county===\'pager_division\'"),COUNTFORMS(forms,"sub_county===\'pandwong_division\'"),COUNTFORMS(forms,"sub_county===\'layamo\'"),COUNTFORMS(forms,"sub_county===\'adilang\'"),COUNTFORMS(forms,"sub_county===\'arum\'"),COUNTFORMS(forms,"sub_county===\'kalongo\'"),COUNTFORMS(forms,"sub_county===\'kotomor\'"),COUNTFORMS(forms,"sub_county===\'lamiyo\'"),COUNTFORMS(forms,"sub_county===\'lapono\'"),COUNTFORMS(forms,"sub_county===\'lira_palwoo\'"),COUNTFORMS(forms,"sub_county===\'lukole\'"),COUNTFORMS(forms,"sub_county===\'omot\'"),COUNTFORMS(forms,"sub_county===\'omiya_pachwa\'"),COUNTFORMS(forms,"sub_county===\'paimol\'"),COUNTFORMS(forms,"sub_county===\'parabongo\'"),COUNTFORMS(forms,"sub_county===\'patongo\'"),COUNTFORMS(forms,"sub_county===\'patongo_tc\'"),COUNTFORMS(forms,"sub_county===\'wol\'"),COUNTFORMS(forms,"sub_county===\'pajule\'"),COUNTFORMS(forms,"sub_county===\'acholibur\'"),COUNTFORMS(forms,"sub_county===\'pader_tc\'"),COUNTFORMS(forms,"sub_county===\'anga_gura\'"),COUNTFORMS(forms,"sub_county===\'atanga\'"),COUNTFORMS(forms,"sub_county===\'laguti\'"),COUNTFORMS(forms,"sub_county===\'latanya\'"),COUNTFORMS(forms,"sub_county===\'dure\'"),COUNTFORMS(forms,"sub_county===\'ogom\'"),COUNTFORMS(forms,"sub_county===\'pader_sc\'"),COUNTFORMS(forms,"sub_county===\'puranga_tc\'"),COUNTFORMS(forms,"sub_county===\'puranga_sc\'"),COUNTFORMS(forms,"sub_county===\'awere\'")]'
                  }],
                  'options': {
                    'backgroundColor': [
                      '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6',
                      '#999966', '#99FF99', '#B34D4D', '#80B300', '#809900', '#E6B3B3', '#6680B3',
                      '#66991A', '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC', '#66994D',
                      '#B366CC', '#4D8000', '#B33300', '#CC80CC', '#66664D', '#991AFF', '#E666FF',
                      '#4DB3FF', '#1AB399', '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
                      '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933', '#FF3380', '#CCCC00',
                      '#66E64D', '#4D80CC', '#9900B3', '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6',
                      '#6666FF', '#F44336', '#FFEBEE', '#FFCDD2', '#EF9A9A', '#E57373', '#EF5350',
                      '#E53935', '#D32F2F', '#C62828', '#B71C1C', '#FF8A80', '#FF5252', '#FF1744',
                      '#D50000', '#FCE4EC', '#F8BBD0', '#F48FB1', '#F06292', '#EC407A', '#E91E63',
                      '#D81B60', '#C2185B', '#AD1457', '#880E4F', '#FF80AB', '#FF4081', '#F50057',
                      '#C51162', '#F3E5F5', '#E1BEE7', '#CE93D8', '#BA68C8', '#AB47BC', '#9C27B0',
                      '#8E24AA', '#7B1FA2', '#6A1B9A', '#4A148C', '#EA80FC', '#E040FB', '#D500F9',
                      '#AA00FF', '#EDE7F6', '#D1C4E9', '#B39DDB', '#9575CD', '#7E57C2', '#673AB7',
                      '#5E35B1', '#512DA8', '#4527A0', '#311B92', '#B388FF', '#7C4DFF', '#651FFF',
                      '#6200EA', '#E8EAF6', '#C5CAE9', '#9FA8DA', '#7986CB', '#5C6BC0', '#3F51B5',
                      '#3949AB', '#303F9F', '#283593', '#1A237E', '#8C9EFF', '#536DFE', '#3D5AFE',
                      '#304FFE', '#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3',
                      '#1E88E5', '#1976D2', '#1565C0', '#0D47A1', '#82B1FF', '#448AFF', '#2979FF',
                      '#2962FF', '#E1F5FE', '#B3E5FC', '#81D4FA', '#4FC3F7', '#29B6F6', '#03A9F4',
                      '#039BE5', '#0288D1', '#0277BD', '#01579B', '#80D8FF', '#40C4FF', '#00B0FF',
                      '#0091EA', '#E0F7FA', '#B2EBF2', '#80DEEA', '#4DD0E1', '#26C6DA', '#00BCD4',
                      '#00ACC1', '#0097A7', '#00838F', '#6064',   '#84FFFF', '#18FFFF', '#00E5FF',
                      '#00B8D4', '#E0F2F1', '#B2DFDB', '#80CBC4', '#4DB6AC', '#26A69A', '#9688',
                      '#00897B', '#00796B', '#00695C', '#004D40', '#A7FFEB', '#64FFDA', '#1DE9B6',
                      '#00BFA5', '#E8F5E9', '#C8E6C9', '#A5D6A7', '#81C784', '#66BB6A', '#4CAF50',
                      '#43A047', '#388E3C', '#2E7D32', '#1B5E20', '#B9F6CA', '#69F0AE', '#00E676',
                      '#00C853', '#F1F8E9', '#DCEDC8', '#C5E1A5', '#AED581', '#9CCC65', '#8BC34A',
                      '#7CB342', '#689F38', '#558B2F', '#33691E', '#CCFF90', '#B2FF59', '#76FF03',
                      '#64DD17', '#F9FBE7', '#F0F4C3', '#E6EE9C', '#DCE775', '#D4E157', '#CDDC39',
                      '#C0CA33', '#AFB42B', '#9E9D24', '#827717', '#F4FF81', '#EEFF41', '#C6FF00',
                      '#AEEA00', '#FFFDE7', '#FFF9C4', '#FFF59D', '#FFF176', '#FFEE58', '#FFEB3B',
                      '#FDD835', '#FBC02D', '#F9A825', '#F57F17', '#FFFF8D', '#FFFF00', '#FFEA00',
                      '#FFD600', '#FFF8E1', '#FFECB3', '#FFE082', '#FFD54F', '#FFCA28', '#FFC107',
                      '#FFB300', '#FFA000', '#FF8F00', '#FF6F00', '#FFE57F', '#FFD740', '#FFC400',
                      '#FFAB00', '#FFF3E0', '#FFE0B2', '#FFCC80', '#FFB74D', '#FFA726', '#FF9800',
                      '#FB8C00', '#F57C00', '#EF6C00', '#E65100', '#FFD180', '#FFAB40', '#FF9100',
                      '#FF6D00', '#FBE9E7', '#FFCCBC', '#FFAB91', '#FF8A65', '#FF7043', '#FF5722',
                      '#F4511E', '#E64A19', '#D84315', '#BF360C', '#FF9E80', '#FF6E40', '#FF3D00',
                      '#DD2C00', '#EFEBE9', '#D7CCC8', '#BCAAA4', '#A1887F', '#8D6E63', '#795548',
                      '#6D4C41', '#5D4037', '#4E342E', '#3E2723', '#FAFAFA', '#F5F5F5', '#EEEEEE',
                      '#E0E0E0', '#BDBDBD', '#9E9E9E', '#757575', '#616161', '#424242', '#212121',
                      '#ECEFF1', '#CFD8DC', '#B0BEC5', '#90A4AE', '#78909C', '#607D8B', '#546E7A',
                      '#455A64', '#37474F', '#263238'
                    ]
                  },
                  'aggregation': {'aggregation': 0}
                }],
                'options': {
                  'legend': {'display': true, 'position': 'bottom'},
                  'scales': {'xAxes': [], 'yAxes': []},
                  'pieceLabel': {'position': 'outside'},
                  'responsive': true,
                  'maintainAspectRatio': false
                },
                'exportable': true,
                'visibility': {'condition': 'true'},
                'widgetType': 4
              }
            ],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          },
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>Point of care</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {},
            'content': [
              {
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'htmlText': '<h5>[[COUNTFORMS(forms,"poc != null")]] answers</h5>',
                'visibility': {'condition': 'true'},
                'widgetType': 3
              },
              {
                'type': 6,
                'labels': {'formula': '[\'OPD\',\'Outreach\',\'ANC\',\'MAT\',\'PNC\',\'YCC\']'},
                'styles': {'width': '100%', 'height': '400px'},
                'dataset': [{
                  'label': 'Point of care',
                  'formula': [{
                    'formula':
                        '[COUNTFORMS(forms,"poc===\'opd\'"),COUNTFORMS(forms,"poc===\'outreach\'"),COUNTFORMS(forms,"poc===\'anc\'"),COUNTFORMS(forms,"poc===\'mat\'"),COUNTFORMS(forms,"poc===\'pnc\'"),COUNTFORMS(forms,"poc===\'ycc\'")]'
                  }],
                  'options': {
                    'backgroundColor': [
                      '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6',
                      '#999966', '#99FF99', '#B34D4D', '#80B300', '#809900', '#E6B3B3', '#6680B3',
                      '#66991A', '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC', '#66994D',
                      '#B366CC', '#4D8000', '#B33300', '#CC80CC', '#66664D', '#991AFF', '#E666FF',
                      '#4DB3FF', '#1AB399', '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
                      '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933', '#FF3380', '#CCCC00',
                      '#66E64D', '#4D80CC', '#9900B3', '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6',
                      '#6666FF', '#F44336', '#FFEBEE', '#FFCDD2', '#EF9A9A', '#E57373', '#EF5350',
                      '#E53935', '#D32F2F', '#C62828', '#B71C1C', '#FF8A80', '#FF5252', '#FF1744',
                      '#D50000', '#FCE4EC', '#F8BBD0', '#F48FB1', '#F06292', '#EC407A', '#E91E63',
                      '#D81B60', '#C2185B', '#AD1457', '#880E4F', '#FF80AB', '#FF4081', '#F50057',
                      '#C51162', '#F3E5F5', '#E1BEE7', '#CE93D8', '#BA68C8', '#AB47BC', '#9C27B0',
                      '#8E24AA', '#7B1FA2', '#6A1B9A', '#4A148C', '#EA80FC', '#E040FB', '#D500F9',
                      '#AA00FF', '#EDE7F6', '#D1C4E9', '#B39DDB', '#9575CD', '#7E57C2', '#673AB7',
                      '#5E35B1', '#512DA8', '#4527A0', '#311B92', '#B388FF', '#7C4DFF', '#651FFF',
                      '#6200EA', '#E8EAF6', '#C5CAE9', '#9FA8DA', '#7986CB', '#5C6BC0', '#3F51B5',
                      '#3949AB', '#303F9F', '#283593', '#1A237E', '#8C9EFF', '#536DFE', '#3D5AFE',
                      '#304FFE', '#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3',
                      '#1E88E5', '#1976D2', '#1565C0', '#0D47A1', '#82B1FF', '#448AFF', '#2979FF',
                      '#2962FF', '#E1F5FE', '#B3E5FC', '#81D4FA', '#4FC3F7', '#29B6F6', '#03A9F4',
                      '#039BE5', '#0288D1', '#0277BD', '#01579B', '#80D8FF', '#40C4FF', '#00B0FF',
                      '#0091EA', '#E0F7FA', '#B2EBF2', '#80DEEA', '#4DD0E1', '#26C6DA', '#00BCD4',
                      '#00ACC1', '#0097A7', '#00838F', '#6064',   '#84FFFF', '#18FFFF', '#00E5FF',
                      '#00B8D4', '#E0F2F1', '#B2DFDB', '#80CBC4', '#4DB6AC', '#26A69A', '#9688',
                      '#00897B', '#00796B', '#00695C', '#004D40', '#A7FFEB', '#64FFDA', '#1DE9B6',
                      '#00BFA5', '#E8F5E9', '#C8E6C9', '#A5D6A7', '#81C784', '#66BB6A', '#4CAF50',
                      '#43A047', '#388E3C', '#2E7D32', '#1B5E20', '#B9F6CA', '#69F0AE', '#00E676',
                      '#00C853', '#F1F8E9', '#DCEDC8', '#C5E1A5', '#AED581', '#9CCC65', '#8BC34A',
                      '#7CB342', '#689F38', '#558B2F', '#33691E', '#CCFF90', '#B2FF59', '#76FF03',
                      '#64DD17', '#F9FBE7', '#F0F4C3', '#E6EE9C', '#DCE775', '#D4E157', '#CDDC39',
                      '#C0CA33', '#AFB42B', '#9E9D24', '#827717', '#F4FF81', '#EEFF41', '#C6FF00',
                      '#AEEA00', '#FFFDE7', '#FFF9C4', '#FFF59D', '#FFF176', '#FFEE58', '#FFEB3B',
                      '#FDD835', '#FBC02D', '#F9A825', '#F57F17', '#FFFF8D', '#FFFF00', '#FFEA00',
                      '#FFD600', '#FFF8E1', '#FFECB3', '#FFE082', '#FFD54F', '#FFCA28', '#FFC107',
                      '#FFB300', '#FFA000', '#FF8F00', '#FF6F00', '#FFE57F', '#FFD740', '#FFC400',
                      '#FFAB00', '#FFF3E0', '#FFE0B2', '#FFCC80', '#FFB74D', '#FFA726', '#FF9800',
                      '#FB8C00', '#F57C00', '#EF6C00', '#E65100', '#FFD180', '#FFAB40', '#FF9100',
                      '#FF6D00', '#FBE9E7', '#FFCCBC', '#FFAB91', '#FF8A65', '#FF7043', '#FF5722',
                      '#F4511E', '#E64A19', '#D84315', '#BF360C', '#FF9E80', '#FF6E40', '#FF3D00',
                      '#DD2C00', '#EFEBE9', '#D7CCC8', '#BCAAA4', '#A1887F', '#8D6E63', '#795548',
                      '#6D4C41', '#5D4037', '#4E342E', '#3E2723', '#FAFAFA', '#F5F5F5', '#EEEEEE',
                      '#E0E0E0', '#BDBDBD', '#9E9E9E', '#757575', '#616161', '#424242', '#212121',
                      '#ECEFF1', '#CFD8DC', '#B0BEC5', '#90A4AE', '#78909C', '#607D8B', '#546E7A',
                      '#455A64', '#37474F', '#263238'
                    ]
                  },
                  'aggregation': {'aggregation': 0}
                }],
                'options': {
                  'legend': {'display': true, 'position': 'bottom'},
                  'scales': {'xAxes': [], 'yAxes': []},
                  'pieceLabel': {'position': 'outside'},
                  'responsive': true,
                  'maintainAspectRatio': false
                },
                'exportable': true,
                'visibility': {'condition': 'true'},
                'widgetType': 4
              }
            ],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          }
        ],
        'visibility': {'condition': 'true'},
        'widgetType': 7
      },
      {
        'styles': {'width': '100%', 'dislay': 'block'},
        'htmlText': '<div color="primary"><h1>Patient Information</h1></div>',
        'visibility': {'condition': 'true'},
        'widgetType': 3
      },
      {
        'styles': {'with': '100%', 'dislay': 'block'},
        'content': [
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>Nationality</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {},
            'content': [
              {
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'htmlText': '<h5>[[COUNTFORMS(forms,"nationality != null")]] answers</h5>',
                'visibility': {'condition': 'true'},
                'widgetType': 3
              },
              {
                'type': 1,
                'labels': {'formula': '[]'},
                'styles': {'width': '100%', 'height': '400px'},
                'dataset': [
                  {
                    'label': 'Ugandans',
                    'formula': [{'formula': '[COUNTFORMS(forms,"nationality===\'ugandans\'")]'}],
                    'options': {'stack': 'Stack 0', 'backgroundColor': '#FF6633'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Refugees',
                    'formula': [{'formula': '[COUNTFORMS(forms,"nationality===\'refugees\'")]'}],
                    'options': {'stack': 'Stack 1', 'backgroundColor': '#FFB399'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Foreigners',
                    'formula': [{'formula': '[COUNTFORMS(forms,"nationality===\'foreigners\'")]'}],
                    'options': {'stack': 'Stack 2', 'backgroundColor': '#FF33FF'},
                    'aggregation': {'aggregation': 0}
                  }
                ],
                'options': {
                  'legend': {'display': true, 'position': 'bottom'},
                  'scales': {'xAxes': [], 'yAxes': []},
                  'responsive': true,
                  'maintainAspectRatio': false
                },
                'exportable': true,
                'visibility': {'condition': 'true'},
                'widgetType': 4
              }
            ],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          },
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>Age</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {'dislay': 'block', 'maxHeight': '500px', 'marginBottom': '10px'},
            'content': [{
              'styles': {},
              'columns': [0.33, 0.33, 0.33],
              'content': [
                {
                  'styles':
                      {'width': '100%', 'dislay': 'block', 'height': '100%', 'padding': '10px'},
                  'content': [
                    {
                      'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
                      'htmlText': '<div color="primary"><h5>Mean</h5></div>',
                      'visibility': {'condition': 'true'},
                      'widgetType': 3
                    },
                    {
                      'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
                      'htmlText': '<p>[[MEAN(forms,"age")]] / [[MAX(forms,"age")]]</p>',
                      'visibility': {'condition': 'true'},
                      'widgetType': 3
                    }
                  ],
                  'visibility': {'condition': 'true'},
                  'widgetType': 7
                },
                {
                  'styles':
                      {'width': '100%', 'dislay': 'block', 'height': '100%', 'padding': '10px'},
                  'content': [
                    {
                      'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
                      'htmlText': '<div color="primary"><h5>Median</h5></div>',
                      'visibility': {'condition': 'true'},
                      'widgetType': 3
                    },
                    {
                      'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
                      'htmlText': '<p>[[MEDIAN(forms,"age")]] / [[MAX(forms,"age")]]</p>',
                      'visibility': {'condition': 'true'},
                      'widgetType': 3
                    }
                  ],
                  'visibility': {'condition': 'true'},
                  'widgetType': 7
                },
                {
                  'styles':
                      {'width': '100%', 'dislay': 'block', 'height': '100%', 'padding': '10px'},
                  'content': [
                    {
                      'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
                      'htmlText': '<div color="primary"><h5>Mode</h5></div>',
                      'visibility': {'condition': 'true'},
                      'widgetType': 3
                    },
                    {
                      'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
                      'htmlText': '<p>[[MODE(forms,"age")]]</p>',
                      'visibility': {'condition': 'true'},
                      'widgetType': 3
                    }
                  ],
                  'visibility': {'condition': 'true'},
                  'widgetType': 7
                }
              ],
              'visibility': {'condition': 'true'},
              'widgetType': 0
            }],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          },
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>Gender</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {},
            'content': [
              {
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'htmlText': '<h5>[[COUNTFORMS(forms,"gender != null")]] answers</h5>',
                'visibility': {'condition': 'true'},
                'widgetType': 3
              },
              {
                'type': 1,
                'labels': {'formula': '[]'},
                'styles': {'width': '100%', 'height': '400px'},
                'dataset': [
                  {
                    'label': 'Male',
                    'formula': [{'formula': '[COUNTFORMS(forms,"gender===\'m\'")]'}],
                    'options': {'stack': 'Stack 0', 'backgroundColor': '#FF6633'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Female',
                    'formula': [{'formula': '[COUNTFORMS(forms,"gender===\'f\'")]'}],
                    'options': {'stack': 'Stack 1', 'backgroundColor': '#FFB399'},
                    'aggregation': {'aggregation': 0}
                  }
                ],
                'options': {
                  'legend': {'display': true, 'position': 'bottom'},
                  'scales': {'xAxes': [], 'yAxes': []},
                  'responsive': true,
                  'maintainAspectRatio': false
                },
                'exportable': true,
                'visibility': {'condition': 'true'},
                'widgetType': 4
              }
            ],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          },
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>Disability Status</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {},
            'content': [
              {
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'htmlText': '<h5>[[COUNTFORMS(forms,"disability_status != null")]] answers</h5>',
                'visibility': {'condition': 'true'},
                'widgetType': 3
              },
              {
                'type': 1,
                'labels': {'formula': '[]'},
                'styles': {'width': '100%', 'height': '400px'},
                'dataset': [
                  {
                    'label': 'y',
                    'formula': [{'formula': '[COUNTFORMS(forms,"disability_status===\'y\'")]'}],
                    'options': {'stack': 'Stack 0', 'backgroundColor': '#FF6633'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'n',
                    'formula': [{'formula': '[COUNTFORMS(forms,"disability_status===\'n\'")]'}],
                    'options': {'stack': 'Stack 1', 'backgroundColor': '#FFB399'},
                    'aggregation': {'aggregation': 0}
                  }
                ],
                'options': {
                  'legend': {'display': true, 'position': 'bottom'},
                  'scales': {'xAxes': [], 'yAxes': []},
                  'responsive': true,
                  'maintainAspectRatio': false
                },
                'exportable': true,
                'visibility': {'condition': 'true'},
                'widgetType': 4
              }
            ],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          },
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>Disabilities</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {},
            'content': [
              {
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'htmlText': '<h5>[[COUNTFORMS(forms,"disabilities != null")]] answers</h5>',
                'visibility': {'condition': 'true'},
                'widgetType': 3
              },
              {
                'type': 1,
                'labels': {'formula': '[]'},
                'styles': {'width': '100%', 'height': '400px'},
                'dataset': [
                  {
                    'label': 'DS01.Individuals with Difficulty in seeing',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"disabilities.indexOf(\'ds01\') > -1")]'}],
                    'options': {'stack': 'Stack 0', 'backgroundColor': '#FF6633'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'DS02.Individuals with Albinism',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"disabilities.indexOf(\'ds02\') > -1")]'}],
                    'options': {'stack': 'Stack 1', 'backgroundColor': '#FFB399'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'DS03.Individuals with Difficulty in hearing',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"disabilities.indexOf(\'ds03\') > -1")]'}],
                    'options': {'stack': 'Stack 2', 'backgroundColor': '#FF33FF'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'DS04.Individuals with Speech Difficulties',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"disabilities.indexOf(\'ds04\') > -1")]'}],
                    'options': {'stack': 'Stack 3', 'backgroundColor': '#FFFF99'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'DS05.Individuals with delayed age specific motor development',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"disabilities.indexOf(\'ds05\') > -1")]'}],
                    'options': {'stack': 'Stack 4', 'backgroundColor': '#00B3E6'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'DS06.Individuals with Dwarfism',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"disabilities.indexOf(\'ds06\') > -1")]'}],
                    'options': {'stack': 'Stack 5', 'backgroundColor': '#E6B333'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'DS07.Individuals with Difficulty understanding',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"disabilities.indexOf(\'ds07\') > -1")]'}],
                    'options': {'stack': 'Stack 6', 'backgroundColor': '#3366E6'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'DS08.Individuals with Difficulty in remembering',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"disabilities.indexOf(\'ds08\') > -1")]'}],
                    'options': {'stack': 'Stack 7', 'backgroundColor': '#999966'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'DS09.Individuals with Difficulty in reading',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"disabilities.indexOf(\'ds09\') > -1")]'}],
                    'options': {'stack': 'Stack 8', 'backgroundColor': '#99FF99'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'DS10.Individuals with Difficulty in writing',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"disabilities.indexOf(\'ds10\') > -1")]'}],
                    'options': {'stack': 'Stack 9', 'backgroundColor': '#B34D4D'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'DS11.Individuals with Difficulty in self-care',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"disabilities.indexOf(\'ds11\') > -1")]'}],
                    'options': {'stack': 'Stack 10', 'backgroundColor': '#80B300'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'DS12.Individuals with Mentally impairment',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"disabilities.indexOf(\'ds12\') > -1")]'}],
                    'options': {'stack': 'Stack 11', 'backgroundColor': '#809900'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'DS13. Individuals with Emotionally impairment',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"disabilities.indexOf(\'ds13\') > -1")]'}],
                    'options': {'stack': 'Stack 12', 'backgroundColor': '#E6B3B3'},
                    'aggregation': {'aggregation': 0}
                  }
                ],
                'options': {
                  'legend': {'display': true, 'position': 'bottom'},
                  'scales': {'xAxes': [], 'yAxes': []},
                  'responsive': true,
                  'maintainAspectRatio': false
                },
                'exportable': true,
                'visibility': {'condition': 'true'},
                'widgetType': 4
              }
            ],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          },
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>Pregnancy</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {},
            'content': [
              {
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'htmlText': '<h5>[[COUNTFORMS(forms,"pregnancy != null")]] answers</h5>',
                'visibility': {'condition': 'true'},
                'widgetType': 3
              },
              {
                'type': 1,
                'labels': {'formula': '[]'},
                'styles': {'width': '100%', 'height': '400px'},
                'dataset': [
                  {
                    'label': 'y',
                    'formula': [{'formula': '[COUNTFORMS(forms,"pregnancy===\'y\'")]'}],
                    'options': {'stack': 'Stack 0', 'backgroundColor': '#FF6633'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'n',
                    'formula': [{'formula': '[COUNTFORMS(forms,"pregnancy===\'n\'")]'}],
                    'options': {'stack': 'Stack 1', 'backgroundColor': '#FFB399'},
                    'aggregation': {'aggregation': 0}
                  }
                ],
                'options': {
                  'legend': {'display': true, 'position': 'bottom'},
                  'scales': {'xAxes': [], 'yAxes': []},
                  'responsive': true,
                  'maintainAspectRatio': false
                },
                'exportable': true,
                'visibility': {'condition': 'true'},
                'widgetType': 4
              }
            ],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          }
        ],
        'visibility': {'condition': 'true'},
        'widgetType': 7
      },
      {
        'styles': {'width': '100%', 'dislay': 'block'},
        'htmlText': '<div color="primary"><h1>Exam</h1></div>',
        'visibility': {'condition': 'true'},
        'widgetType': 3
      },
      {
        'styles': {'with': '100%', 'dislay': 'block'},
        'content': [
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>Eyes Checked</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {},
            'content': [
              {
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'htmlText': '<h5>[[COUNTFORMS(forms,"eyes_checked != null")]] answers</h5>',
                'visibility': {'condition': 'true'},
                'widgetType': 3
              },
              {
                'type': 1,
                'labels': {'formula': '[]'},
                'styles': {'width': '100%', 'height': '400px'},
                'dataset': [
                  {
                    'label': 'RE',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"eyes_checked.indexOf(\'od\') > -1")]'}],
                    'options': {'stack': 'Stack 0', 'backgroundColor': '#FF6633'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'LE',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"eyes_checked.indexOf(\'os\') > -1")]'}],
                    'options': {'stack': 'Stack 1', 'backgroundColor': '#FFB399'},
                    'aggregation': {'aggregation': 0}
                  }
                ],
                'options': {
                  'legend': {'display': true, 'position': 'bottom'},
                  'scales': {'xAxes': [], 'yAxes': []},
                  'responsive': true,
                  'maintainAspectRatio': false
                },
                'exportable': true,
                'visibility': {'condition': 'true'},
                'widgetType': 4
              }
            ],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          }
        ],
        'visibility': {'condition': 'true'},
        'widgetType': 7
      },
      {
        'styles': {'width': '100%', 'dislay': 'block'},
        'htmlText': '<div color="primary"><h1>Exam RE</h1></div>',
        'visibility': {'condition': 'true'},
        'widgetType': 3
      },
      {
        'styles': {'with': '100%', 'dislay': 'block'},
        'content': [
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>Visual acuity (VA)</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {},
            'content': [
              {
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'htmlText': '<h5>[[COUNTFORMS(forms,"va_od != null")]] answers</h5>',
                'visibility': {'condition': 'true'},
                'widgetType': 3
              },
              {
                'type': 6,
                'labels': {
                  'formula':
                      '[\'less than 6/60 \',\'6/60\',\'6/36\',\'6/24\',\'6/18\',\'6/12\',\'6/9\',\'6/6\']'
                },
                'styles': {'width': '100%', 'height': '400px'},
                'dataset': [{
                  'label': 'Visual acuity (VA)',
                  'formula': [{
                    'formula':
                        '[COUNTFORMS(forms,"va_od===\'6_60-\'"),COUNTFORMS(forms,"va_od===\'6_60\'"),COUNTFORMS(forms,"va_od===\'6_36\'"),COUNTFORMS(forms,"va_od===\'6_24\'"),COUNTFORMS(forms,"va_od===\'6_18\'"),COUNTFORMS(forms,"va_od===\'6_12\'"),COUNTFORMS(forms,"va_od===\'6_9\'"),COUNTFORMS(forms,"va_od===\'6_6\'")]'
                  }],
                  'options': {
                    'backgroundColor': [
                      '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6',
                      '#999966', '#99FF99', '#B34D4D', '#80B300', '#809900', '#E6B3B3', '#6680B3',
                      '#66991A', '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC', '#66994D',
                      '#B366CC', '#4D8000', '#B33300', '#CC80CC', '#66664D', '#991AFF', '#E666FF',
                      '#4DB3FF', '#1AB399', '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
                      '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933', '#FF3380', '#CCCC00',
                      '#66E64D', '#4D80CC', '#9900B3', '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6',
                      '#6666FF', '#F44336', '#FFEBEE', '#FFCDD2', '#EF9A9A', '#E57373', '#EF5350',
                      '#E53935', '#D32F2F', '#C62828', '#B71C1C', '#FF8A80', '#FF5252', '#FF1744',
                      '#D50000', '#FCE4EC', '#F8BBD0', '#F48FB1', '#F06292', '#EC407A', '#E91E63',
                      '#D81B60', '#C2185B', '#AD1457', '#880E4F', '#FF80AB', '#FF4081', '#F50057',
                      '#C51162', '#F3E5F5', '#E1BEE7', '#CE93D8', '#BA68C8', '#AB47BC', '#9C27B0',
                      '#8E24AA', '#7B1FA2', '#6A1B9A', '#4A148C', '#EA80FC', '#E040FB', '#D500F9',
                      '#AA00FF', '#EDE7F6', '#D1C4E9', '#B39DDB', '#9575CD', '#7E57C2', '#673AB7',
                      '#5E35B1', '#512DA8', '#4527A0', '#311B92', '#B388FF', '#7C4DFF', '#651FFF',
                      '#6200EA', '#E8EAF6', '#C5CAE9', '#9FA8DA', '#7986CB', '#5C6BC0', '#3F51B5',
                      '#3949AB', '#303F9F', '#283593', '#1A237E', '#8C9EFF', '#536DFE', '#3D5AFE',
                      '#304FFE', '#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3',
                      '#1E88E5', '#1976D2', '#1565C0', '#0D47A1', '#82B1FF', '#448AFF', '#2979FF',
                      '#2962FF', '#E1F5FE', '#B3E5FC', '#81D4FA', '#4FC3F7', '#29B6F6', '#03A9F4',
                      '#039BE5', '#0288D1', '#0277BD', '#01579B', '#80D8FF', '#40C4FF', '#00B0FF',
                      '#0091EA', '#E0F7FA', '#B2EBF2', '#80DEEA', '#4DD0E1', '#26C6DA', '#00BCD4',
                      '#00ACC1', '#0097A7', '#00838F', '#6064',   '#84FFFF', '#18FFFF', '#00E5FF',
                      '#00B8D4', '#E0F2F1', '#B2DFDB', '#80CBC4', '#4DB6AC', '#26A69A', '#9688',
                      '#00897B', '#00796B', '#00695C', '#004D40', '#A7FFEB', '#64FFDA', '#1DE9B6',
                      '#00BFA5', '#E8F5E9', '#C8E6C9', '#A5D6A7', '#81C784', '#66BB6A', '#4CAF50',
                      '#43A047', '#388E3C', '#2E7D32', '#1B5E20', '#B9F6CA', '#69F0AE', '#00E676',
                      '#00C853', '#F1F8E9', '#DCEDC8', '#C5E1A5', '#AED581', '#9CCC65', '#8BC34A',
                      '#7CB342', '#689F38', '#558B2F', '#33691E', '#CCFF90', '#B2FF59', '#76FF03',
                      '#64DD17', '#F9FBE7', '#F0F4C3', '#E6EE9C', '#DCE775', '#D4E157', '#CDDC39',
                      '#C0CA33', '#AFB42B', '#9E9D24', '#827717', '#F4FF81', '#EEFF41', '#C6FF00',
                      '#AEEA00', '#FFFDE7', '#FFF9C4', '#FFF59D', '#FFF176', '#FFEE58', '#FFEB3B',
                      '#FDD835', '#FBC02D', '#F9A825', '#F57F17', '#FFFF8D', '#FFFF00', '#FFEA00',
                      '#FFD600', '#FFF8E1', '#FFECB3', '#FFE082', '#FFD54F', '#FFCA28', '#FFC107',
                      '#FFB300', '#FFA000', '#FF8F00', '#FF6F00', '#FFE57F', '#FFD740', '#FFC400',
                      '#FFAB00', '#FFF3E0', '#FFE0B2', '#FFCC80', '#FFB74D', '#FFA726', '#FF9800',
                      '#FB8C00', '#F57C00', '#EF6C00', '#E65100', '#FFD180', '#FFAB40', '#FF9100',
                      '#FF6D00', '#FBE9E7', '#FFCCBC', '#FFAB91', '#FF8A65', '#FF7043', '#FF5722',
                      '#F4511E', '#E64A19', '#D84315', '#BF360C', '#FF9E80', '#FF6E40', '#FF3D00',
                      '#DD2C00', '#EFEBE9', '#D7CCC8', '#BCAAA4', '#A1887F', '#8D6E63', '#795548',
                      '#6D4C41', '#5D4037', '#4E342E', '#3E2723', '#FAFAFA', '#F5F5F5', '#EEEEEE',
                      '#E0E0E0', '#BDBDBD', '#9E9E9E', '#757575', '#616161', '#424242', '#212121',
                      '#ECEFF1', '#CFD8DC', '#B0BEC5', '#90A4AE', '#78909C', '#607D8B', '#546E7A',
                      '#455A64', '#37474F', '#263238'
                    ]
                  },
                  'aggregation': {'aggregation': 0}
                }],
                'options': {
                  'legend': {'display': true, 'position': 'bottom'},
                  'scales': {'xAxes': [], 'yAxes': []},
                  'pieceLabel': {'position': 'outside'},
                  'responsive': true,
                  'maintainAspectRatio': false
                },
                'exportable': true,
                'visibility': {'condition': 'true'},
                'widgetType': 4
              }
            ],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          },
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>CF (Counting fingers)</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {},
            'content': [
              {
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'htmlText': '<h5>[[COUNTFORMS(forms,"cf_od != null")]] answers</h5>',
                'visibility': {'condition': 'true'},
                'widgetType': 3
              },
              {
                'type': 1,
                'labels': {'formula': '[]'},
                'styles': {'width': '100%', 'height': '400px'},
                'dataset': [
                  {
                    'label': 'y',
                    'formula': [{'formula': '[COUNTFORMS(forms,"cf_od===\'y\'")]'}],
                    'options': {'stack': 'Stack 0', 'backgroundColor': '#FF6633'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'n',
                    'formula': [{'formula': '[COUNTFORMS(forms,"cf_od===\'n\'")]'}],
                    'options': {'stack': 'Stack 1', 'backgroundColor': '#FFB399'},
                    'aggregation': {'aggregation': 0}
                  }
                ],
                'options': {
                  'legend': {'display': true, 'position': 'bottom'},
                  'scales': {'xAxes': [], 'yAxes': []},
                  'responsive': true,
                  'maintainAspectRatio': false
                },
                'exportable': true,
                'visibility': {'condition': 'true'},
                'widgetType': 4
              }
            ],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          },
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>HM (Hand motion)</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {},
            'content': [
              {
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'htmlText': '<h5>[[COUNTFORMS(forms,"hm_od != null")]] answers</h5>',
                'visibility': {'condition': 'true'},
                'widgetType': 3
              },
              {
                'type': 1,
                'labels': {'formula': '[]'},
                'styles': {'width': '100%', 'height': '400px'},
                'dataset': [
                  {
                    'label': 'y',
                    'formula': [{'formula': '[COUNTFORMS(forms,"hm_od===\'y\'")]'}],
                    'options': {'stack': 'Stack 0', 'backgroundColor': '#FF6633'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'n',
                    'formula': [{'formula': '[COUNTFORMS(forms,"hm_od===\'n\'")]'}],
                    'options': {'stack': 'Stack 1', 'backgroundColor': '#FFB399'},
                    'aggregation': {'aggregation': 0}
                  }
                ],
                'options': {
                  'legend': {'display': true, 'position': 'bottom'},
                  'scales': {'xAxes': [], 'yAxes': []},
                  'responsive': true,
                  'maintainAspectRatio': false
                },
                'exportable': true,
                'visibility': {'condition': 'true'},
                'widgetType': 4
              }
            ],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          },
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>LP (Light perception)</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {},
            'content': [
              {
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'htmlText': '<h5>[[COUNTFORMS(forms,"lp_od != null")]] answers</h5>',
                'visibility': {'condition': 'true'},
                'widgetType': 3
              },
              {
                'type': 1,
                'labels': {'formula': '[]'},
                'styles': {'width': '100%', 'height': '400px'},
                'dataset': [
                  {
                    'label': 'y',
                    'formula': [{'formula': '[COUNTFORMS(forms,"lp_od===\'y\'")]'}],
                    'options': {'stack': 'Stack 0', 'backgroundColor': '#FF6633'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'n',
                    'formula': [{'formula': '[COUNTFORMS(forms,"lp_od===\'n\'")]'}],
                    'options': {'stack': 'Stack 1', 'backgroundColor': '#FFB399'},
                    'aggregation': {'aggregation': 0}
                  }
                ],
                'options': {
                  'legend': {'display': true, 'position': 'bottom'},
                  'scales': {'xAxes': [], 'yAxes': []},
                  'responsive': true,
                  'maintainAspectRatio': false
                },
                'exportable': true,
                'visibility': {'condition': 'true'},
                'widgetType': 4
              }
            ],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          },
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>IOP/Intra-ocular pressure (0-21 mmHg)</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {'dislay': 'block', 'maxHeight': '500px', 'marginBottom': '10px'},
            'content': [{
              'styles': {},
              'columns': [0.33, 0.33, 0.33],
              'content': [
                {
                  'styles':
                      {'width': '100%', 'dislay': 'block', 'height': '100%', 'padding': '10px'},
                  'content': [
                    {
                      'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
                      'htmlText': '<div color="primary"><h5>Mean</h5></div>',
                      'visibility': {'condition': 'true'},
                      'widgetType': 3
                    },
                    {
                      'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
                      'htmlText': '<p>[[MEAN(forms,"iop_od")]] / [[MAX(forms,"iop_od")]]</p>',
                      'visibility': {'condition': 'true'},
                      'widgetType': 3
                    }
                  ],
                  'visibility': {'condition': 'true'},
                  'widgetType': 7
                },
                {
                  'styles':
                      {'width': '100%', 'dislay': 'block', 'height': '100%', 'padding': '10px'},
                  'content': [
                    {
                      'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
                      'htmlText': '<div color="primary"><h5>Median</h5></div>',
                      'visibility': {'condition': 'true'},
                      'widgetType': 3
                    },
                    {
                      'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
                      'htmlText': '<p>[[MEDIAN(forms,"iop_od")]] / [[MAX(forms,"iop_od")]]</p>',
                      'visibility': {'condition': 'true'},
                      'widgetType': 3
                    }
                  ],
                  'visibility': {'condition': 'true'},
                  'widgetType': 7
                },
                {
                  'styles':
                      {'width': '100%', 'dislay': 'block', 'height': '100%', 'padding': '10px'},
                  'content': [
                    {
                      'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
                      'htmlText': '<div color="primary"><h5>Mode</h5></div>',
                      'visibility': {'condition': 'true'},
                      'widgetType': 3
                    },
                    {
                      'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
                      'htmlText': '<p>[[MODE(forms,"iop_od")]]</p>',
                      'visibility': {'condition': 'true'},
                      'widgetType': 3
                    }
                  ],
                  'visibility': {'condition': 'true'},
                  'widgetType': 7
                }
              ],
              'visibility': {'condition': 'true'},
              'widgetType': 0
            }],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          }
        ],
        'visibility': {'condition': 'true'},
        'widgetType': 7
      },
      {
        'styles': {'width': '100%', 'dislay': 'block'},
        'htmlText': '<div color="primary"><h1>EXAMINATION FINDINGS RE</h1></div>',
        'visibility': {'condition': 'true'},
        'widgetType': 3
      },
      {
        'styles': {'with': '100%', 'dislay': 'block'},
        'content': [
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>Eye Lid</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {},
            'content': [
              {
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'htmlText': '<h5>[[COUNTFORMS(forms,"eye_lid_od != null")]] answers</h5>',
                'visibility': {'condition': 'true'},
                'widgetType': 3
              },
              {
                'type': 1,
                'labels': {'formula': '[]'},
                'styles': {'width': '100%', 'height': '400px'},
                'dataset': [
                  {
                    'label': 'Normal',
                    'formula': [{'formula': '[COUNTFORMS(forms,"eye_lid_od===\'normal\'")]'}],
                    'options': {'stack': 'Stack 0', 'backgroundColor': '#FF6633'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Abnormal',
                    'formula': [{'formula': '[COUNTFORMS(forms,"eye_lid_od===\'abnormal\'")]'}],
                    'options': {'stack': 'Stack 1', 'backgroundColor': '#FFB399'},
                    'aggregation': {'aggregation': 0}
                  }
                ],
                'options': {
                  'legend': {'display': true, 'position': 'bottom'},
                  'scales': {'xAxes': [], 'yAxes': []},
                  'responsive': true,
                  'maintainAspectRatio': false
                },
                'exportable': true,
                'visibility': {'condition': 'true'},
                'widgetType': 4
              }
            ],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          },
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>Conjunctiva</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {},
            'content': [
              {
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'htmlText': '<h5>[[COUNTFORMS(forms,"conjunctiva_od != null")]] answers</h5>',
                'visibility': {'condition': 'true'},
                'widgetType': 3
              },
              {
                'type': 1,
                'labels': {'formula': '[]'},
                'styles': {'width': '100%', 'height': '400px'},
                'dataset': [
                  {
                    'label': 'Normal',
                    'formula': [{'formula': '[COUNTFORMS(forms,"conjunctiva_od===\'normal\'")]'}],
                    'options': {'stack': 'Stack 0', 'backgroundColor': '#FF6633'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Inflamed',
                    'formula': [{'formula': '[COUNTFORMS(forms,"conjunctiva_od===\'inflamed\'")]'}],
                    'options': {'stack': 'Stack 1', 'backgroundColor': '#FFB399'},
                    'aggregation': {'aggregation': 0}
                  }
                ],
                'options': {
                  'legend': {'display': true, 'position': 'bottom'},
                  'scales': {'xAxes': [], 'yAxes': []},
                  'responsive': true,
                  'maintainAspectRatio': false
                },
                'exportable': true,
                'visibility': {'condition': 'true'},
                'widgetType': 4
              }
            ],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          },
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>Cornea</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {},
            'content': [
              {
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'htmlText': '<h5>[[COUNTFORMS(forms,"cornea_od != null")]] answers</h5>',
                'visibility': {'condition': 'true'},
                'widgetType': 3
              },
              {
                'type': 1,
                'labels': {'formula': '[]'},
                'styles': {'width': '100%', 'height': '400px'},
                'dataset': [
                  {
                    'label': 'Clear',
                    'formula': [{'formula': '[COUNTFORMS(forms,"cornea_od===\'clear\'")]'}],
                    'options': {'stack': 'Stack 0', 'backgroundColor': '#FF6633'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Opaque',
                    'formula': [{'formula': '[COUNTFORMS(forms,"cornea_od===\'opaque\'")]'}],
                    'options': {'stack': 'Stack 1', 'backgroundColor': '#FFB399'},
                    'aggregation': {'aggregation': 0}
                  }
                ],
                'options': {
                  'legend': {'display': true, 'position': 'bottom'},
                  'scales': {'xAxes': [], 'yAxes': []},
                  'responsive': true,
                  'maintainAspectRatio': false
                },
                'exportable': true,
                'visibility': {'condition': 'true'},
                'widgetType': 4
              }
            ],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          },
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>Anterior chamber</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {},
            'content': [
              {
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'htmlText': '<h5>[[COUNTFORMS(forms,"anterior_chamber_od != null")]] answers</h5>',
                'visibility': {'condition': 'true'},
                'widgetType': 3
              },
              {
                'type': 6,
                'labels': {
                  'formula':
                      '[\'Normal Depth\',\'Swallow\',\'Hyphema\',\'Hypopyon\',\'KPs\',\'Cells and flare\']'
                },
                'styles': {'width': '100%', 'height': '400px'},
                'dataset': [{
                  'label': 'Anterior chamber',
                  'formula': [{
                    'formula':
                        '[COUNTFORMS(forms,"anterior_chamber_od===\'anterior_chamber_normal\'"),COUNTFORMS(forms,"anterior_chamber_od===\'anterior_chamber_swallow\'"),COUNTFORMS(forms,"anterior_chamber_od===\'anterior_chamber_hyphema\'"),COUNTFORMS(forms,"anterior_chamber_od===\'anterior_chamber_hypopyon\'"),COUNTFORMS(forms,"anterior_chamber_od===\'anterior_chamber_kps\'"),COUNTFORMS(forms,"anterior_chamber_od===\'anterior_chamber_cell_flare\'")]'
                  }],
                  'options': {
                    'backgroundColor': [
                      '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6',
                      '#999966', '#99FF99', '#B34D4D', '#80B300', '#809900', '#E6B3B3', '#6680B3',
                      '#66991A', '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC', '#66994D',
                      '#B366CC', '#4D8000', '#B33300', '#CC80CC', '#66664D', '#991AFF', '#E666FF',
                      '#4DB3FF', '#1AB399', '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
                      '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933', '#FF3380', '#CCCC00',
                      '#66E64D', '#4D80CC', '#9900B3', '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6',
                      '#6666FF', '#F44336', '#FFEBEE', '#FFCDD2', '#EF9A9A', '#E57373', '#EF5350',
                      '#E53935', '#D32F2F', '#C62828', '#B71C1C', '#FF8A80', '#FF5252', '#FF1744',
                      '#D50000', '#FCE4EC', '#F8BBD0', '#F48FB1', '#F06292', '#EC407A', '#E91E63',
                      '#D81B60', '#C2185B', '#AD1457', '#880E4F', '#FF80AB', '#FF4081', '#F50057',
                      '#C51162', '#F3E5F5', '#E1BEE7', '#CE93D8', '#BA68C8', '#AB47BC', '#9C27B0',
                      '#8E24AA', '#7B1FA2', '#6A1B9A', '#4A148C', '#EA80FC', '#E040FB', '#D500F9',
                      '#AA00FF', '#EDE7F6', '#D1C4E9', '#B39DDB', '#9575CD', '#7E57C2', '#673AB7',
                      '#5E35B1', '#512DA8', '#4527A0', '#311B92', '#B388FF', '#7C4DFF', '#651FFF',
                      '#6200EA', '#E8EAF6', '#C5CAE9', '#9FA8DA', '#7986CB', '#5C6BC0', '#3F51B5',
                      '#3949AB', '#303F9F', '#283593', '#1A237E', '#8C9EFF', '#536DFE', '#3D5AFE',
                      '#304FFE', '#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3',
                      '#1E88E5', '#1976D2', '#1565C0', '#0D47A1', '#82B1FF', '#448AFF', '#2979FF',
                      '#2962FF', '#E1F5FE', '#B3E5FC', '#81D4FA', '#4FC3F7', '#29B6F6', '#03A9F4',
                      '#039BE5', '#0288D1', '#0277BD', '#01579B', '#80D8FF', '#40C4FF', '#00B0FF',
                      '#0091EA', '#E0F7FA', '#B2EBF2', '#80DEEA', '#4DD0E1', '#26C6DA', '#00BCD4',
                      '#00ACC1', '#0097A7', '#00838F', '#6064',   '#84FFFF', '#18FFFF', '#00E5FF',
                      '#00B8D4', '#E0F2F1', '#B2DFDB', '#80CBC4', '#4DB6AC', '#26A69A', '#9688',
                      '#00897B', '#00796B', '#00695C', '#004D40', '#A7FFEB', '#64FFDA', '#1DE9B6',
                      '#00BFA5', '#E8F5E9', '#C8E6C9', '#A5D6A7', '#81C784', '#66BB6A', '#4CAF50',
                      '#43A047', '#388E3C', '#2E7D32', '#1B5E20', '#B9F6CA', '#69F0AE', '#00E676',
                      '#00C853', '#F1F8E9', '#DCEDC8', '#C5E1A5', '#AED581', '#9CCC65', '#8BC34A',
                      '#7CB342', '#689F38', '#558B2F', '#33691E', '#CCFF90', '#B2FF59', '#76FF03',
                      '#64DD17', '#F9FBE7', '#F0F4C3', '#E6EE9C', '#DCE775', '#D4E157', '#CDDC39',
                      '#C0CA33', '#AFB42B', '#9E9D24', '#827717', '#F4FF81', '#EEFF41', '#C6FF00',
                      '#AEEA00', '#FFFDE7', '#FFF9C4', '#FFF59D', '#FFF176', '#FFEE58', '#FFEB3B',
                      '#FDD835', '#FBC02D', '#F9A825', '#F57F17', '#FFFF8D', '#FFFF00', '#FFEA00',
                      '#FFD600', '#FFF8E1', '#FFECB3', '#FFE082', '#FFD54F', '#FFCA28', '#FFC107',
                      '#FFB300', '#FFA000', '#FF8F00', '#FF6F00', '#FFE57F', '#FFD740', '#FFC400',
                      '#FFAB00', '#FFF3E0', '#FFE0B2', '#FFCC80', '#FFB74D', '#FFA726', '#FF9800',
                      '#FB8C00', '#F57C00', '#EF6C00', '#E65100', '#FFD180', '#FFAB40', '#FF9100',
                      '#FF6D00', '#FBE9E7', '#FFCCBC', '#FFAB91', '#FF8A65', '#FF7043', '#FF5722',
                      '#F4511E', '#E64A19', '#D84315', '#BF360C', '#FF9E80', '#FF6E40', '#FF3D00',
                      '#DD2C00', '#EFEBE9', '#D7CCC8', '#BCAAA4', '#A1887F', '#8D6E63', '#795548',
                      '#6D4C41', '#5D4037', '#4E342E', '#3E2723', '#FAFAFA', '#F5F5F5', '#EEEEEE',
                      '#E0E0E0', '#BDBDBD', '#9E9E9E', '#757575', '#616161', '#424242', '#212121',
                      '#ECEFF1', '#CFD8DC', '#B0BEC5', '#90A4AE', '#78909C', '#607D8B', '#546E7A',
                      '#455A64', '#37474F', '#263238'
                    ]
                  },
                  'aggregation': {'aggregation': 0}
                }],
                'options': {
                  'legend': {'display': true, 'position': 'bottom'},
                  'scales': {'xAxes': [], 'yAxes': []},
                  'pieceLabel': {'position': 'outside'},
                  'responsive': true,
                  'maintainAspectRatio': false
                },
                'exportable': true,
                'visibility': {'condition': 'true'},
                'widgetType': 4
              }
            ],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          },
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>Lens</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {},
            'content': [
              {
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'htmlText': '<h5>[[COUNTFORMS(forms,"lens_od != null")]] answers</h5>',
                'visibility': {'condition': 'true'},
                'widgetType': 3
              },
              {
                'type': 1,
                'labels': {'formula': '[]'},
                'styles': {'width': '100%', 'height': '400px'},
                'dataset': [
                  {
                    'label': 'Clear',
                    'formula': [{'formula': '[COUNTFORMS(forms,"lens_od===\'lens_clear\'")]'}],
                    'options': {'stack': 'Stack 0', 'backgroundColor': '#FF6633'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Cataractous',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"lens_od===\'lens_cataractous\'")]'}],
                    'options': {'stack': 'Stack 1', 'backgroundColor': '#FFB399'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Phseudophakic',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"lens_od===\'lens_phseudophakic\'")]'}],
                    'options': {'stack': 'Stack 2', 'backgroundColor': '#FF33FF'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Aphakic',
                    'formula': [{'formula': '[COUNTFORMS(forms,"lens_od===\'lens_aphakic\'")]'}],
                    'options': {'stack': 'Stack 3', 'backgroundColor': '#FFFF99'},
                    'aggregation': {'aggregation': 0}
                  }
                ],
                'options': {
                  'legend': {'display': true, 'position': 'bottom'},
                  'scales': {'xAxes': [], 'yAxes': []},
                  'responsive': true,
                  'maintainAspectRatio': false
                },
                'exportable': true,
                'visibility': {'condition': 'true'},
                'widgetType': 4
              }
            ],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          },
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>Fundus</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {},
            'content': [
              {
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'htmlText': '<h5>[[COUNTFORMS(forms,"fundus_od != null")]] answers</h5>',
                'visibility': {'condition': 'true'},
                'widgetType': 3
              },
              {
                'type': 1,
                'labels': {'formula': '[]'},
                'styles': {'width': '100%', 'height': '400px'},
                'dataset': [
                  {
                    'label': 'Normal',
                    'formula': [{'formula': '[COUNTFORMS(forms,"fundus_od===\'fundus_normal\'")]'}],
                    'options': {'stack': 'Stack 0', 'backgroundColor': '#FF6633'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Bleeding',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"fundus_od===\'fundus_bleeding\'")]'}],
                    'options': {'stack': 'Stack 1', 'backgroundColor': '#FFB399'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Diabetic retinopathy',
                    'formula': [{'formula': '[COUNTFORMS(forms,"fundus_od===\'fundus_dr\'")]'}],
                    'options': {'stack': 'Stack 2', 'backgroundColor': '#FF33FF'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Other',
                    'formula': [{'formula': '[COUNTFORMS(forms,"fundus_od===\'fundus_other\'")]'}],
                    'options': {'stack': 'Stack 3', 'backgroundColor': '#FFFF99'},
                    'aggregation': {'aggregation': 0}
                  }
                ],
                'options': {
                  'legend': {'display': true, 'position': 'bottom'},
                  'scales': {'xAxes': [], 'yAxes': []},
                  'responsive': true,
                  'maintainAspectRatio': false
                },
                'exportable': true,
                'visibility': {'condition': 'true'},
                'widgetType': 4
              }
            ],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          },
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>Pupil</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {},
            'content': [
              {
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'htmlText': '<h5>[[COUNTFORMS(forms,"pupil_od != null")]] answers</h5>',
                'visibility': {'condition': 'true'},
                'widgetType': 3
              },
              {
                'type': 1,
                'labels': {'formula': '[]'},
                'styles': {'width': '100%', 'height': '400px'},
                'dataset': [
                  {
                    'label': 'Central Regular and reacting to light-Normal-(CRRL)',
                    'formula': [{'formula': '[COUNTFORMS(forms,"pupil_od===\'pupil_crrl\'")]'}],
                    'options': {'stack': 'Stack 0', 'backgroundColor': '#FF6633'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Irregular',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"pupil_od===\'pupil_irregular\'")]'}],
                    'options': {'stack': 'Stack 1', 'backgroundColor': '#FFB399'},
                    'aggregation': {'aggregation': 0}
                  }
                ],
                'options': {
                  'legend': {'display': true, 'position': 'bottom'},
                  'scales': {'xAxes': [], 'yAxes': []},
                  'responsive': true,
                  'maintainAspectRatio': false
                },
                'exportable': true,
                'visibility': {'condition': 'true'},
                'widgetType': 4
              }
            ],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          },
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>Diagnosis</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {},
            'content': [
              {
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'htmlText': '<h5>[[COUNTFORMS(forms,"diagnosis_od != null")]] answers</h5>',
                'visibility': {'condition': 'true'},
                'widgetType': 3
              },
              {
                'type': 1,
                'labels': {'formula': '[]'},
                'styles': {'width': '100%', 'height': '400px'},
                'dataset': [
                  {
                    'label': 'EC00. Normal eye',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_od.indexOf(\'ec00\') > -1")]'}],
                    'options': {'stack': 'Stack 0', 'backgroundColor': '#FF6633'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC01. Allergic conjunctivitis',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_od.indexOf(\'ec01\') > -1")]'}],
                    'options': {'stack': 'Stack 1', 'backgroundColor': '#FFB399'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC02. Bacterial Conjunctivitis',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_od.indexOf(\'ec02\') > -1")]'}],
                    'options': {'stack': 'Stack 2', 'backgroundColor': '#FF33FF'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC03. Ophthalmia neonatorum',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_od.indexOf(\'ec03\') > -1")]'}],
                    'options': {'stack': 'Stack 3', 'backgroundColor': '#FFFF99'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC04. Other Forms of Conjunctivitis',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_od.indexOf(\'ec04\') > -1")]'}],
                    'options': {'stack': 'Stack 4', 'backgroundColor': '#00B3E6'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC05. Corneal Ulcers/ Keratitis',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_od.indexOf(\'ec05\') > -1")]'}],
                    'options': {'stack': 'Stack 5', 'backgroundColor': '#E6B333'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC06. Un Operable Cataract (>6/60)',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_od.indexOf(\'ec06\') > -1")]'}],
                    'options': {'stack': 'Stack 6', 'backgroundColor': '#3366E6'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC07. Operable Cataract (< 6/60)',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_od.indexOf(\'ec07\') > -1")]'}],
                    'options': {'stack': 'Stack 7', 'backgroundColor': '#999966'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC08. Refractive errors',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_od.indexOf(\'ec08\') > -1")]'}],
                    'options': {'stack': 'Stack 8', 'backgroundColor': '#99FF99'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC09. Glaucoma',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_od.indexOf(\'ec09\') > -1")]'}],
                    'options': {'stack': 'Stack 9', 'backgroundColor': '#B34D4D'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC10. Trachoma',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_od.indexOf(\'ec10\') > -1")]'}],
                    'options': {'stack': 'Stack 10', 'backgroundColor': '#80B300'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC11. Vitamin A Deficiency',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_od.indexOf(\'ec11\') > -1")]'}],
                    'options': {'stack': 'Stack 11', 'backgroundColor': '#809900'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC12. Ocular trauma and Burns',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_od.indexOf(\'ec12\') > -1")]'}],
                    'options': {'stack': 'Stack 12', 'backgroundColor': '#E6B3B3'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC13. Diabetic Retinopathy (All stages)',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_od.indexOf(\'ec13\') > -1")]'}],
                    'options': {'stack': 'Stack 13', 'backgroundColor': '#6680B3'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC14. Chorioretinal, Macular & Vitreous Disorders',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_od.indexOf(\'ec14\') > -1")]'}],
                    'options': {'stack': 'Stack 14', 'backgroundColor': '#66991A'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC15. Uveitis',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_od.indexOf(\'ec15\') > -1")]'}],
                    'options': {'stack': 'Stack 15', 'backgroundColor': '#FF99E6'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC16. Endophthalmitis',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_od.indexOf(\'ec16\') > -1")]'}],
                    'options': {'stack': 'Stack 16', 'backgroundColor': '#CCFF1A'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC17. Corneal scars (Non trachomatous)',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_od.indexOf(\'ec17\') > -1")]'}],
                    'options': {'stack': 'Stack 17', 'backgroundColor': '#FF1A66'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC18. Tumours',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_od.indexOf(\'ec18\') > -1")]'}],
                    'options': {'stack': 'Stack 18', 'backgroundColor': '#E6331A'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC19. Strabismus ( All types)',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_od.indexOf(\'ec19\') > -1")]'}],
                    'options': {'stack': 'Stack 19', 'backgroundColor': '#33FFCC'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC20. Ptosis and other lid Disorders',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_od.indexOf(\'ec20\') > -1")]'}],
                    'options': {'stack': 'Stack 20', 'backgroundColor': '#66994D'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC21. Squamous Cell Carcinoma of Conjunctiva',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_od.indexOf(\'ec21\') > -1")]'}],
                    'options': {'stack': 'Stack 21', 'backgroundColor': '#B366CC'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC22. Retinoblastoma',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_od.indexOf(\'ec22\') > -1")]'}],
                    'options': {'stack': 'Stack 22', 'backgroundColor': '#4D8000'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC23. Other Malignant Tumours',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_od.indexOf(\'ec23\') > -1")]'}],
                    'options': {'stack': 'Stack 23', 'backgroundColor': '#B33300'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC24. Other Benign Tumours/Growths',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_od.indexOf(\'ec24\') > -1")]'}],
                    'options': {'stack': 'Stack 24', 'backgroundColor': '#CC80CC'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC25. Other Eye Disorders',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_od.indexOf(\'ec25\') > -1")]'}],
                    'options': {'stack': 'Stack 25', 'backgroundColor': '#66664D'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC26. Blindness',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_od.indexOf(\'ec26\') > -1")]'}],
                    'options': {'stack': 'Stack 26', 'backgroundColor': '#991AFF'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC27. Other eye conditions',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_od.indexOf(\'ec27\') > -1")]'}],
                    'options': {'stack': 'Stack 27', 'backgroundColor': '#E666FF'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC28. Spectacles Dispensed',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_od.indexOf(\'ec28\') > -1")]'}],
                    'options': {'stack': 'Stack 28', 'backgroundColor': '#4DB3FF'},
                    'aggregation': {'aggregation': 0}
                  }
                ],
                'options': {
                  'legend': {'display': true, 'position': 'bottom'},
                  'scales': {'xAxes': [], 'yAxes': []},
                  'responsive': true,
                  'maintainAspectRatio': false
                },
                'exportable': true,
                'visibility': {'condition': 'true'},
                'widgetType': 4
              }
            ],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          },
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>Any medications/Treatment</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {},
            'content': [
              {
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'htmlText': '<h5>[[COUNTFORMS(forms,"treatment_od != null")]] answers</h5>',
                'visibility': {'condition': 'true'},
                'widgetType': 3
              },
              {
                'type': 1,
                'labels': {'formula': '[]'},
                'styles': {'width': '100%', 'height': '400px'},
                'dataset': [
                  {
                    'label': 'Spectacle',
                    'formula': [
                      {'formula': '[COUNTFORMS(forms,"treatment_od.indexOf(\'spectacle\') > -1")]'}
                    ],
                    'options': {'stack': 'Stack 0', 'backgroundColor': '#FF6633'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Other',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"treatment_od.indexOf(\'other\') > -1")]'}],
                    'options': {'stack': 'Stack 1', 'backgroundColor': '#FFB399'},
                    'aggregation': {'aggregation': 0}
                  }
                ],
                'options': {
                  'legend': {'display': true, 'position': 'bottom'},
                  'scales': {'xAxes': [], 'yAxes': []},
                  'responsive': true,
                  'maintainAspectRatio': false
                },
                'exportable': true,
                'visibility': {'condition': 'true'},
                'widgetType': 4
              }
            ],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          }
        ],
        'visibility': {'condition': 'true'},
        'widgetType': 7
      },
      {
        'styles': {'width': '100%', 'dislay': 'block'},
        'htmlText': '<div color="primary"><h1>EXAM LE</h1></div>',
        'visibility': {'condition': 'true'},
        'widgetType': 3
      },
      {
        'styles': {'with': '100%', 'dislay': 'block'},
        'content': [
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>Visual acuity (VA)</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {},
            'content': [
              {
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'htmlText': '<h5>[[COUNTFORMS(forms,"va_os != null")]] answers</h5>',
                'visibility': {'condition': 'true'},
                'widgetType': 3
              },
              {
                'type': 6,
                'labels': {
                  'formula':
                      '[\'less than 6/60 \',\'6/60\',\'6/36\',\'6/24\',\'6/18\',\'6/12\',\'6/9\',\'6/6\']'
                },
                'styles': {'width': '100%', 'height': '400px'},
                'dataset': [{
                  'label': 'Visual acuity (VA)',
                  'formula': [{
                    'formula':
                        '[COUNTFORMS(forms,"va_os===\'6_60-\'"),COUNTFORMS(forms,"va_os===\'6_60\'"),COUNTFORMS(forms,"va_os===\'6_36\'"),COUNTFORMS(forms,"va_os===\'6_24\'"),COUNTFORMS(forms,"va_os===\'6_18\'"),COUNTFORMS(forms,"va_os===\'6_12\'"),COUNTFORMS(forms,"va_os===\'6_9\'"),COUNTFORMS(forms,"va_os===\'6_6\'")]'
                  }],
                  'options': {
                    'backgroundColor': [
                      '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6',
                      '#999966', '#99FF99', '#B34D4D', '#80B300', '#809900', '#E6B3B3', '#6680B3',
                      '#66991A', '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC', '#66994D',
                      '#B366CC', '#4D8000', '#B33300', '#CC80CC', '#66664D', '#991AFF', '#E666FF',
                      '#4DB3FF', '#1AB399', '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
                      '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933', '#FF3380', '#CCCC00',
                      '#66E64D', '#4D80CC', '#9900B3', '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6',
                      '#6666FF', '#F44336', '#FFEBEE', '#FFCDD2', '#EF9A9A', '#E57373', '#EF5350',
                      '#E53935', '#D32F2F', '#C62828', '#B71C1C', '#FF8A80', '#FF5252', '#FF1744',
                      '#D50000', '#FCE4EC', '#F8BBD0', '#F48FB1', '#F06292', '#EC407A', '#E91E63',
                      '#D81B60', '#C2185B', '#AD1457', '#880E4F', '#FF80AB', '#FF4081', '#F50057',
                      '#C51162', '#F3E5F5', '#E1BEE7', '#CE93D8', '#BA68C8', '#AB47BC', '#9C27B0',
                      '#8E24AA', '#7B1FA2', '#6A1B9A', '#4A148C', '#EA80FC', '#E040FB', '#D500F9',
                      '#AA00FF', '#EDE7F6', '#D1C4E9', '#B39DDB', '#9575CD', '#7E57C2', '#673AB7',
                      '#5E35B1', '#512DA8', '#4527A0', '#311B92', '#B388FF', '#7C4DFF', '#651FFF',
                      '#6200EA', '#E8EAF6', '#C5CAE9', '#9FA8DA', '#7986CB', '#5C6BC0', '#3F51B5',
                      '#3949AB', '#303F9F', '#283593', '#1A237E', '#8C9EFF', '#536DFE', '#3D5AFE',
                      '#304FFE', '#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3',
                      '#1E88E5', '#1976D2', '#1565C0', '#0D47A1', '#82B1FF', '#448AFF', '#2979FF',
                      '#2962FF', '#E1F5FE', '#B3E5FC', '#81D4FA', '#4FC3F7', '#29B6F6', '#03A9F4',
                      '#039BE5', '#0288D1', '#0277BD', '#01579B', '#80D8FF', '#40C4FF', '#00B0FF',
                      '#0091EA', '#E0F7FA', '#B2EBF2', '#80DEEA', '#4DD0E1', '#26C6DA', '#00BCD4',
                      '#00ACC1', '#0097A7', '#00838F', '#6064',   '#84FFFF', '#18FFFF', '#00E5FF',
                      '#00B8D4', '#E0F2F1', '#B2DFDB', '#80CBC4', '#4DB6AC', '#26A69A', '#9688',
                      '#00897B', '#00796B', '#00695C', '#004D40', '#A7FFEB', '#64FFDA', '#1DE9B6',
                      '#00BFA5', '#E8F5E9', '#C8E6C9', '#A5D6A7', '#81C784', '#66BB6A', '#4CAF50',
                      '#43A047', '#388E3C', '#2E7D32', '#1B5E20', '#B9F6CA', '#69F0AE', '#00E676',
                      '#00C853', '#F1F8E9', '#DCEDC8', '#C5E1A5', '#AED581', '#9CCC65', '#8BC34A',
                      '#7CB342', '#689F38', '#558B2F', '#33691E', '#CCFF90', '#B2FF59', '#76FF03',
                      '#64DD17', '#F9FBE7', '#F0F4C3', '#E6EE9C', '#DCE775', '#D4E157', '#CDDC39',
                      '#C0CA33', '#AFB42B', '#9E9D24', '#827717', '#F4FF81', '#EEFF41', '#C6FF00',
                      '#AEEA00', '#FFFDE7', '#FFF9C4', '#FFF59D', '#FFF176', '#FFEE58', '#FFEB3B',
                      '#FDD835', '#FBC02D', '#F9A825', '#F57F17', '#FFFF8D', '#FFFF00', '#FFEA00',
                      '#FFD600', '#FFF8E1', '#FFECB3', '#FFE082', '#FFD54F', '#FFCA28', '#FFC107',
                      '#FFB300', '#FFA000', '#FF8F00', '#FF6F00', '#FFE57F', '#FFD740', '#FFC400',
                      '#FFAB00', '#FFF3E0', '#FFE0B2', '#FFCC80', '#FFB74D', '#FFA726', '#FF9800',
                      '#FB8C00', '#F57C00', '#EF6C00', '#E65100', '#FFD180', '#FFAB40', '#FF9100',
                      '#FF6D00', '#FBE9E7', '#FFCCBC', '#FFAB91', '#FF8A65', '#FF7043', '#FF5722',
                      '#F4511E', '#E64A19', '#D84315', '#BF360C', '#FF9E80', '#FF6E40', '#FF3D00',
                      '#DD2C00', '#EFEBE9', '#D7CCC8', '#BCAAA4', '#A1887F', '#8D6E63', '#795548',
                      '#6D4C41', '#5D4037', '#4E342E', '#3E2723', '#FAFAFA', '#F5F5F5', '#EEEEEE',
                      '#E0E0E0', '#BDBDBD', '#9E9E9E', '#757575', '#616161', '#424242', '#212121',
                      '#ECEFF1', '#CFD8DC', '#B0BEC5', '#90A4AE', '#78909C', '#607D8B', '#546E7A',
                      '#455A64', '#37474F', '#263238'
                    ]
                  },
                  'aggregation': {'aggregation': 0}
                }],
                'options': {
                  'legend': {'display': true, 'position': 'bottom'},
                  'scales': {'xAxes': [], 'yAxes': []},
                  'pieceLabel': {'position': 'outside'},
                  'responsive': true,
                  'maintainAspectRatio': false
                },
                'exportable': true,
                'visibility': {'condition': 'true'},
                'widgetType': 4
              }
            ],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          },
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>CF (Counting fingers)</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {},
            'content': [
              {
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'htmlText': '<h5>[[COUNTFORMS(forms,"cf_os != null")]] answers</h5>',
                'visibility': {'condition': 'true'},
                'widgetType': 3
              },
              {
                'type': 1,
                'labels': {'formula': '[]'},
                'styles': {'width': '100%', 'height': '400px'},
                'dataset': [
                  {
                    'label': 'y',
                    'formula': [{'formula': '[COUNTFORMS(forms,"cf_os===\'y\'")]'}],
                    'options': {'stack': 'Stack 0', 'backgroundColor': '#FF6633'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'n',
                    'formula': [{'formula': '[COUNTFORMS(forms,"cf_os===\'n\'")]'}],
                    'options': {'stack': 'Stack 1', 'backgroundColor': '#FFB399'},
                    'aggregation': {'aggregation': 0}
                  }
                ],
                'options': {
                  'legend': {'display': true, 'position': 'bottom'},
                  'scales': {'xAxes': [], 'yAxes': []},
                  'responsive': true,
                  'maintainAspectRatio': false
                },
                'exportable': true,
                'visibility': {'condition': 'true'},
                'widgetType': 4
              }
            ],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          },
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>HM (Hand motion)</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {},
            'content': [
              {
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'htmlText': '<h5>[[COUNTFORMS(forms,"hm_os != null")]] answers</h5>',
                'visibility': {'condition': 'true'},
                'widgetType': 3
              },
              {
                'type': 1,
                'labels': {'formula': '[]'},
                'styles': {'width': '100%', 'height': '400px'},
                'dataset': [
                  {
                    'label': 'y',
                    'formula': [{'formula': '[COUNTFORMS(forms,"hm_os===\'y\'")]'}],
                    'options': {'stack': 'Stack 0', 'backgroundColor': '#FF6633'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'n',
                    'formula': [{'formula': '[COUNTFORMS(forms,"hm_os===\'n\'")]'}],
                    'options': {'stack': 'Stack 1', 'backgroundColor': '#FFB399'},
                    'aggregation': {'aggregation': 0}
                  }
                ],
                'options': {
                  'legend': {'display': true, 'position': 'bottom'},
                  'scales': {'xAxes': [], 'yAxes': []},
                  'responsive': true,
                  'maintainAspectRatio': false
                },
                'exportable': true,
                'visibility': {'condition': 'true'},
                'widgetType': 4
              }
            ],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          },
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>LP (Light perception)</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {},
            'content': [
              {
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'htmlText': '<h5>[[COUNTFORMS(forms,"lp_os != null")]] answers</h5>',
                'visibility': {'condition': 'true'},
                'widgetType': 3
              },
              {
                'type': 1,
                'labels': {'formula': '[]'},
                'styles': {'width': '100%', 'height': '400px'},
                'dataset': [
                  {
                    'label': 'y',
                    'formula': [{'formula': '[COUNTFORMS(forms,"lp_os===\'y\'")]'}],
                    'options': {'stack': 'Stack 0', 'backgroundColor': '#FF6633'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'n',
                    'formula': [{'formula': '[COUNTFORMS(forms,"lp_os===\'n\'")]'}],
                    'options': {'stack': 'Stack 1', 'backgroundColor': '#FFB399'},
                    'aggregation': {'aggregation': 0}
                  }
                ],
                'options': {
                  'legend': {'display': true, 'position': 'bottom'},
                  'scales': {'xAxes': [], 'yAxes': []},
                  'responsive': true,
                  'maintainAspectRatio': false
                },
                'exportable': true,
                'visibility': {'condition': 'true'},
                'widgetType': 4
              }
            ],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          }
        ],
        'visibility': {'condition': 'true'},
        'widgetType': 7
      },
      {
        'styles': {'width': '100%', 'dislay': 'block'},
        'htmlText': '<div color="primary"><h1>EXAMINATION FINDINGS LE</h1></div>',
        'visibility': {'condition': 'true'},
        'widgetType': 3
      },
      {
        'styles': {'with': '100%', 'dislay': 'block'},
        'content': [
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>Eye Lid</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {},
            'content': [
              {
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'htmlText': '<h5>[[COUNTFORMS(forms,"eye_lid_os != null")]] answers</h5>',
                'visibility': {'condition': 'true'},
                'widgetType': 3
              },
              {
                'type': 1,
                'labels': {'formula': '[]'},
                'styles': {'width': '100%', 'height': '400px'},
                'dataset': [
                  {
                    'label': 'Normal',
                    'formula': [{'formula': '[COUNTFORMS(forms,"eye_lid_os===\'normal\'")]'}],
                    'options': {'stack': 'Stack 0', 'backgroundColor': '#FF6633'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Abnormal',
                    'formula': [{'formula': '[COUNTFORMS(forms,"eye_lid_os===\'abnormal\'")]'}],
                    'options': {'stack': 'Stack 1', 'backgroundColor': '#FFB399'},
                    'aggregation': {'aggregation': 0}
                  }
                ],
                'options': {
                  'legend': {'display': true, 'position': 'bottom'},
                  'scales': {'xAxes': [], 'yAxes': []},
                  'responsive': true,
                  'maintainAspectRatio': false
                },
                'exportable': true,
                'visibility': {'condition': 'true'},
                'widgetType': 4
              }
            ],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          },
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>Conjunctiva</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {},
            'content': [
              {
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'htmlText': '<h5>[[COUNTFORMS(forms,"conjunctiva_os != null")]] answers</h5>',
                'visibility': {'condition': 'true'},
                'widgetType': 3
              },
              {
                'type': 1,
                'labels': {'formula': '[]'},
                'styles': {'width': '100%', 'height': '400px'},
                'dataset': [
                  {
                    'label': 'Normal',
                    'formula': [{'formula': '[COUNTFORMS(forms,"conjunctiva_os===\'normal\'")]'}],
                    'options': {'stack': 'Stack 0', 'backgroundColor': '#FF6633'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Inflamed',
                    'formula': [{'formula': '[COUNTFORMS(forms,"conjunctiva_os===\'inflamed\'")]'}],
                    'options': {'stack': 'Stack 1', 'backgroundColor': '#FFB399'},
                    'aggregation': {'aggregation': 0}
                  }
                ],
                'options': {
                  'legend': {'display': true, 'position': 'bottom'},
                  'scales': {'xAxes': [], 'yAxes': []},
                  'responsive': true,
                  'maintainAspectRatio': false
                },
                'exportable': true,
                'visibility': {'condition': 'true'},
                'widgetType': 4
              }
            ],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          },
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>Cornea</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {},
            'content': [
              {
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'htmlText': '<h5>[[COUNTFORMS(forms,"cornea_os != null")]] answers</h5>',
                'visibility': {'condition': 'true'},
                'widgetType': 3
              },
              {
                'type': 1,
                'labels': {'formula': '[]'},
                'styles': {'width': '100%', 'height': '400px'},
                'dataset': [
                  {
                    'label': 'Clear',
                    'formula': [{'formula': '[COUNTFORMS(forms,"cornea_os===\'clear\'")]'}],
                    'options': {'stack': 'Stack 0', 'backgroundColor': '#FF6633'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Opaque',
                    'formula': [{'formula': '[COUNTFORMS(forms,"cornea_os===\'opaque\'")]'}],
                    'options': {'stack': 'Stack 1', 'backgroundColor': '#FFB399'},
                    'aggregation': {'aggregation': 0}
                  }
                ],
                'options': {
                  'legend': {'display': true, 'position': 'bottom'},
                  'scales': {'xAxes': [], 'yAxes': []},
                  'responsive': true,
                  'maintainAspectRatio': false
                },
                'exportable': true,
                'visibility': {'condition': 'true'},
                'widgetType': 4
              }
            ],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          },
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>Anterior chamber</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {},
            'content': [
              {
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'htmlText': '<h5>[[COUNTFORMS(forms,"anterior_chamber_os != null")]] answers</h5>',
                'visibility': {'condition': 'true'},
                'widgetType': 3
              },
              {
                'type': 6,
                'labels': {
                  'formula':
                      '[\'Normal Depth\',\'Swallow\',\'Hyphema\',\'Hypopyon\',\'KPs\',\'Cells and flare\']'
                },
                'styles': {'width': '100%', 'height': '400px'},
                'dataset': [{
                  'label': 'Anterior chamber',
                  'formula': [{
                    'formula':
                        '[COUNTFORMS(forms,"anterior_chamber_os===\'anterior_chamber_normal\'"),COUNTFORMS(forms,"anterior_chamber_os===\'anterior_chamber_swallow\'"),COUNTFORMS(forms,"anterior_chamber_os===\'anterior_chamber_hyphema\'"),COUNTFORMS(forms,"anterior_chamber_os===\'anterior_chamber_hypopyon\'"),COUNTFORMS(forms,"anterior_chamber_os===\'anterior_chamber_kps\'"),COUNTFORMS(forms,"anterior_chamber_os===\'anterior_chamber_cell_flare\'")]'
                  }],
                  'options': {
                    'backgroundColor': [
                      '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6',
                      '#999966', '#99FF99', '#B34D4D', '#80B300', '#809900', '#E6B3B3', '#6680B3',
                      '#66991A', '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC', '#66994D',
                      '#B366CC', '#4D8000', '#B33300', '#CC80CC', '#66664D', '#991AFF', '#E666FF',
                      '#4DB3FF', '#1AB399', '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
                      '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933', '#FF3380', '#CCCC00',
                      '#66E64D', '#4D80CC', '#9900B3', '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6',
                      '#6666FF', '#F44336', '#FFEBEE', '#FFCDD2', '#EF9A9A', '#E57373', '#EF5350',
                      '#E53935', '#D32F2F', '#C62828', '#B71C1C', '#FF8A80', '#FF5252', '#FF1744',
                      '#D50000', '#FCE4EC', '#F8BBD0', '#F48FB1', '#F06292', '#EC407A', '#E91E63',
                      '#D81B60', '#C2185B', '#AD1457', '#880E4F', '#FF80AB', '#FF4081', '#F50057',
                      '#C51162', '#F3E5F5', '#E1BEE7', '#CE93D8', '#BA68C8', '#AB47BC', '#9C27B0',
                      '#8E24AA', '#7B1FA2', '#6A1B9A', '#4A148C', '#EA80FC', '#E040FB', '#D500F9',
                      '#AA00FF', '#EDE7F6', '#D1C4E9', '#B39DDB', '#9575CD', '#7E57C2', '#673AB7',
                      '#5E35B1', '#512DA8', '#4527A0', '#311B92', '#B388FF', '#7C4DFF', '#651FFF',
                      '#6200EA', '#E8EAF6', '#C5CAE9', '#9FA8DA', '#7986CB', '#5C6BC0', '#3F51B5',
                      '#3949AB', '#303F9F', '#283593', '#1A237E', '#8C9EFF', '#536DFE', '#3D5AFE',
                      '#304FFE', '#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3',
                      '#1E88E5', '#1976D2', '#1565C0', '#0D47A1', '#82B1FF', '#448AFF', '#2979FF',
                      '#2962FF', '#E1F5FE', '#B3E5FC', '#81D4FA', '#4FC3F7', '#29B6F6', '#03A9F4',
                      '#039BE5', '#0288D1', '#0277BD', '#01579B', '#80D8FF', '#40C4FF', '#00B0FF',
                      '#0091EA', '#E0F7FA', '#B2EBF2', '#80DEEA', '#4DD0E1', '#26C6DA', '#00BCD4',
                      '#00ACC1', '#0097A7', '#00838F', '#6064',   '#84FFFF', '#18FFFF', '#00E5FF',
                      '#00B8D4', '#E0F2F1', '#B2DFDB', '#80CBC4', '#4DB6AC', '#26A69A', '#9688',
                      '#00897B', '#00796B', '#00695C', '#004D40', '#A7FFEB', '#64FFDA', '#1DE9B6',
                      '#00BFA5', '#E8F5E9', '#C8E6C9', '#A5D6A7', '#81C784', '#66BB6A', '#4CAF50',
                      '#43A047', '#388E3C', '#2E7D32', '#1B5E20', '#B9F6CA', '#69F0AE', '#00E676',
                      '#00C853', '#F1F8E9', '#DCEDC8', '#C5E1A5', '#AED581', '#9CCC65', '#8BC34A',
                      '#7CB342', '#689F38', '#558B2F', '#33691E', '#CCFF90', '#B2FF59', '#76FF03',
                      '#64DD17', '#F9FBE7', '#F0F4C3', '#E6EE9C', '#DCE775', '#D4E157', '#CDDC39',
                      '#C0CA33', '#AFB42B', '#9E9D24', '#827717', '#F4FF81', '#EEFF41', '#C6FF00',
                      '#AEEA00', '#FFFDE7', '#FFF9C4', '#FFF59D', '#FFF176', '#FFEE58', '#FFEB3B',
                      '#FDD835', '#FBC02D', '#F9A825', '#F57F17', '#FFFF8D', '#FFFF00', '#FFEA00',
                      '#FFD600', '#FFF8E1', '#FFECB3', '#FFE082', '#FFD54F', '#FFCA28', '#FFC107',
                      '#FFB300', '#FFA000', '#FF8F00', '#FF6F00', '#FFE57F', '#FFD740', '#FFC400',
                      '#FFAB00', '#FFF3E0', '#FFE0B2', '#FFCC80', '#FFB74D', '#FFA726', '#FF9800',
                      '#FB8C00', '#F57C00', '#EF6C00', '#E65100', '#FFD180', '#FFAB40', '#FF9100',
                      '#FF6D00', '#FBE9E7', '#FFCCBC', '#FFAB91', '#FF8A65', '#FF7043', '#FF5722',
                      '#F4511E', '#E64A19', '#D84315', '#BF360C', '#FF9E80', '#FF6E40', '#FF3D00',
                      '#DD2C00', '#EFEBE9', '#D7CCC8', '#BCAAA4', '#A1887F', '#8D6E63', '#795548',
                      '#6D4C41', '#5D4037', '#4E342E', '#3E2723', '#FAFAFA', '#F5F5F5', '#EEEEEE',
                      '#E0E0E0', '#BDBDBD', '#9E9E9E', '#757575', '#616161', '#424242', '#212121',
                      '#ECEFF1', '#CFD8DC', '#B0BEC5', '#90A4AE', '#78909C', '#607D8B', '#546E7A',
                      '#455A64', '#37474F', '#263238'
                    ]
                  },
                  'aggregation': {'aggregation': 0}
                }],
                'options': {
                  'legend': {'display': true, 'position': 'bottom'},
                  'scales': {'xAxes': [], 'yAxes': []},
                  'pieceLabel': {'position': 'outside'},
                  'responsive': true,
                  'maintainAspectRatio': false
                },
                'exportable': true,
                'visibility': {'condition': 'true'},
                'widgetType': 4
              }
            ],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          },
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>Lens</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {},
            'content': [
              {
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'htmlText': '<h5>[[COUNTFORMS(forms,"lens_os != null")]] answers</h5>',
                'visibility': {'condition': 'true'},
                'widgetType': 3
              },
              {
                'type': 1,
                'labels': {'formula': '[]'},
                'styles': {'width': '100%', 'height': '400px'},
                'dataset': [
                  {
                    'label': 'Clear',
                    'formula': [{'formula': '[COUNTFORMS(forms,"lens_os===\'lens_clear\'")]'}],
                    'options': {'stack': 'Stack 0', 'backgroundColor': '#FF6633'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Cataractous',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"lens_os===\'lens_cataractous\'")]'}],
                    'options': {'stack': 'Stack 1', 'backgroundColor': '#FFB399'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Phseudophakic',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"lens_os===\'lens_phseudophakic\'")]'}],
                    'options': {'stack': 'Stack 2', 'backgroundColor': '#FF33FF'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Aphakic',
                    'formula': [{'formula': '[COUNTFORMS(forms,"lens_os===\'lens_aphakic\'")]'}],
                    'options': {'stack': 'Stack 3', 'backgroundColor': '#FFFF99'},
                    'aggregation': {'aggregation': 0}
                  }
                ],
                'options': {
                  'legend': {'display': true, 'position': 'bottom'},
                  'scales': {'xAxes': [], 'yAxes': []},
                  'responsive': true,
                  'maintainAspectRatio': false
                },
                'exportable': true,
                'visibility': {'condition': 'true'},
                'widgetType': 4
              }
            ],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          },
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>Fundus</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {},
            'content': [
              {
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'htmlText': '<h5>[[COUNTFORMS(forms,"fundus_os != null")]] answers</h5>',
                'visibility': {'condition': 'true'},
                'widgetType': 3
              },
              {
                'type': 1,
                'labels': {'formula': '[]'},
                'styles': {'width': '100%', 'height': '400px'},
                'dataset': [
                  {
                    'label': 'Normal',
                    'formula': [{'formula': '[COUNTFORMS(forms,"fundus_os===\'fundus_normal\'")]'}],
                    'options': {'stack': 'Stack 0', 'backgroundColor': '#FF6633'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Bleeding',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"fundus_os===\'fundus_bleeding\'")]'}],
                    'options': {'stack': 'Stack 1', 'backgroundColor': '#FFB399'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Diabetic retinopathy',
                    'formula': [{'formula': '[COUNTFORMS(forms,"fundus_os===\'fundus_dr\'")]'}],
                    'options': {'stack': 'Stack 2', 'backgroundColor': '#FF33FF'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Other',
                    'formula': [{'formula': '[COUNTFORMS(forms,"fundus_os===\'fundus_other\'")]'}],
                    'options': {'stack': 'Stack 3', 'backgroundColor': '#FFFF99'},
                    'aggregation': {'aggregation': 0}
                  }
                ],
                'options': {
                  'legend': {'display': true, 'position': 'bottom'},
                  'scales': {'xAxes': [], 'yAxes': []},
                  'responsive': true,
                  'maintainAspectRatio': false
                },
                'exportable': true,
                'visibility': {'condition': 'true'},
                'widgetType': 4
              }
            ],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          },
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>Pupil</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {},
            'content': [
              {
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'htmlText': '<h5>[[COUNTFORMS(forms,"pupil_os != null")]] answers</h5>',
                'visibility': {'condition': 'true'},
                'widgetType': 3
              },
              {
                'type': 1,
                'labels': {'formula': '[]'},
                'styles': {'width': '100%', 'height': '400px'},
                'dataset': [
                  {
                    'label': 'Central Regular and reacting to light-Normal-(CRRL)',
                    'formula': [{'formula': '[COUNTFORMS(forms,"pupil_os===\'pupil_crrl\'")]'}],
                    'options': {'stack': 'Stack 0', 'backgroundColor': '#FF6633'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Irregular',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"pupil_os===\'pupil_irregular\'")]'}],
                    'options': {'stack': 'Stack 1', 'backgroundColor': '#FFB399'},
                    'aggregation': {'aggregation': 0}
                  }
                ],
                'options': {
                  'legend': {'display': true, 'position': 'bottom'},
                  'scales': {'xAxes': [], 'yAxes': []},
                  'responsive': true,
                  'maintainAspectRatio': false
                },
                'exportable': true,
                'visibility': {'condition': 'true'},
                'widgetType': 4
              }
            ],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          },
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>Diagnosis</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {},
            'content': [
              {
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'htmlText': '<h5>[[COUNTFORMS(forms,"diagnosis_os != null")]] answers</h5>',
                'visibility': {'condition': 'true'},
                'widgetType': 3
              },
              {
                'type': 1,
                'labels': {'formula': '[]'},
                'styles': {'width': '100%', 'height': '400px'},
                'dataset': [
                  {
                    'label': 'EC00. Normal eye',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_os.indexOf(\'ec00\') > -1")]'}],
                    'options': {'stack': 'Stack 0', 'backgroundColor': '#FF6633'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC01. Allergic conjunctivitis',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_os.indexOf(\'ec01\') > -1")]'}],
                    'options': {'stack': 'Stack 1', 'backgroundColor': '#FFB399'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC02. Bacterial Conjunctivitis',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_os.indexOf(\'ec02\') > -1")]'}],
                    'options': {'stack': 'Stack 2', 'backgroundColor': '#FF33FF'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC03. Ophthalmia neonatorum',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_os.indexOf(\'ec03\') > -1")]'}],
                    'options': {'stack': 'Stack 3', 'backgroundColor': '#FFFF99'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC04. Other Forms of Conjunctivitis',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_os.indexOf(\'ec04\') > -1")]'}],
                    'options': {'stack': 'Stack 4', 'backgroundColor': '#00B3E6'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC05. Corneal Ulcers/ Keratitis',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_os.indexOf(\'ec05\') > -1")]'}],
                    'options': {'stack': 'Stack 5', 'backgroundColor': '#E6B333'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC06. Un Operable Cataract (>6/60)',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_os.indexOf(\'ec06\') > -1")]'}],
                    'options': {'stack': 'Stack 6', 'backgroundColor': '#3366E6'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC07. Operable Cataract (< 6/60)',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_os.indexOf(\'ec07\') > -1")]'}],
                    'options': {'stack': 'Stack 7', 'backgroundColor': '#999966'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC08. Refractive errors',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_os.indexOf(\'ec08\') > -1")]'}],
                    'options': {'stack': 'Stack 8', 'backgroundColor': '#99FF99'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC09. Glaucoma',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_os.indexOf(\'ec09\') > -1")]'}],
                    'options': {'stack': 'Stack 9', 'backgroundColor': '#B34D4D'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC10. Trachoma',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_os.indexOf(\'ec10\') > -1")]'}],
                    'options': {'stack': 'Stack 10', 'backgroundColor': '#80B300'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC11. Vitamin A Deficiency',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_os.indexOf(\'ec11\') > -1")]'}],
                    'options': {'stack': 'Stack 11', 'backgroundColor': '#809900'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC12. Ocular trauma and Burns',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_os.indexOf(\'ec12\') > -1")]'}],
                    'options': {'stack': 'Stack 12', 'backgroundColor': '#E6B3B3'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC13. Diabetic Retinopathy (All stages)',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_os.indexOf(\'ec13\') > -1")]'}],
                    'options': {'stack': 'Stack 13', 'backgroundColor': '#6680B3'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC14. Chorioretinal, Macular & Vitreous Disorders',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_os.indexOf(\'ec14\') > -1")]'}],
                    'options': {'stack': 'Stack 14', 'backgroundColor': '#66991A'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC15. Uveitis',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_os.indexOf(\'ec15\') > -1")]'}],
                    'options': {'stack': 'Stack 15', 'backgroundColor': '#FF99E6'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC16. Endophthalmitis',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_os.indexOf(\'ec16\') > -1")]'}],
                    'options': {'stack': 'Stack 16', 'backgroundColor': '#CCFF1A'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC17. Corneal scars (Non trachomatous)',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_os.indexOf(\'ec17\') > -1")]'}],
                    'options': {'stack': 'Stack 17', 'backgroundColor': '#FF1A66'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC18. Tumours',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_os.indexOf(\'ec18\') > -1")]'}],
                    'options': {'stack': 'Stack 18', 'backgroundColor': '#E6331A'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC19. Strabismus ( All types)',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_os.indexOf(\'ec19\') > -1")]'}],
                    'options': {'stack': 'Stack 19', 'backgroundColor': '#33FFCC'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC20. Ptosis and other lid Disorders',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_os.indexOf(\'ec20\') > -1")]'}],
                    'options': {'stack': 'Stack 20', 'backgroundColor': '#66994D'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC21. Squamous Cell Carcinoma of Conjunctiva',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_os.indexOf(\'ec21\') > -1")]'}],
                    'options': {'stack': 'Stack 21', 'backgroundColor': '#B366CC'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC22. Retinoblastoma',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_os.indexOf(\'ec22\') > -1")]'}],
                    'options': {'stack': 'Stack 22', 'backgroundColor': '#4D8000'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC23. Other Malignant Tumours',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_os.indexOf(\'ec23\') > -1")]'}],
                    'options': {'stack': 'Stack 23', 'backgroundColor': '#B33300'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC24. Other Benign Tumours/Growths',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_os.indexOf(\'ec24\') > -1")]'}],
                    'options': {'stack': 'Stack 24', 'backgroundColor': '#CC80CC'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC25. Other Eye Disorders',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_os.indexOf(\'ec25\') > -1")]'}],
                    'options': {'stack': 'Stack 25', 'backgroundColor': '#66664D'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC26. Blindness',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_os.indexOf(\'ec26\') > -1")]'}],
                    'options': {'stack': 'Stack 26', 'backgroundColor': '#991AFF'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC27. Other eye conditions',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_os.indexOf(\'ec27\') > -1")]'}],
                    'options': {'stack': 'Stack 27', 'backgroundColor': '#E666FF'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'EC28. Spectacles Dispensed',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"diagnosis_os.indexOf(\'ec28\') > -1")]'}],
                    'options': {'stack': 'Stack 28', 'backgroundColor': '#4DB3FF'},
                    'aggregation': {'aggregation': 0}
                  }
                ],
                'options': {
                  'legend': {'display': true, 'position': 'bottom'},
                  'scales': {'xAxes': [], 'yAxes': []},
                  'responsive': true,
                  'maintainAspectRatio': false
                },
                'exportable': true,
                'visibility': {'condition': 'true'},
                'widgetType': 4
              }
            ],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          },
          {
            'styles': {'width': '100%', 'dislay': 'block', 'maxHeight': '600px'},
            'htmlText': '<div color="primary"><h5>Any medications/Treatment</h5></div>',
            'visibility': {'condition': 'true'},
            'widgetType': 3
          },
          {
            'styles': {},
            'content': [
              {
                'styles': {'margin': '10px', 'paddingLeft': '15px'},
                'htmlText': '<h5>[[COUNTFORMS(forms,"treatment_os != null")]] answers</h5>',
                'visibility': {'condition': 'true'},
                'widgetType': 3
              },
              {
                'type': 1,
                'labels': {'formula': '[]'},
                'styles': {'width': '100%', 'height': '400px'},
                'dataset': [
                  {
                    'label': 'Spectacle',
                    'formula': [
                      {'formula': '[COUNTFORMS(forms,"treatment_os.indexOf(\'spectacle\') > -1")]'}
                    ],
                    'options': {'stack': 'Stack 0', 'backgroundColor': '#FF6633'},
                    'aggregation': {'aggregation': 0}
                  },
                  {
                    'label': 'Other',
                    'formula':
                        [{'formula': '[COUNTFORMS(forms,"treatment_os.indexOf(\'other\') > -1")]'}],
                    'options': {'stack': 'Stack 1', 'backgroundColor': '#FFB399'},
                    'aggregation': {'aggregation': 0}
                  }
                ],
                'options': {
                  'legend': {'display': true, 'position': 'bottom'},
                  'scales': {'xAxes': [], 'yAxes': []},
                  'responsive': true,
                  'maintainAspectRatio': false
                },
                'exportable': true,
                'visibility': {'condition': 'true'},
                'widgetType': 4
              }
            ],
            'visibility': {'condition': 'true'},
            'widgetType': 7
          }
        ],
        'visibility': {'condition': 'true'},
        'widgetType': 7
      }
    ]
  },
  'variables': [{'name': 'forms', 'formula': {'formula': 'forms[1]'}}]
};
export const reportSchemas: ReportSchema[] = [
  {
    id: '',
    name: 'report_cbm',
    form_schema_ids: [],
    label: 'CBM Report',
    icon: 'star',
    schema: ajfReportSchema,
    created_at: '',
    updated_at: '',
  },
];
