export function createBoard( rows, columns ){
  for ( let row = 0; row < rows; row++ ){
    for ( let column = 0; column < columns; column++ ){
      const vertex_template = htmlToElement(
        `<div class="vertex"></div>`
      );
      board.append( vertex_template );
    }
  }
}

function htmlToElement( html ){
  const template = document.createElement( 'template' );
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
}