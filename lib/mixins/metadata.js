const languageAlternative = content =>
  `<rdf:Alt><rdf:li xml:lang="x-default">${content}</rdf:li></rdf:Alt>`;

const agentName = data => `${data.organization} ${data.name} ${data.version}`;
const dateFormat = value => (value || new Date()).toISOString();

function addDublinCoreProperties(data) {
  var result =
    '<rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/">';

  if (data.creators) {
    result += `<dc:creator><rdf:Seq>`;

    for (var name of data.creators) {
      result += `<rdf:li>${name}</rdf:li>`;
    }

    result += `</rdf:Seq></dc:creator>`;
  }

  if (data.title) {
    result += `<dc:title>${languageAlternative(data.title)}</dc:title>`;
  }

  if (data.description) {
    result += `<dc:description>
    ${languageAlternative(data.description)}
    </dc:description>`;
  }

  result += "</rdf:Description>";
  return result;
}

function addXmpProperties(data) {
  result =
    '<rdf:Description rdf:about="" xmlns:xmp="http://ns.adobe.com/xap/1.0/">';

  if (data.tool) {
    result += `<xmp:CreatorTool>${agentName(data.tool)}</xmp:CreatorTool>`;
  }

  result += `<xmp:CreateDate>${dateFormat(data.created)}</xmp:CreateDate>`;
  result += `<xmp:ModifyDate>${dateFormat(data.modified)}</xmp:ModifyDate>`;

  result += "</rdf:Description>";
  return result;
}

module.exports = {
  setMetadata: function(data) {
    this._root.data.Metadata = this.ref({
      Type: "Metadata",
      Subtype: "XML"
    });

    var result = `<?xpacket begin="�" id="W5M0MpCehiHzreSzNTczkc9d"?>`;

    result += `<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="3.1-701"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">`;

    result += addDublinCoreProperties(data);
    result += addXmpProperties(data);

    result += `</rdf:RDF></x:xmpmeta>`;
    result += `<?xpacket end="r"?>`;

    this._root.data.Metadata.write(result);
    this._root.data.Metadata.end();
  }
};
