import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import BlocksJson from './Blocks.json';
import 'blockly/javascript';
import { JavascriptGenerator } from 'blockly/javascript';

export function Blocks() {
  try {
    Blockly.Extensions.register('maze_turn_arrows', function() {
      console.log('Registrando la extensión "maze_turn_arrows"');
      const field = this.getField('DIR');
      if (field) {
        const options = field.getOptions();
        if (options.length >= 2) {
          options[options.length - 2][0] += ' (izquierda)';
          options[options.length - 1][0] += ' (derecha)';
        }
      }
    });
  } catch (error) {
    error.message = 'Error al registrar la extensión "maze_turn_arrows": ' + error.message;
    console.error(error);
  }

  Blockly.defineBlocksWithJsonArray(BlocksJson);


  // Generadores de código
  JavascriptGenerator['maze_moveForward'] = function(block) {
    // Generate JavaScript for moving forward.
    console.log("Ejecutando Bloque: maze_moveForward \nblock_id_" + block.id)
    return `moveForward('block_id_${block.id}');\n`;
  };
}

export const toolboxXML = `
  <xml xmlns="http://www.w3.org/1999/xhtml">
    ${BlocksJson.map(blockDef => `<block type="${blockDef.type}"/>`).join('')}
  </xml>`;
  console.log("toolboxXML:\n",toolboxXML);
