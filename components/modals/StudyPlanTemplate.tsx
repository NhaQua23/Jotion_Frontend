import { PartialBlock } from "@blocknote/core";

export const StudyPlanTemplate: PartialBlock[] = [
  {
    type: "heading",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
      level: 3
    },
    content: [
      {
        type: "text",
        text: "📆 School timetable",
        styles: {}
      }
    ],
    children: []
  },
  {
    type: "table",
    props: {
      textColor: "default",
      backgroundColor: "default"
    },
    content: {
      type: "tableContent",
      rows: [
        {
          cells: [
            [
              {
                type: "text",
                text: "Time",
                styles: {
                  bold: true
                }
              }
            ],
            [
              {
                type: "text",
                text: "Monday",
                styles: {
                  bold: true
                }
              }
            ],
            [
              {
                type: "text",
                text: "Tuesday",
                styles: {
                  bold: true
                }
              }
            ],
            [
              {
                type: "text",
                text: "Wednesday",
                styles: {
                  bold: true
                }
              }
            ],
            [
              {
                type: "text",
                text: "Thursday",
                styles: {
                  bold: true
                }
              }
            ],
            [
              {
                type: "text",
                text: "Friday",
                styles: {
                  bold: true
                }
              }
            ],
            [
              {
                type: "text",
                text: "Saturday",
                styles: {
                  bold: true
                }
              }
            ],
            [
              {
                type: "text",
                text: "Sunday",
                styles: {
                  bold: true
                }
              }
            ]
          ]
        },
        {
          cells: [
            [
              {
                type: "text",
                text: "07h00 - 07h45",
                styles: {}
              }
            ],
            [],
            [],
            [],
            [],
            [],
            [],
            []
          ]
        },
        {
          cells: [
            [
              {
                type: "text",
                text: "08h00 - 08h45",
                styles: {}
              }
            ],
            [],
            [],
            [],
            [],
            [],
            [],
            []
          ]
        },
        {
          cells: [
            [
              {
                type: "text",
                text: "09h00 - 09h45",
                styles: {}
              }
            ],
            [],
            [],
            [],
            [],
            [],
            [],
            []
          ]
        },
        {
          cells: [
            [
              {
                type: "text",
                text: "10h00 - 10h45",
                styles: {}
              }
            ],
            [],
            [],
            [],
            [],
            [],
            [],
            []
          ]
        },
        {
          cells: [
            [
              {
                type: "text",
                text: "11h00 - 11h45",
                styles: {}
              }
            ],
            [],
            [],
            [],
            [],
            [],
            [],
            []
          ]
        },
        {
          cells: [
            [
              {
                type: "text",
                text: "12h00 - 12h45",
                styles: {}
              }
            ],
            [],
            [],
            [],
            [],
            [],
            [],
            []
          ]
        },
        {
          cells: [
            [
              {
                type: "text",
                text: "13h00 - 13h45",
                styles: {}
              }
            ],
            [],
            [],
            [],
            [],
            [],
            [],
            []
          ]
        },
        {
          cells: [
            [
              {
                type: "text",
                text: "14h00 - 14h45",
                styles: {}
              }
            ],
            [],
            [],
            [],
            [],
            [],
            [],
            []
          ]
        },
        {
          cells: [
            [
              {
                type: "text",
                text: "15h00 - 15h45",
                styles: {}
              }
            ],
            [],
            [],
            [],
            [],
            [],
            [],
            []
          ]
        },
        {
          cells: [
            [
              {
                type: "text",
                text: "16h00 - 16h45",
                styles: {}
              }
            ],
            [],
            [],
            [],
            [],
            [],
            [],
            []
          ]
        }
      ]
    },
    children: []
  },
];