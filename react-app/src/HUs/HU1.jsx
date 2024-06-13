import React, { useEffect, useRef } from 'react';
import { Container, Typography } from '@mui/material';
import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import 'blockly/javascript';
import '../App.css';

export default function HU1() {
    const blocklyRef = useRef(null); // Ref for the Blockly div
    Blockly.Blocks['controls_repeat_ext'] = {
        init: function() {
        this.jsonInit({
            "message0": "repeat %1 times",
            "args0": [
            {
                "type": "input_value",
                "name": "TIMES",
                "check": "Number"
            }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": 120,
            "tooltip": "",
            "helpUrl": ""
        });
        }
    }; 
    // Blockly.Blocks['math_arithmetic'] = {
    //     init: function() {
    //     this.jsonInit({
    //         "message0": "%1 %2 %3",
    //         "args0": [
    //         {
    //             "type": "input_value",
    //             "name": "NUM1",
    //             "check": "Number"
    //         },
    //         {
    //             "type": "field_dropdown",
    //             "name": "OP",
    //             "options": [
    //             ["+", "ADD"],
    //             ["-", "MINUS"],
    //             ["*", "MULTIPLY"],
    //             ["/", "DIVIDE"]
    //             ]
    //         },
    //         {
    //             "type": "input_value",
    //             "name": "NUM2",
    //             "check": "Number"
    //         }
    //         ],
    //         "previousStatement": null,
    //         "nextStatement": null,
    //         "colour": 120,
    //         "tooltip": "Este bloque realiza operaciones aritméticas básicas",
    //         "helpUrl": ""
    //     });
    //     }
    // }; 
  useEffect(() => {
        const toolbox = {
        "kind": "flyoutToolbox",
        "contents": [
            {"kind": "block", "type": "controls_if"},
            {"kind": "block", "type": "controls_repeat_ext"},
            {"kind": "block", "type": "logic_compare"},
            {"kind": "block", "type": "math_number"},
            {"kind": "block", "type": "math_arithmetic"},
            // Add other blocks here
        ]
        };

    const workspace = Blockly.inject(blocklyRef.current, {toolbox: toolbox});
    return () => Blockly.dispose(workspace); // Cleanup on component unmount
  }, []); // Empty dependency array means this runs once on mount

  return (
    <Container>
      <Typography variant="h5">Blockly Workspace</Typography>
      <div ref={blocklyRef} id="blocklyDiv" style={{ height: '480px', width: '100%' }}></div>
    </Container>
  );
}